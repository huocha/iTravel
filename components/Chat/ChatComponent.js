import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
//import { userOnChat, userOffChat, userOnSend } from '../../actions/chatActions';
import Conversation from '../../actions/chatActions';
import { View, Text } from 'react-native';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const { user, navigation } = this.props;
    const user2Id = navigation.state.params.id;

    Conversation.shared.setUser2(user2Id);

    if (user.infos && user.infos.user) {
      const { avatar, username, uid, ...rest } = user.infos.user
      this.setState({ user : { _id: user.infos.uid, avatar, username }});
    }

    Conversation.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillMount() {
    Conversation.shared.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Conversation.shared.send}
        user={this.state.user}
      />
    );
  }
}

export default Chat;
