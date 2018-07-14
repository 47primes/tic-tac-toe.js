import React, { Component } from 'react'

const Square = class extends Component {
  render() {
    return (
      <button {...this.props} className="square">
        {this.props.children}
      </button>
    );
  }
}

export default Square;
