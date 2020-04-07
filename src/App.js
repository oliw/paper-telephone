import React from "react";
import { Game as TelephoneGame } from "model/telephone/game";
import { Board as TelephoneBoard } from "components/telephone/board";
import LobbyRenderer from "components/lobby/LobbyRenderer";
import Header from "components/header";
import { Lobby } from "boardgame.io/react";
import { StyleSheet, css } from "aphrodite";

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
    game: TelephoneGame,
    board: TelephoneBoard
  }
];

function App() {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <Header />
      </div>
      <div className={css(styles.main)}>
        <Lobby
          gameServer={`https://games-server.oliverwilkie.com`}
          lobbyServer={`https://games-server.oliverwilkie.com`}
          gameComponents={importedGames}
          renderer={LobbyRenderer}
        />
      </div>
    </div>
  );
}

export default App;
