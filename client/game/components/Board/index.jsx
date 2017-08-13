import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Cell from 'client/game/components/Cell'
import styles from './styles.css'


export default class Board extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    cellWidth: PropTypes.number.isRequired,
    numCells: PropTypes.number.isRequired,
    snake: PropTypes.object,
    bug: PropTypes.object,
  }

  render() {
    const {
      height,
      width,
      cellHeight,
      cellWidth,
      numCells,
      snake,
      bug,
    } = this.props
    return (
      <div
        className={styles.container}
        style={{ height, width }}
      >
        {Array(...{ length: numCells }).map((value, index) => (
          <Cell
            key={index}
            height={cellHeight}
            width={cellWidth}
            hasBug={index === bug.currentPosition}
            hasSnake={_.has(snake.currentPositionsMap, index)}
          />
        ))}
      </div>
    )
  }
}
