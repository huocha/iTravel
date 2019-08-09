import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProfileScreen } from '../../screens/User';
import * as userActions from '../../actions/userActions';

class ProfileContainer extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      headerTitle: (<Text>huocha</Text>),
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#000"
        />
      ),
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        //backgroundColor: '#000',
      },
      headerTintColor: '#fff',
    };
  };

  constructor(props){
    super(props)
    //console.log(props)
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
