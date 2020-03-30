import React from "react";
import Drawer from "./draw";
import Writer from "./write";

function Board(props) {
  const { moves, events, G, ctx, playerID } = props;

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
  const latestEntry = currentPage.latestEntry();

  let latestDrawingUri = null;
  let latestWriting = null;

  if (latestEntry && G.currentSubmissionMethod === "write") {
    latestDrawingUri = latestEntry.drawing;
  }

  if (latestEntry && G.currentSubmissionMethod === "draw") {
    latestWriting = latestEntry.writing;
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
