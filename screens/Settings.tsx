import React from 'react';
import { Div, Text } from "react-native-magnus";
import { RootTabScreenProps } from "../types";

export default function Settings({ navigation }: RootTabScreenProps<'Settings'>) {
  const Item = ({ label }: { label: string }) => (
    <Div mt={13} px={16}>
      <Div flexDir="row" justifyContent="space-between">
        <Text color="gray200" mb={3}>{label}</Text>
      </Div>
      <Text>{label}</Text>
    </Div>
  )

  return (
    <Div>
      <Div flexDir="row" alignItems="center" justifyContent="space-between" p={16}>
        <Text fontSize="lg">
          Settings yo
        </Text>
      </Div>
      {/* <ScrollView showsHorizontalScrollIndicator={false}> */}
      <Item label="name" />
      {/* </ScrollView> */}
    </Div>
  )
}