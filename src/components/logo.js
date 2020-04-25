import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  text: {
    fontFamily: ["Fredoka One", "cursive"],
    color: colors.blueLight,
    padding: 0,
    margin: 0,
  },
});

export default function Logo() {
  return (
    <div>
      <h1 className={css(styles.text)}>Paper Gamer</h1>
    </div>
  );
}
