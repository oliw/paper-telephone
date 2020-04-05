import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    textAlign: "center"
  },
  icon: {},
  text: {
    padding: 0,
    margin: 0
  }
});

const stringToColour = function(str) {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export default function Player({ name }) {
  const color = stringToColour(name);
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
