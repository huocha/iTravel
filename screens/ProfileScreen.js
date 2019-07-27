import React, { Component } from 'react'
import PropTypes from 'prop-types'
import contactData from '../mock/contact.json';
import { getCurrentUser } from '../utils/userAction';
import firebase from 'firebase';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import Profile from '../components/Profile';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      posts: []
    }
  }
  componentDidMount() {
    getCurrentUser()
    .then(result => {
      this.setState({ user: result.user })
    })
    .catch(error => alert(error))
  }
  render() {
    const { user, posts } = this.state
    return (
      <Profile {...this.props} {...user} posts={posts} />
    )
  }
}

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const ConnectedProfile = connectActionSheet(ProfileScreen)

export default ConnectedProfile
