import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: "3px",
  },
  headerLeft: {
    flex: 1,
    textAlign: "left",
  },
  headerMiddle: {
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    flex: 1,
    textAlign: "right",
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
        <button onClick={exitGame}>Leave and return to Lobby</button>
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
      <runningGame.app
        gameID={runningGame.gameID}
        playerID={runningGame.playerID}
        credentials={runningGame.credentials}
      />
    </div>
  );
}
