import React from "react";
import Button from "common/button";

export function Describe(props) {
  const { moves, events, G, ctx, playerID, gameMetadata } = props;

  const handleClockClick = () => {
    moves.StartTheClock(new Date().getTime());
  };

  const [secondsRemaining, setSecondsRemaining] = React.useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (G.countdownStartedAt) {
        const countdownEndsAt =
          G.countdownStartedAt + G.countdownSeconds * 1000;
        const currentTime = new Date().getTime();
        if (currentTime >= countdownEndsAt) {
          setSecondsRemaining(0);
        } else {
          const millisRemaining = countdownEndsAt - currentTime;
          setSecondsRemaining(Math.floor(millisRemaining / 1000));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [G.countdownStartedAt, G.countdownSeconds]);

  const handleScore = () => {
    moves.ScoreWord();
  };

  const endTurn = () => {
    events.endTurn();
  };

  const timesUp = secondsRemaining === 0;
  const readyToStart = !G.countdownStartedAt;
  const inProgress = G.countdownStartedAt && !timesUp;

  let rules = "";
  if (ctx.phase === "DescribeThings") {
    rules =
      "Its your turn to describe words to the rest of your group! There's no skipping, and make sure you don't say the word itself!";
  } else if (ctx.phase === "DescribeThingsOneWord") {
    rules =
      "Its your turn! This time you can only say one word to describe it, choose wisely!";
  } else if (ctx.phase === "ActItOut") {
    rules =
      "Act out the word on the paper. Noises are allowed. You get a bit longer on the clock, make sure your team is watching you on the video!";
  }

  return (
    <div>
      <p>{rules}</p>
      {readyToStart && (
        <Button onClick={handleClockClick}>Start the Clock</Button>
      )}
      {inProgress && (
        <>
          <p>Describe: #{G.currentWord}</p>
          <Button onClick={handleScore}>Score!</Button>
        </>
      )}
      {timesUp && (
        <>
          <p>Times up!</p>
          <Button onClick={endTurn}>End Turn</Button>
        </>
      )}
    </div>
  );
}

export default Describe;
