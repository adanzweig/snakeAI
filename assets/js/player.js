function gameLoop(game) {
  //   manualGame(game);
  aiGame(game);
}
//MANUAL
function manualGame(game) {
  setTimeout(function() {
    game.passTime();

    if (!game.isGameOver()) {
      // Starts event listener for keydown only after clicking '.new-game'
      // Stop event listener, so only one key press per cycle is registered
      $("body").on("keydown", function(event) {
        game.parseKey(event.keyCode);
        $("body").unbind("keydown");
      });

      var left = jQuery.Event("keydown", { keyCode: 37 });
      var up = jQuery.Event("keydown", { keyCode: 38 });
      var right = jQuery.Event("keydown", { keyCode: 39 });
      var down = jQuery.Event("keydown", { keyCode: 40 });

      $("button.left").click(function() {
        $("body").trigger(left);
      });
      $("button.up").click(function() {
        $("body").trigger(up);
      });
      $("button.right").click(function() {
        $("body").trigger(right);
      });
      $("button.down").click(function() {
        $("body").trigger(down);
      });

      game.renderSnake();
      game.renderFood();

      gameLoop(game);
    } else {
      $(".game-over").fadeIn("fast");
      $(".new-game").focus();
    }
  }, game.speed);
}
//RANDOM
function aiGame(game) {
  setTimeout(function() {
    game.passTime();
    if (!game.isGameOver()) {

      var flagKeyAlreadythere = false;
      for(i=0;i<xs.length;i++){
        if(xs[i].toString() == lastSnakePosition.toString()){
          flagKeyAlreadythere = true;
        }
      }
      if(Math.random() < 0.5){
        flagKeyAlreadythere = true;
      }
      if(!flagKeyAlreadythere){
        xs.push(lastSnakePosition);
        var desiredResult = [0,0,0,0];
        if(lastSnakePosition[0] > 0 && lastSnakePosition[4] > 0){
          desiredResult[0] = lastSnakePosition[4];
        }
        if(lastSnakePosition[1] > 0 && lastSnakePosition[5] > 0){
          desiredResult[1] = lastSnakePosition[5];
        }
        if(lastSnakePosition[2] > 0 && lastSnakePosition[6] > 0){
          desiredResult[2] = lastSnakePosition[6];
        }
        if(lastSnakePosition[3] > 0 && lastSnakePosition[7] > 0){
          desiredResult[3] = lastSnakePosition[7];
        }
        if(desiredResult == [0,0,0,0]){
          desiredResult = [lastSnakePosition[0],lastSnakePosition[1],lastSnakePosition[2],lastSnakePosition[3]]
        }
        ys.push(desiredResult);
      }

      // Starts event listener for keydown only after clicking '.new-game'
      // Stop event listener, so only one key press per cycle is registered
      $("body").on("keydown", function(event) {
        game.parseKey(event.keyCode);
        $("body").unbind("keydown");
      });
      steps++;
      stepsToRandom++;
      $('.steps span').html(steps);
      var pos  = 0;
      // model.fit(xs, ys, {epochs: 50}).then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
      var inputs = game.getSnakeVision();
      lastSnakePosition = inputs;
        if(stepsToRandom > 150){
          console.log("--------");
          console.log("RANDOOM");
          console.log("--------");
          stepsToRandom = 0;
          var randomizerList = [];
          for(var i= 0;i<4;i++){
            if(inputs[i] == 1){
              randomizerList.push(i);
            }
          }
          pos = randomizerList[Math.floor(Math.random()*randomizerList.length)];
        }else{
          pos = predictPos(inputs);
        }
        // Open the browser devtools to see the output
      // });
      switch (pos) {
        case 2:
          direction = 2;
          $("body").trigger(jQuery.Event("keydown", { keyCode: 37 }));
          break;
        case 0:
          direction = 0;
          $("body").trigger(jQuery.Event("keydown", { keyCode: 38 }));
          break;
        case 3:
          direction = 3;
          $("body").trigger(jQuery.Event("keydown", { keyCode: 39 }));
          break;
        case 1:
          direction = 1;
          $("body").trigger(jQuery.Event("keydown", { keyCode: 40 }));
          break;
      }
      console.log(pos);

      game.renderFood();
      game.renderSnake();
      gameLoop(game);
    } else {
      games++;
      stepLastEaten = 0;
      steps = 0;
      stepsToRandom = 0;
      $('.games span').html(games);
      console.log(xs);
      console.log(ys);
      alert('Training new generation');
      model.compile({loss:"meanSquaredError",optimizer:"sgd"});
      model.fit(tf.tensor(xs),tf.tensor(ys),{epochs:50}).then(() => {
        console.log("TEST");
        $(".score").show();

        let game = new SnakeGame();
        gameLoop(game);
      });
    }
  }, game.speed);
}
function predictPos(inputs){
  console.log("PREDICTION");
  console.log("I:"+inputs);
  var arr = model.predict(tf.tensor2d(inputs,[1,8])).dataSync();
  console.log("P:"+arr);
  console.log("D:"+direction);
  var pos = arr.indexOf(Math.max(...arr));
  console.log("pos:"+pos);


  if(isGoBack(pos)){
    arr[pos] = -99;
    pos = arr.indexOf(Math.max(...arr));
  }
  if(pos == -1){
    alert("Error");
    model.fit(tf.tensor(xs),tf.tensor(ys),{epochs:50}).then(() => {
      setTimeout(predictPos(inputs),1000);
    });
  }
  console.log("pos:"+pos);
  return pos;
}
function isGoBack(p){
  if(p == 0 && direction == 1){
    return true;
  }
  if(p == 1 && direction == 0){
    return true;
  }
  if(p == 2 && direction == 3){
    return true;
  }
  if(p == 3 && direction == 2){
    return true;
  }
  return false;

}