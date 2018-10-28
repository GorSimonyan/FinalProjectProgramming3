var express = require('express');
var app = express();
var mystat = require("fs");
var server = require('http').Server(app);


var io = require('socket.io')(server);

var mat = require('./modules/matrix');
var matrix = mat();
var Bonus = require("./modules/bonus")
var Cool = require("./modules/cool")
var Predator = require("./modules/predator")
var GrassEater = require("./modules/grasseater")
var character = new GrassEater();
var Grass = require("./modules/grass")

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

var grassArr = [];
var grasslifeArr=[0, 0];

var grassEaterArr = [];
var grasseaterlifeArr=[0, 0];

var predatorArr = [];
var predatorlifeArr=[0, 0];

var coolArr = [];
var coollifeArr=[0, 0];

var bonusArr = [];
var bonuslifeArr=[0, 0];


  for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var xot = new Grass(x, y, 1);
        grassArr.push(xot);
      }
      else if (matrix[y][x] == 2) {
        var xotaker = new GrassEater(x, y, 2);
        grassEaterArr.push(xotaker);
      }
      else if (matrix[y][x] == 3) {
        var gishatich = new Predator(x, y, 3);
        predatorArr.push(gishatich);
      }
      else if (matrix[y][x] == 4) {
        var cool = new Cool(x, y, 4);
        coolArr.push(cool);
      }
      else if (matrix[y][x] == 5) {
        var bonus = new Bonus(x, y, 5);
        bonusArr.push(bonus);
      }
    }
  }

  grasslifeArr[0]       += grassArr.length;
  grasseaterlifeArr[0]  += grassEaterArr.length;
  predatorlifeArr[0]    += predatorArr.length;
  coollifeArr[0]        += coolArr.length;
  bonuslifeArr[0]       += bonusArr.length;

server.listen(3000);

io.on("connection", function (socket) {
  socket.emit('receive matrix', matrix);
  var frameCount = 0;

  var interval = setInterval(function () {
    frameCount++;
    for (var i in grassArr) {
      grassArr[i].mul(matrix, grassArr, frameCount, grasslifeArr);
    }
    for (var i in grassEaterArr) {

      grassEaterArr[i].eat(matrix, character, frameCount, grassEaterArr, grassArr, grasslifeArr, grasseaterlifeArr);
    }
    for (var i in predatorArr) {
      predatorArr[i].eat(matrix, frameCount, predatorArr, grassEaterArr,grasseaterlifeArr, predatorlifeArr);
    }
    for (var i in coolArr) {

      coolArr[i].eat(matrix, grassEaterArr, predatorArr, coolArr, coollifeArr, grasseaterlifeArr, predatorlifeArr, frameCount);
    }

    if (frameCount % 60 == 0) {
      generateStats();

      }socket.emit('redraw', matrix);
  }, 200)

  function generateStats(){
    var stat = {
      "Grass": grassArr.length,  "grass-alive":grasslifeArr[0], "grass-dead":grasslifeArr[1],
        "GrassEater": grassEaterArr.length,  "grasseater-alive":grasslifeArr[0], "grasseater-dead":grasseaterlifeArr[1],
        "Predator": predatorArr.length,  "predator-alive":grasslifeArr[0], "predator-dead":predatorlifeArr[1],
        "Cool": coolArr.length,  "cool-alive":grasslifeArr[0], "cool-dead":coollifeArr[1],
        "Bonus": bonusArr.length,  "bonus-alive":grasslifeArr[0], "bonus-dead":bonuslifeArr[1],
    };
    socket.emit("get stat", stat)
  main(stat);
  }

  function main(stat) {
    var file = "Statistica.json";
    mystat.writeFileSync(file, JSON.stringify(stat));
  }
});

    