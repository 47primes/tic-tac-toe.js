import React, { Component } from 'react'

const Board = class extends Component {
  renderSquare(x, y) {
    const move = this.props.moves.find((move) => {
      return move.x === x && move.y === y;
    });

    return <button
      key={x + '' + y}
      className={
        'square ' + (this.props.moves.length === this.props.totalMoves && move && move.highlight ? move.highlight + '-highlight' : '')
      }
      onClick={() => (this.props.isHumanMove ? this.props.onClick(x, y) : null)}>
      {(move ? move.value : null)}
    </button>;
  }

  renderBoard() {
    let board = [];
    for (let x=0; x<3; x++) {
      let children = [];
      for (let y=0; y<3; y++) {
        children.push(this.renderSquare(x, y));
      }
      board.push(<div key={x} className="board-row">{children}</div>);
    }
    return board;
  }

  render() {
    return (
      <div>{this.renderBoard()}</div>
    );
  }
}

export default Board;
