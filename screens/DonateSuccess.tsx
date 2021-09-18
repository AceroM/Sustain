// @ts-nocheck

import LottieView from "lottie-react-native";
import React, { Component } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";
import Block from '../components/Block';
import Button from '../components/Button';
import Text from '../components/Text';
import theme from "../constants/Green";

export default class DonateSuccess extends Component {
  state = {
    errors: [],
    loading: false,
    value: "0",
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.animation.play();
    setTimeout(() => {
      this.props.navigation.pop(2);
    }, 3500);
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    // this.animation.play();
  };

  handleReturn() {
    const { navigation } = this.props;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });
    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("Dashboard");
    }
  }

  render() {
    const {
      charity,
      donationAmount
    } = this.props.route.params

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block style={styles.block} padding={[0, theme.sizes.base * 2], 50}>
          <View style={styles.animationContainer}>
            <Text h1 bold center>
              Success!
            </Text>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 300,
                height: 300,
                backgroundColor: '#fff',
              }}
              source={require('../assets/lottie/donationSuccess.json')}
              loop={false}
            />
            <Text h1 bold center
              style={{
                marginTop: 50,
                marginBottom: 10
              }}
            >
              You just donated ${donationAmount} to {charity}!
            </Text>
            <Button gradient onPress={() => this.props.navigation.pop(2)}>
              <Text white center>
                Return to Charity
              </Text>
            </Button>
          </View>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  block: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  animationContainer: {
    width: '100%',
    height: '100%',
    justifyContent: "space-evenly",
  }
});
