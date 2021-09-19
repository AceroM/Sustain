import { ImageSourcePropType } from "react-native";

export type CharityType = {
  id: string
  title: string
  category: string
  lat: string
  long: string
  address: string
  website: string
  description: string
  source: ImageSourcePropType
  recommended?: boolean
}