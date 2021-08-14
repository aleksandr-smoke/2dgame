export class LevelMap {
  constructor(mapData) {
    this.parseMapData(mapData);
    
    this.wallThickness = 5;
    this.cellWidth = 20;
    this.debug = true;
  }

  parseMapData(mapData) {
    this.map = mapData.map((mapLine, y) => {
      return mapLine.map((cell, x) => {
        const cellObj = { x, y, type: cell };
        if (!this.startWallCell && cellObj.type === CellType.Wall) {
          this.startWallCell = cellObj;
        }
        return cellObj;
      });
    });
  }

  getMap() {
    return this.map;
  }

  getCell(x, y) {
    return this.map[y][x];
  }

  updateCell(x, y, value) {
    this.map[y][x] = { ...value };
  }

  patchCell(x, y, value) {
    this.map[y][x] = { ...this.map[y][x], ...value };
  }

  getLeftCell(cell) {
    return this.map[cell.y][cell.x-1];
  }

  getRightCell(cell) {
    return this.map[cell.y][cell.x+1];
  }

  getUpCell(cell) {
    return this.map[cell.y-1][cell.x];
  }

  getDownCell(cell) {
    return this.map[cell.y+1][cell.x];
  }

  getCellByDirection(cell, direction) {
    if (direction === Direction.Up) return this.map[cell.y-1][cell.x];
    if (direction === Direction.Down) return this.map[cell.y+1][cell.x];
    if (direction === Direction.Left) return this.map[cell.y][cell.x-1];
    if (direction === Direction.Right) return this.map[cell.y][cell.x+1];
  }

  getRelativeLeftCell(cell, direction) {
    if (direction === Direction.Up) return this.map[cell.y][cell.x-1];
    if (direction === Direction.Down) return this.map[cell.y][cell.x+1];
    if (direction === Direction.Left) return this.map[cell.y+1][cell.x];
    if (direction === Direction.Right) return this.map[cell.y-1][cell.x];
  }

  getRelativeRightCell(cell, direction) {
    if (direction === Direction.Up) return this.map[cell.y][cell.x+1];
    if (direction === Direction.Down) return this.map[cell.y][cell.x-1];
    if (direction === Direction.Left) return this.map[cell.y-1][cell.x];
    if (direction === Direction.Right) return this.map[cell.y+1][cell.x];
  }

  getRelativeFrontCell(cell, direction) {
    if (direction === Direction.Up) return this.map[cell.y-1][cell.x];
    if (direction === Direction.Down) return this.map[cell.y+1][cell.x];
    if (direction === Direction.Left) return this.map[cell.y][cell.x-1];
    if (direction === Direction.Right) return this.map[cell.y][cell.x+1];
  }

  getRelativeBackCell(cell, direction) {
    if (direction === Direction.Up) return this.map[cell.y+1][cell.x];
    if (direction === Direction.Down) return this.map[cell.y-1][cell.x];
    if (direction === Direction.Left) return this.map[cell.y][cell.x+1];
    if (direction === Direction.Right) return this.map[cell.y][cell.x-1];
  }


  draw(ctx) {
    // this.map.forEach((mapLine, y) => {
    //   mapLine.forEach((item, x) => {
    //     if (item.type === CellType.Wall) {
    //       ctx.fillStyle = 'purple';
    //       ctx.fillRect(x * 20, y * 20, 20, 20);
    //     }
    //   });
    // });

    this.drawWall(ctx);
  }

  drawWall(ctx) {
    let direction = Direction.Right;
    let cell = this.startWallCell;
    const passedWalls = [];
  
    ctx.fillStyle = 'aquamarine';
    do {
      const nextDirections = [];
      let arr = [...new Array(3).keys()].map(item => (item + direction + 3) % 4);
      if (cell !== this.startWallCell) {
        arr = arr.reverse();
      }
      arr.forEach(direction => {
        if (this.getCellByDirection(cell, direction).type === CellType.Wall) {
          nextDirections.push(direction);
        }
      });
      if (nextDirections.length) {
        direction = nextDirections[0];
        ctx.save();
        ctx.translate(cell.x * this.cellWidth + this.cellWidth / 2, cell.y * this.cellWidth + this.cellWidth / 2);
        ctx.rotate(Math.PI / 2 * direction);
        const cellCorner = { x: 0 - this.cellWidth / 2, y: 0 - this.cellWidth / 2 };
        if (this.getRelativeRightCell(cell, direction).type === CellType.Wall) {
          ctx.fillRect(cellCorner.x + this.cellWidth - this.wallThickness, cellCorner.y, this.wallThickness, this.wallThickness);
        } else if (this.getRelativeBackCell(cell, direction).type === CellType.Wall) {
          ctx.fillRect(cellCorner.x + this.cellWidth - this.wallThickness, cellCorner.y, this.wallThickness, this.cellWidth);
        } else if (this.getRelativeLeftCell(cell, direction).type === CellType.Wall) {
          ctx.fillRect(cellCorner.x + this.cellWidth - this.wallThickness, cellCorner.y, this.wallThickness, this.cellWidth);
          ctx.fillRect(cellCorner.x, cellCorner.y + this.cellWidth - this.wallThickness, this.cellWidth, this.wallThickness);
        }
        ctx.restore();
      } else {
        direction = Direction.getOpposite(direction);
        ctx.save();
        ctx.translate(cell.x * this.cellWidth + this.cellWidth / 2, cell.y * this.cellWidth + this.cellWidth / 2);
        ctx.rotate(Math.PI / 2 * direction);
        const cellCorner = { x: 0 - this.cellWidth / 2, y: 0 - this.cellWidth / 2 };
        ctx.fillRect(cellCorner.x + this.cellWidth - this.wallThickness, cellCorner.y, this.wallThickness, this.cellWidth);
        ctx.fillRect(cellCorner.x, cellCorner.y, this.wallThickness, this.cellWidth);
        ctx.fillRect(cellCorner.x, cellCorner.y + this.cellWidth - this.wallThickness, this.cellWidth, this.wallThickness);
        ctx.restore();
      }
      
      passedWalls.push(cell);
      cell = this.getCellByDirection(cell, direction);
    } while(cell !== this.startWallCell)
    this.debug = false;
  }

  debugLog(...messages) {
    if (this.debug) {
      console.log(...messages);
    }
  }
}

export const CellType = {
  Outer: 0,
  Inner: 1,
  Wall: 2,
  Player: 3,
  Chip: 4,
  Star: 5,
  DeadWall: 6,
  SpikeWall: 7,
  Trampoline: 8,
  Portal: 9,
};

export const Direction = {
  Up: 0,
  Right: 1,
  Down: 2,
  Left: 3,
  getOpposite(direction) {
    return (direction + 2) % 4;
  }
};
