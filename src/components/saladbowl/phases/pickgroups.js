import React from "react";
import Picker from "./pickgroups/picker";
import Spectator from "./pickgroups/spectator";

export function Pickgroups(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  const isPicker = playerID === ctx.currentPlayer;

  const view = isPicker ? <Picker {...props} /> : <Spectator {...props} />;

  return (
    <div>
      <p>I'm the pick groups phase</p>
      <p>You are player {playerID}</p>
      <p>Its player {ctx.currentPlayer}'s turn sort people into the groups</p>
      {view}
    </div>
  );
}

export default Pickgroups;
