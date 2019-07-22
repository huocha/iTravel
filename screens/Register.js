import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../utils/constants';

export default class Register extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password } = this.state;

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  render() {
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
        <View style={styles.wrapper}>
          <Text style={{ fontFamily: FONTS.MEDIUM, color: COLORS.LIGHT_GREY }}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate("Login")}
          >
            <Text style={styles.forgotLink}> Log in</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.handleSignUp}
        >
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>


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
