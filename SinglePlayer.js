const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let playStart;
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const players = document.getElementsByClassName("players");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let player1score = 0;
let player2score = 0;
let play = false;
let pause = false;

restart.addEventListener("click", (e) => {
  initBall();
  restart.style.display = "none";
  play = true;
  animate();
});

window.addEventListener("keydown", (e) => {

  //START/CONTINUE/RESTART
  if (e.key == "Enter" && !play) {
    player1.style.display = "block";
    player2.style.display = "block";
    start.style.display = "none";
    play = true;
    pause = false;
    initBall();
    init();
    animate();

    if (restart.style.display == "inline") {
      restart.style.display = "none";
    }
  }

  //PAUSE
  if (e.key == "p") {
    if (!pause) {
      pause = true;
    } else {
      pause = false;
      animate();
    }
  }

  //MAIN RESTART
  if(e.key == 'r' && play){
    player1score = 0;
    player2score = 0;
    player2.textContent = `${player2score}`;
    player1.textContent = `${player1score}`;
    player1.style.display = "none";
    player2.style.display = "none";
    c.clearRect(0, 0, innerWidth, innerHeight)
    window.cancelAnimationFrame(myRequestId);
    start.style.display = "inline";
    play = false;
  }
});

start.addEventListener(
  "click",
  (playStart = () => {
    player1.style.display = "block";
    player2.style.display = "block";
    start.style.display = "none";
    play = true;
    initBall();
    init();
    animate();
  })
);

window.addEventListener("resize", (e) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  if (!pause) {
    init();
  }
});

const c = canvas.getContext("2d");


const constDis = 25;
let rectancles = [];

let recWidth = 20;
let recHeight = 100;
let recLeft;
let posLeftY = (innerHeight - recHeight) / 2;
let posRightY = (innerHeight - recHeight) / 2;
let recRight;


document.addEventListener("keydown", (e) => {
if (play) {
    if (e.key == "ArrowDown") {
        if (posRightY + recHeight < innerHeight) {
          posRightY += constDis;
          init();
        }
    }
    if (e.key == "ArrowUp") {
        if (posRightY > 0) {
            posRightY -= constDis;
            init();
        }
    }
}
});

