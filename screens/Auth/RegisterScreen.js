import React from 'react'
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { COLORS, FONTS } from '../../utils/constants';
import { NavigationActions } from 'react-navigation';
import { ButtonLink, ButtonPrimary } from '../../components/Button/ButtonComponent';
import styles from './RegisterScreen.style.js';

class Register extends React.Component {
  state = { email: '', password: '', errorMessage: null, isLoading: false }

  handleSignUp = () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true })

    this.props.userActions.register({ email, password }, this.props.userActions)

  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps.user)
    if (nextProps.user.infos && nextProps.user.infos.uid) {
      this.props.navigation.navigate({
        routeName: 'App',
        params: {},
        action: NavigationActions.navigate({ routeName: 'User' }),
      });
    }
    return true;
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

export default Register;
