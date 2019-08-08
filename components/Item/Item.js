import React from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import styles from './Item.style';
import { COLORS, FONTS } from '../../utils/constants';
const profileImageSize = 36;
const padding = 12;

const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a === null || a === undefined || b === null || b === undefined) return false;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

export default class Item extends React.Component {
  state = { likes: [] };

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
    if (Object.keys(this.props.user).length) {
      this.setState({ likes: this.props.user.infos.user.likes })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!equals(nextState, this.state)){
      return true;
    }
    if (!equals(this.props.user.infos.user.likes, nextProps.user.infos.user.likes)) {
      console.log('hee')
      this.setState({ likes: nextProps.user.infos.user.likes })
      return true;
    }
    return false;
  }

  onActionLike = (itemKey) => {
    const { user, userActions } = this.props;
    const uid = user.infos.uid;
    const { likes } = this.state;

    if (!likes.includes(itemKey)){
      this.setState({ likes: likes.concat(itemKey) });

      userActions.userLike(uid, itemKey, userActions);
    }
    else {
      this.setState({ likes: likes.filter(like => like !== itemKey) });

      userActions.userDislike(uid, itemKey, userActions);
    }
  }

  render() {
    const {
      name,
      user,
      itemKey,
      image,
      address,
      type,
      description,
      userActions
    } = this.props;

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
        <Metadata
          likes={this.state.likes}
          itemKey={itemKey}
          onActionLike={this.onActionLike}
          name={name}
          description={description}
        />
      </View>
    );
  }
}

const Metadata = ({ itemKey, onActionLike, name, description, likes }) => (
  <View style={styles.padding}>
    <IconBar likes={likes} itemKey={itemKey} onActionLike={onActionLike} />
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

const IconBar = ({ likes, itemKey, onActionLike }) => {
  const liked = likes.includes(itemKey);
  return (
    <View style={styles.row}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onActionLike(itemKey)}>
          <Icon type="MaterialCommunityIcons" name={liked ? "heart" : "heart-outline"} />
        </TouchableOpacity>
        <Icon type="MaterialIcons" name="chat-bubble-outline" />
        <Icon type="Feather" name="send" />
      </View>
      <Icon type="MaterialCommunityIcons" name="bookmark-outline" />
    </View>
  );
}
