import React from "react";
import Player from "components/player";

import { colors } from "styles";
import { StyleSheet, css } from "aphrodite/no-important";

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
    borderRadius: "10px",
    border: "2px solid",
    borderColor: colors.blueLight,
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignContent: "baseline",
  },
  status: {
    width: "100%",
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  activePlayer: {
    borderRadius: "3px",
    border: "2px solid",
    borderColor: colors.blueLight,
  },
  iconWithText: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
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
    <div className={css(styles.groups)}>{groups.length > 0 && groups}</div>
  );
}

function IconWithText({ icon, text }) {
  return (
    <div className={css(styles.iconWithText)}>
      <span>{icon}</span>:<span>{text}</span>
    </div>
  );
}

function buildStatus(G, ctx, gameMetadata) {
  let status = "Unknown";
  let currentPlayer = ctx.currentPlayer;

  if (ctx.phase === "PickGroups") {
    status = `Time for player ${currentPlayer}'s turn to choose groups`;
  }

  if (ctx.phase === "BuildBowl") {
    status = "Time for everyone fill up the bowl with words";
  }

  if (ctx.phase === "DescribeThings") {
    status = `Time for player ${currentPlayer} to describe words to the rest of the group`;
  }

  return status;
}

export function Status(props) {
  const { moves, events, G, ctx, playerID, gameMetadata } = props;

  const [secondsRemaining, setSecondsRemaining] = React.useState(null);

  const status = buildStatus(G, ctx, gameMetadata);

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
      } else {
        setSecondsRemaining(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [G.countdownStartedAt, G.countdownSeconds]);

  let wordsInBowl = G.wordsInBowl.length;
  if (G.currentWord) {
    wordsInBowl += 1;
  }

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.row)}>
        <IconWithText icon="👨‍💻" text={playerID} />
        <IconWithText icon="📖" text={ctx.phase} />
        <IconWithText icon="🥣" text={wordsInBowl} />
        <IconWithText icon="⏲" text={secondsRemaining || "N/A"} />
      </div>
      <Groups {...props} />
      <div className={css(styles.status)}>{status}</div>
    </div>
  );
}

export default Status;
