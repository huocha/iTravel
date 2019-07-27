import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { COLORS, FONTS } from '../../utils/constants';

const ButtonPrimary = props => {
  return (
    <View style={props.viewStyle}>
      <TouchableOpacity
        onPress={props.onClick}
        style={{...styles.containerStyle, ...props.containerStyle}}
      >
        {props.isLoading
          ? (<ActivityIndicator color="#fff" />)
          : (
            <Text style={{...styles.textStyle,...props.textStyle}}>
              {props.title}
            </Text>
          )
        }
      </TouchableOpacity>
    </View>
  )
}

const ButtonLink = props => {
  const textStyle = {
    ...styles.link,
    ...props.textStyle
  }

  const containerStyle = {
    paddingHorizontal: 2
  }

  return (
    <View style={props.viewStyle}>
      <TouchableOpacity
        onPress={props.onClick}
        style={containerStyle}
      >
        <Text style={textStyle}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const ButtonOutline = props => {
  const containerStyle = {
    ...styles.containerStyle,
    ...props.containerStyle,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
  }
  const textStyle = {
    ...styles.textStyle,
    ...props.textStyle,
    color: COLORS.CYAN,
  }

  return (
    <View style={props.viewStyle}>
      <TouchableOpacity
        onPress={props.onClick}
        style={containerStyle}
      >
        <Text style={textStyle}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    borderRadius: 4,
    backgroundColor: COLORS.CYAN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#fff',
    fontFamily: FONTS.MEDIUM,
    fontSize: 18
  },
  link: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.CYAN,
  }
});

export {
  ButtonPrimary,
  ButtonOutline,
  ButtonLink,
}
