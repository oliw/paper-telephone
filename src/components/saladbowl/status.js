import React from "react";
import Player from "components/player";

import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  leader: {
    marginRight: "3px",
    display: "flex",
  },
  players: {
    display: "flex",
  },
  groups: {
    display: "flex",
  },
  group: {
    marginRight: "30px",
    display: "flex",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  activePlayer: {
    borderRadius: "3px",
    border: "2px solid #73AD21",
  },
});

function GroupMember({ player, ctx }) {
  const activePlayer =
    (ctx.activePlayers && ctx.activePlayers[player]) ||
    ctx.currentPlayer === player;
  return (
    <div className={css(activePlayer && styles.activePlayer)}>
      <Player name={player} />
    </div>
  );
}

function Group({ group, G, ctx }) {
  const groupMembers = group.players.map((player, idx) => {
    return <GroupMember key={idx} player={player} ctx={ctx} />;
  });

  return (
    <div className={css(styles.group)}>
      <div className={css(styles.players)}>{groupMembers}</div>
      <p>({group.score})</p>
    </div>
  );
}

function Groups(props) {
  const { moves, events, G, ctx, playerID, gameMetadata } = props;

  const groups = G.groups.map((group) => (
    <Group group={group} G={G} ctx={ctx} />
  ));

  return (
    <div className={css(styles.groups)}>
      <p>Groups:</p>
      {groups.length > 0 && groups}
      {groups.length === 0 && <p>Not chosen yet</p>}
    </div>
  );
}

function Timer({ group, G, ctx }) {
  const [secondsRemaining, setSecondsRemaining] = React.useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (G.countdownStartedAt) {
        const countdownEndsAt =
          G.countdownStartedAt + G.countdownSeconds * 1000;
        const currentTime = new Date().getTime();
        if (currentTime >= countdownEndsAt) {
          setSecondsRemaining(0);
        } else {
          const millisRemaining = countdownEndsAt - currentTime;
          setSecondsRemaining(Math.floor(millisRemaining / 1000));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [G.countdownStartedAt, G.countdownSeconds]);

  return (
    <div>
      <p>Timer: {secondsRemaining || "N/A"}</p>
    </div>
  );
}

function BowlSummary(props) {
  const { moves, events, G, ctx, playerID, gameMetadata } = props;

  return (
    <div>
      <p>Words left in bowl: {G.wordsInBowl.length}</p>
    </div>
  );
}

export function Status(props) {
  const { moves, events, G, ctx, playerID, gameMetadata } = props;

  return (
    <div className={css(styles.container)}>
      <Player name={playerID} />
      <p>Phase: {ctx.phase}</p>
      <Groups {...props} />
      <BowlSummary {...props} />
      <Timer {...props} />
    </div>
  );
}

export default Status;