let ball;
let x;
let y;
let dx;
let dy;
let radius;

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  
  this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = "yellow";
      c.stroke()
      c.fill();
    };
    
    this.update = (leftRec, rightRec) => {
        //logic for bouncing it back if the ball hits the top and bottom edge
        if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
            this.dy = -this.dy;
        }
        
        //logic for what happens if the ball hits a rectancle
        if (
            //left rectangle
            this.y + this.radius / Math.sqrt(2) > leftRec.y &&
            this.y - this.radius / Math.sqrt(2) < leftRec.y + leftRec.height &&
            this.x - this.radius <= leftRec.x + leftRec.width &&
            this.dx <= 0
            ) {
      if (
        //if the ball hits at the top of the left rectangle
        this.x > leftRec.x &&
        this.x < leftRec.x + leftRec.width &&
        this.y + this.radius > leftRec.y &&
        this.dx < 0 &&
        this.dy > 0
        ) {
            this.y = -this.y;
      } else if (
        //if the ball hits at the bottom of the left rectangle
        this.x > leftRec.x &&
        this.x < leftRec.x + leftRec.width &&
        this.y - this.radius < leftRec.y + leftRec.height &&
        this.dx < 0 &&
        this.dy < 0
        ) {
            this.y = -this.y;
        } else {
            //hitting at the face
            this.dx = -this.dx;
            if (this.dx < 0 && this.dy < 0) {
                this.dx -= constSpeedUp;
                this.dy -= constSpeedUp;
            } else if (this.dx < 0 && this.dy > 0) {
                this.dx -= constSpeedUp;
                this.dy += constSpeedUp;
            } else if (this.dx > 0 && this.dy > 0) {
                this.dx += constSpeedUp;
                this.dy += constSpeedUp;
            } else if (this.dx > 0 && this.dy < 0) {
                this.dx += constSpeedUp;
                this.dy -= constSpeedUp;
            }
        }
    }
    
    if (
        //right rectangle
        this.y + this.radius / Math.sqrt(2) > rightRec.y &&
        this.y - this.radius / Math.sqrt(2) < rightRec.y + rightRec.height &&
        this.x + this.radius >= rightRec.x &&
        this.dx >= 0
        ) {
            if (
                //if the ball hits at the top of the right rectangle
                this.x > rightRec.x &&
                this.x < rightRec.x + rightRec.width &&
                this.y + this.radius >= rightRec.y &&
                this.dx > 0 &&
                this.dy > 0
                ) {
                    this.y = -this.y;
                } else if (
                    //if the ball hits at the bottom of the right rectangle
                    this.x > rightRec.x &&
                    this.x < rightRec.x + rightRec.width &&
                    this.y - this.radius <= rightRec.y + rightRec.height &&
                    this.dx > 0 &&
                    this.dy < 0
                    ) {
                        this.y = -this.y;
                    } else {
                        //hitting at the face
                        this.dx = -this.dx;
                        if (this.dx < 0 && this.dy < 0) {
                            this.dx -= constSpeedUp;
                            this.dy -= constSpeedUp;
                        } else if (this.dx < 0 && this.dy > 0) {
                            this.dx -= constSpeedUp;
                            this.dy += constSpeedUp;
                        } else if (this.dx > 0 && this.dy > 0) {
                            this.dx += constSpeedUp;
                            this.dy += constSpeedUp;
                        } else if (this.dx > 0 && this.dy < 0) {
                            this.dx += constSpeedUp;
                            this.dy -= constSpeedUp;
                        }
                    }
                }
                
                //when ball hits the edge of the screen horizontally
                if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
                    window.cancelAnimationFrame(myRequestId);
                    restart.style.display = "inline";
                    play = false;
                    if (this.x - this.radius <= 0) {
        player2score += 1;
        player2.textContent = `${player2score}`;
    } else {
        player1score += 1;
        player1.textContent = `${player1score}`;
    }
}

this.x += this.dx;
this.y += this.dy;
this.draw();
};
}

function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dy;

  this.draw = () => {
    c.beginPath();
    c.fillStyle = "brown";
    c.strokeStyle = "black";
    c.rect(this.x, this.y, this.width, this.height);
    c.lineWidth = 3;
    c.stroke();
    c.fill();
    // c.fillRect(this.x, this.y, this.width, this.height);
  };

  this.update = () => {
    if(this.x == (50 - recWidth)){
        this.dy = 6;
        if(ball.dy > 0){
            this.y += this.dy;
        }
        else if(ball.dy < 0){
            this.y -= this.dy;
        }
        if(this.y < 0){
            this.y = 1;
        }
        else if(this.y + this.height > innerHeight){
            this.y = innerHeight - this.height - 1;
        }
    }
    this.draw();
  };
}

rectancles = [];
recLeft = new Rectangle(50 - recWidth, posLeftY, recWidth, recHeight);
rectancles[0] = recLeft;

function init() {
    recRight = new Rectangle(innerWidth - 50, posRightY, recWidth, recHeight);
    rectancles[1] = recRight;
    rectancles[0].draw();
    rectancles[1].draw();
}

let speed = [-6, 6];
let constSpeedUp = 0.5;

function initBall() {
  radius = 20;
  x = innerWidth / 2;
  y = radius + Math.random() * (innerHeight - 2 * radius);
  dx = speed[Math.floor(Math.random() * 2)];
  dy = speed[Math.floor(Math.random() * 2)];
  ball = new Circle(x, y, dx, dy, radius);
  ball.draw();
}

let myRequestId;

function animate() {
  if (pause) {
    return;
  }
  myRequestId = requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  rectancles[0].update();
  rectancles[1].update();
  ball.update(rectancles[0], rectancles[1]);
}
