import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChatScreen from '../../components/Chat/ChatComponent';
import * as userActions from '../../actions/userActions';
import * as feedActions from '../../actions/feedActions';

class ChatContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
		return(
			<ChatScreen {...this.props}/>
		);
	}
}


function mapStateToProps(state) {
	return {
    user: state.user,
    chat: state.chat,
  };
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
    feedActions: bindActionCreators(feedActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
