import React from "react";
import Game from "./game";
import Board from "./board";
import { Lobby, Client } from "boardgame.io/react";

const importedGames = [
  {
    game: Game,
    board: Board
  }
];

let App = null;
if (process.env.NODE_ENV === "development") {
  App = Client({
    game: Game,
    board: Board
  });
} else {
  App = () => (
    <div>
      <Lobby
        gameServer={`https://games-server.oliverwilkie.com`}
        lobbyServer={`https://games-server.oliverwilkie.com`}
        gameComponents={importedGames}
      />
    </div>
  );
}

export default App;
