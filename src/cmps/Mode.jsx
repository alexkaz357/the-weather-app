import React from "react";
import { createMuiTheme, Switch, ThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../store/actions/weatherActions";

export default function Mode() {
  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const dispatch = useDispatch();

  const handleModeChange = () => {
    dispatch(changeMode());
  };

  const theme = createMuiTheme({
    overrides: {
      MuiSwitch: {
        track: {
          opacity: 0.5,
          backgroundColor: "#000",
          "$checked$checked + &": {
            opacity: 0.5,
            backgroundColor: "#fff",
          },
        },
      },
    },
  });

  return (
    <section>
      <div className="mode">
        <div className="mode-switch">
          <p className={`mode-icon ${isDarkMode ? "" : "color"}`}>
            <i className="fas fa-sun"></i>
          </p>
          <ThemeProvider theme={theme}>
            <Switch
              checked={isDarkMode}
              onChange={handleModeChange}
              color="default"
              name="isDarkMode"
            />
          </ThemeProvider>
          <p className={`mode-icon ${isDarkMode ? "color" : ""}`}>
            <i className="fas fa-moon"></i>
          </p>
        </div>
      </div>
    </section>
  );
}
