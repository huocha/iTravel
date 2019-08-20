import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
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
import moment from 'moment';

class NewPostScreenContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const { text, image, onUploadPost, isLoading } = params ? params : {};

    return {
      title: 'New Post',
      headerRight: isLoading ?
        (
          <View style={{ paddingRight: 15 }}>
            <ActivityIndicator />
          </View>
        ) :
        (
          <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
            <HeaderButtons.Item
              title="Share"
              onPress={() => onUploadPost({ text, image })}
            />
          </HeaderButtons>
        )
    }
  };

  constructor(props){
    super(props)
  }

  onUploadPost = async ({ text, image}) => {
    const { user, post, postActions, navigation } = this.props;
    navigation.setParams({ isLoading: true });

    const uid = user.infos.uid;

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
      navigation.navigate("Feed");

    } else {
      alert('Need valid description');
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onUploadPost: this.onUploadPost
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
