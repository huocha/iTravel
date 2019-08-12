import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProfileScreen } from '../../screens/User';
import { LeftButton, Title } from '../../components/HeaderTab/ProfileHeader';
import * as userActions from '../../actions/userActions';

class ProfileContainer extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      headerTitle: (
        <Title
          title={params ? params.user.username : ''}
          onPress={() => { console.log(params) }}
        />
      ),
      headerRight: (
        <LeftButton
          onPress={() => alert('This is a button!')}
        />
      ),
      headerTintColor: '#fff',
    };
  };

  constructor(props){
    super(props)
    this.props.navigation.setParams({
      user: props.user.infos.user
    })
  }

  render(){
		return(
			<ProfileScreen {...this.props}/>
		);
	}
}

function mapStateToProps(state) {
	return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileContainer);
