import React from "react";
import Game from "./game";
import Board from "./board";
import { Lobby } from "boardgame.io/react";

const importedGames = [
  {
    game: Game,
    board: Board
  }
];

const App = () => (
  <div>
    <Lobby
      gameServer={`//games-server.oliverwilkie.com`}
      lobbyServer={`//paper-gamer.oliverwilkie.com`}
      gameComponents={importedGames}
    />
  </div>
);

export default App;
