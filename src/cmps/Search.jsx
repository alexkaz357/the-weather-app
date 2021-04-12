import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAutoCompleteSearch,
  setCity,
} from "../store/actions/weatherActions";

export default function Search() {
  const [search, setSearch] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const searchVals = useSelector((state) => state.weatherReducer.search);

  const isDarkMode = useSelector((state) => state.weatherReducer.isDarkMode);

  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      dispatch(loadAutoCompleteSearch(search));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideSerchResults, false);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutsideSerchResults,
        false
      );
    };
    // eslint-disable-next-line
  }, []);

  function handleChange({ target }) {
    const value = target.value;
    if (value !== "") {
      setSearch(value);
      setIsInputEmpty(false);
    } else if (value === "") resetInput();
  }

  const selectCity = (selectedCity) => {
    dispatch(setCity(selectedCity));
    resetInput();
  };

  const resetInput = () => {
    setIsInputEmpty(true);
    setSearch("");
  };

  const handleClickOutsideSerchResults = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      resetInput();
    }
  };

  return (
    <section className={`search ${isDarkMode ? "dark-mode" : ""} `}>
      <input
        className={`${isDarkMode ? "dark-mode" : ""} `}
        type="text"
        name="search"
        value={search}
        placeholder="Find city"
        autoComplete="off"
        onChange={handleChange}
      />
      <i
        className={`fas fa-search search-icon ${isDarkMode ? "dark-mode" : ""}`}
      ></i>
      {!isInputEmpty && searchVals && (
        <div className="search-results" ref={ref}>
          {searchVals.map((searchVal) => (
            <p
              key={searchVal.Key}
              onClick={() => selectCity(searchVal.LocalizedName)}
            >
              {searchVal.LocalizedName}, {searchVal.Country.LocalizedName}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
