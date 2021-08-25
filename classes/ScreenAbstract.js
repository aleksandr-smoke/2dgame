export class ScreenAbstract {
  constructor(canvas, show) {
    this.canvas = canvas;
    this.status = show || ScreenStatus.Hidden;
  }

  print() {}
}

export const ScreenStatus = {
  None: 0,
  Inited: 1,
  Showed: 2,
  Hidden: 3
};