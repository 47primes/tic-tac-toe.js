import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Helper from './lib/helper'
import Board from './board';
import StatusMessage from './statusMessage';
import History from './history';

const GameBoard = class extends Component {
  render() {
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    const squares = Helper.clone(current.squares);

    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>Tic-Tac-Toe</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={() => this.props.reset()}>New Game</NavItem>
            </Nav>
            <Nav pullRight>
              <History
                showHistory={this.props.winner || this.props.catsGame}
                history={history}
                jumpTo={(i) => this.props.jumpTo(i)}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <StatusMessage
          winner={this.props.winner}
          catsGame={this.props.catsGame}
          userMove={this.props.userMove}
          currentShape={this.props.currentShape}
        />
        <div className="game">
          <div className="game-board center-block">
            <Board
              squares={squares}
              userMove={this.props.userMove}
              onClick={(x, y) => this.props.move(x, y)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
