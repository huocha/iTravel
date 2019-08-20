import React from 'react';
import {
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from '../Icon/Icon';
import styles from './Item.style';
import { doubleTap, equals } from '../../utils/misc';

export default class Item extends React.Component {
  state = { likes: [], animationDisplay: 'none' };

  componentDidMount() {

    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
    if (Object.keys(this.props.currentUser).length) {
      this.setState({ likes: this.props.currentUser.infos.user.likes })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!equals(nextState, this.state)){
      return true;
    }
    if (!equals(this.props.currentUser.infos.user.likes, nextProps.currentUser.infos.user.likes)) {
      this.setState({ likes: nextProps.currentUser.infos.user.likes })
      return true;
    }
    return false;
  }

  handleDoubleTap = () => {
    const { itemKey } = this.props;
    doubleTap(() => {
      this.animation.play();
      this.onActionLike(itemKey, true);
      if (!this.state.likes.includes(itemKey)) {
        this.setState({ animationDisplay: 'flex' });

        setTimeout(_ => this.setState({ animationDisplay: 'none' }) , 3*1000)
      }
    })
  }

  onActionLike = (itemKey, doubleTap) => {
    const { currentUser, userActions } = this.props;
    const uid = currentUser.infos.uid;
    const { likes } = this.state;
    if (!likes) { return; }
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
      user,
      itemKey,
      image,
      address,
      type,
      text,
      userActions
    } = this.props;

    return (
      <View style={{ position: 'relative' }}>
        <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
          <View>
            <LottieView
              style={{
                display: this.state.animationDisplay,
                position: 'absolute',
                top: 20,
                zIndex: 10,
                width: '100%',
                height: 120
              }}
              ref={animation => this.animation = animation}
              source={require('../../assets/lottie/love.json')}
            />
            <View style={styles.viewBackground}>
              <View style={{ flex: 0.12 }}>
                <Image
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                  source={{ uri: user.avatar }}
                />
              </View>
              <View style={{ flex: 0.78 }}>
                <Text style={styles.textBlue}>{user.username}</Text>
                {address && <View style={{ flexDirection: 'row' }}>
                  <Icon type="Ionicons" name="ios-pin" size={18} />
                  <Text style={styles.subtitleWhite}>{address}{", "}{address}</Text>
                </View>}
              </View>
            </View>
            <Image
              resizeMode="contain"
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 250,
              }}
              source={{ uri: image }}
            />
          </View>
        </TouchableWithoutFeedback>
        <Metadata
          likes={this.state.likes}
          itemKey={itemKey}
          onActionLike={this.onActionLike}
          user={user}
          text={text}
        />
      </View>
    );
  }
}

const Metadata = ({ itemKey, onActionLike, user, text, likes }) => (
  <View style={styles.padding}>
    <IconBar likes={likes} itemKey={itemKey} onActionLike={onActionLike} />
    <Text style={styles.textBlue}>{user.username}</Text>
    <Text style={styles.subtitle}>{text}</Text>
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
  const liked = likes ? likes.includes(itemKey) : false;
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
