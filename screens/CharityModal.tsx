import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from "react";
import { Platform } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, Button, Div, Icon, Snackbar, Text } from "react-native-magnus";
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { CharityType } from '../types/charity';

type CharityModalProps = {
  route: {
    params: CharityType
  }
}

export default function CharityModal({ route: { params } }: CharityModalProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    {
      label: 'Clothes', value: 'clothes',
    },
    {
      label: 'Food', value: 'food'
    }
  ])

  const { title } = params
  // const Tag = ({ text }: { text: string }) => (
  //   <Div fontSize={3} style={styles.tag}>
  //   </Div>
  // )

  const Person = ({ name }: { name: string }) => (
    <Div alignItems="center" flexDir="row">
      <Avatar mr={4} bg="red300" color="red800">M</Avatar>
      <Div>
        <Text fontWeight="bold">{name}</Text>
      </Div>
    </Div>
  )

  const snackBarRef: any = useRef(null)
  const handleSnackBar = () => {
    if (snackBarRef.current) {
      snackBarRef.current.show(
        "Thank you for donating",
        {
          duration: 2000,
          suffix: <Icon
            name="checkcircle"
            color="white"
            fontSize="md"
            fontFamily="AntDesign"
          />
        }
      );
    }
  }

  return (
    <Div flex={1} bg="white" p={Layout.spacing}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text fontSize="4xl">{title}</Text>
      <Text fontWeight="bold" fontSize="3xl">Authors</Text>
      <Div>
        <Person name="Miguel" />
      </Div>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button onPress={handleSnackBar}>
        <Text> Donate </Text>
      </Button>
      <Snackbar
        ref={snackBarRef}
        bg={Colors.primary}
        color="white"
      />
    </Div>
  )
}
  // const styles = StyleSheet.create({
  //   // tag: {
  //   //   borderColor: theme.colors.gray2,
  //   //   borderWidth: StyleSheet.hairlineWidth,
  //   //   borderRadius: theme.sizes.base,
  //   //   paddingHorizontal: theme.sizes.base,
  //   //   paddingVertical: theme.sizes.base / 2.5,
  //   //   marginRight: theme.sizes.base * 0.625
  //   // },
  // })