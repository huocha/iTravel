import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { FONTS } from '../../utils/constants';
import styles from './Footer.style';

export default class Footer extends React.Component {
  onPress = () => {
    this.props.onPress && this.props.onPress();
  };
  render() {
    const { onPress, style, ...props } = this.props;
    return (
      <TouchableHighlight
        underlayColor={'#eeeeee'}
        {...props}
        onPress={this.onPress}
        style={[styles.touchable, style]}
      >
        <Text style={styles.text}>Load more...</Text>
      </TouchableHighlight>
    );
  }
}
