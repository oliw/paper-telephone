import React from "react";
import shuffle from "lodash/shuffle";

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

  return (
    <div>
      <p>I'm the pick groups phase - picker</p>
      <p>Ok! Time to decide who goes in what group</p>
      <button onClick={handleShuffleClick}>
        Randomize the {numGroups} groups!
      </button>
      <p>
        The proposed groups are #{groups.map(g => g.join(",")).join(" and ")}
      </p>
      <button onClick={handleClick}>Choose these groups</button>
    </div>
  );
}

export default Picker;
