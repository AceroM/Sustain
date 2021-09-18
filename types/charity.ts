import { ImageSourcePropType } from "react-native";

export type CharityType = {
  id: string
  title: string
  category: string
  description: string
  source: ImageSourcePropType
  recommended?: boolean
}