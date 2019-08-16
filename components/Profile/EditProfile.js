import React, { Component } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { TextInputComponent } from '../TextInput/TextInputComponent';
import { ButtonLink, ButtonPrimary } from '../Button/ButtonComponent';
import { uploadImageAsync } from '../../utils/uploadPhoto';
import getPermission from '../../utils/getPermission';

import styles from './EditProfile.style';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  _takePhoto = async (type) => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        this._handleImagePicked(result, type);
      }
    }
  };

  _pickImage = async (type) => {
    const status = await getPermission(Permissions.CAMERA_ROLL);

    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        this._handleImagePicked(result, type);
      }
    }
  };

  _handleImagePicked = async (pickerResult, type) => {
    try {
      const uid = this.props.user.infos.uid
      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(uid, pickerResult.uri);

        const update = { [type]: uploadUrl };

        this.props.userActions.userUpdate(uid, update, this.props.userActions)

      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    }
  };

  _onOpenActionSheet = () => {

    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Delete',
      'Take Photo Avatar',
      'Choose Avatar From Library',
      'Take Photo Background',
      'Choose Background From Library',
      'Cancel'
    ];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 5;

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
            this._takePhoto("avatar");
            break;
          case 2:
            this._pickImage("avatar");
            break;
          case 3:
            this._takePhoto("avatarBackground")
            break;
          case 4:
            this._pickImage("avatarBackground")
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

    const { avatarBackground, avatar, username, email, bio, website } = this.props.user.infos.user;
    const { user } = this.state;

    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{
            uri: avatarBackground,
          }}
          style={styles.coverImage}
        >
          <View style={styles.imageView}>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.profileImage}
            />
          </View>
        </ImageBackground>

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
          <ButtonLink
            title='Change picture'
            onClick={this._onOpenActionSheet}
            viewStyle={{ paddingTop: 20 }}
          />
          <ButtonPrimary
            isLoading={this.props.user.isLoading}
            title="Done"
            onClick={this.onSubmit}
            viewStyle={{ width: "90%", paddingTop: 20 }}
          />
        </View>
      </ScrollView>
    )
  }
}

export default EditProfile
