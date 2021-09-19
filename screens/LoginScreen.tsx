// @ts-nocheck

import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import Block from '../components/Block';
// import { Button, Block, Input, Text } from "../components";
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import theme from "../constants/Green";

const VALID_EMAIL = "miguel.acero@google.com";
const VALID_PASSWORD = "password";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false
  };

  handleLogin() {
    const { navigation } = this.props;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (!errors.length) {
      navigation.navigate("Root");
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <DismissKeyboard>
        <KeyboardAvoidingView style={styles.login} behavior="padding">
          <Block padding={[0, theme.sizes.base * 2]}>
            <Text h1 bold>
              Login
            </Text>
            <Block middle>
              <Input
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button gradient onPress={() => this.handleLogin()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
              </Button>

              <Button style={{ backgroundColor: "transparent" }} onPress={() => navigation.navigate("Forgot")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Forgot your password?
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
