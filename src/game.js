import React from 'react'
import Move from './move'
import Player from './player'
import Board from './board'
import StatusMessage from './statusMessage'
import History from './history'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Game = class extends React.Component {
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

  static defaultMoves() {
    let moves = Array(0);
    for (let x=0; x < 3; x++) {
      for (let y=0; y < 3; y++) {
        moves.push(new Move(x,y));
      }
    }
    return moves.slice();
  }

  static defaultPlayers() {
    let shapes = ['X', 'O'];
    if (Math.floor(Math.random() * 1000) % 2 === 0) shapes.reverse();

    let players = [new Player('You', shapes[0]), new Player('Computer', shapes[1], false)];
    if (Math.floor(Math.random() * 1000) % 2 === 0) players.reverse();

    return players.slice();
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      moves: Game.defaultMoves(),
      players: Game.defaultPlayers(),
    };
  }

  componentDidMount() {
    if (this.isComputerMove()) this.computerMove();
  }

  currentPlayer() {
    return this.state.players[0];
  }

  isHumanMove() {
    return this.currentPlayer().isHuman;
  }

  isComputerMove() {
    return this.currentPlayer().isComputer();
  }

  isGameOver() {
    return this.state.hasWinner || this.state.isCatsGame;
  }

  move(x,y) {
    if (this.isGameOver()) return;

    const moves = this.state.moves.slice();
    const move = moves.find((move) => {
      return move.x === x && move.y === y;
    });

    if (!move) throw Error('Invalid position');
    if (move.value) return;

    let moveIndex = moves.findIndex((move) => {
      return move.x === x && move.y === y;
    });

    let moveOrder = moves.filter((move) => {
      return move.value;
    }).length;

    move.makeMove(this.currentPlayer(), moveOrder + 1);
    moves[moveIndex] = move;

    let winningMoves = this.calculateWinningMoves(moves);
    let isCatsGame = this.isCatsGame(moves);

    let newState = {
      step: this.state.step + 1,
      moves: moves,
      lastMove: move,
      hasWinner: !!winningMoves,
      isCatsGame: isCatsGame,
    }

    if (!winningMoves && !isCatsGame) {
      newState.players = this.state.players.reverse();
    }

    this.setState(newState, () => this.computerMove());
  }

  computerMove() {
    if (this.isHumanMove() || this.isGameOver()) return;

    const availableMoves = this.state.moves.filter((move) => !move.value);

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (move) setTimeout(() => this.move(move.x, move.y), 1000);
  }

  calculateWinningMoves(moves) {
    for (let i=0; i < Game.winningMoves.length; i++) {
      const [a, b, c] = Game.winningMoves[i];
      const moveA = moves.find((move) => move.x === a.x && move.y === a.y);
      const moveB = moves.find((move) => move.x === b.x && move.y === b.y);
      const moveC = moves.find((move) => move.x === c.x && move.y === c.y);

      if (moveA.value && moveA.value === moveB.value && moveA.value === moveC.value) {
        return moveA.highlight = moveB.highlight = moveC.highlight = (this.isComputerMove() ? 'computer' : 'human');
      };
    }
    return false;
  }

  isCatsGame(moves) {
    for (let i=0; i<moves.length; i++) {
      let move = moves[i];
      if (!move.value) return false;
    }
    return true;
  }

  jumpTo(step) {
    this.setState({step: step});
  }

  reset() {
    this.setState({
        step: 0,
        moves: Game.defaultMoves(),
        players: Game.defaultPlayers(),
        hasWinner: false,
        isCatsGame: false,
      },
      () => this.computerMove()
    );
  }

  render() {
    const moves = this.state.moves.filter((move) => {
      return move.order >= 0;
    }).sort((a, b) => {
      return a.order - b.order;
    });

    return (
      <div>
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>Tic-Tac-Toe</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={() => this.reset()}>New Game</NavItem>
            </Nav>
            <Nav pullRight>
              <History
                showHistory={this.isGameOver()}
                moves={moves}
                step={this.state.step}
                currentPlayer={this.currentPlayer()}
                jumpTo={(i) => this.jumpTo(i)}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <StatusMessage
          hasWinner={this.state.hasWinner}
          isCatsGame={this.state.isCatsGame}
          currentPlayer={this.currentPlayer()}
        />
        <Board
          moves={moves.slice(0, this.state.step)}
          totalMoves={moves.length}
          isHumanMove={this.isHumanMove()}
          step={this.state.step}
          onClick={(x, y) => this.move(x, y)}
        />
        <footer className="footer container-fluid">
          <div class="row">
            <div class="col-lg-6">Created by Mike Bradford</div>
            <div class="col-lg-6 text-right"><a href="https://github.com/47primes/tic-tac-toe.js">View Source Code on Github</a></div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Game;
