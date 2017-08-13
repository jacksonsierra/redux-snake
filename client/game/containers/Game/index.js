import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import Board from 'client/game/components/Board'
import Buttons from 'client/game/components/Buttons'
import Score from 'client/game/components/Score'
import { DIRECTIONS } from 'client/game/constants'
import {
  startGame,
  endGame,
  resetGame,
  moveSnake,
  moveBug,
  changeSnakeDirectionLeft,
  changeSnakeDirectionRight,
  changeSnakeDirectionUp,
  changeSnakeDirectionDown,
} from 'client/game/actions'
import styles from './styles.css'

const mapStateToProps = (state) => ({
  ...state.game,
  settings: state.settings,
})

const mapDispatchToProps = {
  startGame,
  endGame,
  resetGame,
  moveSnake,
  moveBug,
  changeSnakeDirectionLeft,
  changeSnakeDirectionRight,
  changeSnakeDirectionUp,
  changeSnakeDirectionDown,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Game extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired,
    score: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    snake: PropTypes.object.isRequired,
    bug: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired,
    endGame: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    moveSnake: PropTypes.func.isRequired,
    moveBug: PropTypes.func.isRequired,
    changeSnakeDirectionLeft: PropTypes.func.isRequired,
    changeSnakeDirectionRight: PropTypes.func.isRequired,
    changeSnakeDirectionUp: PropTypes.func.isRequired,
    changeSnakeDirectionDown: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { started } = this.props.status
    if (started && !nextProps.status.started) {
      this.deactivateGame()
    }
  }

  componentDidUpdate(prevProps) {
    const {
      started,
      ended,
    } = this.props.status

    if (!prevProps.status.started && started) {
      this.activateGame()
    }

    if (!prevProps.status.ended && ended) {
      this.deactivateGame()
    }
  }

  componentWillUnmount() {
    this.deactivateGame()
  }

  render() {
    const {
      status,
      score,
      board,
      snake,
      bug,
    } = this.props

    return (
      <div className={styles.container}>
        <Buttons
          {...status}
          startGame={this.props.startGame}
          resetGame={this.props.resetGame}
        />
        <Score {...score} />
        <Board
          {...board}
          snake={snake}
          bug={bug}
          numCells={this.getNumCells()}
        />
      </div>
    )
  }

  activateGame = () => {
    const { snakeSpeed } = this.props.settings
    this.placeBug()
    this._interval = setInterval(this.advanceGame, snakeSpeed)
    window.addEventListener('keydown', this.activateGameControls)
  }

  deactivateGame = () => {
    clearTimeout(this._timeout)
    clearInterval(this._interval)
    window.removeEventListener('keydown', this.activateGameControls)
  }

  placeBug = () => {
    const nextPosition = this.getNextBugPosition()
    this.props.moveBug(nextPosition)
  }

  advanceGame = () => {
    const {
      snake,
      bug,
    } = this.props
    const nextSnakePosition = this.getNextSnakeHeadPosition()

    if (nextSnakePosition in snake.currentPositionsMap) {
      this.props.endGame()
      return
    }

    const subsumePosition = nextSnakePosition === bug.currentPosition
    this.props.moveSnake({
      nextPosition: nextSnakePosition,
      subsumePosition,
    })
    if (subsumePosition) {
      this.placeBug()
    }
  }

  activateGameControls = (event) => {
    const { direction } = this.props.snake
    switch (event.key) {
      case 'ArrowLeft':
        return this.props.changeSnakeDirectionLeft(direction)
      case 'ArrowRight':
        return this.props.changeSnakeDirectionRight(direction)
      case 'ArrowUp':
        return this.props.changeSnakeDirectionUp(direction)
      case 'ArrowDown':
        return this.props.changeSnakeDirectionDown(direction)
    }
  }

  getNumCells = () => {
    return this.getNumRows() * this.getNumColumns()
  }

  getNumColumns = () => {
    const {
      width,
      cellWidth,
    } = this.props.board
    return Math.floor(width / cellWidth)
  }

  getNumRows = () => {
    const {
      height,
      cellHeight,
    } = this.props.board
    return Math.floor(height / cellHeight)
  }

  getNextBugPosition = () => {
    const { currentPositionsMap } = this.props.snake
    const numCells = this.getNumCells()
    let nextPosition

    while (true) {
      nextPosition = Math.ceil(Math.random() * (numCells - 1 ))
      if (!_.has(currentPositionsMap, nextPosition)) {
        break
      }
    }

    return nextPosition
  }

  getNextSnakeHeadPosition = () => {
    const {
      currentPositions,
      direction,
    } = this.props.snake
    const numCells = this.getNumCells()
    const numColumns = this.getNumColumns()
    const currentPosition = currentPositions[currentPositions.length - 1]
    let offsetPosition
    let nextPosition

    switch (direction) {
      case DIRECTIONS.RIGHT:
        offsetPosition = currentPosition + 1
        nextPosition = offsetPosition % numColumns ?
          offsetPosition :
          offsetPosition - numColumns
        return nextPosition
      case DIRECTIONS.LEFT:
        offsetPosition = currentPosition - 1
        nextPosition = currentPosition % numColumns ?
          offsetPosition :
          offsetPosition + numColumns
        return nextPosition
      case DIRECTIONS.UP:
        offsetPosition = currentPosition - numColumns
        nextPosition = offsetPosition >= 0 ?
          offsetPosition :
          numCells + currentPosition - numColumns
        return nextPosition
      case DIRECTIONS.DOWN:
        offsetPosition = currentPosition + numColumns
        nextPosition = offsetPosition < numCells ?
          offsetPosition :
          currentPosition % numColumns
        return nextPosition
    }
  }
}
