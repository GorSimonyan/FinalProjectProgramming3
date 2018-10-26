module.exports = class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 15;
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
    move() {
        var emptyCells = this.chooseCell(0);
        var emptyCellsx = this.chooseCell(1);
        var a = [];
        for (var i = 0; i < emptyCells.length; i++) {
            a.push(emptyCells[i]);
        }
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = random(a);
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
            if (this.energy <= 1) {
                this.die();
            }
        }
    }
    eat() {
        var abc = this.chooseCell(5);
        if (abc.length > 0) {
            this.energy += 10;
        }
        var emptyCells = this.chooseCell(2);
        var newCell = this.random(emptyCells);
        this.multiply++
        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            if (this.multiply >= 15) {
                this.mul();
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
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var newPredator = new Predator(this.x, this.y, this.index);
        predatorArr.push(newPredator);
        matrix[this.y][this.x] = this.index
        this.energy = 50;

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}