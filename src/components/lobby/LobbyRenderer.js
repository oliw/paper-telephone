import React from "react";
import RunningGame from "components/lobby/RunningGame";
import Lobby from "components/lobby/Lobby";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
});

export default function LobbyRenderer(props) {
  const { runningGame } = props;
  return (
    <div className={css(styles.container)}>
      {runningGame && <RunningGame {...props} />}
      {!runningGame && <Lobby {...props} />}
    </div>
  );
}
