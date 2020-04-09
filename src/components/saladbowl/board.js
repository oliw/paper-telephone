import React from "react";
import Pickgroups from "./phases/pickgroups";
import BuildBowl from "./phases/buildbowl";

export function Board(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  let phase = null;
  if (ctx.phase === "PickGroups") {
    phase = <Pickgroups {...props} />;
  } else if (ctx.phase === "BuildBowl") {
    phase = <BuildBowl {...props} />;
  }

  return (
    <div>
      <p>Hi Player {playerID} Lets play salad bowl!</p>
      <p>We're now in the phase {ctx.phase}</p>
      {phase}
    </div>
  );
}

export default Board;
