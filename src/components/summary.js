import React from "react";
import Card from "common/card";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  text: {
    fontFamily: ["Fredoka One", "cursive"],
    color: colors.blueLight,
    padding: 0,
    margin: 0
  }
});

function WrittenEntry({ entry, first }) {
  return (
    <div>
      <p>
        {first ? "First" : "Then"} {entry.author} wrote
      </p>
      <p>{entry.writing}</p>
    </div>
  );
}

function DrawnEntry({ entry, first }) {
  return (
    <div>
      <p>Then {entry.author} drew</p>
      <img src={entry.drawing} width="640" height="480" alt="Foo" />
    </div>
  );
}

function PaperSummary({ paper }) {
  const { entries } = paper;
  const summaries = entries.map((entry, idx) => {
    if (idx % 2 === 0) {
      return <WrittenEntry key={idx} entry={entry} first={idx == 0} />;
    } else {
      return <DrawnEntry key={idx} entry={entry} first={idx == 0} />;
    }
  });
  return (
    <div>
      <p>Heres what paper looked like</p>
      {summaries}
    </div>
  );
}

export default function Summary({ game }) {
  const [currentPaperIdx, setCurrentPaperIdx] = React.useState(0);
  const paper = game.papers[currentPaperIdx];
  const handleNextClick = () => {
    setCurrentPaperIdx((currentPaperIdx + 1) % game.papers.length);
  };
  const handleBackClick = () => {
    setCurrentPaperIdx(
      (game.papers.length + currentPaperIdx - 1) % game.papers.length
    );
  };
  return (
    <div>
      <Card>
        <p>Its the end of the game!</p>
        <p>Lets take a look at what everybody wrote and drew</p>
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleNextClick}>Next Thread</button>
      </Card>
      <Card>
        <PaperSummary paper={paper} />
      </Card>
    </div>
  );
}
