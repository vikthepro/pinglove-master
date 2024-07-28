const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", (e) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.radius = radius;

  this.draw = () => {
    c.beginPath();
    c.fillStyle = `${this.color}`;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };

  this.update = () => {
    this.draw();
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  };
}

let ball;
let speedArray = [-10 + Math.random() * 5, 10 + Math.random() * 5];
const colorArray = [
  "rgba(88, 51, 166, 0.5)",
  "rgba(46, 61, 89, 0.5)",
  "rgba(20, 26, 38, 0.5)",
  "rgba(88, 51, 166, 0.5)",
];

function init() {
  let radius = Math.random() * 30 + 30;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = speedArray[Math.floor(Math.random() * 2)];
  let dy = speedArray[Math.floor(Math.random() * 2)];
  let color = colorArray[Math.floor(Math.random() * 2)];
  ball = new Circle(x, y, dx, dy, radius, color);
  ball.draw();
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  ball.update();
}

const img = `<img src="./icons/arrow-next-small-svgrepo-com (2).svg" alt=""></img>`;
const dupImg =
  '<img src="./icons/arrow-next-small-svgrepo-com.svg" class="opacity0" alt="">';
const linkSingle = '<a href="./MultiPlayer.html" id="single">Single Player</a>';
const linkMulti = '<a href="./MultiPlayer.html" id="multi">Multi Player</a>';

const option1S = document.getElementById("optionSingle"); //li1
const option2S = document.getElementById("optionMulti"); //li2
option1S.innerHTML = `${img}${linkSingle}`;
option2S.innerHTML = `${dupImg}${linkMulti}`;
const singleTextElementA = document.getElementById("single"); //a1
const multiTextElementA = document.getElementById("multi"); //a2
option1S.style.fontSize = "3.5em";
option1S.firstElementChild.nextElementSibling.style.color = "rgb(88, 51, 166)";
option2S.style.fontSize = "3em";
option2S.firstElementChild.nextElementSibling.style.color = "rgb(206, 206, 206)";
console.log(singleTextElementA, multiTextElementA);

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowDown" && option1S.innerHTML.includes("(2).svg")) {
    option2S.style.fontSize = "3.5em";
    option1S.innerHTML = `${dupImg}${linkSingle}`;
    option2S.innerHTML = `${img}${linkMulti}`;
    option2S.firstElementChild.nextElementSibling.style.color = "rgb(88, 51, 166)";
    option1S.firstElementChild.nextElementSibling.style.color = "rgb(206, 206, 206)"
    option1S.style.fontSize = "3em";
  }
  if (e.key == "ArrowUp" && option2S.innerHTML.includes("(2).svg")) {
    option1S.innerHTML = `${img}${linkSingle}`;
    option2S.innerHTML = `${dupImg}${linkMulti}`;
    option1S.style.fontSize = "3.5em";
    option1S.firstElementChild.nextElementSibling.style.color = "rgb(88, 51, 166)"
    option2S.style.fontSize = "3em";
    option2S.firstElementChild.nextElementSibling.style.color = "rgb(206, 206, 206)";
  }

  if (e.key == "Enter" && options.firstElementChild.innerHTML.includes("(2)")) {
    location.href = "./SinglePlayer.html";
  }
  if (
    e.key == "Enter" &&
    options.firstElementChild.nextElementSibling.innerHTML.includes("(2)")
  ) {
    location.href = "./MultiPlayer.html";
  }
});

init();
animate();
