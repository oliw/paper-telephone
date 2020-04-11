import React from "react";
import Pickgroups from "./phases/pickgroups";
import BuildBowl from "./phases/buildbowl";
import DescribeThings from "./phases/describethings";
import Status from "./status";
import Game from "common/game";
import Card from "common/card";

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
    <Game>
      <Card>
        <Status {...props} />
      </Card>
      <Card>{phase}</Card>
    </Game>
  );
}

export default Board;
