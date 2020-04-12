import React from "react";
import { StyleSheet, css } from "aphrodite";
import { colors, sizes } from "styles";

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
});

export default function Text({ color, children }) {
  const style = color ? { color: `${color}` } : null;
  return (
    <span className={css(styles.container)} style={style}>
      {children}
    </span>
  );
}
