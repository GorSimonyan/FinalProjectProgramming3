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

var Grass = require("./modules/grass")

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});



var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var bonusArr = [];
var coolArr = [];



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
        var bonus = new Bonus(x, y, 4);
        bonusArr.push(bonus);
      }
      else if (matrix[y][x] == 5) {
        var cool = new Cool(x, y, 5);
        coolArr.push(cool);
      }
    }
  }
}

server.listen(3000);

io.on("connection", function (socket) {
  socket.emit('receive matrix', matrix);

  var interval = setInterval(function () {
    socket.emit('redraw', matrix);
    for (var i in grassArr) {
      grassArr[i].mul(matrix, grassArr);
    }
    for (var i in grassEaterArr) {
      grassEaterArr[i].eat(matrix, grassEaterArr, grassArr);
    }
    for (var i in predatorArr) {
      predatorArr[i].eat(matrix, predatorArr, grassEaterArr);
    }
    for (var i in bonusArr) {
      bonusArr[i].eat(matrix, bonusArr, predatorArr, coolArr, grassEaterArr);
    }
    for (var i in autoArr) {
      autoArr[i].eat(matrix, grassEaterArr, predatorArr, coolArr, grassArr);
    }
    console.log(matrix)
  }, 200);
});

main()