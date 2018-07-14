const Helper = class {
  static clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  static randomFlag() {
    return (Math.floor(Math.random() * 10) % 2 === 0);
  }
}

export default Helper;
