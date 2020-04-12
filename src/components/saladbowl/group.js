import React from "react";
import { nameFromId, toColor } from "helpers";
import { colors } from "styles";
import Text from "common/text";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: colors.pinkVeryLight,
  },
  members: {
    display: "flex",
    alignItems: "center",
  },
});

function Player({ player, gameMetadata }) {
  const name = nameFromId(player, gameMetadata);
  const color = toColor(name);
  return <Text color={color}>{name}</Text>;
}

function Group({ group, G, ctx, gameMetadata }) {
  const currentPlayer = !ctx.activePlayers && ctx.currentPlayer;

  const isGroupsTurn = group.players.find((p) => p === currentPlayer);

  const teamMembers = group.players.map((p, idx) => (
    <Player key={idx} player={p} gameMetadata={gameMetadata} />
  ));

  const turn = <Player player={currentPlayer} gameMetadata={gameMetadata} />;
  const guessors = group.players
    .filter((p) => p !== currentPlayer)
    .map((p, idx) => (
      <Player key={idx} player={p} gameMetadata={gameMetadata} />
    ));

  return (
    <div className={css(styles.container)}>
      <Text>Group {group.name}</Text>
      <div className={css(styles.members)}>
        {isGroupsTurn && (
          <>
            {turn}
            <span>➡</span>
            {guessors}
          </>
        )}
        {!isGroupsTurn && teamMembers}
      </div>
      <Text>Score: {group.score}</Text>
    </div>
  );
}

export default Group;
