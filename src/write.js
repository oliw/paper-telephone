import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

  return (
    <div className={css(styles.container)}>
      <p>Time to write!</p>
      {previousDrawingUri && <img src={previousDrawingUri} alt="Foo" />}
      <input
        type="text"
        placeholder="Enter a phrase here"
        value={writing}
        onChange={handleWritingChange}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Writer;
