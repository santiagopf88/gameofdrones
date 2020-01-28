import React, { Component } from "react";

class Scoreboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3>Score</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Winner</th>
            </tr>
          </thead>
          <tbody>
            {this.props.roundsPlayed.map(round => (
              <tr key={round.number}>
                <th scope=" row">{round.number}</th>
                <td>{round.winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Scoreboard;
