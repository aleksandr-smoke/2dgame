import { Player } from './Player.js';
import { LevelMap } from './LevelMap.js';
import { mapData } from './../data/data.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    this.player = new Player();
    this.player.setPosition({ x: 7, y: 8 });

    this.map = new LevelMap(mapData, null);

    this.canvas.setDrawCollection([this.map, this.player]);

    rxjs.fromEvent(document, 'keydown').subscribe((event) => {
      this.player.handleKeyDown(event, this.map);
    });
  }
}
