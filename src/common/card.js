import React from "react";
import { StyleSheet, css } from "aphrodite";
import { colors, sizes } from "styles";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderWidth: "2px",
    borderRadius: "25px",
    borderColor: colors.blueLight,
    borderStyle: "solid",
  },
  header: {
    width: "100%",
    textAlign: "center",
    fontFamily: ["Fredoka One", "cursive"],
    color: colors.blueLight,
    padding: 0,
    margin: 0,
  },
});

export default function Card({ title, children }) {
  return (
    <div className={css(styles.card)}>
      <div className={css(styles.header)}>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
