import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../mock/contact.json'

import Profile from '../components/Profile'

const ProfileScreen = () => {
  return (<Profile {...contactData} />)
}

ProfileScreen.navigationOptions = () => ({
  header: null,
})

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
