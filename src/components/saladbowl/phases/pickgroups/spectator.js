import React from "react";

export function Spectator(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  return (
    <div>
      <p>Nothing for you to do, so sit back and relax!</p>
    </div>
  );
}

export default Spectator;
