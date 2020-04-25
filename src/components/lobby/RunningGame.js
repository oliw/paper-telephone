import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";
import { zoomIn } from "react-animations";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.pinkVeryLight,
    width: "100%",
    padding: "3px",
    boxSizing: "border-box",
  },
  headerLeft: {
    flex: 1,
    textAlign: "left",
  },
  headerMiddle: {
    flex: 1,
    textAlign: "center",
    animationName: zoomIn,
    animationDuration: "1s",
  },
  headerRight: {
    flex: 1,
    textAlign: "right",
  },
  appContainer: {
    flexGrow: 1,
    position: "relative",
  },
});

function RunningGameHeader({ runningRoom, playerName, handleExitRoom }) {
  if (!runningRoom) {
    return <p>Please wait</p>;
  }
  const gameName =
    runningRoom.gameName === "paper-telephone"
      ? "Paper Telephone"
      : runningRoom.gameName;
  const exitGame = () => {
    handleExitRoom();
  };
  return (
    <div className={css(styles.headerContainer)}>
      <div className={css(styles.headerLeft)}>
        <button onClick={exitGame}>Back to Lobby</button>
      </div>
      <div className={css(styles.headerMiddle)}>Now playing: {gameName}</div>
      <div className={css(styles.headerRight)}>Playing as: {playerName}</div>
    </div>
  );
}

export default function RunningGame(props) {
  const { runningGame, rooms, playerName, handleExitRoom } = props;
  const runningRoom = rooms.find((room) => room.gameID === runningGame.gameID);
  return (
    <div className={css(styles.container)}>
      <RunningGameHeader
        runningGame={runningGame}
        runningRoom={runningRoom}
        playerName={playerName}
        handleExitRoom={handleExitRoom}
      />
      <div className={css(styles.appContainer)}>
        <runningGame.app
          gameID={runningGame.gameID}
          playerID={runningGame.playerID}
          credentials={runningGame.credentials}
        />
      </div>
    </div>
  );
}
