var side = 20;
var matrix;
var socket;
var Statistic;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var bonusArr = [];
var coolArr = [];


function setup() {
    frameRate(0)
    socket = io.connect();

    socket.on('receive matrix', function (mtx) {
        matrix = mtx;
        createCanvas(matrix[0].length * side+1000, matrix.length * side);
        noLoop();

        socket.on("redraw", function(mtx){
            matrix = mtx;
            redraw();
        });
        socket.on("get stat",function(stat)
        {
            Statistic = stat
        })
    });

    background("grey");

}

function draw() {
    background("grey");
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if(matrix[y][x] == 1) {   
                fill('green');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('grey');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('orange');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('blue');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('white');
                rect(x * side, y * side, side, side);
            }   
        }
    }
  
    textSize(24);
    fill('black')
    var margin = 20;
    for(var i in Statistic){
        text(i + ": " + Statistic[i], 900, margin);
        margin += 20;
    }
    margin=0;

    fill('green')
    rect(850, 5, 20, 20);
    fill('orange')
    rect(850, 65, 20, 20);
    fill('red')
    rect(850, 125, 20, 20);
    fill('blue')
    rect(850, 185, 20, 20);
    fill('white')
    rect(850, 245, 20, 20);
}
