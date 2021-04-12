import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

export default function WeatherPreview({ forecast }) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  const isShowingCelcius = useSelector(
    (state) => state.weatherReducer.temperatureUnits.isC
  );

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const timeDiff = currentHour >= 18 || currentHour < 6;

  function getIconUrl() {
    let iconNum = forecast[`${timeDiff ? "Night" : "Day"}`].Icon;
    if (iconNum < 10) iconNum = "0" + iconNum;
    return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`;
  }

  function showInF(val) {
    return (val * 9) / 5 + 32;
  }

  return (
    <section className={`weather-preview ${isDarkMode ? "dark-mode" : ""}`}>
      <img src={getIconUrl()} alt="" />
      <h3>{moment(forecast.Date).format("ddd DD/MM/YY")}</h3>
      <p>{forecast[`${timeDiff ? "Night" : "Day"}`].IconPhrase}</p>
      <p className="temperature">
        {isShowingCelcius
          ? forecast.Temperature[`${timeDiff ? "Minimum" : "Maximum"}`].Value
          : showInF(
              forecast.Temperature[`${timeDiff ? "Minimum" : "Maximum"}`].Value
            ).toFixed(1)}
        &deg;{isShowingCelcius ? "C" : "F"}
      </p>
    </section>
  );
}
