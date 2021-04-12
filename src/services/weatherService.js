import axios from 'axios'

const API_KEY = 'FlOJUbbCEJZEONxsV2wo2Qp0dUoV1Uy6'

const resolveData = res => res.data

export const weatherService = {
  loadWeather,
  getWeather,
  getCurrentWeather,
  getAutoCompleteSearch,
  loadFavoriteCities,
  addOrRemoveFavoriteCity,
  loadTemeratureUnits,
  changeTemperatureUnits,
  loadDefaultLocation,
  addIdToSelectedCity,
  getCurrentWeaterForFavoriteCities,
  loadModePrefs,
  changeMode
}

async function loadWeather(city) {
  try {
    return await getWeather(city)
  } catch (error) {
    console.log('Something Went Wrong With The Folowing ', error);
  }
}

async function getWeather(city) {
  try {
    const cityKey = await getCityKey(city)
    return axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey[0].Key}?apikey=${API_KEY}&metric=true`)
      .then(resolveData)
  } catch (error) {
    console.log('Something Went Wrong With The Folowing ', error);
  }
}

async function getCurrentWeather(city) {
  try {
    const cityKey = await getCityKey(city)
    return axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey[0].Key}?apikey=${API_KEY}`)
      .then(resolveData)
  } catch (error) {
    console.log('Something Went Wrong With The Folowing ', error);
  }
}

async function getCityKey(city) {
  try {
    return await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`)
      .then(resolveData)
  } catch (error) {
    console.log('Something Went Wrong With The Folowing ', error);
  }
}

async function getAutoCompleteSearch(query) {
  try {
    return await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`)
      .then(resolveData)
  } catch (error) {
    console.log('Something Went Wrong With The Folowing ', error);
  }
}

function loadDefaultLocation() {
  return {
    id: _makeId(),
    cityName: 'Tel Aviv'
  }
}

function addIdToSelectedCity(city) {
  const cityWithId = {
    id: _makeId(),
    cityName: city
  }
  return cityWithId
}

function loadFavoriteCities() {
  let favoriteCities = _loadFromStorage('favorite-cities')
  if (!favoriteCities) favoriteCities = []
  return favoriteCities;
}

function addOrRemoveFavoriteCity(city) {
  let favoriteCities = _loadFromStorage('favorite-cities')
  if (favoriteCities && favoriteCities.some(
      (favoriteCity) => favoriteCity.cityName === city.cityName
    )) {
    const cityIdxToUnFavorite = favoriteCities.findIndex(cityInFavorites => cityInFavorites.cityName === city.cityName)
    favoriteCities.splice(cityIdxToUnFavorite, 1)
    _saveToStorage('favorite-cities', favoriteCities)
    return favoriteCities
  }
  if (!favoriteCities) favoriteCities = []
  favoriteCities.push(city)
  const sorted = _sort(favoriteCities)
  _saveToStorage('favorite-cities', sorted)
  return sorted
}

async function getCurrentWeaterForFavoriteCities() {
  try {
    const favoriteCities = _loadFromStorage('favorite-cities')
    if (!favoriteCities) return []
    const favoriteCitiesWithCurrentWeather = await Promise.all(favoriteCities.map(async favoriteCity => ({
      ...favoriteCity,
      currentWeather: (await getCurrentWeather(favoriteCity.cityName))[0]
    })))
    return favoriteCitiesWithCurrentWeather
  } catch (error) {
    console.log('Something Went Wrong With The Folowing ', error);
  }
}

function loadTemeratureUnits() {
  let prefferedUnits = _loadFromStorage('units')
  if (!prefferedUnits) prefferedUnits = {
    isC: true
  }
  return prefferedUnits
}

function changeTemperatureUnits() {
  let prefferedUnits = _loadFromStorage('units')
  if (!prefferedUnits) prefferedUnits = {
    isC: true
  }
  let newPrefferedUnits = {
    isC: !prefferedUnits.isC
  }
  _saveToStorage('units', newPrefferedUnits)
  return newPrefferedUnits
}

function loadModePrefs() {
  let prefferedMode = _loadFromStorage('isDarkMode')
  if (!prefferedMode) prefferedMode = false
  return prefferedMode
}

function changeMode() {
  let prefferedMode = _loadFromStorage('isDarkMode')
  if (!prefferedMode) prefferedMode = false
  let newPrefferedMode = !prefferedMode
  _saveToStorage('isDarkMode', newPrefferedMode)
  return newPrefferedMode
}

function _sort(favoriteCities, sortBy = 'cityName') {
  return favoriteCities.sort((a, b) => {
    return a[sortBy] < b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
  })
}

function _makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function _loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}