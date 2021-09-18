import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type ButtonProps = {
  gradient: boolean;
  children: any;
}

export default function Button({ gradient, children, ...props }: ButtonProps) {
  if (gradient) {
    return (
      <TouchableOpacity
        style={styles.button}
        {...props}
      >
        {/* <LinearGradient
        start={start}
        end={end}
         locations={locations}
         style={buttonStyles}
         colors={[startColor, endColor]}
      > */}
        {children}
        {/* </LinearGradient> */}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white'
  }
})