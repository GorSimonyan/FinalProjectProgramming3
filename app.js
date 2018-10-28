var express = require('express');
var app = express();
var server = require('http').Server(app);
var mystat = require("fs");

var io = require('socket.io')(server);

var mat = require('./modules/matrix');
var matrix = mat();

var Bonus = require("./modules/bonus")
var bonuslifeArr=[0, 0];

var Cool = require("./modules/cool")
var coollifeArr=[0, 0];

var Predator = require("./modules/predator")
var predatorlifeArr=[0, 0];

var GrassEater = require("./modules/grasseater")
var character = new GrassEater();
var grasseaterlifeArr=[0, 0];

var Grass = require("./modules/grass")
var grasslifeArr=[0, 0];

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});




var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var coolArr = [];
var bonusArr = [];



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
  grasseaterlifeArr[0]  += GrassEaterArr.length;
  predatorlifeArr[0]    += PredatorArr.length;
  egglifeArr[0]         += EggArr.length;
  malelifeArr[0]        += MaleArr.length;

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

      grassEaterArr[i].eat(matrix, character, frameCount, grassEaterArr, grassArr, grasseaterlifeArr);
    }
    for (var i in predatorArr) {
      predatorArr[i].eat(matrix, frameCount, predatorArr, grassEaterArr, predatorlifeArr);
    }
    for (var i in coolArr) {

      coolArr[i].eat(matrix, grassEaterArr, predatorArr, coolArr, coollifeArr);
    }

    if (frameCount % 60 == 0) {
      Statistica = {
        "Grass": grassArr.length,
        "GrassEater": grassEaterArr.length,
        "Predator": predatorArr.length,
        "Cool": coolArr.length,
        "Bonus": bonusArr.length,
      }
      socket.emit("MyStats", Statistica);
      stringTo(Statistica);
    }


    socket.emit('redraw', matrix);
  }, 200);
  function stringTo(stat) {
    myJSON = JSON.stringify(Statistica);
    mystat.writeFileSync("Statistica.json", myJSON)
  }
});

main()