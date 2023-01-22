/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
const explosionImage = new Image();
explosionImage.src = "Assets/boom.png";
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);
class Explosion {
  constructor(x, y) {
    this.image = new Image();
    this.image.src = "Assets/boom.png";
    this.frameWidth = this.image.width / 5;
    this.frameHeight = this.image.height;
    this.x = x - canvasPosition.left - this.frameWidth / 2;
    this.y = y - canvasPosition.top - this.frameHeight / 2;
    this.currentFrameX = 0;
    this.gameFrame = 0;
    this.explosionSpeed = 10;
  }
  update() {
    if (this.gameFrame % this.explosionSpeed === 0) {
      this.currentFrameX++;
    }
    this.gameFrame++;
  }
  draw() {
    context.drawImage(
      this.image,
      this.currentFrameX * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.frameHeight
    );
  }
}
let explosionsArray = [];
window.addEventListener("click", (e) => {
  let newExplosion = new Explosion(e.x, e.y);
  explosionsArray.push(newExplosion);
  console.log(e, explosionsArray);
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
