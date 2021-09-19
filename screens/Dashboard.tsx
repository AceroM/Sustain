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
import charities from "../constants/mock/charities";
const { width } = Dimensions.get("window");

const mocks = [
  {
    id: 1,
    title: 'Kids Matter International',
    category: 'Food',
    address: '535 S Nolen Dr #300, Southlake, TX 76092',
    website: 'https://www.kidsmatterinternational.org/',
    description: 'Kids Matter International is passionate about helping children who live in poverty by providing basic needs such as new clothing and shoes, books and backpacks. We believe that each child is precious and should be treated with dignity, respect, and given hope for a better future.',
    source: require('../assets/images/Charities/kids_matter_international.png'),
    recommended: true
  },
  {
    id: 2,
    title: 'UYM Charities',
    category: 'Food',
    address: '2100 W Northwest Hwy #114, Grapevine, TX 76051',
    website: 'https://www.uymcharities.org/',
    description: 'Founded in 1980, UYM broadened its focus on direct service provision and administration through the years to include the development of strategic fundraising and philanthropic partnerships. These partnerships now include Charter Churches. In helping to build Charter Churches, UYM can better leverage available resources to reach more people in need. Developing and promoting charter churches—each with unique missions to help others—UYM can reach more people in need across the nation. ',
    source: require('../assets/images/Charities/uym_charities.png'),
    recommended: true
  },
  {
    id: "3",
    title: 'Arms of Hope',
    category: 'Food',
    address: '8000 Walton Blvd, Irving, TX 75063',
    website: 'https://armsofhope.org/',
    description: 'Arms of Hope is a 501(c)(3) not-for-profit Christian care organization that assists children and single-mother families in need. Arms of Hope’s facilities include Medina Children’s Home (60 miles northwest of San Antonio) and Boles Children’s Home (40 miles northeast of Dallas). The facilities have over 150 years combined experience in comprehensive residential care programs for children. Arms of Hope also reaches disadvantaged children in their own neighborhoods in various communities with its Outreach Ministry programs.',
    source: require('../assets/images/Charities/arms_of_hope.png'),
    recommended: true
  },
  {
    id: "4",
    title: 'A Continuous Charity',
    category: 'Food',
    address: '9901 Valley Ranch Pkwy E, Irving, TX 75063',
    website: 'https://acceducate.org/',
    description: 'Our goal is to promote the spiritual and intellectual development of Muslims throughout North America by providing interest-free loans for higher education. By doing this, we hope to bring about a generation of graduates that will have a strong Muslim identity and be well-versed in their fields, using both for the benefit of mankind.',
    source: require('../assets/images/Charities/a_continuous_charity.png'),
    recommended: false
  },
  {
    id: "5",
    title: 'Rahbar Foundation',
    category: 'Food',
    address: '2436 Kent Dr, Irving, TX 75062',
    website: 'http://www.rahbarfoundation.org/',
    description: 'The Rahbar Foundation is dedicated to providing charitable assistance in the field of education, healthcare, hunger, emergency relief and other social welfare services to alleviate the poverty of underprivileged people around the globe with major focus on India. Every dollar contributed by donors is used as efficiently as possible to maximize the impact. Our due diligence process of tracking, monitoring, and allocating donations to our projects on the ground catalyzes the society and uplift some of the most impoverished communities. We carefully monitor our administrative and fundraising expenditures to optimize efficiency and ensure control and transparency. All of your generous donations are tax deductible.',
    source: require('../assets/images/Charities/rahbar_foundations.png'),
    recommended: true
  },
  {
    id: "6",
    title: 'Cloud 9 Charities',
    category: 'Food',
    address: '2221 Justin Rd #119-116, Flower Mound, TX 75028',
    website: 'http://cloud9charities.org/',
    description: 'Cloud 9 Charities is an organization of local leaders and business owners with a passion for giving back to our community and working to make it a better place for us all. One hundred percent of the net proceeds from our community events funds Bedtime Rescue.',
    source: require('../assets/images/Charities/cloud_9_charities.png'),
    recommended: true
  },
  {
    id: "7",
    title: 'Ronald McDonald House of Dallas',
    category: 'Food',
    address: '4707 Bengal St, Dallas, TX 75235',
    website: 'https://rmhdallas.org/',
    description: 'The House contains multiple playrooms for kids of all ages and interests, a library, media room, craft room, chapel, meditation garden, and outdoor play areas. Two large communal kitchens and dining room provide opportunities for the families to share the evening meal, which is provided 3 times a day by community volunteers, or to prepare their own food if they choose.',
    source: require('../assets/images/Charities/ronald_mcdonald_house.png'),
    recommended: true
  },
  {
    id: "8",
    title: 'Solace Charities, Inc.',
    category: 'Food',
    address: '1724 Flowers Dr, Carrollton, TX 75007',
    website: 'https://www.kidsmatterinternational.org/',
    description: 'Solace Charities aims to raise awareness and mobilize financial resources for the work carried out by Solace, a voluntary organization headquartered in Thrissur, India. Beginning 2007, Solace has been providing much needed financial, medical, moral and social support for families with kids suffering from terminal illness, with the support of benevolent individuals and corporations around the world.',
    source: require('../assets/images/Charities/solace_charities.png'),
    recommended: true
  },
  {
    id: "9",
    title: 'Grand Prairie United Charities',
    category: 'Food',
    address: '1417 Densman St, Grand Prairie, TX 75051',
    website: 'https://gpuc.org/',
    description: 'Grand Prairie United Charities was founded to assist the needs of the community. Today, the agency is still going strong, feeding over 35,000 individuals, families, elderly and homeless children and assisting these residents with the basic, unmet needs such as food, utility assistance, rental/mortgage/shelter assistance, and an endless source of information and referrals. Our services help keep these adults, children and elderly from spiraling into hopeless situations.',
    source: require('../assets/images/Charities/grand_prairie.png'),
    recommended: true
  },
  {
    id: "10",
    title: 'Hope Supply Co.',
    category: 'Food',
    address: '10555 Newkirk St, Dallas, TX 75220',
    website: 'https://hopesupplyco.org/',
    description: `Hope Supply Co., formerly known as Captain Hope's Kids, was founded in 1989 as The Hope Foundation for the Homeless, serving as a clearinghouse of donated resources. During the early 1990's, mothers with babies and children became the fastest growing segment of the homeless population. Because of this alarming trend, the Board of Directors voted to focus the mission on meeting the needs of the most vulnerable in our community, homeless and at-risk children. In 2015, we re-branded to Hope Supply Co. to better reflect our commitment to providing hope for children.`,
    source: require('../assets/images/Charities/hope_supply_co.png'),
    recommended: true
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
      <TouchableOpacity style={styles.dCard} activeOpacity={0.8} onPress={() => navigation.navigate('CharityArticle', { article: item })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={item.source}
        >
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
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
        {/* {this.renderCC()} */}
        {/* <Block top style={{ paddingHorizontal: theme.sizes.padding }}>
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
        </Block> */}
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
          {/* <Block>
            <Block style={{ paddingTop: 10 }}>
              {transactions.map((t, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Transactions", { t })}
                    activeOpacity={0.7}
                    key={t + i}
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
          </Block> */}
        </ScrollView>
        {this.renderDonationMessage()}
        <Block>
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
        </Block>
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
