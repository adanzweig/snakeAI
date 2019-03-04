class Snake {
    constructor() {
        this.direction = "r";
        this.pieces = [[12, 12], [12, 11], [12, 10], [12, 9], [12, 8]];
    }
    notHitWall(){
        for(var i=0;i<walls.length;i++){
            if (this.pieces[0][0] == walls[i][0] && this.pieces[0][1] == walls[i][1] ){
                return false;
            }
        }
        return true;

    }
    isInBounds() {
        if (
            this.pieces[0][0] < 25 &&
            this.pieces[0][0] >= 0 &&
            (this.pieces[0][1] < 25 && this.pieces[0][1] >= 0)
        ) {
            return true;
        } else {
            return false;
        }
    }

    isNotOverlapping() {
        let piece = this.pieces[0];
        for (var i = 1; i < this.pieces.length; i++) {
            if (JSON.stringify(piece) === JSON.stringify(this.pieces[i])) {
                return false;
            }
        }
        return true;
    }

    hasPiece(coordinate) {
        var condition = false;
        for (var i = 0; i < this.pieces.length; i++) {
            if (
                this.pieces[i][0] == coordinate[0] &&
                this.pieces[i][1] == coordinate[1]
            ) {
                var condition = true;
            }
        }
        return condition;
    }

    // Takes 'food' arg so updatePieces can decide if food has been eaten or not
    move(context) {
        switch (this.direction) {
            case "r":
                this.updatePieces(0, 1, context);
                break;
            case "l":
                this.updatePieces(0, -1, context);
                break;
            case "u":
                this.updatePieces(-1, 0, context);
                break;
            case "d":
                this.updatePieces(1, 0, context);
                break;
        }
    }

    updatePieces(yShift, xShift, context) {
        let coord = [this.pieces[0][0] + yShift, this.pieces[0][1] + xShift];
        this.pieces.unshift(coord);

        let food = context.food;
        if (JSON.stringify(food.location) == JSON.stringify(coord)) {
            food.eat(context);
        } else {
            this.removeTail();
        }

    }

    removeTail() {
        this.pieces.pop();
    }
}