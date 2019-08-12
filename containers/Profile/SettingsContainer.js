import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SettingsScreen } from '../../screens/User';
import * as userActions from '../../actions/userActions';

class Settings extends Component {
  constructor(props){
    super(props)
  }
  render(){
		return(
			<SettingsScreen {...this.props}/>
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
)(Settings);
