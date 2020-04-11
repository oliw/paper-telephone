import React from "react";
import TextInput from "common/textinput";
import { StyleSheet, css } from "aphrodite";
import { colors, sizes } from "styles";
import Button from "common/button";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export function Writethings(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  const numWords = G.wordsWrittenPerPlayer;
  const [words, setWords] = React.useState(Array(numWords).fill(null));

  const handleChange = (value, i) => {
    const newWords = [...words];
    newWords[i] = value;
    setWords(newWords);
  };

  const inputs = words.map((word, i) => {
    return (
      <TextInput
        key={i}
        value={word || ""}
        onChange={(word) => handleChange(word, i)}
      />
    );
  });

  const handleClick = () => {
    if (words.some((w) => w == null || w.length === 0)) {
      return;
    }
    moves.AddWords(words);
  };

  const hasFinishedTurn = ctx.activePlayers[playerID] == null;

  if (hasFinishedTurn) {
    return <p>You're all done. Waiting for the others!</p>;
  }

  return (
    <div className={css(styles.container)}>
      <p>Choose {numWords} words to go in the bowl</p>
      <p>
        Decide on the video call if there should be a theme to the words (e.g.
        same letter)
      </p>
      {inputs}
      <Button onClick={handleClick}>Add Words To Bowl</Button>
    </div>
  );
}

export default Writethings;
