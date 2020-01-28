import React, { Component } from "react";

class EndGame extends Component {
  //state = {  }
  render() {
    return (
      <div>
        <h1>We have a winner!!!!!</h1>
        <h2>{this.props.winner.name} is the new Emperor</h2>
        <button onClick={this.props.onClick}>Play Again</button>
      </div>
    );
  }
}

export default EndGame;
