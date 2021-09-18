import * as React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import { RootTabScreenProps } from '../types';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const Monthly = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      // TODO: navigate to something
      onPress={() => navigation.navigate("Charities")}
    >
      <Div bg="#fff" p={5} rounded="md" shadow="sm">
        <Image
          resizeMode="contain"
          source={require("../assets/images/Icon/More.png")}
          style={styles.moreIcon}
        />
        <Div>
          <Div alignItems="center" pt={16}>
            <Text color="#27A9FF" letterSpacing={1.7}>
              $11.71
            </Text>
            <Text letterSpacing={0.7}>Total Monthly Rewards</Text>
          </Div>

          <Text h={1} color="gray300" p={16} />

          {/* <Block row>
            <Block center>
              <Text
                size={20}
                spacing={0.6}
                primary
                style={{ marginBottom: 6 }}
              >
                8.1
              </Text>
              <Text body spacing={0.7}>
                Driving
              </Text>
              <Text body spacing={0.7}>
                Score
              </Text>
            </Block>

            <Block flex={false} color="gray3" style={styles.vLine} />

            <Block center>
              <Text
                size={20}
                spacing={0.6}
                primary
                style={{ marginBottom: 6 }}
              >
                37
              </Text>
              <Text body spacing={0.7}>
                Driver's
              </Text>
              <Text body spacing={0.7}>
                Level
              </Text>
            </Block>
          </Block> */}
        </Div>
      </Div>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Monthly />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    background: '#F7F8FA'
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: 16,
    top: 16
  },
});
