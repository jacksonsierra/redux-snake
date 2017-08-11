import {
  combineReducers,
} from 'redux';
import game from 'game/reducers';
import leaderboard from 'leaderboard/reducers';
import settings from 'settings/reducers';
import shared from 'shared/reducers';

export default combineReducers({
  game,
  leaderboard,
  settings,
  shared,
});
