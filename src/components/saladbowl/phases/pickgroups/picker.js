import React from "react";
import shuffle from "lodash/shuffle";
import Button from "common/button";
import { StyleSheet, css } from "aphrodite";
import { nameFromId } from "helpers";
import { colors, sizes } from "styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export function Picker(props) {
  const { moves, _, G, ctx, playerID, gameMetadata } = props;

  const numPlayers = ctx.numPlayers;
  const players = ctx.playOrder;
  const [numGroups, setNumGroups] = React.useState(2);
  const [groups, setGroups] = React.useState([]);
  const handleShuffleClick = () => {
    let groups = Array(numGroups);
    let shuffledPlayers = shuffle(players);
    let i = 0;
    let j = 0;
    while (i < shuffledPlayers.length) {
      if (groups[j] == null) {
        groups[j] = [];
      }
      groups[j].push(shuffledPlayers[i]);
      j = (j + 1) % groups.length;
      i++;
    }
    setGroups(groups);
  };

  const handleClick = () => {
    moves.ChooseGroups(groups);
  };

  const formatGroup = (group) => {
    const players = group.map((player) => nameFromId(player, gameMetadata));
    return `(${players.join(",")})`;
  };

  const formattedGroups = groups.map((g) => formatGroup(g));

  return (
    <div className={css(styles.container)}>
      <p>Ok! It's your turn to decide who goes in what group</p>
      <Button onClick={handleShuffleClick}>
        Randomize the {numGroups} groups!
      </Button>
      {groups.length > 0 && (
        <>
          <p>The proposed groups are {formattedGroups.join(",")}</p>
          <Button onClick={handleClick}>Choose these groups</Button>
        </>
      )}
    </div>
  );
}

export default Picker;
