import {
  weatherService
} from "../../services/weatherService"

const initialState = {
  forecasts: null,
  search: null,
  selectedCity: weatherService.loadDefaultLocation(),
  favoriteCities: weatherService.loadFavoriteCities(),
  temperatureUnits: weatherService.loadTemeratureUnits(),
  isDarkMode: weatherService.loadModePrefs()
}

export function weatherReducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_WEATHER':
      return {
        ...state,
        forecasts: action.weather
      }

      case 'SET_SEARCH':
        return {
          ...state,
          search: action.search
        }

        case 'SELECT_CITY':
          return {
            ...state, selectedCity: action.cityWithId
          }

          case 'ADD_OR_REMOVE_FAVORITE_CITY':
            return {
              ...state, favoriteCities: action.favorites
            }

            case 'GET_CURRENT_WEATHER_FOR_FAVORITE_CITIES':
              return {
                ...state, favoriteCities: action.favoritesWithCurrentWeather
              }

              case 'CHANGE_TEMPERATURE_UNITS':
                return {
                  ...state, temperatureUnits: action.units
                }

                case 'CHANGE_MODE':
                  return {
                    ...state, isDarkMode: action.mode
                  }

                  default:
                    return state
  }
}