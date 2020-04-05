import React from "react";
import { sizes } from "styles";
import Button from "common/button";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    // height: "200px",
    fontSize: sizes.textLarge,
    marginBottom: "10px"
  }
});

function Writer(props) {
  const { onPhraseChosen, previousDrawingUri } = props;

  const [writing, setWriting] = React.useState("");

  const handleWritingChange = event => {
    setWriting(event.target.value);
  };

  const handleClick = () => {
    onPhraseChosen(writing);
  };

  const firstTime = previousDrawingUri == null;

  const firstTimeTitle = "Lets Begin!";
  const guessDrawingTitle = "Guess that phrase!";
  const title = firstTime ? firstTimeTitle : guessDrawingTitle;

  const firstTimePrompt =
    "Enter a phrase that the next person will have to draw out.";
  const guessDrawingPrompt =
    "Take a look at the picture that the person before you drew. What do you think the word or phrase is?";
  const prompt = firstTime ? firstTimePrompt : guessDrawingPrompt;

  return (
    <div className={css(styles.container)}>
      <p>{title}</p>
      {previousDrawingUri && (
        <img src={previousDrawingUri} width="640" height="480" alt="Foo" />
      )}
      <p>{prompt}</p>
      <input
        className={css(styles.input)}
        type="text"
        placeholder="Enter a phrase here"
        value={writing}
        onChange={handleWritingChange}
      />
      <Button type="primary" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export default Writer;
