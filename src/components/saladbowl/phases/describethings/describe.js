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

  return (
    <div>
      <p>Its your turn to describe words to the rest of your group!</p>
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
