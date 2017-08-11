import React from 'react';
import {
  IndexRoute,
  Route,
} from 'react-router';
import App from 'shared/containers/App';
import Game from 'game/containers/Game';
import Leaderboard from 'leaderboard/containers/Leaderboard';
import Settings from 'settings/containers/Settings';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Game} />
    <Route path="leaderboard" component={Leaderboard} />
    <Route path="settings" component={Settings} />
  </Route>
);
