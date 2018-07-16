import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import Board from './board'
import StatusMessage from './statusMessage'
import History from './history'

const UI = class extends Component {
  render() {
    return (
      <div>
        <Navbar>
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
                showHistory={this.props.isGameOver}
                moves={this.props.moves}
                step={this.props.step}
                currentPlayer={this.props.currentPlayer}
                jumpTo={(i) => this.props.jumpTo(i)}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <StatusMessage
          hasWinner={this.props.hasWinner}
          isCatsGame={this.props.isCatsGame}
          currentPlayer={this.props.currentPlayer}
        />
        <div className="game">
          <div className="game-board center-block">
            <Board
              moves={this.props.currentMoves}
              totalMoves={this.props.moves.length}
              winningMoves={this.props.winningMoves}
              isHumanMove={this.props.isHumanMove}
              step={this.props.step}
              onClick={(x, y) => this.props.move(x, y)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UI;
