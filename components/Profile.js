import React, { Component } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native'
import {
  TabBar,
  TabView,
  TabViewAnimated,
  TabViewPagerPan,
  TabViewPagerScroll,
} from 'react-native-tab-view'
import PropTypes from 'prop-types'
import { mansonry } from '../utils/image'
import Posts from './Post/Posts'


class ProfileScreen extends Component {
  static propTypes = {
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

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }

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
  }

  componentWillMount() {
    this.setState({
      postsMasonry: mansonry(this.props.posts, 'imageHeight'),
    })
  }

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
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorTab}
        pressOpacity={0.8}
        renderLabel={this._renderLabel(props)}
        style={styles.tabBar}
      />
    )
  }

  _renderScene = ({ route: { key } }) => {
    console.log({ key })
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
    const { avatar, avatarBackground, name, bio } = this.props
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
              <Text style={styles.coverName}>{name}</Text>
              <Text style={styles.coverBio}>{bio}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.profileImage}
          />
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

  render() {

    return (
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
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  coverBio: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  coverContainer: {
    marginBottom: 55,
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  coverMetaContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  coverTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coverTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  mansonryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: 'absolute',
  },
  sceneContainer: {
    marginTop: 10,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  tabBar: {
    backgroundColor: 'transparent',
    marginBottom: -10,
    marginLeft: 130,
    marginRight: 15,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: 'relative',
    zIndex: 10,
  },
  tabRow: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  tabLabelNumber: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 2,
  },
  tabLabelText: {
    color: 'black',
    fontSize: 9,
    textAlign: 'left',
  },
})
export default ProfileScreen
