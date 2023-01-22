/** @type {HTMLCanvasElement} */
//this above line suggests built-in functions on typing context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
const explosionImage = new Image();
explosionImage.src = "Assets/boom.png";
let canvasPosition = canvas.getBoundingClientRect();

const animationLogic = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "#FF0000";
  context.save();
  context.rotate((20 * Math.PI) / 180);
  context.fillRect(50, 20, 100, 50);
  context.restore();
  context.fillRect(150, 120, 100, 50);
};
const animate = () => {
  animationLogic();
  requestAnimationFrame(animate);
};
animate();
