import * as React from 'react';
import { FlatList, ImageSourcePropType, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Div, Icon, Image, Input, Text } from 'react-native-magnus';
import Layout from '../constants/Layout';
import charities from '../constants/mock/charities';
import { RootTabScreenProps } from '../types';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const [searchInput, setSearchInput] = React.useState('')
  console.log(`searchInput :>> `, searchInput)

  const Search = () => (
    <Div>
      <Div>
        <Div flexDir="row" justifyContent="space-between">
          <Text fontWeight="bold" fontSize="4xl">
            Explore
          </Text>
          <Avatar bg="red300" size={32}>
            M
          </Avatar>
        </Div>
        <Input
          suffix={
            <Icon
              name="search"
              color="gray700"
              fontSize="6xl"
              fontFamily="FontAwesome"
            />
          }
          p="md"
          fontSize="lg"
          borderWidth={0}
          placeholder="Search your doge homies"
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
          mt="lg"
          bg="gray100"
        />
      </Div>
    </Div>
  )

  type CharityCardProps = {
    title: string;
    source: ImageSourcePropType;
    category: string;
    description: string;
  }

  const CharityCard = ({ title, source, category, description }: CharityCardProps) => (
    <Div my={15}>
      <Div alignItems="center">
        <Image zIndex={10} source={source} h={100} w="90%" rounded="md" position="absolute" />
        <Div w="100%" bg="#fff" pt={80} px={25} pb={15} rounded="md" shadow="sm" mt={30}>
          <Div flex={1} flexDir="row" justifyContent="space-between">
            <Text fontSize="3xl" fontWeight="bold">{title}</Text>
            <Text fontSize="lg" color="gray400">{category}</Text>
          </Div>
          <Div>
            <Text>{description}</Text>
          </Div>
        </Div>
      </Div>
    </Div>
  )

  const CardRoute = () => (
    <Div mb={Layout.spacing} bg="#fff" p={5} rounded="md" shadow="sm">
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
      </Div>
    </Div>
  )

  const Monthly = () => (
    <TouchableOpacity
      activeOpacity={0.8}
    // onPress={() => navigation.navigate("Charities")}
    >
      <Search />
      <ScrollView>
        <FlatList
          data={charities.filter(charity => charity.title.includes(searchInput))}
          renderItem={({ item }) => <CharityCard {...item} />}
        />
      </ScrollView>
      <CardRoute />
      <Div mt={Layout.spacing}>
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
    // backgroundColor: '#F7F8FA'
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: 16,
    top: 16
  },
});
