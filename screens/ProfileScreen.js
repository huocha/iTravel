import React, { Component } from 'react'
import PropTypes from 'prop-types'
import contactData from '../mock/contact.json';
import { getCurrentUser } from '../utils/userAction';
import firebase from 'firebase';
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
      <Profile {...user} posts={posts} />
    )
  }
}

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
