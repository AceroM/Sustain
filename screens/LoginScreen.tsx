import React from 'react';
import { Div, Text } from 'react-native-magnus';
import GradientButton from '../components/GradientButton';
import { RootTabScreenProps } from '../types';

export default function LoginScreen({ navigation }: RootTabScreenProps<'Login'>) {
  return (

    <Div h="100%" bg="white" justifyContent="center" alignItems="center">
      {/* <MaskedView
        style={{ height: 40 }}
        maskElement={<Text fontSize="3xl" fontWeight="bold">Community</Text>}
      >
        <LinearGradient
          locations={[0.4, 1.9]}
          colors={[Colors.primary, Colors.secondary]}
        >
          <Text fontSize="3xl" opacity={0} fontWeight="bold">Community</Text>
        </LinearGradient>
      </MaskedView> */}
      <Text fontSize="4xl" fontWeight="bold">
        Help Sustain your community
      </Text>
      <GradientButton onPress={() => navigation.navigate('Root')} gradient>
        Login
      </GradientButton>
    </Div>
  )
}