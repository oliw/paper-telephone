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
  let phaseTitle = null;
  if (ctx.phase === "PickGroups") {
    phase = <Pickgroups {...props} />;
    phaseTitle = "Pick Groups";
  } else if (ctx.phase === "BuildBowl") {
    phase = <BuildBowl {...props} />;
    phaseTitle = "Fill The Bowl";
  } else if (ctx.phase === "DescribeThings") {
    phase = <DescribeThings {...props} />;
    phaseTitle = "Describe The Word";
  }

  return (
    <Game>
      <Card>
        <Status {...props} />
      </Card>
      {phase && <Card title={phaseTitle}>{phase}</Card>}
    </Game>
  );
}

export default Board;
