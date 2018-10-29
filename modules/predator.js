module.exports = class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 25;
        this.multiply = 0;
        this.index = index;
        this.hincel = 0;
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
            [this.x + 1, this.y + 1]
        ];
        this.whenToMultyply = 5
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


    move(matrix, frameCount, predatorArr, predatorlifeArr) {
        var emptyCells = this.chooseCell(0, matrix);
        var emptyCellsx = this.chooseCell(1, matrix);
        if (frameCount % 120 == 0) {
            this.whenToMultiply = 10;
        }
        if (frameCount % 240 == 0) {
            this.whenToMultiply = 5;
        }
        var a = [];
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = this.random(a, emptyCells, emptyCellsx, matrix);
        if (newCellxy) {
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            var hintex = matrix[newY][newX];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = this.hincel;
            this.hincel = hintex;
            this.y = newY;
            this.x = newX;
            this.energy--;
            if (this.energy <= 1 || frameCount == 1000) {
                this.die(matrix, predatorArr, predatorlifeArr);
            }
        }
    }
    eat(matrix, frameCount, predatorArr, grassEaterArr,grasslifeArr, predatorlifeArr) {
        var abc = this.chooseCell(5, matrix);
        if (abc.length > 0) {
            this.energy += 20;
        }
        var emptyCells = this.chooseCell(2, matrix);
        var newCell = this.random(emptyCells, matrix);
        this.multiply++
        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            if (this.multiply >= 15) {
                this.mul(matrix, predatorArr, predatorlifeArr);
                this.multiply = 0;
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            this.y = newY;
            this.x = newX;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    grasslifeArr[1]++
                    break;
                }
            }
        }
        else {
            this.move(matrix, frameCount, predatorArr, predatorlifeArr);
        }
    }
    mul(matrix, predatorArr, predatorlifeArr) {
        var newPredator = new Predator(this.x, this.y, this.index);
        predatorArr.push(newPredator);
        predatorlifeArr[0]++
        matrix[this.y][this.x] = this.index
        this.energy = 50;

    }
    die(matrix, predatorArr, predatorlifeArr) {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                predatorlifeArr[1]++
                break;
            }
        }
    }
}