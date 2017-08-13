import {
  combineReducers,
} from 'redux'

const initialSharedState = {}

const shared = (
  state = initialSharedState,
  action
) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default combineReducers({
  shared,
})
