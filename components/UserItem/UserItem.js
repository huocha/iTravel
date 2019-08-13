import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Text,
  View,
  Image,
} from 'react-native';
import styles from './UserItem.style.js';

class UserItem extends Component {
  render() {
    const { avatar, username, description, separators, onPress } = this.props;
    return (
      <TouchableHighlight
        onPress={onPress}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={{ padding: 15, display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 0.2 }}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatarImg}
            />
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.textBold}>{username}</Text>
            <Text style={styles.textRegular}>{description}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default UserItem
