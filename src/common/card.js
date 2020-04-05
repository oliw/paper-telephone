import React from "react";
import { StyleSheet, css } from "aphrodite";
import { colors, sizes } from "styles";

const styles = StyleSheet.create({
  card: {
    width: sizes.cardWidth,
    backgroundColor: "white",
    padding: "25px",
    borderWidth: "2px",
    borderRadius: "25px",
    borderColor: colors.blueLight,
    borderStyle: "solid"
  }
});

export default function Card({ children }) {
  return <div className={css(styles.card)}>{children}</div>;
}
