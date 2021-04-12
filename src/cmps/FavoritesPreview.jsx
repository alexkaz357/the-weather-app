import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCity } from "../store/actions/weatherActions";
import Loader from "./Loader";

export default function FavoritesPreview({ favoriteCity }) {
  const isShowingCelcius = useSelector(
    (state) => state.weatherReducer.temperatureUnits.isC
  );

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const dispatch = useDispatch();
  const history = useHistory();

  const goToMainAndDisplaySelectedFavoriteCityWeather = (favoriteCity) => {
    dispatch(setCity(favoriteCity));
    history.push("/");
  };

  return (
    <section
      className={`favorites-preview ${isDarkMode ? "dark-mode" : ""}`}
      onClick={() =>
        goToMainAndDisplaySelectedFavoriteCityWeather(favoriteCity.cityName)
      }
    >
      {favoriteCity.currentWeather ? (
        <div className="content flex column space-between">
          <h3 className="favorite-city-name">{favoriteCity.cityName}</h3>
          <p className="favorite-city-description">
            {favoriteCity.currentWeather.WeatherText}
          </p>
          <p className="favorite-city-temperature">
            {isShowingCelcius
              ? favoriteCity.currentWeather.Temperature.Metric.Value
              : favoriteCity.currentWeather.Temperature.Imperial.Value}
            &deg;
            {isShowingCelcius
              ? favoriteCity.currentWeather.Temperature.Metric.Unit
              : favoriteCity.currentWeather.Temperature.Imperial.Unit}
          </p>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
}
