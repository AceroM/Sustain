import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { Div, Text } from 'react-native-magnus';

export default function ModalScreen() {
  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Text fontSize={20} fontWeight="bold">Modal</Text>
      <Text my={30} h={1} w="80%" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Div>
  );
}