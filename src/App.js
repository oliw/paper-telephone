import React from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import Game from "./game";
import Board from "./board";

const PaperTelephoneClient = Client({
  game: Game,
  board: Board,
  multiplayer: Local()
});

const App = () => (
  <div>
    <PaperTelephoneClient playerID="0" />
    <PaperTelephoneClient playerID="1" />
  </div>
);

export default App;
