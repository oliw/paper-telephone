import React from "react";

export function Guess(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  return (
    <div>
      <p>Its your turn to guess what {ctx.currentPlayer} is describing!</p>
    </div>
  );
}

export default Guess;
