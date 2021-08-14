export class Canvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 700;
    this.canvas.height = 700;

    // objects that implements draw method
    this.drawCollection = [];

    this.animate = this.animate.bind(this);

    this.lastFrameTimestamp = 0;
    this.frames = 0;
    this.animate();
    this.initFpsCalculator();
  }

  animate(timestamp = 0) {
    this.clear();
    this.draw();
    this.frames++;
    this.lastFrameTimestamp = timestamp;
    requestAnimationFrame(this.animate);
  }

  initFpsCalculator() {
    rxjs.interval(1000).subscribe(_ => {
      document.querySelector('#fps').innerHTML = `FPS: ${this.frames}`;
      this.frames = 0;
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.drawCollection.forEach(obj => obj.draw(this.ctx));
  }

  setDrawCollection(array) {
    this.drawCollection = [...array];
  }
}
