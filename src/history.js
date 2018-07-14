import React, { Component } from 'react'
import { Popover, OverlayTrigger, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

const History = class extends Component {
  render() {
    const moves = this.props.history.map((board, step) => {
      let desc;

      if (board.move) {
        desc = step + '. ' + board.move.player + ' moved ' + board.move.shape + ' to (' +board.move.loc[0] + ', ' + board.move.loc[1] + ')';
      } else {
        desc = 'Beginning of Game';
      }

      return (
        <ListGroupItem
          key={step}
          onClick={() => (this.props.showHistory ? this.props.jumpTo(step) : null)}
        >
          {desc}
        </ListGroupItem>
      );
    });

    const popoverBottom = (
      <Popover id="popover-positioned-bottom">
        <ListGroup>
          {moves}
        </ListGroup>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
        <NavItem>
          History
        </NavItem>
      </OverlayTrigger>
    );
  }
}

export default History;
