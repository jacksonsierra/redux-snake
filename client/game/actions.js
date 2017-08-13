import _ from 'lodash'
import { DIRECTIONS } from 'client/game/constants'

export const actionTypes = {
  CHANGE_STATUS: 'GAME/CHANGE_STATUS',
  CHANGE_SCORE: 'GAME/CHANGE_SCORE',
  CHANGE_SNAKE_DIRECTION: 'GAME/CHANGE_SNAKE_DIRECTION',
  MOVE_SNAKE: 'GAME/MOVE_SNAKE',
  MOVE_BUG: 'GAME/MOVE_BUG',
  RESET: 'GAME/RESET',
}

export const startGame = () => ({
  type: actionTypes.CHANGE_STATUS,
  payload: {
    started: true,
  },
})

export const endGame = () => ({
  type: actionTypes.CHANGE_STATUS,
  payload: {
    ended: true,
  },
})

export const resetGame = () => ({
  type: actionTypes.RESET,
})

export const moveSnake = ({
  nextPosition,
  subsumePosition,
}) => (dispatch, getState) => {
  const {
    currentPositions,
    currentPositionsMap,
  } = getState().game.snake

  if (subsumePosition) {
    dispatch({
      type: actionTypes.MOVE_SNAKE,
      payload: {
        currentPositions: currentPositions.concat([nextPosition]),
        currentPositionsMap: _.extend(
          currentPositionsMap, _.keyBy([nextPosition])),
      },
    })
    return
  }

  const tail = currentPositions[0]
  const newCells = currentPositions.slice(1).concat([nextPosition])
  const newMap = _.extend(
    _.pickBy(currentPositionsMap, (value, key) => tail !== value),
    _.keyBy([nextPosition])
  )
  const payload = {
    currentPositions: newCells,
    currentPositionsMap: newMap,
  }
  dispatch({
    type: actionTypes.MOVE_SNAKE,
    payload,
  })
}

export const changeSnakeDirectionLeft = (direction) => (dispatch) => {
  if (direction === DIRECTIONS.RIGHT) {
    return
  }

  dispatch({
    type: actionTypes.CHANGE_SNAKE_DIRECTION,
    payload: {
      direction: DIRECTIONS.LEFT,
    },
  })
}

export const changeSnakeDirectionRight = (direction) => (dispatch) => {
  if (direction === DIRECTIONS.LEFT) {
    return
  }

  dispatch({
    type: actionTypes.CHANGE_SNAKE_DIRECTION,
    payload: {
      direction: DIRECTIONS.RIGHT,
    },
  })
}

export const changeSnakeDirectionUp = (direction) => (dispatch) => {
  if (direction === DIRECTIONS.DOWN) {
    return
  }

  dispatch({
    type: actionTypes.CHANGE_SNAKE_DIRECTION,
    payload: {
      direction: DIRECTIONS.UP,
    },
  })
}

export const changeSnakeDirectionDown = (direction) => (dispatch) => {
  if (direction === DIRECTIONS.UP) {
    return
  }

  dispatch({
    type: actionTypes.CHANGE_SNAKE_DIRECTION,
    payload: {
      direction: DIRECTIONS.DOWN,
    },
  })
}

export const moveBug = (nextPosition) => ({
  type: actionTypes.MOVE_BUG,
  payload: {
    currentPosition: nextPosition,
  },
})
