import React from "react";
import Game from "game";
import Board from "board";
import Header from "header";
import { Lobby, Client } from "boardgame.io/react";
import { StyleSheet, css } from "aphrodite";
import { colors } from "./styles";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  header: {},
  main: {
    flexGrow: 1,
    display: "relative"
  }
});

const importedGames = [
  {
    game: Game,
    board: Board
  }
];

let BoardGameIo = null;
if (process.env.NODE_ENV === "development") {
  BoardGameIo = Client({
    game: Game,
    board: Board
  });
} else {
  BoardGameIo = () => (
    <Lobby
      gameServer={`https://games-server.oliverwilkie.com`}
      lobbyServer={`https://games-server.oliverwilkie.com`}
      gameComponents={importedGames}
    />
  );
}

function App() {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <Header />
      </div>
      <div className={css(styles.main)}>
        <BoardGameIo />
      </div>
    </div>
  );
}

export default App;
