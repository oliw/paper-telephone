import React from "react";

function Board(props) {
  const { moves, events, G, ctx, playerID } = props;

  const [writing, setWriting] = React.useState("");

  const handleWritingChange = event => {
    setWriting(event.target.value);
  };

  const handleSubmitWriting = () => {
    moves.SubmitWriting(writing);
    setWriting("");
  };

  const [drawing, setDrawing] = React.useState("");

  const handleDrawingChange = event => {
    setDrawing(event.target.value);
  };

  const handleSubmitDrawing = () => {
    moves.SubmitDrawing(drawing);
    setDrawing("");
  };

  if (ctx.gameover) {
    return (
      <div>
        <h1>Game over!</h1>
      </div>
    );
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
        <>
          <p>Time to write!</p>
          <input type="text" value={writing} onChange={handleWritingChange} />
          <button onClick={handleSubmitWriting}>Submit</button>
        </>
      )}
      {G.currentSubmissionMethod === "draw" && ctx.activePlayers[playerID] && (
        <>
          <p>Time to draw!</p>
          <input type="text" value={drawing} onChange={handleDrawingChange} />
          <button onClick={handleSubmitDrawing}>Submit</button>
        </>
      )}
      {!ctx.activePlayers[playerID] && (
        <p>Waiting for others to finish their move</p>
      )}
    </div>
  );
}

export default Board;
