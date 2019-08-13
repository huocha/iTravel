import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FeedScreen } from '../../screens/Feed';
import { ButtonRight, Title } from '../../components/HeaderTab/ProfileHeader';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as userActions from '../../actions/userActions';
import * as feedActions from '../../actions/feedActions';

class FeedContainer extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      headerTitle: (
        <Title title='iTravel'/>
      ),
      headerRight: (
        <ButtonRight
          onPress={() => navigation.navigate("ListChat")}
          icon={<Feather size={24} name="send"/>}
        />
      ),
      headerTintColor: '#fff',
    };
  };

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
