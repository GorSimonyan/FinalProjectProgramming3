module.exports = class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
        this.whenToMultiply = 5;
    }
    chooseCell(character, matrix) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    random(Arr){
        var item = Arr[Math.floor(Math.random() * Arr.length)];
        return item;
    }

    mul(matrix, grassArr, frameCount) {
        this.multiply++;
        var emptyCells = this.chooseCell(0, matrix);
        var newCell = this.random(emptyCells);
        if (frameCount % 60 == 0) {
            this.whenToMultiply = 10;
        }
        if (frameCount % 120 == 0) {
            this.whenToMultiply = 5;
        }
        if (this.multiply >= this.whenToMultiply && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}