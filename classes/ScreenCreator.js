import { CellType } from "./LevelMap.js";
import { ScreenAbstract, ScreenStatus } from "./ScreenAbstract.js";

export class ScreenCreator extends ScreenAbstract {
  constructor(canvas, show) {
    super(canvas, show);
    this.map = new Array(33).fill(0).map(_ => new Array(33).fill(0));

    this.canvas.setDrawCollection([this]);

    rxjs.fromEvent(this.canvas.getCanvasElement(), 'click').subscribe((event) => {
      if (this.status !== ScreenStatus.Showed) {
        return;
      }
      
      this.handleClick(event);
    });
  }

  handleClick(event) {
    const { offsetX, offsetY } = event;
    const x = Math.floor((offsetX - 20) / 20);
    const y = Math.floor((offsetY - 20) / 20);
    console.log(x, y);
    this.map[y][x] = this.map[y][x] === 0 ? 2 : 0;
  }

  draw(ctx) {
    ctx.strokeStyle = 'white';
    for(let i = 0; i < 34; i++) {
      ctx.beginPath();
      ctx.moveTo(20 + i * 20, 20);
      ctx.lineTo(20 + i * 20, 680);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(20, 20 + i * 20);
      ctx.lineTo(680, 20 + i * 20);
      ctx.stroke();
    }
    this.map.forEach((mapLine, y) => {
      mapLine.forEach((item, x) => {
        if (item === CellType.Wall) {
          ctx.fillStyle = 'purple';
          ctx.fillRect(20 + x * 20, 20 + y * 20, 20, 20);
        }
      });
    });
  }
}