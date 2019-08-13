import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import styles from './ProfileHeader.style';

const BackButton = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
      >
        <Feather style={{ marginHorizontal: 8 }} size={26} name="chevron-left" />
      </TouchableOpacity>
    </View>
  )
}

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

const ButtonRight = props => {
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
  ButtonRight,
  BackButton
}
