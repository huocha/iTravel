import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FeedScreen } from '../../screens/Feed';
import * as userActions from '../../actions/userActions';
import * as feedActions from '../../actions/feedActions';

class FeedContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
		return(
			<FeedScreen {...this.props}/>
		);
	}
}


function mapStateToProps(state) {
	return {
    user: state.user,
    feed: state.feed,
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
)(FeedContainer);
