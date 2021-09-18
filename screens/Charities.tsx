import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Div, Text } from 'react-native-magnus';
// import MapView from 'react-native-maps';
import Divider from '../components/Divider';

// const region = {
//   latitude: 37.78825,
//   longitude: -122.4324,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// };

export default function Charities() {
  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="xl" fontWeight="bold" />
      {/* <MapView
        initialRegion={region}
        style={styles.map}
      /> */}
      <Divider />
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    width: 100,
    height: 80
  }
});
