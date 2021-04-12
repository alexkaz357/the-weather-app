import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Mode from "../cmps/Mode";

export function NavBar() {
  const [isMenu, setIsMenu] = useState(false);

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  function toggleMenu() {
    document.body.classList.toggle("menu-open");
    setIsMenu(!isMenu);
  }

  return (
    <section
      className={`nav-bar flex space-between container ${
        isDarkMode ? "dark-mode" : ""
      }`}
    >
      <div className="screen" onClick={toggleMenu}></div>

      <NavLink to="/">
        <h1 className="logo">TheWeatherApp</h1>
      </NavLink>

      <Mode />

      <div className={`links flex align-center ${isMenu ? "" : "closed"}`}>
        <p
          className={`close-btn ${isDarkMode ? "dark-mode" : ""}`}
          onClick={toggleMenu}
        >
          <i className="fas fa-times"></i>
        </p>
        <NavLink to="/" onClick={toggleMenu}>
          <p className="weather-link">WEATHER</p>
        </NavLink>
        <NavLink to="/favorites" onClick={toggleMenu}>
          <p className="favorites-link">FAVORITES</p>
        </NavLink>
      </div>

      <p className="menu-btn" onClick={toggleMenu}>
        <i
          className={`fas fa-bars menu-btn-icon ${
            isDarkMode ? "dark-mode" : ""
          }`}
        ></i>
      </p>
    </section>
  );
}
