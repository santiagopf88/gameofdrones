import React, { Component } from "react";

class Player extends Component {
  //   state = {
  //     player: this.props.player,

  //     moves: this.props.moves,

  //     currentRound: this.props.round,
  //     selectedMove: this.props.player.selectedMove //{ name: "", beats: "" }
  //   };

  render() {
    const player = this.props.player;
    if (this.props.round === 0) {
      return (
        <div>
          <span>Player {player.id}:</span>
          <input
            id={player.id}
            className="form-control"
            type="text"
            placeholder="Enter player name..."
            onChange={this.props.onChange}
          ></input>
        </div>
      );
    } else {
      return (
        <div>
          <span>Select Move: </span>
          <select
            value={player.selectedMove.name}
            onChange={this.props.onChange}
          >
            <option>Select a move...</option>
            {this.props.moves.map(move => (
              <option key={move.name} value={move.name}>
                {move.name}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }

  updateInputValue = e => {
    let selectedMove = this.props.moves.find(move => {
      return e.target.value === move.name;
    });
    this.setState({ selectedMove: selectedMove });
    this.props.onChange(e, this.props.player);
  };
}

export default Player;
