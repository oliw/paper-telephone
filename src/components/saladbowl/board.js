import React from "react";
import Pickgroups from "./phases/pickgroups";
import BuildBowl from "./phases/buildbowl";
import DescribeThings from "./phases/describethings";

export function Board(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  let phase = null;
  if (ctx.phase === "PickGroups") {
    phase = <Pickgroups {...props} />;
  } else if (ctx.phase === "BuildBowl") {
    phase = <BuildBowl {...props} />;
  } else if (ctx.phase === "DescribeThings") {
    phase = <DescribeThings {...props} />;
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
