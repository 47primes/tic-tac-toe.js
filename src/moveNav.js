import React, { Component } from 'react'
import { MenuItem } from 'react-bootstrap';

const MoveNav = class extends Component {
  render() {
    let desc;

    if (this.props.move) {
      desc = this.props.move.player + ' to (' + this.props.move.loc[0] + ', ' + this.props.move.loc[1] + ')';
    } else {
      desc = 'Start';
    }

    return <MenuItem {...this.props}>{desc}</MenuItem>;
  }
}

export default MoveNav;
