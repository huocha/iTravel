import firebase from 'firebase';
import React, { Component } from 'react';
import { View, LayoutAnimation, RefreshControl } from 'react-native';
import Search from 'react-native-search-box';
import { COLORS, FONTS } from '../../utils/constants';
import List from '../../components/List';

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;

class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
    search: '',
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { post } = this.props;
    console.log('||||', post.posts)
    console.log('-----')
    if (this.state.posts.length !== nextState.posts.length) {
      return true;
    }
    if (!post.posts.length && nextProps.post.posts.length) {
      //this.lastKnownKey = nextProps.post.cursor;
      console.log('---')
      this.setState({ posts: nextProps.post.posts });

      return true;
    }
    if (post.posts.length && post.posts[0].key !== nextProps.post.posts[0].key) {
      //this.lastKnownKey = nextProps.post.cursor;
      console.log('|||')
      this.setState({ posts: nextProps.post.posts.concat(this.state.posts) });
      return true;
    }
    return true;
  }


  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async lastKey => {

    const { user, post, postActions } = this.props;
    if (post.isLoading) { return; }
    const uid = user.infos.uid;
    await postActions.fetchPosts(lastKey, uid, postActions);

    /*const { feed, feedActions } = this.props;
    if (feed.isLoading) { return; }

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const result = await feedActions.getFeed(PAGE_SIZE, lastKey , feedActions)*/
  };

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  onCancel = () => {
    return new Promise(function(resolve, reject) {
      this.setState({ posts: Object.values(this.state.data) })
    });
  }

  // Important: You must return a Promise
  onSearch = (searchText) => {
    return new Promise((resolve, reject) => {
      if (!searchText) {
        this.setState({ posts: Object.values(this.state.data) })
      }
      const searchedData = this.state.posts.filter((post) =>{
        return post.name.includes(searchText) || post.address.street.includes(searchText)
          || post.address.city.includes(searchText)
      })

      this.setState({ posts: searchedData });
      resolve();
    });
  }

  render() {
    const { post } = this.props;

    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    return (
      <View>
        <Search
          ref="search_box"
          onSearch={this.onSearch}
          backgroundColor={COLORS.MAIN_BLUE_COLOR}
          inputStyle={{ fontFamily: FONTS.MEDIUM }}
          cancelButtonTextStyle={{ fontFamily: FONTS.MEDIUM }}
        />
        <List
          user={this.props.user}
          userActions={this.props.userActions}
          refreshControl={
            <RefreshControl
              refreshing={post.isLoading}
              onRefresh={() => { /* #TODO */ }}
            />
          }
          onPressFooter={this.onPressFooter}
          data={this.state.posts}
        />
      </View>
    );
  }
}

export default FeedScreen;
