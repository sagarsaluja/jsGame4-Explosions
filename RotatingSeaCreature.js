/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
const explosionImage = new Image();
explosionImage.src = "Assets/boom.png";
let canvasPosition = canvas.getBoundingClientRect();
class Explosion {
  constructor(x, y) {
    this.image = new Image();
    this.image.src = "Assets/boom.png";
    this.frameWidth = this.image.width / 5;
    this.frameHeight = this.image.height;
    this.x = x - canvasPosition.left;
    this.y = y - canvasPosition.top;
    this.currentFrameX = 0;
    this.gameFrame = 0;
    this.explosionSpeed = 10;
    this.angle = Math.random() * Math.PI * 2;
  }
  update() {
    if (this.gameFrame % this.explosionSpeed === 0) {
      this.currentFrameX++;
    }
    this.gameFrame++;
  }
  draw() {
    context.save();
    context.translate(this.x, this.y); //rotation center point
    context.rotate(this.angle); //rotate the entire canvas contextj
    context.drawImage(
      this.image,
      this.currentFrameX * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      0 - this.frameWidth * 0.5,
      0 - this.frameHeight * 0.5, //changing these to origin as origin has been translated , then subtracting half of width and height to center the mouse
      this.frameWidth,
      this.frameHeight
    );
    context.restore();
  }
}
let explosionsArray = [];

window.addEventListener("mousemove", (e) => {
  let newExplosion = new Explosion(e.x, e.y);
  explosionsArray.push(newExplosion);
});

const animationLogic = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  explosionsArray = explosionsArray.filter((exp) => exp.currentFrameX < 5);
  explosionsArray.forEach((exp) => {
    exp.draw();
    exp.update();
  });
};
const animate = () => {
  animationLogic();
  requestAnimationFrame(animate);
};
animate();
