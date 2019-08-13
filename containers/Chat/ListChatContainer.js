import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListChatComponent from '../../components/Chat/ListChatComponent';
import { BackButton, ButtonRight, Title } from '../../components/HeaderTab/ProfileHeader';
import { Feather } from '@expo/vector-icons';
import * as userActions from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';

class ListChatContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
		return(
			<ListChatComponent {...this.props}/>
		);
	}
}

ListChatContainer.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params } = navigation.state;
  return {
    headerLeft: (
      <BackButton onPress={() => navigation.goBack()}/>
    ),
    headerRight: (
      <ButtonRight
        icon={<Feather size={24} name="plus"/>}
        onPress={() => {
          alert('onpress')
        }}
      />
    ),
    headerTintColor: '#fff',
  };
};


function mapStateToProps(state) {
	return {
    user: state.user.infos,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListChatContainer);
