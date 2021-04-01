var sketchProc = function(processingInstance) {
 with (processingInstance) {
    size(400, 400);
    frameRate(10);

    // ProgramCodeGoesHere
    // Settings
    var gameOver = false;
    var scl = 20;
    var rows = [];
    var cols = [];

    // Snake Object Properties
    var Snake = function (x, y, snakeWidth, snakeHeight) {
      this.x = x;
      this.y = y;
      this.width = snakeWidth;
      this.height = snakeHeight;
      this.apples = 0;
      this.tail = [];
    };

    // Apple Object Properties
    var Apple = function (x, y, appleWidth, appleHeight) {
      this.x = x;
      this.y = y;
      this.width = appleWidth;
      this.height = appleHeight;
    };

    // Snake Object Type
    Snake.prototype.draw = function () {
      this.x = constrain(this.x, 0, width - this.width);
      this.y = constrain(this.y, 0, height - this.height);
      noStroke();
      fill(255, 255, 255);
      rect(this.x, this.y, this.width, this.height);
    };

    // Apple Object Type
    Apple.prototype.draw = function () {
      noStroke();
      fill(255, 0, 0);
      rect(this.x, this.y, this.width, this.height);
    };

    // Snake Controls
    Snake.prototype.left = function () {
      this.x -= scl;
    };

    Snake.prototype.right = function () {
      this.x += scl;
    };

    Snake.prototype.up = function () {
      this.y -= scl;
    };

    Snake.prototype.down = function () {
      this.y += scl;
    };

    Snake.prototype.still = function () {
      this.x += 0;
      this.y += 0;
    };

    // Main Program
    var snake = new Snake (200, 200, scl, scl);
    var apple = new Apple (300, 200, scl, scl);

    // Draw Function
    draw = function () {
      var randomInt1 = floor (random (2, 19));
      var randomInt2 = floor (random (2, 19));

      background(0, 0, 0);

      stroke(100, 100, 100);

      for (var i = 0; i < 20; i++) {
        var lineY = 20 + (i * 20);
        line(0, lineY, 400, lineY);
      }

      for (var j = 0; j < 20; j++) {
        var lineX = 20 + (j * 20);
        line(lineX, 0, lineX, 400);
      }

      apple.draw();
      snake.draw();

      fill(255, 255, 255);
      textSize(25);
      text("Score: " + snake.apples, 10, 30);

      if (snake.x >= apple.x - apple.width/2 && snake.x <= (apple.x + apple.width/2) &&
         snake.y >= apple.y - apple.height/2 && snake.y <= (apple.y + apple.height/2)) {
            apple.x = randomInt1 * scl;
            apple.y = randomInt2 * scl;
            snake.apples ++;
      }


      if (gameOver === false) {
        // Controls
        if (keyCode === UP) {
          snake.up();
        } else if (keyCode === DOWN) {
          snake.down();
        } else if (keyCode === LEFT) {
          snake.left();
        } else if (keyCode === RIGHT) {
          snake.right();
        } else {
          snake.still();
        }

        if (snake.x === 0 && keyCode === LEFT) {
          gameOver = true;
        }

        if (snake.x === width - snake.width && keyCode === RIGHT) {
          gameOver = true;
        }

        if (snake.y === height - snake.height && keyCode === DOWN) {
          gameOver = true;
        }

        if (snake.y === 0 && keyCode === UP) {
          gameOver = true;
        }

      } else {
        fill(200, 200, 200);
        textSize(40);
        text("GAMEOVER", 80, 200);
        textSize(20);
        text("Press Spacebar to Start Over", 70, 240);
        if (keyCode === 32) {
          snake.apples = 0;
          snake.x = 200;
          snake.y = 200;
          apple.x = 300;
          apple.y = 200;
          gameOver = false;
        }

      }

    };

}};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("canvas2");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
