import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserListComponent from '../../components/Search/UserListComponent';

class UserSearchScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserListComponent {...this.props} />
    )
  }
}

UserSearchScreen.navigationOptions = () => ({
  header: null,
})

UserSearchScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default UserSearchScreen
