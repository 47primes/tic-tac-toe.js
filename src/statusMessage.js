import React, { Component } from 'react'

const StatusMessage = class extends Component {
  render() {
    let status;
    if (this.props.winner) {
      if (this.props.userMove) {
        status = 'Computer Wins!';
      } else {
        status = 'You Win!';
      }
    } else if (this.props.catsGame) {
      status = 'Cat\'s Game!';
    } else {
      if (this.props.userMove) {
        status = 'Your Move: ';
      } else {
        status = 'Computer Move: ';
      }
      status += this.props.currentShape;
    }

    return(
      <h2 className="text-center">{status}</h2>
    );
  }
}

export default StatusMessage;
