import React from 'react'
import {
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
import styles from './LoginScreen.style.js';

class Login extends React.Component {
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
    this.props.userActions.login(email, password, this.props.userActions)
  }

  shouldComponentUpdate(newProps) {

  }

  render() {
    const { isLoading } = this.state;
    console.log(this.props)
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

export default Login;
