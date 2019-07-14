import firebase from 'firebase';
import React, { Component } from 'react';
import { View, LayoutAnimation, RefreshControl } from 'react-native';
import Search from 'react-native-search-box';

import { COLORS, FONTS } from '../utils/constants';
import List from '../components/List';
import Fire from '../Fire';

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;

export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
    search: '',
  };

  componentDidMount() {
    // Check if we are signed in...
    if (Fire.shared.uid) {
      // If we are, then we can get the first 5 posts
      this.makeRemoteRequest();
    } else {
      // If we aren't then we should just start observing changes. This will be called when the user signs in
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.makeRemoteRequest();
        }
      });
    }
  }

  // Append the item to our states `data` prop
  addPosts = posts => {
    if (!Object.keys(posts).length){ console.log("no more"); return; }
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts,
      };
      return {
        data,
        posts: Object.values(data),
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async lastKey => {
    if (this.state.loading) { return; }
    this.setState({ loading: true });

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await Fire.shared.getPaged({
      size: PAGE_SIZE,
      start: lastKey,
    });

    this.lastKnownKey = cursor;
    // Iteratively add posts
    let posts = {};
    for (let child of data) { posts[child.key] = child; }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false });
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />
          }
          onPressFooter={this.onPressFooter}
          data={this.state.posts}
        />
      </View>
    );
  }
}
