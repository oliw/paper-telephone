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
      gameServer={`https://games-server.oliverwilkie.com`}
      lobbyServer={`https://games-server.oliverwilkie.com`}
      gameComponents={importedGames}
    />
  </div>
);

export default App;
