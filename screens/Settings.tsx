// @ts-nocheck

import React, { Component } from "react";
import {
  Image, ScrollView, StyleSheet, TextInput
} from "react-native";
// @ts-ignore
import Slider from "react-native-slider";
import { NavigationActions } from "react-navigation";
import Block from '../components/Block';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Text from '../components/Text';
import theme from "../constants/Green";

const profile = {
  username: "miguel.acero",
  password: 'password123',
  location: "United States",
  email: "miguel.acero@google.com",
  avatar: require("../assets/images/avatar.jpg"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};


class Settings extends Component {
  state = {
    budgetValuesIndex: 2,
    monthly: 50,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
    isModalVisible: false
  };

  budgetValues = [0.05, 0.1, 0.25, 0.5, 1.0];

  componentDidMount() {
    // @ts-ignore
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  showModal = () => {
    this.setState({
      isModalVisible: true
    });
  };

  hideModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    if (profile) {
      return <Text bold>{name === 'password' ? '●●●●●●●●●●' : profile[name]}</Text>
    }
  }

  renderSlider = (optionsArray, stateKey) => {
    return (
      <Slider
        minimumValue={0}
        maximumValue={optionsArray.length - 1}
        step={1}
        value={this.state[stateKey]}
        onValueChange={value => this.setState({ [stateKey]: value })}
        style={{ height: 19 }}
        thumbStyle={styles.thumb}
        trackStyle={{ height: 6, borderRadius: 6 }}
        minimumTrackTintColor={theme.colors.secondary}
        maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
      />
    );
  };

  render() {
    const { profile, editing } = this.state;
    const { navigation } = this.props;

    return (
      <React.Fragment>
        <Block style={{ backgroundColor: 'white' }}>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Settings
            </Text>
            <Button>
              <Image source={profile.avatar} style={styles.avatar} />
            </Button>
          </Block>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <Text gray2 style={{ marginBottom: 10 }}>
                    Username
                  </Text>
                  {this.renderEdit("username")}
                </Block>
                <Text
                  medium
                  secondary
                  onPress={() => this.toggleEdit("username")}
                >
                  {editing === "username" ? "Save" : "Edit"}
                </Text>
              </Block>

              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <Text gray2 style={{ marginBottom: 10 }}>
                    Password
                  </Text>
                  {this.renderEdit("password")}
                </Block>
                <Text
                  medium
                  secondary
                  onPress={() => this.toggleEdit("password")}
                >
                  {editing === "password" ? "Save" : "Edit"}
                </Text>
              </Block>

              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <Text gray2 style={{ marginBottom: 10 }}>
                    Location
                  </Text>
                  {this.renderEdit("location")}
                </Block>
                <Text
                  medium
                  secondary
                  onPress={() => this.toggleEdit("location")}
                >
                  {editing === "location" ? "Save" : "Edit"}
                </Text>
              </Block>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <Text gray2 style={{ marginBottom: 10 }}>
                    E-mail
                  </Text>
                  <Text bold>{profile.email}</Text>
                </Block>
              </Block>
            </Block>

            <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

            <Block style={styles.sliders}>
              <Block margin={[10, 0]}>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Notification Range
                </Text>
                {this.renderSlider(this.budgetValues, "budgetValuesIndex")}
                <Text caption gray right>
                  Miles
                </Text>
              </Block>
            </Block>
            <Divider />
            <Block horizontal>
              <Button
                gradient
                onPress={() =>
                  navigation.navigate(
                    "MainStack",
                    {},
                    NavigationActions.navigate({ routeName: "Welcome" })
                  )
                }
              >
                <Text white center>
                  Sign Out
                </Text>
              </Button>
            </Block>
          </ScrollView>
        </Block>
      </React.Fragment>
    );
  }
}

Settings.defaultProps = { profile: profile };

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
    borderRadius: theme.sizes.padding
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  }
});
