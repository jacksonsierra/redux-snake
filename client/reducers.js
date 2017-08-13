import {
  combineReducers,
} from 'redux'
import game from 'client/game/reducers'
import leaderboard from 'client/leaderboard/reducers'
import settings from 'client/settings/reducers'
import shared from 'client/shared/reducers'

export default combineReducers({
  game,
  leaderboard,
  settings,
  shared,
})
