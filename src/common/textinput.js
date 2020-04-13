import React from "react";
import { StyleSheet, css } from "aphrodite";
import { colors, sizes } from "styles";

const styles = StyleSheet.create({
  input: {
    fontSize: sizes.textLarge,
    marginBottom: "5px",
    borderRadius: "10px",
    borderColor: colors.blueLight,
    borderWidth: "2px",
  },
});

export default function TextInput({ placeholder, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={css(styles.input)}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
