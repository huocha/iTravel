import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from 'react-native'

import { ButtonLink } from '../Button/ButtonComponent';
import styles from './EditProfile.style';

class EditProfile extends Component {
  constructor(props) {
    super(props)

  }

  _onOpenActionSheet = () => {

    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Delete', 'Take Photo', 'Choose From Library', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 3;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      },
    );
  };

  render() {
    const { avatar, username, email, bio } = this.props;
    return (
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.profileImage}
          />
          <ButtonLink
            title='Change profile picture'
            onClick={this._onOpenActionSheet}
            viewStyle={{ paddingTop: 5 }}
          />
        </View>
        <View style={styles.inforView}>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={username || 'huocha'}
              placeholder="Name"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Website</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Website"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={styles.textInput}
              value={bio || "La vie d'une fille ambitieuse"}
              placeholder="Biography"
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              placeholder="Email"
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default EditProfile
