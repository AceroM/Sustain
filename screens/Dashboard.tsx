// @ts-nocheck
import { LinearGradient } from "expo-linear-gradient";
import rgba from "hex-to-rgba";
import React, { Component } from "react";
import {
  Animated, Dimensions, FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, View
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Icon from "react-native-vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { NavigationActions } from "react-navigation";
import Badge from '../components/Badge';
import Block, { styles as blockStyles } from '../components/Block';
import Button from '../components/Button';
import Card, { styles as cardStyles } from '../components/Card';
import Text from '../components/Text';
import theme from "../constants/Green";
import Layout from "../constants/Layout";
const { width } = Dimensions.get("window");

const mocks = [
  {
    id: 1,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Santorini, Greece',
    temperature: 34,
    title: 'Santorini',
    description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.',
    rating: 4.3,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 2,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: false,
    location: 'Loutraki, Greece',
    temperature: 34,
    title: 'Loutraki',
    description: 'This attractive small town, 80 kilometers from Athens',
    rating: 4.6,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 3,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Santorini, Greece',
    temperature: 34,
    title: 'Santorini',
    description: 'Santorini - Description',
    rating: 3.2,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 4,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    location: 'Loutraki, Greece',
    temperature: 34,
    title: 'Loutraki',
    description: 'This attractive small town, 80 kilometers from Athens',
    rating: 5,
    reviews: 3212,
    preview: 'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
    ]
  },
]

const myCharities = [
  {
    id: 1,
    charityName: "Team Trees",
    mission:
      "More than 800,000 people joined #TeamTrees by raising more than $20 million to plant 20 million trees around the world. Wondering where those trees are being planted? Check out the locations for the first trees below.",
    icon: require("../assets/images/teamtrees.jpg"),
    image:
      "https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/72634507_1430880343747588_3676343023645376761_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Gg21Cxj1KRMAX_A4qua&oh=35579bce4e0b02b01993f5e1c917ea55&oe=5E8E6F5E",
    websiteURL: "https://teamtrees.org/",
    description: "Championed by Mr B...",
  },
  {
    id: 2,
    charityName: "Direct Relief",
    websiteURL: "https://www.directrelief.org/",
    mission:
      "Direct Relief is a humanitarian aid organization, active in all 50 states and more than 80 countries, with a mission to improve the health and lives of people affected by poverty or emergencies – without regard to politics, religion, or ability to pay.\n",
    icon: require("../assets/images/corona.png"),
    image:
      "https://i1.wp.com/www.directrelief.org/wp-content/uploads/2020/01/0131_2-scaled-e1580492018941.jpg?resize=800%2C450px&ssl=1",
    description: "Corona Virus ef...",
  },
  {
    id: 3,
    charityName: "Red Cross",
    mission:
      "The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.",
    icon: require("../assets/images/redcross.jpg"),
    websiteURL: "https://www.redcross.org/donate/donation.html/",
    image:
      "https://www.redcross.org/content/dam/redcross/uncategorized/12/Vol-Banner-volunteer-looking-at-fire-1534x1198.jpg.transform/768/q70/feature/image.jpeg",
    description: "Hospitals around the worl...",
  },
];


const transactions = [
  {
    id: 1,
    name: "Beyond Burger",
    category: "Food",
    source:
      "https://images.unsplash.com/photo-1582125775166-2eb4da2fbf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1783&q=80",
    date: "11/10/2020",
    newTotal: "12.30",
    price: "0.80",
    transactionPrice: "7.20",
    paid: "8.00",
  },
  {
    id: 1,
    name: "Home Depot",
    category: "Appliances",
    source:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/610ptyvekxl-sl1000-1563196528.jpg?crop=1.00xw:0.502xh;0,0.200xh&resize=1200:*",
    date: "11/10/2020",
    newTotal: "11.50",
    price: "0.70",
    transactionPrice: "42.30",
    paid: "43.00",
  },
  {
    id: 1,
    name: "Starbucks",
    category: "Food",
    source:
      "https://cdn.vox-cdn.com/thumbor/KbnTFp7Bwl7jn5Jssu-IffIstoM=/0x0:6000x4000/1200x800/filters:focal(1463x1566:2423x2526)/cdn.vox-cdn.com/uploads/chorus_image/image/65808525/shutterstock_1391647442.0.jpg",
    date: "11/10/2020",
    newTotal: "10.80",
    price: "0.74",
    transactionPrice: "3.26",
    paid: "4.00",
  },
];


