var express = require('express');
var app = express();
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
var grassEaterArr = [];
var predatorArr = [];
var coolArr = [];
var bonusArr = [];



function main() {


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
      else if (matrix[y][x] == 4) {
        var bonus = new Bonus(x, y, 4);
        bonusArr.push(bonus);
      }
    }
  }
}

server.listen(3000);

io.on("connection", function (socket) {
  socket.emit('receive matrix', matrix);
  var frameCount = 0;

  var interval = setInterval(function () {
    frameCount++;
    for (var i in grassArr) {
      grassArr[i].mul(matrix, grassArr, frameCount);
    }
    for (var i in grassEaterArr) {
      
      grassEaterArr[i].eat(matrix, character, frameCount, grassEaterArr, grassArr);
    }
    for (var i in predatorArr) {
      predatorArr[i].eat(matrix,frameCount, predatorArr, grassEaterArr);
    }
    for (var i in coolArr) {
      
      coolArr[i].eat(matrix, grassEaterArr, predatorArr, coolArr);
    }
    
    socket.emit('redraw', matrix);
    //console.log(matrix+"")
  }, 200);
});

main()