import React from 'react'
import {
  IndexRoute,
  Route,
} from 'react-router'
import App from 'client/shared/containers/App'
import Game from 'client/game/containers/Game'
import Leaderboard from 'client/leaderboard/containers/Leaderboard'
import Settings from 'client/settings/containers/Settings'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Game} />
    <Route path="leaderboard" component={Leaderboard} />
    <Route path="settings" component={Settings} />
  </Route>
)
