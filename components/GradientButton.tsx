import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button as MagnusButton, Text } from 'react-native-magnus';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

type ButtonProps = {
  gradient?: boolean;
  children: any;
  onPress: any;
}

export default function GradientButton({ gradient, children, ...props }: ButtonProps) {
  if (gradient) {
    return (
      <TouchableOpacity
        style={styles.button}
        {...props}
      >
        <LinearGradient
          locations={[0.1, 0.9]}
          style={styles.button}
          colors={[Colors.primary, Colors.secondary]}
        >
          <Text fontWeight="bold" color="white">
            {children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <MagnusButton {...props}>
      {children}
    </MagnusButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    borderRadius: Layout.radius,
    height: Layout.spacing * 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
})