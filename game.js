var sketchProc = function(processingInstance) {
 with (processingInstance) {
    size(400, 400);
    frameRate(60);

    // ProgramCodeGoesHere
    // Ball Variables
    var ballX = width/2;
    var ballY = height/2;
    var xBallSpeed = 2;
    var yBallSpeed = 3;
    var ballWidth = 20;
    var ballHeight = 20;

    // Player Variables
    var playerWidth = 20;
    var playerHeight = 75;

    // Player 1 Variables
    var player1Score = 0;
    var player1X = 0;
    var player1Y = 200;
    var player1Speed = 2;

    // Player 2 Variables
    var player2Score = 0;
    var player2X = 380;
    var player2Y = 200;
    var player2Speed = 2;

    var player1 = function () {
      noStroke();
      fill(255, 255, 255);
      rect(player1X, player1Y, playerWidth, playerHeight);
      player1Y = constrain(player1Y, 0, height - playerHeight);
      textSize(25);
      text("Player 1: " + player1Score, width - width/1.1, height - height/1.15);
    };

    var player2 = function () {
      noStroke();
      fill(255, 255, 255);
      rect(player2X, player2Y, playerWidth, playerHeight);
      player2Y = constrain(player2Y, 0, height - playerHeight);
      textSize(25);
      text("Player 2: " + player2Score, width - width/2.5, height - height/1.15);
    };

    var ball = function () {
      ellipse(ballX, ballY, ballWidth, ballHeight);
    };

    var player1Wins = function () {
      fill(255, 255, 255);
      textSize(25);
      text("Player 1 Wins!", width - width/1.07, 100);
    };

    var player2Wins = function () {
      fill(255, 255, 255);
      textSize(25);
      text("Player 2 Wins!", width - width/2.3, 100);
    };

    var reset = function () {
      fill(200, 200, 200);
      textSize(25);
      text("Press Spacebar to reset!", 59, height/2);
    };

    draw = function () {
      background(0, 0, 0);

      stroke(255, 255, 255);
      line(width/2, 0, width/2, height);

      ballX += xBallSpeed;
      ballY += yBallSpeed;

      if (player1Score >= 7) {
          player1Wins();
          reset();
      }

      if (player2Score >= 7) {
          player2Wins();
          reset();
      }

      if (keyCode === 0 && keyPressed) {
          player1Score = 0;
          player2Score = 0;
          ballX = 200;
          ballY = 200;
      }

      if (ballX > player1X && ballX < player1X + playerWidth + ballWidth/2 &&
          ballY > player1Y - ballHeight/2 && ballY < player1Y + playerHeight + ballHeight/2)
        {xBallSpeed = xBallSpeed * -1;}

      if (ballX > player2X - ballWidth/2 &&
          ballY > player2Y - ballHeight/2 && ballY < player2Y + playerHeight + ballHeight/2)
          {xBallSpeed = xBallSpeed * -1;}

      if (ballX < 0) {
          xBallSpeed = xBallSpeed * -1;
          player2Score ++;
      }

      if (ballX > width) {
          xBallSpeed = xBallSpeed * -1;
          player1Score ++;
      }

      if (ballY > height || ballY < 0) {
          yBallSpeed = yBallSpeed * -1;
      }

      if (ballY > player2Y) {
        player2Y += player2Speed;
      }

      if (ballY < player2Y) {
          player2Y -= player2Speed;
      }

      player1();
      player2();
      ball();

      if (keyCode === UP) {
        player1Y -= 2;
      }

      if (keyCode === DOWN) {
        player1Y += 2;
      }
    };
}};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("canvas");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
