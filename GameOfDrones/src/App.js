//import React from "react";
import React, { Component } from "react";

import "./App.css";
import Match from "./components/match";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <main className="container">
        <Match />
      </main>
    );
  }
}

export default App;
