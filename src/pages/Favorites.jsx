import React, { useEffect } from "react";
import FavoritesList from "../cmps/FavoritesList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentWeaterForFavoriteCities } from "../store/actions/weatherActions";

export default function Favorites() {
  const favoriteCities = useSelector(
    (state) => state.weatherReducer.favoriteCities
  );

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeaterForFavoriteCities());
    // eslint-disable-next-line
  }, []);

  return (
    <section className="favorites">
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

      {favoriteCities.length ? (
        <FavoritesList favoriteCities={favoriteCities} />
      ) : (
        <div className="no-favs">
          <h2>There are no favorites</h2>
        </div>
      )}
    </section>
  );
}
