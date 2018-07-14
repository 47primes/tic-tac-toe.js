import React from 'react';
import Square from './square';

const Board = class extends React.Component {
  renderSquare(x, y) {
    return <Square
      onClick={() => (this.props.userMove ? this.props.onClick(x, y) : null)}>
      {this.props.squares[x][y]}
    </Square>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
    );
  }
}

export default Board;
