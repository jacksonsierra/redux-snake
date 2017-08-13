import {
  combineReducers,
} from 'redux'

const initialSettingsState = {
  snakeSpeed: 100,
  bugSpeed: 5000,
}

const settings = (
  state = initialSettingsState,
  action,
) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default combineReducers({
  settings,
})
