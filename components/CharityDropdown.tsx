import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Div, Text } from "react-native-magnus";

export default function CharityDropdown({ label, defaultItems, placeholder, ...props }: {
  label?: string,
  defaultItems: any,
  placeholder?: string,
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
        placeholder={placeholder}
        open={open}
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