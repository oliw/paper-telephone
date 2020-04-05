import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  main: {
    height: "30px",
    borderRadius: "10px",
    fontWeight: "bold",
    borderColor: colors.blueLight,
    borderWidth: "2px",
    outline: "none"
  },
  primary: {
    backgroundColor: colors.blueLight,
    color: colors.pinkVeryLight
  },
  secondary: {
    color: colors.blueLight
  }
});

export default function Button({ onClick, children, type }) {
  const isPrimary = type === "primary";
  const isSecondary = type !== "primary";

  return (
    <button
      className={css(
        styles.main,
        isPrimary && styles.primary,
        isSecondary && styles.secondary
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
