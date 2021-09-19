// @ts-nocheck

import rgba from "hex-to-rgba";
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge, Div } from 'react-native-magnus';
import MapView, { Camera, Marker } from 'react-native-maps';
import * as Icon from "react-native-vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../constants/Green";

export default function FullMap({ navigation, route }) {
  const { params } = route
  console.log(`params :>> `, params)
  const mapRef = useRef<MapView>(null);
  let lat = 32.926987
  let long = -96.998866
  if (params.charity) {
    lat = params.charity.lat
    long = params.charity.long
  }

  useEffect(() => {
    if (mapRef.current) {
      const newCamera: Camera = {
        center: { latitude: lat + 0.1, longitude: long + 0.02 },
        zoom: 5,
        heading: 10,
        pitch: 7,
        altitude: 100
      }

      // mapRef.current.animateCamera(newCamera, { duration: 500 });
      mapRef.current.animateToNavigation({
        location: { latitude: lat + 0.1, longitude: long + 0.02 },
        bearing: 0.5,
        angle: 40,
        duration: 3000,
      });
      // animateToNavigation(
      //   location: LatLng,
      //   bearing: number,
      //   angle: number,
      //   duration?: number
      // ): void;

    }
  }, []);

  return (
    <Div flex={1}>
      <Div style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="more-horiz" color={theme.colors.black} size={theme.sizes.font * 1.5} />
        </TouchableOpacity>
      </Div>
      <MapView
        ref={mapRef}
        style={{ marginVertical: 20, flex: 1, borderRadius: 30 }}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
        customMapStyle={require('../assets/mapstyles.json')}
        minZoomLevel={-5}
        zoomEnabled={true}
        initialCamera={{
          center: { latitude: 0, longitude: 0 },
          pitch: 0,
          zoom: 12,
          heading: 0,
          altitude: 0
        }}
      >
        <Marker
          rotation={-15}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{ latitude: lat, longitude: long }}
        >
          <Badge color={rgba(theme.colors.primary, "0.2")} size={77}>
            <TouchableOpacity activeOpacity={0.8}>
              <Badge color={rgba(theme.colors.primary, "0.2")} size={77}>
                <Icon.MaterialCommunityIcons
                  name="map-marker"
                  size={57 / 2.5}
                  color="green"
                />
              </Badge>
            </TouchableOpacity>
          </Badge>
        </Marker>
      </MapView>
    </Div>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 10,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
  }
})