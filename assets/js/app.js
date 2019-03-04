/* Objects */

class SnakeGame {
  static direction = 3;
  static steps = 0;
  static games = 0;
  static stepLastEaten = 0;
  static stepsToRandom = 0;
  static lastSnakePosition = [0,0,0,0,0,0,0,0];
  constructor() {
    this.grid = this.createGrid(25);
    this.snake = new Snake();
    this.food = new Food();
    this.score = 0;
    this.speed = 110;



    $(".score span").html(this.score);
    $(".game-over").hide();
  }

  isGameOver() {
    if (this.snake.isInBounds() && this.snake.isNotOverlapping() && SnakeGame.steps - SnakeGame.stepLastEaten < 600) {
      return false;
    } else {
      return true;
    }
  }

  addScore() {
    this.score += 1;
    $(".score span").html(this.score);
    this.increaseSpeed();
  }

  increaseSpeed() {
    if (this.speed > 60) {
      this.speed -= 1.5;
    }
  }

  parseKey(keyCode) {
    let opposites = { r: "l", u: "d", l: "r", d: "u" };
    let keyMap = { 37: "l", 38: "u", 39: "r", 40: "d" };
    let keyPress = keyMap[keyCode];

    if (keyPress) {
      if (opposites[keyPress] !== this.snake.direction) {
        this.snake.direction = keyPress;
      }
    }
  }

  passTime() {
    this.snake.move(this);
  }

  renderSnake() {
    $(".snake").removeClass("snake");
    $(".snake-head").removeClass("snake-head");
    let pieces = this.snake.pieces;
    for (var i = 0; i < pieces.length; i++) {
      $('*[data-grid="' + pieces[i][0] + "," + pieces[i][1] + '"]').addClass(
        "snake"
      );
    }
    $('*[data-grid="' + pieces[0][0] + "," + pieces[0][1] + '"]').addClass(
        "snake-head"
    );
  }
  getSnakeVision(){
    var up = this.isColission([parseInt(this.snake.pieces[0][0])-1,this.snake.pieces[0][1]]);
    var down = this.isColission([parseInt(this.snake.pieces[0][0])+1,this.snake.pieces[0][1]]);
    var left = this.isColission([this.snake.pieces[0][0],parseInt(this.snake.pieces[0][1])-1]);
    var right = this.isColission([this.snake.pieces[0][0],parseInt(this.snake.pieces[0][1])+1]);

    var au = (this.snake.pieces[0][0] > this.food.location[0])?(Math.floor(SnakeGame.stepsToRandom/100)+2):0;
    var ad = (this.snake.pieces[0][0] < this.food.location[0])?(Math.floor(SnakeGame.stepsToRandom/100)+2):0;
    var al = (this.snake.pieces[0][1] > this.food.location[1])?(Math.floor(SnakeGame.stepsToRandom/100)+2):0;
    var ar = (this.snake.pieces[0][1] < this.food.location[1])?(Math.floor(SnakeGame.stepsToRandom/100)+2):0;
    return [up,down,left,right,au,ad,al,ar];
  }
  isColission(pos1){
    if(pos1[0] < 0 || pos1[0] > 24 || pos1[1] < 0 || pos1[1] > 24){
      return 0;
    }else{
      var ret = 1;
      let pieces = this.snake.pieces;
      for (var i = 0; i < pieces.length; i++) {
        if (pieces[i][0] == pos1[0] && pieces[i][1] == pos1[1]) {
          return 0;
        }
      }
     return ret;
    }
  }
  renderFood() {
    $(".food").removeClass("food");
    let food = this.food.location;
    $('*[data-grid="' + food[0] + "," + food[1] + '"]').addClass("food");
  }

  renderGrid() {
    let $grid = $(".snake-game");

    $grid.empty();

    for (var i = 0; i < this.grid.length; i++) {
      let $row = $('<div class="row"></div>');

      for (var ii = 0; ii < this.grid[i].length; ii++) {
        let $square = $('<div class="square"></div>');

        $square.attr("data-grid", i + "," + ii);
        $row.append($square);
      }

      $grid.append($row);
    }
  }

  createGrid(size) {
    let grid = [];
    for (var i = 0; i < size; i++) {
      grid.push(this.createRow(size));
    }

    return grid;
  }

  createRow(size) {
    let row = [];
    for (var i = 0; i < size; i++) {
      row.push(" ");
    }

    return row;
  }
}



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

const model = tf.sequential();
model.add(tf.layers.dense({units:8,inputShape:[8]}));
model.add(tf.layers.dense({units:300,inputShape:[150]}));
model.add(tf.layers.dense({units:300,inputShape:[150]}));
model.add(tf.layers.dense({units:4,inputShape:[200]}));
model.compile({loss:"meanSquaredError",optimizer:"sgd"});
        //u,d,l,r,au,ad,al,ar
var xs = [[1,0,0,0,0,0,0,0],
      [0,1,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0],
      [0,0,0,1,0,0,0,0],
      [1,0,0,0,2,2,0,0],
      [0,1,0,0,0,2,2,0],
      [0,0,1,0,0,0,2,2],
      [0,0,0,1,2,0,0,2],
      [1,0,1,0,0,0,2,2],
      [1,0,0,1,2,0,0,2],
      [1,0,1,1,2,0,0,2],
      [1,1,0,1,2,0,0,2],
      [0,1,0,1,2,0,0,2],
      [1,1,0,0,2,0,0,2],
      [0,1,0,0,2,0,0,2],
      [0,0,0,1,2,0,0,2],
      [0,1,1,0,2,0,0,2],
      [1,0,1,1,0,2,0,0],
      [0,0,0,0,10,10,10,10],
      [1,0,1,1,10,10,10,10]];
var ys = [[1,0,0,0],
      [0,1,0,0],
      [0,0,1,0],
      [0,0,0,1],
      [2,0,0,0],
      [0,2,0,0],
      [0,0,2,0],
      [0,0,0,2],
      [1,0,2,0],
      [2,0,0,2],
      [2,0,1,2],
      [2,1,0,2],
      [0,0,1,2],
      [2,1,0,0],
      [0,2,0,0],
      [0,0,0,2],
      [0,1,1,0],
      [1,0,1,1],
      [0,0,0,0],
      [2,0,2,2]];


$(document).ready(function() {
  model.fit(tf.tensor(xs),tf.tensor2d(ys),{epochs:5000});
  let game = new SnakeGame();
  game.renderGrid();

  var $button = $(".new-game");
  $button.focus();
  $button.click(function(event) {
    $button.blur();
    $(".score").show();

    let game = new SnakeGame();
    gameLoop(game);
  });
});
