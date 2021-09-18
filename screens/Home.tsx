import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Div, Image, Text } from 'react-native-magnus';
import Divider from '../components/Divider';
import Layout from '../constants/Layout';
import charities from '../constants/mock/charities';
import { RootTabScreenProps } from '../types';
import { CharityType } from '../types/charity';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const SummaryCard = ({ color }: { color: string }) => (
    <Div bg={color}>
    </Div>
  )

  const HomeCard = ({ title, source }: CharityType) => (
    <TouchableOpacity activeOpacity={0.8}>
      <Div w={Layout.window.width / 3} rounded="md" shadow="sm" bg="white" mr={14}>
        <Image
          source={source}
          h={56}
          mb={30}
          resizeMode="contain"
        />
      </Div>
      <Div position="absolute" bottom={10} left={5}>
        <Text>
          {title}
        </Text>
      </Div>
    </TouchableOpacity>
  )

  const recommended = charities.filter((charity: CharityType) => charity.recommended).map(c => ({
    ...c, id: c.id.toString()
  }))

  return (
    <Div flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="xl" fontWeight="bold">
        Welcome
      </Text>
      <Divider />
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={recommended}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HomeCard {...item} />}
      />
    </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
