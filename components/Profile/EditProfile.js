import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'
import { ImagePicker, Permissions } from 'expo';
import { ButtonLink, ButtonPrimary } from '../Button/ButtonComponent';
import { updateUser } from '../../utils/userAction';
import { uploadImageAsync } from '../../utils/uploadPhoto';
import firebase from 'firebase';
import styles from './EditProfile.style';
import { TextInputComponent } from '../TextInput/TextInputComponent';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  _getPermission = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
        const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (newPermission.status === 'granted') {
          return true;
        }
        return false;
    }
    return true;
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    let permission = this._getPermission();
    if (permission) {
      this._handleImagePicked(pickerResult);
    }
    else {
      Alert("No permission for CAMERA")
    }
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    let permission = this._getPermission();
    if (permission) {
      this._handleImagePicked(pickerResult);
    }
    else {
      Alert("No permission for Photo Library")
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
      const uid = this.props.user.infos.uid
      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(uid, pickerResult.uri);
        const update = { avatar: uploadUrl };

        this.props.userActions.userUpdate(uid, update, this.props.userActions)

      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
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

  onSubmit = () => {
    const { user } = this.props;
    if (!Object.keys(this.state.user).length) { alert("Nothing to update!"); return; }
    if (!user || !user.infos ) { alert("Error!"); return; }

    this.props.userActions
      .userUpdate(this.props.user.infos.uid, this.state.user, this.props.userActions);
  }

  onChange = (name, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  render() {

    const { avatar, username, email, bio, website } = this.props.user.infos.user;
    const { user } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageView}>
          {!this.props.user.isLoading ? (
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.profileImage}
            />
          )
          : (
            <ActivityIndicator
              animating={this.props.user.isLoading}
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
            <TextInputComponent
              name="username"
              defaultValue={username}
              style={styles.textInput}
              value={user.username}
              placeholder="Name"
              onChangeText={this.onChange}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Website</Text>
            <TextInputComponent
              name="website"
              defaultValue={website}
              value={user.website}
              style={styles.textInput}
              placeholder="Website"
              onChangeText={this.onChange}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInputComponent
              name="bio"
              defaultValue={bio}
              value={user.bio}
              style={styles.textInput}
              placeholder="Biography"
              onChangeText={this.onChange}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={email}
              placeholder="Email"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            title="Save"
            onClick={this.onSubmit}
            viewStyle={{ width: "90%", paddingTop: 20 }}
          />
        </View>
      </ScrollView>
    )
  }
}

export default EditProfile
