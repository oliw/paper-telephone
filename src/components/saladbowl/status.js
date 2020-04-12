import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite/no-important";
import { nameFromId } from "helpers";
import Group from "./group";

const styles = StyleSheet.create({
  leader: {
    marginRight: "3px",
    display: "flex",
  },
  players: {
    display: "flex",
  },
  groups: {
    marginTop: "5px",
    marginBottom: "5px",
    marginRight: "10px",
    display: "flex",
    justifyContent: "center",
  },
  group: {
    marginRight: "30px",
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

function Groups(props) {
  const { moves, events, G, ctx, playerID, gameMetadata } = props;

  const groups = G.groups.map((group) => (
    <div className={css(styles.group)}>
      <Group group={group} G={G} ctx={ctx} gameMetadata={gameMetadata} />
    </div>
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

  if (ctx.gameover) {
    status = "Its game over! Thanks for playing!";
  } else if (ctx.phase === "PickGroups") {
    status = `Time for ${nameFromId(
      currentPlayer,
      gameMetadata
    )}'s turn to choose groups`;
  } else if (ctx.phase === "BuildBowl") {
    status = "Time for everyone fill up the bowl with words";
  } else if (ctx.phase === "DescribeThings") {
    status = `Time for player ${nameFromId(
      currentPlayer,
      gameMetadata
    )} to describe words to the rest of their group`;
  } else if (ctx.phase === "DescribeThingsOneWord") {
    status = `Time for ${nameFromId(
      currentPlayer,
      gameMetadata
    )} to describe words using just one word to the rest of their group`;
  } else if (ctx.phase === "ActItOut") {
    status = `Time for ${nameFromId(
      currentPlayer,
      gameMetadata
    )} to act out a word to the rest of their group`;
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
        <IconWithText icon="🥣" text={wordsInBowl} />
        <IconWithText icon="⏲" text={secondsRemaining || "N/A"} />
      </div>
      <Groups {...props} />
      <div className={css(styles.status)}>{status}</div>
    </div>
  );
}

export default Status;
