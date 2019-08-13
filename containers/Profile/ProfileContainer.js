import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProfileScreen } from '../../screens/User';
import { LeftButton, Title } from '../../components/HeaderTab/ProfileHeader';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as userActions from '../../actions/userActions';
import * as globalActions from '../../actions/globalActions';

class ProfileContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
		return(
			<ProfileScreen {...this.props}/>
		);
	}
}

ProfileContainer.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerTitle: (
      <Title
        title={params ? params.user.username : ''}
        onPress={() => {
          console.log("title")
        }}
      />
    ),
    headerRight: (
      <LeftButton
        icon={<Feather size={24} name="menu"/>}
        onPress={() => {
          if (params) {
            params.globalActions.toggleDrawer();
          }
        }}
      />
    ),
    headerTintColor: '#fff',
  };
};

function mapStateToProps(state) {
	return {
    user: state.user,
    global: state.global
  };
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
    globalActions: bindActionCreators(globalActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileContainer);
