import _ from 'lodash'
import { combineReducers } from 'redux'
import { DIRECTIONS } from 'client/game/constants'
import { actionTypes } from 'client/game/actions'

const initialStatusState = {
  started: false,
  ended: false,
}

const status = (
  state = initialStatusState,
  action
) => {
  switch (action.type) {
    case actionTypes.CHANGE_STATUS:
      return { ...state, ...action.payload }
    case actionTypes.RESET:
      return { ...initialStatusState }
    default:
      return { ...state }
  }
}

const initialScoreState = {
  total: 0,
}

const score = (
  state = initialScoreState,
  action
) => {
  switch (action.type) {
    case actionTypes.CHANGE_SCORE:
      return { ...state, ...action.payload }
    case actionTypes.RESET:
      return { ...initialScoreState }
    default:
      return { ...state }
  }
}

const initialBoardState = {
  height: 500,
  width: 500,
  cellHeight: 10,
  cellWidth: 10,
}

const board = (
  state = initialBoardState,
  action
) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}

const initialPositions = [
  1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224,
]
const initialSnakeState = {
  currentPositions: initialPositions,
  currentPositionsMap: _.keyBy(initialPositions),
  direction: DIRECTIONS.RIGHT,
}

const snake = (
  state = initialSnakeState,
  action
) => {
  switch (action.type) {
    case actionTypes.MOVE_SNAKE:
      return { ...state, ...action.payload }
    case actionTypes.CHANGE_SNAKE_DIRECTION:
      return { ...state, ...action.payload }
    case actionTypes.RESET:
      return { ...initialSnakeState }
    default:
      return { ...state }
  }
}

const initialBugState = {
  currentPosition: undefined,
}

const bug = (
  state = initialBugState,
  action
) => {
  switch (action.type) {
    case actionTypes.MOVE_BUG:
      return { ...state, ...action.payload }
    case actionTypes.RESET:
      return { ...initialBugState }
    default:
      return { ...state }
  }
}

export default combineReducers({
  status,
  score,
  board,
  snake,
  bug,
})
