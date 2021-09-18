import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  spacing: 16,
  radius: 6,
  isSmallDevice: width < 375,
};
