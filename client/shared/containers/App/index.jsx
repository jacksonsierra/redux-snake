import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from 'shared/components/Header'
import Notification from 'shared/containers/Notification'
import { fetchCurrentUser } from 'shared/actions'
import styles from './styles.css'

const mapStateToProps = (state) => ({
  photo: state.user.profile.photo,
})

const mapDispatchToProps = {
  fetchCurrentUser,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    photo: PropTypes.string,
    fetchCurrentUser: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchCurrentUser()
  }

  render() {
    const {
      children,
      location,
      photo,
    } = this.props

    return (
      <div className={styles.app}>
        <Header
          pathname={location.pathname}
          photo={photo}
        />
        <Notification />
        {children}
      </div>
    )
  }
}
