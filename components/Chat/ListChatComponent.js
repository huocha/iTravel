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

class ListChatComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    const { user, conversationActions } = this.props;
    conversationActions.fetchConversations(user.uid, conversationActions);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.lists.length !== nextState.lists.length) {
      return true;
    }
    if (nextProps.conversation !== this.props.conversation) {
      if (nextProps.conversation.conversations.length) {
        this.setState({ lists: nextProps.conversation.conversations });
      }
      else if (nextProps.conversation.error) {
        alert(nextProps.conversation.error)
      }
      return true;
    }

    return false;
  }

  _onPress = item => {
    this.props.navigation.navigate('Chat', {
      id: item.id
    });
  }

  render(){

    return (
      <View>
        <Search
          ref="search_box"
          onSearch={this.onSearch}
          backgroundColor={COLORS.LIGHT_GREY}
          inputStyle={{ fontFamily: FONTS.MEDIUM }}
          cancelButtonTextStyle={{ fontFamily: FONTS.MEDIUM }}
        />
        <ScrollView>
          <FlatList
            keyExtractor={item => item.id}
            data={this.state.lists}
            renderItem={({item, index, separators}) => (
              <UserItem
                avatar={item.recipient.avatar}
                username={item.recipient.username}
                description={item.latestMessage.text}
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

export default ListChatComponent
