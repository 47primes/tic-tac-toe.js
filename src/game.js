import React from 'react';
import GameBoard from './gameBoard';
import Helper from './lib/helper';

const Game = class extends React.Component {
  static defaultState = {
    history: [{
      squares: [
        Array(3).fill(null),
        Array(3).fill(null),
        Array(3).fill(null),
      ],
    }],
    currentShape: 'X',
    stepNumber: 0,
  };

  static winningMoves = [
    [
      {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}
    ],
    [
      {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}
    ],
    [
      {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}
    ],
    [
      {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}
    ],
    [
      {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}
    ],
    [
      {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}
    ],
    [
      {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}
    ],
    [
      {x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}
    ],
  ];

  constructor(props) {
    super(props);
    this.state = Helper.clone({...Game.defaultState, userMove: Helper.randomFlag()});
  }

  componentDidMount() {
    if (!this.state.userMove) this.computerMove();
  }

  move(x,y) {
    if (this.state.winner || this.state.catsGame) return;

    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = Helper.clone(current.squares);

    if (squares[x][y]) return;

    squares[x][y] = this.state.currentShape;
    this.setState({
      history: history.concat([{
        squares: squares,
        move: {player: (this.state.userMove ? 'You' : 'Computer'), shape: this.state.currentShape, loc: [x,y]},
      }]),
      currentShape: this.nextShape(this.state.currentShape),
      stepNumber: history.length,
      userMove: !this.state.userMove,
    }, () => this.calculateWinner());
  }

  computerMove() {
    if (this.state.userMove || this.state.winner || this.state.catsGame) return;

    const history = this.state.history;
    const current = history[history.length - 1];
    const availableMoves = Array(0);

    for (let x = 0; x < current.squares.length; x++) {
      for (let y = 0; y < current.squares[x].length; y++) {
        if (current.squares[x][y] === null) {
          availableMoves.push([x, y]);
        }
      }
    }

    const loc = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (loc) setTimeout(() => this.move(loc[0], loc[1]), 1000);
  }

  nextShape(currentShape) {
    return (currentShape === 'X' ? 'O' : 'X');
  }

  calculateWinner() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = Helper.clone(current.squares);

    let winner = null;

    for (let i=0; i < Game.winningMoves.length; i++) {
      const [a, b, c] = Game.winningMoves[i];
      if (squares[a.x][a.y] && squares[a.x][a.y] === squares[b.x][b.y] && squares[a.x][a.y] === squares[c.x][c.y]) {
        winner = squares[a.x][a.y];
        break;
      }
    }

    this.setState({winner: winner}, () => {
      if (!winner) this.calculateCatsGame();
    });
  }

  calculateCatsGame() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = Helper.clone(current.squares);
    const flattenedSquares = [].concat(...squares);

    this.setState({catsGame: !this.state.winner && !flattenedSquares.includes(null)}, () => {
      this.computerMove();
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      currentShape: (step % 2 === 0 ? 'X' : 'O'),
    });
  }

  reset() {
    this.setState(
      Helper.clone({...Game.defaultState, userMove: Helper.randomFlag(),
        winner: null,
        catsGame: false
      }),
      () => this.computerMove()
    );
  }

  toggleUserPlay() {
    this.setState({userMove: !this.state.userMove});
  }

  render() {
    return (
      <GameBoard
        history={this.state.history}
        stepNumber={this.state.stepNumber}
        winner={this.state.winner}
        catsGame={this.state.catsGame}
        userMove={this.state.userMove}
        currentShape={this.state.currentShape}
        reset={() => this.reset()}
        jumpTo={(i) => this.jumpTo(i)}
        move={(x,y) => this.move(x,y)}
      />
    );
  }
}

export default Game;
