import React from "react";
import Drawer from "./draw";
import Writer from "./write";
import { latestEntry } from "./models/paper";

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
      <div>
        <h1>Game over!</h1>
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
    <div>
      <h1>Welcome to Telephone!</h1>
      <p>
        The current turn is: {ctx.turn}, which means its time to:{" "}
        {G.currentSubmissionMethod}
      </p>
      <p>
        There are {ctx.numPlayers} players. You are player {playerID}
      </p>
      {G.currentSubmissionMethod === "write" && ctx.activePlayers[playerID] && (
        <Writer
          onPhraseChosen={handleSubmitWriting}
          previousDrawingUri={latestDrawingUri}
        />
      )}
      {G.currentSubmissionMethod === "draw" && ctx.activePlayers[playerID] && (
        <Drawer
          onImageSelected={handleSubmitDrawing}
          previousPhrase={latestWriting}
        />
      )}
      {!ctx.activePlayers[playerID] && (
        <p>Waiting for others to finish their move</p>
      )}
    </div>
  );
}

export default Board;
