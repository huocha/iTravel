import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';
import Search from 'react-native-search-box';
import UserItem from '../UserItem/UserItem';

class UserListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const { user, searchActions } = this.props;

    const data = { size: 5, start: undefined, currentUid: user.uid };
    searchActions.fetchUsers(data, searchActions)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.users.length !== nextState.users.length) {
      return true;
    }
    if (nextProps.search !== this.props.search) {
      this.setState({
        users: nextProps.search.lists,
      })
      return true;
    }
    return false;
  }

  _onPress = item => {
    console.log(item)
  }

  render(){

    return (
      <View>
        <Search
          ref="search_box"
          onSearch={this.onSearch}
          backgroundColor={COLORS.MAIN_BLUE_COLOR}
          inputStyle={{ fontFamily: FONTS.MEDIUM }}
          cancelButtonTextStyle={{ fontFamily: FONTS.MEDIUM }}
        />
        <ScrollView>
          <FlatList
            keyExtractor={item => item.id}
            data={this.state.users}
            renderItem={({item, index, separators}) => (
              <UserItem
                avatar={item.avatar}
                description={item.bio}
                username={item.username}
                onPress={() => this._onPress(item)}
                separators={separators}
              />
            )}
          />
        </ScrollView>
      </View>
    )
  }
}

export default UserListComponent
