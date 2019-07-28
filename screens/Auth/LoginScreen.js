import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { ButtonLink, ButtonPrimary } from '../../components/Button/ButtonComponent';
import { COLORS, FONTS } from '../../utils/constants';
import firebase from 'firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      isLoading: false,
    }
  }

  handleLogin = () => {
    // TODO: Firebase stuff...
    const { email, password } = this.state;
    this.setState({ isLoading: true });

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const uid = result.user.uid;
        if (uid) {
          this.setState({ isLoading: false })
          AsyncStorage.setItem('userInfos', JSON.stringify({ email, uid }), () => {
            this.props.navigation.navigate("App");
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={{ width: '90%' }}
          onPress={()=>{}}
        >
          <Text style={styles.forgotLink}>Forgot password</Text>
        </TouchableOpacity>
        <ButtonPrimary
          isLoading={isLoading}
          onClick={this.handleLogin}
          title="LOG IN"
          viewStyle={{ width: '90%', paddingTop: 30 }}
        />

        <View style={styles.orView}>
          <View style={styles.hairline} />
          <Text style={styles.loginButtonBelowText}>OR</Text>
          <View style={styles.hairline} />
        </View>

        <View style={styles.wrapper}>
          <Text style={{ fontFamily: FONTS.MEDIUM, color: COLORS.LIGHT_GREY }}>Don't have an account? </Text>
          <ButtonLink
            onClick={()=> this.props.navigation.navigate("Register")}
            title="SIGN UP"
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotLink: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.CYAN,
    alignSelf: 'flex-end',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: COLORS.BORDER_BOTTOM,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 8,
    padding: 10,
    fontFamily: FONTS.MEDIUM,
    backgroundColor: COLORS.BACKGROUND,
    color: COLORS.MAIN_BLUE_COLOR
  },
  loginButton: {
    height: 40,
    width: '90%',
    borderRadius: 4,
    marginTop: 40,
    backgroundColor: COLORS.CYAN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: '#fff',
    fontFamily: FONTS.MEDIUM,
    fontSize: 18
  },
  orView: {
    paddingVertical: 15,
    flexDirection: 'row',
    width: '90%'
  },
  hairline: {
    backgroundColor: COLORS.LIGHT_GREY,
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  loginButtonBelowText: {
    alignSelf:'center',
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_GREY,
    paddingHorizontal: 5,
    fontSize: 20
  },

})
