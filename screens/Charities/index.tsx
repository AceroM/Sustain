import * as React from 'react';
import { FlatList, ImageSourcePropType, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Div, Fab, Icon, Image, Input, Text } from 'react-native-magnus';
import Layout from '../../constants/Layout';
import charities from '../../constants/mock/charities';
import { RootTabScreenProps } from '../../types';
import { CharityType } from '../../types/charity';

export default function Charities({ navigation }: RootTabScreenProps<'Home'>) {
  const [searchInput, setSearchInput] = React.useState('')
  const filtered = charities.filter(charity => charity.title.includes(searchInput)).map(c => ({
    ...c, id: c.id.toString()
  }))

  function searchFilterFunc(text: string) {
    setSearchInput(text)
  }

  const Search = () => (
    <Div>
      <Div alignItems="center" flexDir="row" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="4xl">
          Explore
        </Text>

        <Image h={50} w={50} rounded={999} source={require("../../assets/images/avatar.jpg")} />
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
        placeholder="Search for a charity"
        value={searchInput}
        onChangeText={text => searchFilterFunc(text)}
        mt="lg"
        bg="gray100"
      />
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
        source={require("../../assets/images/Icon/More.png")}
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

  const AddCard = () => (
    <Fab shadow="none" position="absolute" top={20} bg="blue600" h={50} w={50}>
      <Button p="none" bg="transparent" justifyContent="flex-end">
        <Div rounded="sm" bg="white" p="sm">
          <Text fontSize="md">Cheer</Text>
        </Div>
        <Icon
          name="user"
          color="blue600"
          h={50}
          w={50}
          rounded="circle"
          ml="md"
          bg="white"
        />
      </Button>
      <Button p={0} bg="transparent" justifyContent="flex-end">
        <Div rounded="sm" bg="white" p="sm">
          <Text fontSize="md">Boost</Text>
        </Div>
        <Icon
          name="user"
          color="blue600"
          h={50}
          w={50}
          rounded="circle"
          ml="md"
          bg="white"
        />
      </Button>
    </Fab>
  )

  return (
    <Div bg="white" p={25}>
      <AddCard />
      <Div>
        <FlatList
          ListHeaderComponent={Search}
          data={filtered}
          renderItem={({ item }: { item: CharityType }) => (
            <TouchableOpacity onPress={() => {
              // @ts-ignore
              navigation.navigate('CharityArticle', {
                // @ts-ignore
                article: item,
              })
            }}>
              <CharityCard {...item} />
            </TouchableOpacity>
          )}
        />
        <CardRoute />
        <Div mt={Layout.spacing}>
        </Div>
      </Div>
    </Div>
  );

}

const styles = StyleSheet.create({
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: 16,
    top: 16
  },
});
