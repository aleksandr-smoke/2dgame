import { Player } from './Player.js';
import { LevelMap } from './LevelMap.js';
import { mapData } from './../data/data.js';
import { ScreenLevel } from './ScreenLevel.js';
import { ScreenCreator } from './ScreenCreator.js';
import { ScreenStatus } from './ScreenAbstract.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  init() {
    new ScreenLevel(this.canvas, ScreenStatus.Showed);
    // const screen = new ScreenCreator(this.canvas);
  }
}
