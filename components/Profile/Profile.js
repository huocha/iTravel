import React, { Component } from 'react'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from 'react-native'
import {
  TabBar,
  TabView,
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
} from 'react-native-tab-view';

import PropTypes from 'prop-types'
import { mansonry } from '../../utils/image'
import Posts from '../Post/Posts'
import { COLORS, FONTS } from '../../utils/constants';
import { ButtonOutline } from '../Button/ButtonComponent';
import firebase from 'firebase';
import styles from './Profile.style';

class ProfileScreen extends Component {

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: '1', title: 'PHOTOS', count: 687 },
        { key: '3', title: 'FOLLOWERS', count: '1.3 M' },
        { key: '2', title: 'FOLLOWING', count: 90 },
      ],
    },
    postsMasonry: {},
    dialogVisible: false,
  }

  componentWillMount() {
    /*this.setState({
      postsMasonry: mansonry(this.props.posts, 'imageHeight'),
    })*/
  }

  onEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  }

  _onOpenActionSheet = () => {

    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Log out', 'Save', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
        case 0:
          this.onLogout()
          break;
        default:
          return;
        }
      },
    );
  };

  _handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  _renderHeader = props => {
    return (
      <View>
        <TabBar
          {...props}
          indicatorStyle={styles.indicatorTab}
          pressOpacity={0.8}
          renderLabel={this._renderLabel(props)}
          style={styles.tabBar}
        />
        <View style={{ padding: 5, backgroundColor: 'red' }}>
          <Text>{"hello"}</Text>
          <ButtonOutline
            containerStyle={{ height: 28 }}
            textStyle={{ fontSize: 16 }}
            title="Edit profile"
            onClick={this.onEditProfile}
          />
        </View>
      </View>
    )
  }

  _renderScene = ({ route: { key } }) => {
    return (<Text>{key}</Text>)
    /*switch (key) {
      case '1':
        return <Text>{key}</Text>
      case '2':
        return this.renderMansonry2Col()
      case '3':
        return this.renderMansonry2Col()
      default:
        return <p>hello world</p>
    }*/
  }

  _renderLabel = props => ({ route, index }) => {
    return (
      <View style={styles.tabRow}>
        <Text style={styles.tabLabelNumber}>
          {route.count}
        </Text>
        <Text style={styles.tabLabelText}>
          {route.title}
        </Text>
      </View>
    )
  }

  _renderPager = props => {
    return Platform.OS === 'ios' ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    )
  }

  renderContactHeader = () => {
    const { avatar, avatarBackground, username, bio } = this.props.user.infos.user;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: avatarBackground,
            }}
            style={styles.coverImage}
          >
            <View style={styles.coverTitleContainer}>
              <Text style={styles.coverTitle} />
            </View>
            <View style={styles.coverMetaContainer}>
              <Text style={styles.coverName}>{username}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <TouchableHighlight
            onPress={() => {
              this._onOpenActionSheet();
            }}
          >
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.profileImage}
          />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderMansonry2Col = () => {
    return (
      <View style={styles.mansonryContainer}>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={this.state.postsMasonry.leftCol}
          />
        </View>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={this.state.postsMasonry.rightCol}
          />
        </View>
      </View>
    )
  }

  setDialogVisible = (visible) => {
    this.setState({ dialogVisible: visible });
  }

  onLogout = () => {

    firebase.auth().signOut().then(function() {
      AsyncStorage.removeItem('userInfos');

      this.props.navigation.navigate('Auth');
    }).catch(function(error) {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert(errorMessage);
    });

  }

  render() {

    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
          {/*<Dialog
            visible={this.state.dialogVisible}
            onTouchOutside={() => this.setDialogVisible(false)}
            width={0.6}
            >
            <DialogContent>
              <TouchableOpacity
                onPress={this.onLogout}
                style={styles.dialogTouch}
              >
                <Text style={styles.dialogText}>Log out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.dialogTouch}
              >
                <Text style={styles.dialogText}>Desactivate</Text>
              </TouchableOpacity>
            </DialogContent>
          </Dialog>*/}
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}
            <TabView
              navigationState={this.state.tabs}
              onIndexChange={this._handleIndexChange}
              renderTabBar={this._renderHeader}
              renderPager={this._renderPager}
              renderScene={this._renderScene}
              style={[styles.tabContainer, this.props.tabContainerStyle]}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

/*ProfileScreen.propTypes = {
  avatar: PropTypes.string.isRequired,
  avatarBackground: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tabContainerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      imageHeight: PropTypes.number,
      imageWidth: PropTypes.number,
      postWidth: PropTypes.number,
    })
  ).isRequired,
}

ProfileScreen.defaultProps = {
  containerStyle: {},
  tabContainerStyle: {},
}*/

export default ProfileScreen
