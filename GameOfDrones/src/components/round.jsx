import React, { Component } from "react";

import Player from "./player";
import { moves } from "../data/movements";

class Round extends Component {
  //   state = {
  //     round: this.props.round,
  //     turn: this.props.turn,
  //     player: this.props.player,
  //     moves: moves
  //   };

  render() {
    return (
      <div>
        <h1>Round {this.props.round}</h1>
        <h3>{this.props.player.name}</h3>
        <Player
          player={this.props.player}
          moves={this.props.moves}
          onChange={this.updateMovement}
        />
        <button
          dataround={this.props.round}
          dataturn={this.props.turn}
          onClick={this.props.onClick}
        >
          Ok
        </button>
      </div>
    );
  }

  updateMovement = e => {
    let selectedMove = this.props.moves.find(move => {
      return e.target.value === move.name;
    });
    const player = this.props.player;
    player.selectedMove = selectedMove;
    this.setState({ player: player });
  };
  //   endTurn = e => {
  //     console.log(this.props);
  //   };
}

export default Round;
