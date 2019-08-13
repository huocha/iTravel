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
    const { item, separators, onPress } = this.props;
    return (
      <TouchableHighlight
        onPress={onPress}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={{ padding: 15, display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 0.2 }}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.avatarImg}
            />
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.textBold}>{item.username}</Text>
            <Text style={styles.textRegular}>{item.bio}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default UserItem
