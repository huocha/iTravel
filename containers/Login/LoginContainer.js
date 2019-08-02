import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginScreen } from '../../screens/Auth';
import * as userActions from '../../actions/userActions';

class LoginContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
		return(
			<LoginScreen {...this.props}/>
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
)(LoginContainer);
