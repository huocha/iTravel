import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './CustomNotification.style';
import moment from 'moment';

class CustomNotification extends Component {
  render(){
    console.log(this.props, 'he')
    const { image, title, body, timeText } = this.props;
    return (
      <View style={styles.popupContentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: body.image }} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.contentTitleContainer}>
            <Text style={styles.contentTitle}>{title || ''}</Text>
          </View>
          <View style={styles.contentTextContainer}>
            <Text style={styles.contentText}>{body.message || ''}</Text>
          </View>
          <Text style={styles.headerTime} numberOfLines={1}>
            {moment(timeText).fromNow() || ''}
          </Text>
        </View>
      </View>
    )
  }
}
export default CustomNotification
