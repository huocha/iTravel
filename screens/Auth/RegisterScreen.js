import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { COLORS, FONTS } from '../../utils/constants';
import { userSignUp } from '../../utils/userAction';
import { NavigationActions } from 'react-navigation';
import { ButtonLink, ButtonPrimary } from '../../components/Button/ButtonComponent';

export default class Register extends React.Component {
  state = { email: '', password: '', errorMessage: null, isLoading: false }

  handleSignUp = () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true })

    userSignUp({ email, password }, (error, user) => {
      if (error) {
        //Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      }

      AsyncStorage.setItem('userInfos', JSON.stringify({ email, uid: user.uid }), () => {
        this.setState({ isLoading: false })

        this.props.navigation.navigate({
          routeName: 'App',
          params: {},
          action: NavigationActions.navigate({ routeName: 'User' }),
        });
      });
    })
  }

  render() {
    const { email, password, isLoading } = this.state;

    return (
      <View style={styles.container}>

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
        <View style={styles.wrapper}>
          <Text style={{ fontFamily: FONTS.MEDIUM, color: COLORS.LIGHT_GREY }}>
            Already have an account?
          </Text>
          <ButtonLink
            onClick={()=> this.props.navigation.navigate("Login")}
            title="Log in"
          />
        </View>

        <ButtonPrimary
          isLoading={isLoading}
          onClick={this.handleSignUp}
          title="SIGN UP"
          viewStyle={{ width: '90%', paddingTop: 30 }}
        />

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
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  forgotLink: {
    fontFamily: FONTS.MEDIUM,
    color: COLORS.CYAN,
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
