import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../utils/userAction';
import firebase from 'firebase';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import EditProfile from '../../components/Profile/EditProfile';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getCurrentUser()
    .then(result => {
      this.setState({ user: {...result.user, uid: result.uid } })
    })
    .catch(error => alert(error))
  }
  
  render() {
    const { user, posts } = this.state
    return (
      <EditProfile {...this.props} {...user} posts={posts} />
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
