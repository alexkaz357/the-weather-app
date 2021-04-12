import React from "react";
import FavoritesPreview from "./FavoritesPreview";

export default function FavoritesList({ favoriteCities }) {
  return (
    <section className="favorites-list flex container">
      {favoriteCities.map((favoriteCity) => (
        <FavoritesPreview key={favoriteCity.id} favoriteCity={favoriteCity} />
      ))}
    </section>
  );
}
