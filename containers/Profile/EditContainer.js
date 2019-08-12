import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EditProfileScreen } from '../../screens/User';
import { BackButton } from '../../components/HeaderTab/ProfileHeader';
import * as userActions from '../../actions/userActions';

class EditProfileContainer extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    console.log('he')
    return {
      headerLeft: <BackButton onPress={() => navigation.goBack()}/>
    }
  };

  constructor(props){
    super(props)
  }
  render(){
		return(
			<EditProfileScreen {...this.props}/>
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
)(EditProfileContainer);
