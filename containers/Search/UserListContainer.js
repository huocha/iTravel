import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserSearchScreen } from '../../screens/Search';
import * as userActions from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';

class UserListContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
		return(
			<UserSearchScreen {...this.props}/>
		);
	}
}


function mapStateToProps(state) {
	return {
    user: state.user.infos,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserListContainer);
