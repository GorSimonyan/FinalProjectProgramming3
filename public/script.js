var side = 20;
var matrix;
var socket;


function redrawMatrix(mtx){
    matrix = mtx;  
    redraw();
  
}
function setup() {
    frameRate(0)
    socket = io.connect();

    socket.on('recive matrix', function (mtx) {
        matrix = mtx;
        createCanvas(matrix[0].length * side, matrix.length * side);
        noLoop();
        socket.on("redraw", redrawMatrix);
    });

    background("grey");
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if(matrix[y][x] == 1 && frameCount % 120 <= 60) {   
                fill('green');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1 && frameCount % 60 >= 0) {
                fill('lightgreen');
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
}