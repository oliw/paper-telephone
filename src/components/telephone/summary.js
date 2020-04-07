import React from "react";
import Card from "common/card";
import { colors } from "styles";
import { nameFromId } from "helpers/players";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  text: {
    fontFamily: ["Fredoka One", "cursive"],
    color: colors.blueLight,
    padding: 0,
    margin: 0
  }
});

function WrittenEntry({ entry, first, gameMetadata }) {
  return (
    <div>
      {first && <p>First {nameFromId(entry.author, gameMetadata)} wrote</p>}
      {!first && (
        <p>
          Which {nameFromId(entry.author, gameMetadata)} guessed was a drawing
          of the phrase
        </p>
      )}
      <p>{entry.writing}</p>
    </div>
  );
}

function DrawnEntry({ entry, gameMetadata }) {
  return (
    <div>
      <p>Which {nameFromId(entry.author, gameMetadata)} then drew as</p>
      <img src={entry.drawing} width="640" height="480" alt="Foo" />
    </div>
  );
}

function PaperSummary({ paper, gameMetadata }) {
  const { entries } = paper;
  const summaries = entries.map((entry, idx) => {
    if (idx % 2 === 0) {
      return (
        <WrittenEntry
          key={idx}
          entry={entry}
          first={idx === 0}
          gameMetadata={gameMetadata}
        />
      );
    } else {
      return <DrawnEntry key={idx} entry={entry} gameMetadata={gameMetadata} />;
    }
  });
  return (
    <div>
      <p>
        Heres what {nameFromId(paper.player, gameMetadata)}'s paper looked like
      </p>
      {summaries}
    </div>
  );
}

export default function Summary({ game, gameMetadata }) {
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
        <p>
          You're currently looking at {nameFromId(paper.player, gameMetadata)}'s
          paper
        </p>
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleNextClick}>Next Thread</button>
      </Card>
      <Card>
        <PaperSummary paper={paper} gameMetadata={gameMetadata} />
      </Card>
    </div>
  );
}
