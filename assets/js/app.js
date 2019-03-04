/* Objects */
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
