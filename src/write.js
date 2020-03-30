import React from "react";

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
    <div>
      <p>Time to write!</p>
      {previousDrawingUri && <img src={previousDrawingUri} alt="Foo" />}
      <input type="text" value={writing} onChange={handleWritingChange} />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default Writer;
