import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  main: {
    height: "30px",
    borderRadius: "10px",
    fontWeight: "bold",
    backgroundColor: colors.blueLight,
    borderColor: "grey",
    color: "grey",
    borderWidth: "2px",
    outline: "none",
    cursor: "pointer",
    ":hover": {
      boxShadow: "1px 1px #888888",
    },
  },
  primary: {
    backgroundColor: colors.blueLight,
  },
  secondary: {},
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