const profile = {
  username: "miguel.acero",
  location: "United States",
  email: "miguel.acero@google.com",
  avatar: require("../assets/images/avatar.jpg"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};

class Dashboard extends Component {
  scrollX = new Animated.Value(0);
  state = {
    showModal: false,
    showCC: false,
    showTransaction: false,
    showDonationOverview: false,
    charities: [],
  };

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    this.setState({ showModal: false });
  }

  showModal = () => {
    this.setState({
      showCC: true,
    });
  };

  hideModal = () => {
    this.setState({
      showCC: false,
    });
  };

  renderDonationMessage() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <Block
          margin={[320, 0, 0, 0]}
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h1 bold style={{ textDecorationLine: "underline" }}>
            Milestone
          </Text>
          <Text center h2>
            Your Donations exceeded $1,000,000!{" "}
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              h3
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            ></Text>
          </ScrollView>

          <Block
            margin={[-1100, 0, 0, 0]}
            middle
            padding={[theme.sizes.base / 2, 0]}
          >
            <Button
              gradient
              onPress={() => this.setState({ showModal: false })}
            >
              <Text white center>
                OK
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  // @ts-ignore
  renderCharities = (charity, navigation) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Charity", {
            charity,
            charityImage: charity.source,
            resizeMode: "cover"
          });
        }}
      >
        <Card shadow style={styles.charityStatus}>
          <Image
            source={charity.icon}
            style={styles.charityIcon}
            resizeMode="contain"
          />
          {/* <Text
            title
            transform="capitalize"
            // accent={drive.status === "bad"}
            // tertiary={drive.status === "fair"}
            primary
            height={22}
          >
            {charity.charityName}
          </Text>
 */}
          {/* <Text transform="capitalize" spacing={0.7}>
            {charity.description ? charity.description : charity.mission.substring(0, 10) + "..."}
          </Text> */}
        </Card>
      </TouchableOpacity>
    );
  };

  renderDollarCard(navigation) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            "SettingsStack",
            {},
            NavigationActions.navigate({ routeName: "Settings" })
          )
        }
      >
        <Card shadow style={{ padding: 20 }}>
          <Image
            resizeMode="contain"
            source={require("../assets/icons/settings-outline.png")}
            style={styles.moreIcon}
          />
          <Block>
            <Block center>
              <Text h1 primary>
                $12.30{JSON.stringify(this.state.test)}
              </Text>
              <Text spacing={0.71}> Total Donation Amount</Text>
            </Block>

            <Block color="gray2" style={styles.hLine} />
            <Block row>
              <Block center>
                <Text
                  size={20}
                  spacing={0.6}
                  primary
                  style={{ marginBottom: 6 }}
                >
                  10
                </Text>
                <Text body spacing={0.7}>
                  Trees
                </Text>
                <Text body spacing={0.7}>
                  Planted
                </Text>
              </Block>

              <Block flex={false} color="gray2" style={styles.vLine} />

              <Block center>
                <Text
                  size={20}
                  spacing={0.6}
                  primary
                  style={{ marginBottom: 6 }}
                >
                  #1872
                </Text>
                <Text body spacing={0.7}>
                  Donation
                </Text>
                <Text body spacing={0.7}>
                  Ranking
                </Text>
              </Block>
            </Block>
          </Block>
        </Card>
      </TouchableOpacity>
    );
  }

  renderCC() {
    return (
      <TouchableOpacity onPress={() => this.setState({ showCC: true })}>
        <Block horizontal>
          <LinearGradient
            end={{ x: 1, y: 0 }}
            style={[blockStyles.row, cardStyles.card, styles.awards]}
            colors={["#2BDA8E", "#41cc66"]}
          >
            <Block middle flex={0.4}>
              <Badge color={rgba(theme.colors.white, "0.2")} size={74}>
                <Badge color={rgba(theme.colors.white, "0.2")} size={52}>
                  <Icon.FontAwesome
                    name="google-wallet"
                    color="white"
                    size={30}
                  />
                </Badge>
              </Badge>
            </Block>
            <Block middle>
              <Text size={theme.sizes.base} spacing={0.4} medium white>
                Active Credit Card, ending in
              </Text>
              <Text size={20} spacing={0.4} bold white>
                askdfjlaksdjfkl
              </Text>
            </Block>
          </LinearGradient>
        </Block>
      </TouchableOpacity>
    );
  }

  renderDestination = item => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity style={styles.dCard} activeOpacity={0.8} onPress={() => navigation.navigate('Article', { article: item })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: item.preview }}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 0 }}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            </View>
            <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>{item.user.name}</Text>
              <Text style={{ color: theme.colors.white }}>
                <Octicons
                  name="location"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text style={{ color: 'white' }}> {item.location}</Text>
              </Text>
            </View>
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'flex-end', }}>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
            {item.title}
          </Text>
          <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
            <Text style={{ color: theme.colors.caption }}>
              {item.description.split('').slice(0, 50)}...
            </Text>
            <FontAwesome
              name="chevron-right"
              size={theme.sizes.font * 0.75}
              color={theme.colors.caption}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { profile, navigation, charities } = this.props;
    console.log("updated", this.props.charities);

    return (
      <ScrollView style={{ alignSelf: "stretch", marginTop: 15, backgroundColor: "white" }}>
        <View style={styles.view}>
          <View>
            <Text style={{ color: theme.colors.caption }}>Welcome Back,</Text>
            <Text style={{ fontSize: theme.sizes.font * 2 }}>Miguel</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "SettingsStack",
                {},
                NavigationActions.navigate({ routeName: "Settings" })
              )
            }
          >
            <Image style={styles.avatar} source={profile.avatar} />
          </TouchableOpacity>
        </View>
        <Block horizontal>{this.renderDollarCard(navigation)}</Block>
        {this.renderCC()}
        <Block top style={{ paddingHorizontal: theme.sizes.padding }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text spacing={0.7} transform="uppercase" style={{ marginTop: 10 }}>
              Your Recommended Charities
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "CharityStack",
                  {},
                  NavigationActions.navigate({ routeName: "Charities" })
                )
              }>
              <Text style={{ fontSize: 30, marginBottom: 5, marginRight: 5 }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Block>
            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              scrollEventThrottle={16}
              style={{ overflow: "visible" }}
              data={myCharities}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item }) => this.renderCharities(item, navigation)}
            />
          </Block>
        </Block>
        <ScrollView
          style={{ marginBottom: 5, paddingHorizontal: theme.sizes.padding }}
        >
          <Text spacing={0.4} transform="uppercase">
            Recent Transactions
          </Text>
          <Block style={{ width: '100%', height: 350 }}>
            <MapView
              style={{ marginTop: 10, flex: 1, borderRadius: 30 }}
              region={{
                latitude: 40.73978092263567,
                longitude: -73.87333547273988,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
              }}
              customMapStyle={require('../assets/mapstyles.json')}
            >
              <Marker
                rotation={-15}
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={{ latitude: 40.728399, longitude: -73.883771 }}
              >
                <Badge color={rgba(theme.colors.primary, "0.2")} size={77}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Badge color={rgba(theme.colors.primary, "0.2")} size={57}>
                      <Icon.MaterialCommunityIcons
                        name="gift"
                        size={57 / 2.5}
                        color="black"
                      />
                    </Badge>
                  </TouchableOpacity>
                </Badge>
              </Marker>
            </MapView>
          </Block>
          <Block>
            <Block style={{ paddingTop: 10 }}>
              {transactions.map((t, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Transactions", { t })}
                    activeOpacity={0.7}
                  >
                    <Card shadow key={i * 1000}>
                      <Block style={{ marginBottom: theme.sizes.base }}>
                        <Block
                          row
                          space="between"
                          style={{ marginBottom: theme.sizes.base }}
                        >
                          <Text spacing={0.5} caption>
                            {t.name}
                          </Text>
                          <Text spacing={0.5} caption medium primary>
                            ${t.newTotal}
                          </Text>
                          <Text spacing={0.5} caption>
                            {t.date}
                          </Text>
                        </Block>

                        <Block space="between">
                          <Block row space="between">
                            <Text> Transaction Price</Text>
                            <Text> Change</Text>
                          </Block>
                          <Block row space="between">
                            <Block style={{ marginRight: 170 }} row center>
                              <Badge
                                color={rgba(theme.colors.accent, "0.2")}
                                size={14}
                                style={{ marginRight: 10 }}
                              >
                                <Badge color={theme.colors.accent} size={8} />
                              </Badge>
                              <Text
                                style={{ fontSize: 20 }}
                                spacing={0.5}
                                color="gray"
                              >
                                ${t.transactionPrice}
                              </Text>
                            </Block>
                            <Block row center>
                              <Badge
                                color={rgba(theme.colors.primary, "0.2")}
                                size={14}
                                style={{ marginRight: 10 }}
                              >
                                <Badge color={theme.colors.primary} size={8} />
                              </Badge>
                              <Text
                                style={{ fontSize: 20 }}
                                spacing={0.5}
                                color="gray"
                              >
                                ${t.price}
                              </Text>
                            </Block>
                          </Block>
                        </Block>
                      </Block>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </Block>
          </Block>
        </ScrollView>
        {this.renderDonationMessage()}
        <View style={[styles.column, styles.destinations]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={{ overflow: 'visible', height: 280 }}
            data={mocks}
            keyExtractor={(item, index) => `${item.id}`}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
            renderItem={({ item }) => this.renderDestination(item)}
          />
          {/* {this.renderDots()} */}
        </View>
      </ScrollView>
    );
  }
}

export default Dashboard

Dashboard.defaultProps = { profile };

const styles = StyleSheet.create({
  charityStatus: {
    marginRight: theme.sizes.base,
    width: width / 2.768,
    height: 120,
    justifyContent: 'center'
  },
  charityIcon: {
    height: 100,
    position: 'absolute',
    top: -20,
    // marginRight: 50,
    // marginBottom: theme.sizes.base,
  },
  view: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: "space-between",
  },
  avatar: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: theme.sizes.padding,
  },
  vLine: {
    marginVertical: theme.sizes.base,
    width: 1,
  },
  hLine: {
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 0.5,
    height: 1,
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: theme.sizes.base,
    top: theme.sizes.base,
  },
  destinations: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dCard: {
    marginLeft: Layout.spacing * 2,
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  destinationInfo: {
    position: 'absolute',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    bottom: 20,
    left: 40,
    backgroundColor: theme.colors.white,
    width: width - (theme.sizes.padding * 3),
  },
  recommended: {
  },
  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: theme.sizes.padding,
  },
  recommendedList: {
  },
  recommendation: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.sizes.padding / 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },
  recommendationImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
  },
  rating: {
    fontSize: theme.sizes.font * 2,
    color: theme.colors.white,
    fontWeight: 'bold'
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: theme.colors.active,
  }
});
