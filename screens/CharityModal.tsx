import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Platform } from "react-native";
import { Div, Text } from "react-native-magnus";
import { CharityType } from '../types/charity';

type CharityModalProps = {
  route: {
    params: CharityType
  }
}

export default function CharityModal({ route: { params } }: CharityModalProps) {
  const { title } = params
  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      {/* <Text fontSize={20} fontWeight="bold">{title}</Text> */}
      <Text>
        hello {title}
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Div>
        <Text fontSize="2xl">
          Title: {title}
        </Text>
      </Div>
    </Div>
  )
}