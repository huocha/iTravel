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
  ActivityIndicator,
} from 'react-native'
import { ImagePicker, Permissions } from 'expo';
import { ButtonLink } from '../Button/ButtonComponent';
import uuid from 'uuid';
import { updateUser } from '../../utils/userAction';
import { uploadImageAsync } from '../../utils/uploadPhoto';
import firebase from 'firebase';
import styles from './EditProfile.style';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploading: false,
      image: ''
    }
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(this.props.uid, pickerResult.uri);

        this.setState({ image: uploadUrl });
        updateUser(this.props.uid, { avatar: uploadUrl })
          .catch(error => {
            console.log(error)
            Alert("Error!")
          })
      }
    } catch (e) {
      console.log(e);
      Alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

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
        switch (buttonIndex) {
          case 1:
            this._takePhoto();
            break;
          case 2:
            this._pickImage();
            break;
          case 3:
            break;
          default:

        }
      },
    );
  };

  render() {
    const { avatar, username, email, bio } = this.props;
    const { uploading, image } = this.state;
    return (
      <ScrollView>
        <View style={styles.imageView}>
          {!uploading ? (
            <Image
              source={{
                uri: image || avatar,
              }}
              style={styles.profileImage}
            />
          )
          : (
            <ActivityIndicator
              animating={uploading}
            />
          )}
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
