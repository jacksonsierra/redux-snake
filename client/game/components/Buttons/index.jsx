import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'


export default class Buttons extends Component {
  static propTypes = {
    started: PropTypes.bool.isRequired,
    ended: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
  }

  render() {
    const {
      started,
      ended,
      startGame,
      resetGame,
    } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button
            onClick={startGame}
            disabled={started}
          >
            Start
          </button>
          <button
            onClick={resetGame}
            disabled={!started}
          >
            Reset
          </button>
        </div>
        {started && ended && (
          <span className={styles.status}>
            Game Over
          </span>
        )}
      </div>
    )
  }
}
