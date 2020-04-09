import React from "react";

export function Writethings(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  const numWords = G.wordsWrittenPerPlayer;
  const [words, setWords] = React.useState(Array(numWords).fill(null));

  const handleChange = (event, i) => {
    const value = event.target.value;
    const newWords = [...words];
    newWords[i] = value;
    setWords(newWords);
  };

  const inputs = words.map((word, i) => {
    return (
      <input key={i} onChange={e => handleChange(e, i)} value={word || ""} />
    );
  });

  const handleClick = () => {
    if (words.some(w => w == null || w.length === 0)) {
      return;
    }
    moves.AddWords(words);
  };

  const hasFinishedTurn = ctx.activePlayers[playerID] == null;

  if (hasFinishedTurn) {
    return <p>You're all done. Waiting for the others!</p>;
  }

  return (
    <div>
      <p>You are player {playerID}</p>
      <p>Decide on the video call what theme to have. e.g. The letter P</p>
      <p>Please choose {numWords} words</p>
      {inputs}
      <button onClick={handleClick}>Done</button>
    </div>
  );
}

export default Writethings;
