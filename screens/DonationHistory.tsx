import React from 'react';
import { Div, Image, Text } from 'react-native-magnus';

export default function DonationHistory() {
  return (
    <Div pt={60} h="100%" bg="white">
      <Div
        shadow="md"
        w="90%"
      >
        <Text>Hello</Text>
        <Image source={require("../assets/images/avatar.jpg")} borderRadius={999} h={60} w={60} />
      </Div>
    </Div>
  )
}