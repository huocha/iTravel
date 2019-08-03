import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import EditProfile from '../../components/Profile/EditProfile';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { posts } = this.state
    return (
      <EditProfile {...this.props} posts={posts} />
    )
  }
}

EditProfileScreen.navigationOptions = () => ({
  // header: null,
})

EditProfileScreen.propTypes = {
  // navigation: PropTypes.object.isRequired,
}

const ConnectedProfile = connectActionSheet(EditProfileScreen)

export default ConnectedProfile
