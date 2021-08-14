import { CellType } from './LevelMap.js';

export class Player {
  constructor() {
    this.status = PlayerStatus.None;
    this.position = { x: 10, y: 10 };
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = { ...position };
  }

  setXPosition(x) {
    this.position.x = x;
  }

  setYPosition(y) {
    this.position.x = x;
  }

  moveLeft() {
    this.position.x--;
  }

  moveRight() {
    this.position.x++;
  }

  moveUp() {
    this.position.y--;
  }

  moveDown() {
    this.position.y++;
  }

  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.position.x * 20 + 5, this.position.y * 20 + 5, 10, 10);
  }

  handleKeyDown(event, map) {
    if (event.key === 'ArrowUp') {
      while(map.getUpCell(this.getPosition()).type === CellType.Inner) {
        this.moveUp();
      }
    }
    if (event.key === 'ArrowDown') {
      while(map.getDownCell(this.getPosition()).type === CellType.Inner) {
        this.moveDown();
      }
    }
    if (event.key === 'ArrowLeft') {
      while(map.getLeftCell(this.getPosition()).type === CellType.Inner) {
        this.moveLeft();
      }
    }
    if (event.key === 'ArrowRight') {
      while(map.getRightCell(this.getPosition()).type === CellType.Inner) {
        this.moveRight();
      }
    }
  }
}

export const PlayerStatus = {
  None: 0,
  Stands: 1,
  Moving: 2,
  Dead: 3,
  Finished: 4,
};
