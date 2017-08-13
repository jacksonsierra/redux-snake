import {
  combineReducers,
} from 'redux'

const initialLeaderboardState = {
  data: [],
}

const leaderboard = (
  state = initialLeaderboardState,
  action
) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

export default combineReducers({
  leaderboard,
})
