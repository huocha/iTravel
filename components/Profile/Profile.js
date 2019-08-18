/*
* author: Jasmine (jasminee.ngx@gmail.com)
* #TODO: remove the old image when updating
*/

import React, { Component } from 'react'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Button,
  FlatList,
  AsyncStorage,
} from 'react-native'
import {
  TabBar,
  TabView,
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
} from 'react-native-tab-view';
import Drawer from 'react-native-drawer';
import ControlPanel from '../Drawer/ControlPanelComponent';
import PropTypes from 'prop-types'
import { mansonry } from '../../utils/image'
import Posts from '../Post/Posts'
import { COLORS, FONTS } from '../../utils/constants';
import { ButtonOutline } from '../Button/ButtonComponent';
import firebase from 'firebase';
import styles from './Profile.style';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      drawerOpen: false,
      drawerDisabled: false,
    }
  }

  componentDidMount() {
    const { user, postActions } = this.props;

    const uid = user.infos.uid;
    postActions.fetchPosts(uid, postActions);

  }

  componentWillMount() {
    /*this.setState({
      postsMasonry: mansonry(this.props.posts, 'imageHeight'),
    })*/
  }

  closeDrawer = () => {
    console.log('close')
    this._drawer.close()
  };

  openDrawer = () => {
    this._drawer.open()
  };

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

  _renderBio = () => {
    const { bio, username, website } = this.props.user.infos.user;

    return (
      <View style={{ paddingVertical: 15 }}>
        <Text style={styles.textBold}>{username}</Text>
        <Text style={styles.textRegular}>{bio}</Text>
        <Text style={styles.textRegular}>{website}</Text>
      </View>
    )
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
        <View style={{ paddingHorizontal: 20 }}>
          {this._renderBio()}
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

    switch (key) {
      case '1':
        return this.renderMansonry2Col()
      case '2':
        return this.renderMansonry2Col()
      case '3':
        return this.renderMansonry2Col()
      default:
        return <p>hello world</p>
    }
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
      <View style={{ padding: 15 }}>
        <FlatList
          data={this.props.post.posts}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.item} />
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View>
    )
  }

  setDialogVisible = (visible) => {
    this.setState({ dialogVisible: visible });
  }

  onLogout = () => {
    this.props.userActions.logout(this.props.userActions)
    this.props.navigation.navigate('Auth');
  }

  render() {
    console.log(this.props.post)
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="static"
        side="right"
        content={
          <ControlPanel closeDrawer={this.closeDrawer} />
        }
        open={this.props.global.openDrawer}
        acceptDoubleTap
        styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => this.props.globalActions.openDrawer()}
        onClose={() => this.props.globalActions.closeDrawer()}
        openDrawerOffset={(viewport) => {
          const { width } = viewport;
          return width * 0.6
        }}
        captureGestures={false}
        disabled={this.state.drawerDisabled}
      >
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
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
      </Drawer>
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
