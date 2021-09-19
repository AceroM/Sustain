// @ts-nocheck

import LottieView from "lottie-react-native";
import React, { Component } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";
import { Text as MText } from 'react-native-magnus';
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
      itemType,
      item,
      qty,
      date,
    } = this.props.route.params
    console.log(`charity :>> `, charity)

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block style={styles.block} padding={[0, theme.sizes.base * 2], 20}>
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
            <Text h3
              style={{
                marginTop: 0,
                marginBottom: 10
              }}
            >
              You're scheduled to donate <MText fontSize={18} fontWeight="bold">{qty} {item}</MText> to <MText fontSize={18} fontWeight="bold">{charity.title}</MText> on <MText fontSize={18} textDecorationLine="underline">{new Date(date).toDateString()}</MText> at <MText fontSize={18} textDecorationStyle="dashed" textDecorationLine="underline">{new Date(date).toLocaleTimeString()}</MText>. Their address is: <MText fontSize={18} fontWeight="bold">{charity.address}</MText>. Their phone number is: <MText fontSize={18} fontWeight="bold">{charity.phone}</MText>.
            </Text>
          </View>
          <Button gradient onPress={() => this.props.navigation.pop(2)}>
            <Text white center>
              Return to Charity
            </Text>
          </Button>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: 'white',
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
    height: '65%',
    alignItems: 'center',
    justifyContent: "center",
  }
});
