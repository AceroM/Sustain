import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Div, Text } from "react-native-magnus";
import { RootTabScreenProps } from "../types";

export default function Settings({ navigation }: RootTabScreenProps<'Settings'>) {
  const [name, setName] = useState('Leo')

  const Item = ({ label }: { label: string }) => (
    <Div mt={13}>
      <Div>
        <Div>
          <Text>{label}</Text>
          <Div flexDir="row" justifyContent="space-between">
            <TextInput defaultValue={name} onChangeText={text => setName(text)} />
            <Text fontSize="lg" fontWeight="500" color="green300">Edit</Text>
          </Div>
        </Div>
      </Div>
    </Div>
  )

  const Divider = () => (
    <Text color="gray200" h={0} my={16} borderBottomColor="gray200" borderBottomWidth={2} />
  )

  return (
    <Div bg="white" p={32}>
      <Div flexDir="row" alignItems="center" justifyContent="space-between">
        <Text fontSize="lg">
          Settings yo
        </Text>
      </Div>
      {/* <ScrollView showsHorizontalScrollIndicator={false}> */}
      <Item label="name" />

      <Divider />

      <Div>
        <Text mb={10}>Budget</Text>
      </Div>
      {/* </ScrollView> */}
    </Div>
  )
}