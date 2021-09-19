// @ts-nocheck

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import theme from "../constants/Green";
import Block from "./Block";

export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [styles.card, style];

    return (
      <Block color={color || theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    );
  }
}

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.sizes.radius,
    padding: 10,
    marginBottom: theme.sizes.base
  }
});
