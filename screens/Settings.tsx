import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Div, Text } from "react-native-magnus";
import Divider from '../components/Divider';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from "../types";

export default function Settings({ navigation }: RootTabScreenProps<'Settings'>) {
  const [name, setName] = useState('Leo')

  const Item = ({ label }: { label: string }) => (
    <Div mt={13}>
      <Div>
        <Div>
          <Text>{label}</Text>
          <Div flexDir="row" justifyContent="space-between">
            <TextInput style={{ width: "80%" }} defaultValue={name} onChangeText={text => setName(text)} />
            <Text fontSize="lg" fontWeight="500" color="green300">Edit</Text>
          </Div>
        </Div>
      </Div>
    </Div>
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
        <Slider
          minimumValue={0}
          maximumValue={1000}
          // styles={{ height: 19 }}
          thumbStyle={styles.thumb}
          trackStyle={{ height: 6, borderRadius: 6 }}
          minimumTrackTintColor={Colors.secondary}
          maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
        // value={this.state.budget}
        // onValueChange={value => this.setState({ budget: value })}
        />
      </Div>
      {/* </ScrollView> */}
    </Div>
  )
}

const styles = StyleSheet.create({
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: Colors.secondary
  }
})