const Move = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.winning = false;
    this.desc = '';
  }
}

export default Move;
