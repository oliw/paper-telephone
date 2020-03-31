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
      gameServer={`http://localhost:8000`}
      lobbyServer={`http://localhost:8000`}
      gameComponents={importedGames}
    />
  </div>
);

export default App;
