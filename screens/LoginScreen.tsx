import React from 'react';
import { Button, Div } from 'react-native-magnus';
import { RootTabScreenProps } from '../types';

export default function LoginScreen({ navigation }: RootTabScreenProps<'Login'>) {
  return (
    <Div h="100%" bg="#101239" justifyContent="center" alignItems="center">
      <Button onPress={() => navigation.navigate('Root')}>
        Go To Home
      </Button>
    </Div>
  )
}