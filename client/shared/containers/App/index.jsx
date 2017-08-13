import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '!style-loader!css-loader!client/global.css'
import styles from './styles.css'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    photo: PropTypes.string,
  }

  componentWillMount() {}

  render() {
    return (
      <div className={styles.app}>
        {this.props.children}
      </div>
    )
  }
}
