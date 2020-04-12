import React from "react";
import { nameFromId } from "helpers";

export function Guess(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  let verb = "doing";
  if (ctx.phase === "DescribeThings") {
    verb = "describing";
  } else if (ctx.phase === "DescribeThingsOneWord") {
    verb = "describing";
  } else if (ctx.phase === "ActItOut") {
    verb = "acting";
  }

  return (
    <div>
      <p>
        Its your turn to guess what{" "}
        {nameFromId(ctx.currentPlayer, gameMetadata)} is {verb}!
      </p>
    </div>
  );
}

export default Guess;
