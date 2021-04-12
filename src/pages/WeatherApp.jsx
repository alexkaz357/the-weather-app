import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../cmps/Loader";
import Search from "../cmps/Search";
import WeatherDetails from "../cmps/WeatherDetails";
import { loadWeather } from "../store/actions/weatherActions";

export default function WeatherApp() {
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const selectedCity = useSelector(
    (state) => state.weatherReducer.selectedCity
  );

  const forecasts = useSelector((state) => state.weatherReducer.forecasts);

  useEffect(() => {
    dispatch(loadWeather(selectedCity.cityName));
    // eslint-disable-next-line
  }, [selectedCity]);

  return (
    <section className="weather-app">
      {isDarkMode ? (
        <div className="stars-container">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
      ) : (
        <div className="clouds-container">
          <div className="clouds"></div>
        </div>
      )}

      <div className="container">
        <Search />
        {forecasts ? <WeatherDetails forecasts={forecasts} /> : <Loader />}
      </div>
    </section>
  );
}
