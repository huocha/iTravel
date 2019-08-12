import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { userOnChat, userOffChat, userOnSend } from '../../actions/chatActions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.infos && user.infos.user) {
      const { avatar, username, ...rest } = user.infos.user
      this.setState({ user : { avatar, username }});
    }
    userOnChat(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    userOffChat();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={userOnSend}
        user={this.state.user}
      />
    );
  }
}

export default Chat;
