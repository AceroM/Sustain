import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Div, Text } from 'react-native-magnus';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Div mx="xl" mt="md">
        <Text
          fontSize="lg"
          fontWeight="bold"
          textTransform="uppercase"
          color="red400"
          letterSpacing={2}
          mt="lg"
        >
          Best Seller
        </Text>
      </Div>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
