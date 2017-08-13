import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'


export default class Cell extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    hasBug: PropTypes.bool,
    hasSnake: PropTypes.bool,
  }

  static defaultProps = {
    hasBug: false,
    hasSnake: false,
  }

  render() {
    const {
      height,
      width,
      hasBug,
      hasSnake,
    } = this.props

    return (
      <div
        className={styles.container}
        style={{ height, width }}
      >
        {hasBug && <div className={styles.bug}></div>}
        {hasSnake && <div className={styles.snake}></div>}
      </div>
    )
  }
}
