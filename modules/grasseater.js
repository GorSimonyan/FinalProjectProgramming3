module.exports = class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.multiply = 0;
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
            [this.x + 1, this.y + 1]
        ];
        this.whenToMultiply = 5;
    }

    chooseCell(character) {
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
        if(frameCount % 6 == 0)
        {
            this.whenToMultiply = 10;
        }
        if(frameCount % 12 == 0)
        {
            this.whenToMultiply = 5;
        }
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.y = newY;
            this.x = newX;
            this.energy--;

            if (this.energy == 1) {
                this.die();
            }
        }
    }
    eat() {
        var abc = this.chooseCell(5);
        if (abc.length > 0) {
            this.energy += 10;
        }
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        this.multiply++
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            this.energy++;
            if (this.multiply >= 10) {
                this.mul();
                this.multiply = 0;
            }
            else {
                matrix[this.y][this.x] = 0;
            }
            this.y = newY;
            this.x = newX;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var newGrassEater = new GrassEater(this.x, this.y, this.index);
        grassEaterArr.push(newGrassEater);
        matrix[this.y][this.x] = this.index
        this.energy = 25;

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}