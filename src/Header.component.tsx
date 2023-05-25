import moonIcon from './assets/moon.png'
import sunIcon from './assets/sun.png'
import {useContext, useState} from "react";
import {IsDarkContext} from "./App";

const Header = (props) => {
  const classes = {
    header: {
      display: "flex",
      height: "100px",
      width: "1440px",
      padding: "0 5%",
      alignItems: "center",
      boxSizing: "border-box",
      justifyContent: "space-between",
      backgroundColor: "var(--headerBg-hex)",
      boxShadow: "0px 3.6px 10px rgba(0, 0, 0, 0.035),0px 29px 80px rgba(0, 0, 0, 0.07)",
    },
    title: {
        fontSize: "21px",
        fontWeight: "bold",
        color: "var(--text-hex)"
    },
    toggle: {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
    },
    toggleIcon: {
      marginRight: "8px"
    },
    text: {
      color: "var(--text-hex)"
    }
  }
  const { isDark, setIsDark } = useContext(IsDarkContext);
  const isDarkMode = isDark;

  return (
    <div className={"header"} style={classes.header}>
      <p style={classes.title}>Where in the world?</p>
      <div style={classes.toggle} onClick={props.toggleMode}>
        <img alt="icon" src={isDarkMode ? moonIcon : sunIcon} width="15" style={classes.toggleIcon}/>
          <p style={classes.text}>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
      </div>
    </div>
  )
}
export default Header;
