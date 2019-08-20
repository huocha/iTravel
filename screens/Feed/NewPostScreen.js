import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Image, TextInput, View } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';

class NewPostScreen extends Component {
  state = { text: '' };

  render() {
    // console.log(this.props.posts)
    const { image } = this.props.navigation.state.params;
    return (
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={text => {
            this.setState({ text });
            this.props.navigation.setParams({ text });
          }}
        />
      </View>
    );
  }
}

export default NewPostScreen;
