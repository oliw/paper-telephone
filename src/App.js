import React from "react";
import { Game as TelephoneGame } from "model/telephone/game";
import { Board as TelephoneBoard } from "components/telephone/board";
import { Game as SaladbowlGame } from "model/saladbowl/game";
import { Board as SaladbowlBoard } from "components/saladbowl/board";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import LobbyRenderer from "components/lobby/LobbyRenderer";
import Header from "components/header";
import { colors } from "styles";
import { Lobby } from "boardgame.io/react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.blueLight,
  },
  header: {},
  main: {
    flexGrow: 1,
    overflow: "auto",
  },
  wrapper: {},
});

// const SaladbowlClient = Client({
//   game: SaladbowlGame,
//   board: SaladbowlBoard,
//   multiplayer: Local(),
//   numPlayers: 4,
// });

// const App = () => (
//   <div>
//     <div className={css(styles.wrapper)}>
//       <SaladbowlClient playerID="0" />
//     </div>
//     <div className={css(styles.wrapper)}>
//       <SaladbowlClient playerID="1" />
//     </div>
//     <div className={css(styles.wrapper)}>
//       <SaladbowlClient playerID="2" />
//     </div>
//     <div className={css(styles.wrapper)}>
//       <SaladbowlClient playerID="3" />
//     </div>
//   </div>
// );

const importedGames = [
  {
    game: TelephoneGame,
    board: TelephoneBoard,
  },
  {
    game: SaladbowlGame,
    board: SaladbowlBoard,
  },
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
