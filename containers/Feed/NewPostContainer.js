import React, { Component } from 'react';
import { Text, Button, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NewPostScreen } from '../../screens/Feed';
import { ButtonRight, Title } from '../../components/HeaderTab/ProfileHeader';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import HeaderButtons from 'react-navigation-header-buttons';

import shrinkImageAsync from '../../utils/shrinkImageAsync';
import { uploadImageAsync } from '../../utils/uploadPhoto';

import * as userActions from '../../actions/userActions';
import * as postActions from '../../actions/postActions';

import firebase from 'firebase';
import moment from 'moment';

class NewPostScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const { text, image, post, postActions, uid } = params ? params : {};
    return {
      title: 'New Post',
      headerRight: post.isLoading ? <ActivityIndicator /> :
        (
          <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
            <HeaderButtons.Item
              title="Share"
              onPress={async () => {

                if (text && image) {

                  const { uri: reducedImage, width, height } = await shrinkImageAsync(
                    image,
                  );

                  const remoteUri = await uploadImageAsync(uid, undefined, reducedImage);

                  const data = {
                    text: text.trim(),
                    image: remoteUri,
                    user: uid,
                    createdAt: moment().format()
                  }
                  await postActions.userAddPost(data, postActions);

                  navigation.setParams({});
                  navigation.navigate('Home');
                } else {
                  alert('Need valid description');
                }
              }}
            />
          </HeaderButtons>
        )
    }
  };


  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.navigation.setParams({
      post: this.props.post,
      uid: this.props.user.infos.uid,
      postActions: this.props.postActions
    });
  }

  render(){
		return(
			<NewPostScreen {...this.props}/>
		);
	}
}


function mapStateToProps(state) {
	return {
    user: state.user,
    post: state.post,
  };
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
    postActions: bindActionCreators(postActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewPostScreenContainer);
