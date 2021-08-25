import { mapData } from "../data/data.js";
import { LevelMap } from "./LevelMap.js";
import { Player } from "./Player.js";
import { ScreenAbstract, ScreenStatus } from "./ScreenAbstract.js";

export class ScreenLevel extends ScreenAbstract {
  constructor(canvas, show) {
    super(canvas, show);

    this.player = new Player();
    this.player.setPosition({ x: 7, y: 8 });
    this.map = new LevelMap(mapData, null);
    this.canvas.setDrawCollection([this.map, this.player]);

    rxjs.fromEvent(document, 'keydown').subscribe((event) => {
      if (this.status !== ScreenStatus.Showed) {
        return;
      }
      this.player.handleKeyDown(event, this.map);
    });
  }
}