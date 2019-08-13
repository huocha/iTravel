/* get list of user */
import React, { Component } from React;
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList
}

class ListChat extends Component {
  render() {
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      enabled={Platform.OS === "ios" ? true : false}
    >
      <ScrollView
        ref={r => (this.scroller = r)}
        scrollEventThrottle={16}
        //onScroll={this.handleScroll}
        //onLayout={this.handleLayout}
        //onContentSizeChange={this.handleContentChange}
      >
        <FlatList
          //style={{ padding: MARGIN_DIMENSION }}
          data={messages}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <ChatMessage
              message={item.message}
              isSender={item.userName === user.name}
              userName={item.userName}
            />
          )}
        />
      </ScrollView>
      <ChatInput
        placeholder="Message"
        onSend={this.sendMessage}
        value={chatMessage}
        onChangeText={text => this.onChangeMessage(text)}
      />
    </KeyboardAvoidingView>
  }
}
