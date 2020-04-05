import React from "react";
import Logo from "components/logo";
import { colors } from "styles";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "4px",
    paddingBottom: "4px",
    backgroundColor: colors.pinkVeryLight
  }
});

function Header() {
  return (
    <div className={css(styles.container)}>
      <Logo />
    </div>
  );
}

export default Header;
