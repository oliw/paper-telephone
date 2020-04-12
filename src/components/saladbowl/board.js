import React from "react";
import Pickgroups from "./phases/pickgroups";
import BuildBowl from "./phases/buildbowl";
import Play from "./phases/play";
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
    phase = <Play {...props} />;
    phaseTitle = "Describe The Word";
  } else if (ctx.phase === "DescribeThingsOneWord") {
    phase = <Play {...props} />;
    phaseTitle = "Describe The Word using Just One Word!";
  } else if (ctx.phase === "ActItOut") {
    phase = <Play {...props} />;
    phaseTitle = "Act It Out";
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
