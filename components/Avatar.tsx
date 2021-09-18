import React from "react"
import { Badge, Button, Image } from "react-native-magnus"

const Avatar = () => (
  <Badge
    bg="green500"
    zIndex={10}
    right={-5}
    top={0}
    h={12}
    w={12}>
    <Button
      bg="gray200"
      p="none"
      rounded="circle"
      onPress={() => { }}>
      <Image
        h={40}
        w={40}
        source={{
          uri:
            'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80',
        }}
      />
    </Button>
  </Badge>
)

export default Avatar