import React from "react";
import { StyleSheet, css } from "aphrodite";
import { colors, sizes } from "styles";

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "3px",
  },
  game: {
    maxWidth: sizes.cardWidth,
    width: "100%",
  },
});

export default function Game({ children }) {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.game)}>{children}</div>
    </div>
  );
}
