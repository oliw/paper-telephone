import React from "react";
import Picker from "./pickgroups/picker";
import Spectator from "./pickgroups/spectator";

export function Pickgroups(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  const isPicker = playerID === ctx.currentPlayer;

  const view = isPicker ? <Picker {...props} /> : <Spectator {...props} />;

  return <div>{view}</div>;
}

export default Pickgroups;
