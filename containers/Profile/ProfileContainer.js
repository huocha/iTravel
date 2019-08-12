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
  static navigationOptions = ({ navigation, navigationOptions }) => {
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

  constructor(props){
    super(props)
    this.props.navigation.setParams({
      user: props.user.infos.user,
      globalActions: props.globalActions,
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
