import React from "react";

export function Spectator(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  return (
    <div>
      <p>I'm the pick groups phase - Spectator</p>
      <p>Sit back and relax!</p>
    </div>
  );
}

export default Spectator;
