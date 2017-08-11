import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from 'game/components/Board';
import GameControls from 'game/components/GameControls';
import Score from 'game/components/Score';
import styles from './styles.css';

const mapStateToProps = (state) => {};

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class Game extends Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <GameControls />
        <Score />
        <Board />
      </div>
    );
  }
}
