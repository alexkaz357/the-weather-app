import {
  weatherService
} from '../../services/weatherService'

export function loadWeather(city) {
  return async dispatch => {
    const weather = await weatherService.loadWeather(city)
    dispatch({
      type: 'SET_WEATHER',
      weather
    })
  }
}

export function loadAutoCompleteSearch(query) {
  return async dispatch => {
    const search = await weatherService.getAutoCompleteSearch(query)
    dispatch({
      type: 'SET_SEARCH',
      search
    })
  }
}

export function setCity(city) {
  return dispatch => {
    let cityWithId
    if (!city.id) cityWithId = weatherService.addIdToSelectedCity(city)
    else cityWithId = city
    dispatch({
      type: 'SELECT_CITY',
      cityWithId
    })
  }
}

export function addOrRemoveFavoriteCity(selectedCity) {
  return dispatch => {
    const favorites = weatherService.addOrRemoveFavoriteCity(selectedCity)
    dispatch({
      type: 'ADD_OR_REMOVE_FAVORITE_CITY',
      favorites
    })
  }
}

export function getCurrentWeaterForFavoriteCities() {
  return async dispatch => {
    const favoritesWithCurrentWeather = await weatherService.getCurrentWeaterForFavoriteCities()
    dispatch({
      type: 'GET_CURRENT_WEATHER_FOR_FAVORITE_CITIES',
      favoritesWithCurrentWeather
    })
  }
}

export function changeUnits() {
  const units = weatherService.changeTemperatureUnits()
  return dispatch => {
    dispatch({
      type: 'CHANGE_TEMPERATURE_UNITS',
      units
    })
  }
}

export function changeMode() {
  const mode = weatherService.changeMode()
  return dispatch => {
    dispatch({
      type: 'CHANGE_MODE',
      mode
    })
  }
}