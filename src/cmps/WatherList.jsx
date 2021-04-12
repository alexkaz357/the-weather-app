import React from "react";
import WeatherPreview from "./WeatherPreview";

export default function WeatherList({ forecasts }) {
  return (
    <section className="weather-list flex justify-center">
      {forecasts.DailyForecasts.map((forecast, idx) => (
        <WeatherPreview key={idx} forecast={forecast} />
      ))}
    </section>
  );
}
