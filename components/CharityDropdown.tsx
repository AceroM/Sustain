import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Div, Text } from "react-native-magnus";

export default function CharityDropdown({ label, defaultItems, placeholder, dbProps, ...props }: {
  label?: string,
  defaultItems: any,
  placeholder?: string,
  dbProps: any,
  props: any
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(defaultItems);

  return (
    <Div {...props} px={20}>
      {label && (
        <Text mb={6}>{label}</Text>
      )}
      <DropDownPicker
        {...dbProps}
        placeholder={placeholder}
        open={open}
        zIndex={6000}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </Div>
  );
}

CharityDropdown.defaultProps = {
  placeholder: "Please choose an item"
}