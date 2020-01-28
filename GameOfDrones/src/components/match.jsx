import React, { Component } from "react";
import Round from "./round";
import Player from "./player";
import Scoreboard from "./scoreboard";
import EndGame from "./endgame";
import { moves } from "../data/movements";

const API = "http://localhost:9000";
class Match extends Component {
  state = {
    endGame: false,
    gameWinner: {},
    round: { number: 0, winner: {} },
    turn: 1,
    players: [
      {
        id: 1,
        name: "",
        wins: 0,
        selectedMove: { name: "", beats: "" },
        gamesWon: 0
      },
      {
        id: 2,
        name: "",
        wins: 0,
        selectedMove: { name: "", beats: "" },
        gamesWon: 0
      }
    ],
    roundsPlayed: [],
    moves: moves
  };
  render() {
    //Match at Load
    const round = this.state.round.number;
    if (this.state.endGame) {
      return (
        <EndGame winner={this.state.gameWinner} onClick={this.playAgain} />
      );
    } else if (this.state.round.number === 0) {
      return (
        <div>
          <h1>Enter Player's Names</h1>
          <form onSubmit={this.startMatch}>
            {this.state.players.map(player => (
              <Player
                key={player.id}
                round={round}
                player={player}
                onChange={this.updatePlayersName}
              />
            ))}
            <button type="submit">Start Match</button>
          </form>
        </div>
      );
    } else if (this.state.round.number > 0) {
      const turn = this.state.turn;

      const players = this.state.players;
      console.log(turn);
      console.log(players);
      let player = players.find(playerObj => playerObj.id === turn);
      return (
        <div>
          <Round
            round={round}
            turn={turn}
            moves={this.state.moves}
            player={player}
            //player2={this.state.player2}
            onClick={this.endTurn}
          />
          {this.state.roundsPlayed.length > 0 && (
            <Scoreboard
              key="scoreboard"
              roundsPlayed={this.state.roundsPlayed}
            />
          )}
        </div>
      );
    }
  }
  // Gets the Player names from the inputs
  updatePlayersName = e => {
    const turn = this.state.turn;
    const input = e.target;
    const players = this.state.players;

    players.forEach(playerObj => {
      if (playerObj.id === parseInt(e.target.id)) {
        playerObj.name = input.value;
      }
    });

    this.setState({ players: players });
  };
  updatePlayers = player => {
    fetch(API + `/getPlayers?name=${player.name}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: player.name, gamesWon: player.gamesWon })
    });
  };
  savePlayers = player => {
    fetch(API + "/getPlayers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: player.name, gamesWon: player.gamesWon })
    });
  };
  checkSavedPlayers = () => {
    const players = this.state.players;

    players.forEach(player => {
      fetch(API + `/getPlayers?name=${player.name}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => console.log(res))
        .then(data => {
          if (data) {
            player.gamesWon = data.gamesWon;
          } else {
            this.savePlayers(player);
          }
        });
    });
  };

  startMatch = () => {
    console.log(this.state);
    this.checkSavedPlayers();
    const round = this.state.round;
    round.number = 1;
    this.setState({ round: round });
  };

  endTurn = e => {
    const button = e.target;
    console.log(button);
    let turn = this.state.turn;
    let round = this.state.round;
    if (turn === 1) {
      turn++;
    } else {
      turn--;
      round.number++;
      this.checkRoundWinner();
      console.log(this.state);
    }
    console.log("ROUNDS PLAYED", this.state.roundsPlayed);
    this.setState({
      turn: turn,
      round: round
    });
  };

  checkRoundWinner = () => {
    const players = this.state.players;
    let player1 = players[0];
    let player2 = players[1];
    let round = this.state.round;
    let roundsPlayed = this.state.roundsPlayed;

    if (player1.selectedMove.beats === player2.selectedMove.name) {
      player1.wins++;
      if (player1.wins === 3) {
        player1.gamesWon++;
        return this.endGame(player1);
      }
      round.winner = player1;
    } else if (player2.selectedMove.beats === player1.selectedMove.name) {
      player2.wins++;
      if (player2.wins === 3) {
        player2.gamesWon++;
        return this.endGame(player2);
      }
      round.winner = player2;
    } else {
      round.winner = { name: " NO Winner in this Round" };
    }
    player1.selectedMove = { name: "", beats: "" };
    player2.selectedMove = { name: "", beats: "" };
    roundsPlayed.push({ number: round.number, winner: round.winner.name });
    players[0] = player1;
    players[1] = player2;

    this.setState({
      players: players,
      round: round,
      roundPlayed: roundsPlayed
    });
  };

  endGame = player => {
    const gameWinner = this.state.gameWinner;
    let turn = this.state.turn;
    let round = this.state.round;
    this.updatePlayers(player);
    turn = 0;
    round.number = 0;
    round.winner = "";
    this.setState({
      endGame: true,
      gameWinner: player,
      turn: turn,
      round: round
    });
  };

  playAgain = () => {
    console.log("PLAY AGAIN", this.state);
    this.setState({ endGame: false });
  };
}

export default Match;
