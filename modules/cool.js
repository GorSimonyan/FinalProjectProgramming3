module.exports = class Cool {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
    getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

        ];
    }

    chooseCell(character, matrix) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }
            }
        }
        return found;
    }


    random(Arr) {
        var item = Arr[Math.floor(Math.random() * Arr.length)];
        return item;
    }

    eat(matrix, grassEaterArr, predatorArr, coolArr) {
        // var emptyCell = this.chooseCell(1); 
        var emptyCells = this.chooseCell(2, matrix);
        var emptyCellsx = this.chooseCell(3, matrix);
        var a = [];

        // for (var i = 0; i < emptyCell.length; i++) {
        //     a.push(emptyCell[i]);
        // }
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = this.random(a);
        if (newCellxy) {
            var newX = newCellxy[0];
            var newY = newCellxy[1];

            // for (var i in grassArr) {
            //     if (newX == grassArr[i].x && newY == grassArr[i].y) {
            //         grassArr.splice(i, 1);
            //         matrix[newY][newX] = 0;
            //         break;
            //     }
            // }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
                matrix[newY][newX] = 0;
            }

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
                matrix[newY][newX] = 0;
            }
        }
    }
}