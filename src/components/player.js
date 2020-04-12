import React from "react";
import { toColor } from "helpers";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  icon: {},
  text: {
    padding: 0,
    margin: 0,
  },
});

export default function Player({ name }) {
  const color = toColor(name);
  return (
    <div className={css(styles.container)}>
      <svg
        className={css(styles.icon)}
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
      <p className={css(styles.text)} style={{ color: `${color}` }}>
        {name}
      </p>
    </div>
  );
}
