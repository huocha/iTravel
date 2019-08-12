import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import styles from './ProfileHeader.style';

const Title = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styles.containerStyle, ...props.containerStyle}}
    >
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  )
};

const LeftButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styles.buttonLeftStyle, ...props.containerStyle}}
    >
      {props.icon}
    </TouchableOpacity>
  )
}

export {
  Title,
  LeftButton
}
