import React from "react";
import Drawer from "./draw";
import Writer from "./write";
import Card from "common/card";
import { latestEntry } from "../model/paper";
import { StyleSheet, css } from "aphrodite";
import { colors } from "../styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    position: "absolute",
    backgroundColor: colors.blueLight,
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px"
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column"
  },
  main: {
    flexGrow: 1
  },
  cardContainer: {
    marginTop: "35px"
  }
});

function Board(props) {
  const { moves, _, G, ctx, playerID } = props;

  const handleSubmitWriting = writing => {
    moves.SubmitWriting(writing);
  };

  const handleSubmitDrawing = drawingUri => {
    moves.SubmitDrawing(drawingUri);
  };

  if (ctx.gameover) {
    return (
      <div className={css(styles.container)}>
        <h1>Game over!</h1>
      </div>
    );
  }

  if (!playerID) {
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.innerContainer)}>
          <div className={css(styles.cardContainer)}>
            <Card>
              <h1>Unknown Player</h1>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentPageIdx = G.playerIdsToPaperIdx[playerID];
  const currentPage = G.papers[currentPageIdx];
  const latestEnt = latestEntry(currentPage);

  let latestDrawingUri = null;
  let latestWriting = null;

  if (latestEnt && G.currentSubmissionMethod === "write") {
    latestDrawingUri = latestEnt.drawing;
  }

  if (latestEnt && G.currentSubmissionMethod === "draw") {
    latestWriting = latestEnt.writing;
  }

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.innerContainer)}>
        <div className={css(styles.cardContainer)}>
          <Card>
            <div className={css(styles.details)}>
              <p>
                The current turn is: {ctx.turn}, which means its time to:{" "}
                {G.currentSubmissionMethod}
              </p>
              <p>
                There are {ctx.numPlayers} players. You are player {playerID}
              </p>
            </div>
          </Card>
        </div>
        <div className={css(styles.cardContainer)}>
          <Card>
            <div className={css(styles.main)}>
              {G.currentSubmissionMethod === "write" &&
                ctx.activePlayers[playerID] && (
                  <Writer
                    onPhraseChosen={handleSubmitWriting}
                    previousDrawingUri={latestDrawingUri}
                  />
                )}
              {G.currentSubmissionMethod === "draw" &&
                ctx.activePlayers[playerID] && (
                  <Drawer
                    onImageSelected={handleSubmitDrawing}
                    previousPhrase={latestWriting}
                  />
                )}
              {!ctx.activePlayers[playerID] && (
                <p>Waiting for others to finish their move</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Board;
