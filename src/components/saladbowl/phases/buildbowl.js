import React from "react";
import Writethings from "components/saladbowl/phases/buildbowl/writethings";

export function BuildBowl(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  return (
    <div>
      <p>I'm the build bowl phase</p>
      <Writethings {...props} />
    </div>
  );
}

export default BuildBowl;
