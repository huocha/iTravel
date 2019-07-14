import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon/Icon';
import styles from './Item.style';
import { COLORS, FONTS } from '../../utils/constants';
const profileImageSize = 36;
const padding = 12;


export default class Item extends React.Component {
  state = {};

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { name, uid, image, address, type, description } = this.props;

    // Reduce the name to something
    const imgW = this.state.width;
    const imgH = this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <ImageBackground
          resizeMode="contain"
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect,
          }}
          source={{ uri: image }}
        >
          <View style={styles.viewBackground}>
            <Text style={styles.text}>{name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon type="Ionicons" name="ios-pin" size={18} />
              <Text style={styles.subtitleWhite}>{address.street}{", "}{address.city}</Text>
            </View>
          </View>
        </ImageBackground>
        <Metadata name={name} description={description} />
      </View>
    );
  }
}

const Metadata = ({ name, description }) => (
  <View style={styles.padding}>
    <IconBar />
    <Text style={styles.textBlue}>{name}</Text>
    <Text style={styles.subtitle}>{description}</Text>
  </View>
);

const Header = ({ name, image, address }) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.subtitle}>{address.street}{", "}{address.city}</Text>
      </View>
    </View>
    <Icon type="Ionicons" name="ios-more" />
  </View>
);

const IconBar = () => (
  <View style={styles.row}>
    <View style={styles.row}>
      <Icon type="MaterialCommunityIcons" name="heart-outline" />
      <Icon type="MaterialIcons" name="chat-bubble-outline" />
      <Icon type="Feather" name="send" />
    </View>
    <Icon type="MaterialCommunityIcons" name="bookmark-outline" />
  </View>
);
