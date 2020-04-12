import React from "react";
import Describe from "./play/describe";
import Guess from "./play/guess";

export function Play(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  const myGroup = G.groups.find((g) => g.players.includes(playerID));
  const isYourTurn = playerID === ctx.currentPlayer;
  const isYourTurnToGuess =
    !isYourTurn && myGroup.players.includes(ctx.currentPlayer);
  const isSpectator = !isYourTurn && !isYourTurnToGuess;

  return (
    <div>
      {isYourTurn && <Describe {...props} />}
      {isYourTurnToGuess && <Guess {...props} />}
      {isSpectator && <p>Relax! Is not your group's turn.</p>}
    </div>
  );
}

export default Play;
