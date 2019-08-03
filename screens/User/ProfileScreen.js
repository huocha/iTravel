import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../utils/userAction';
import firebase from 'firebase';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import Profile from '../../components/Profile/Profile';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  render() {
    return (
      <Profile {...this.props} posts={this.state.posts} />
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
