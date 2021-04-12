import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherList from "../cmps/WatherList";
import {
  addOrRemoveFavoriteCity,
  changeUnits,
} from "../store/actions/weatherActions";

export default function WeatherDetails({ forecasts }) {
  const selectedCity = useSelector(
    (state) => state.weatherReducer.selectedCity
  );

  const favoriteCities = useSelector(
    (state) => state.weatherReducer.favoriteCities
  );

  const isShowingCelcius = useSelector(
    (state) => state.weatherReducer.temperatureUnits.isC
  );

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const dispatch = useDispatch();

  const changeTemperatureUnits = () => {
    dispatch(changeUnits());
  };

  const toggleFavorites = () => {
    dispatch(addOrRemoveFavoriteCity(selectedCity));
  };

  return (
    <section className="weather-details">
      <p className={`title-city ${isDarkMode ? "dark-mode" : ""}`}>
        {selectedCity.cityName}
      </p>

      <i
        className={`fas fa-heart heart ${
          favoriteCities.some(
            (favoriteCity) => favoriteCity.cityName === selectedCity.cityName
          )
            ? "favorite"
            : ""
        }`}
      ></i>

      <button
        className={`fav-btn ${isDarkMode ? "dark-mode" : ""}`}
        onClick={toggleFavorites}
      >
        {`${
          favoriteCities.some(
            (favoriteCity) => favoriteCity.cityName === selectedCity.cityName
          )
            ? "remove from favorites"
            : "add to favorites"
        }`}
      </button>

      <WeatherList forecasts={forecasts} />

      <div
        className={`message-show flex space-between ${
          isDarkMode ? "dark-mode" : ""
        }`}
      >
        <p className="message">{forecasts.Headline.Text}</p>
        <p className="show" onClick={changeTemperatureUnits}>
          SHOW IN &deg;{isShowingCelcius ? "F" : "C"}
        </p>
      </div>
    </section>
  );
}
