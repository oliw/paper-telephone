import React from "react";

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
        <button onClick={handleClockClick}>Start the Clock</button>
      )}
      {inProgress && (
        <>
          <p>Seconds remaining: #{secondsRemaining}</p>
          <p>Describe: #{G.currentWord}</p>
          <button onClick={handleScore}>Score!</button>
        </>
      )}
      {timesUp && (
        <>
          <p>Times up!</p>
          <button onClick={endTurn}>End Turn</button>
        </>
      )}
    </div>
  );
}

export default Describe;
