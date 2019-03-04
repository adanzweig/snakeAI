class Food {
    constructor() {
        this.location = [3, 4];
    }

    eat(context) {
        context.addScore();

        var coord = this.randomCoord();
        var snake = context.snake;

        while (snake.hasPiece(coord)) {
            coord = this.randomCoord();
        }

        this.location = coord;
        SnakeGame.stepLastEaten = SnakeGame.steps;
    }

    randomCoord() {
        let coord = [];
        coord.push(Math.floor(Math.random() * 25));
        coord.push(Math.floor(Math.random() * 25));
        return coord;
    }
}