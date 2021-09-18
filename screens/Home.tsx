import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Div, Image, Text } from 'react-native-magnus';
import Icon from 'react-native-vector-icons/FontAwesome';
import Divider from '../components/Divider';
import Layout from '../constants/Layout';
import charities from '../constants/mock/charities';
import { RootTabScreenProps } from '../types';
import { CharityType } from '../types/charity';

const summaries = [
  {
    icon: 'heart',
    color: '#ebfdee',
    value: '$1200',
    description: 'Donated to charities'
  },
  {
    icon: 'bank',
    color: '#e8f0fb',
    value: '34',
    description: 'Num of clothes donated'
  },
  {
    icon: 'plus',
    color: '#ffefe7',
    value: '200%',
    description: 'community impact'
  }
]

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const SummaryCard = ({ icon, description, value, color }: { icon: string, description: string, value: string, color: string }) => (
    <Div alignItems="center" flexDir="row" rounded="lg" w="80%" p={Layout.spacing} my={8} mx={Layout.spacing} bg={color}>
      <Div mr={Layout.spacing} justifyContent="center" alignItems="center" w={45} h={45} rounded="md" bg="black">
        <Icon name={icon} size={23} color="#fff" />
      </Div>
      <Div>
        <Text fontWeight="bold" fontSize={34}>{value}</Text>
        <Text fontWeight="bold" fontSize={15} color="gray700">{description}</Text>
      </Div>
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
    <Div bg="white" flex={1} alignItems="center" justifyContent="center">
      <Text fontSize="xl" fontWeight="bold">
        Welcome
      </Text>
      {summaries.map(summary => <SummaryCard {...summary} />)}
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
