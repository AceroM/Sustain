// @ts-nocheck
import { LinearGradient } from "expo-linear-gradient";
import rgba from "hex-to-rgba";
import React, { Component } from "react";
import {
  Animated, Dimensions, FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, View
} from "react-native";
import { Div, Text as MText } from "react-native-magnus";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Icon from "react-native-vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Octicons from 'react-native-vector-icons/Octicons';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Badge from '../components/Badge';
import Block, { styles as blockStyles } from '../components/Block';
import Button from '../components/Button';
import Card, { styles as cardStyles } from '../components/Card';
import Text from '../components/Text';
import theme from "../constants/Green";
import charitiesList from "../constants/mock/charities";
import { getRecommendedThunk, storeRecommendedThunk } from '../store/recommended';
const { width } = Dimensions.get("window");

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
  scrollX = new Animated.Value(100);
  map = null
  state = {
    curCharity: null,
    lat: 32.926987,
    long: -96.998866,
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
          navigation.navigate("CharityArticle", {
            charity,
            // charityImage: charity.source,
            // resizeMode: "cover"
          });
        }}
      >
        <Card shadow style={styles.charityStatus}>
          <Image
            source={charity.icon}
            style={styles.charityIcon}
            resizeMode="contain"
          />
          <Text
            title
            transform="capitalize"
            // accent={drive.status === "bad"}
            // tertiary={drive.status === "fair"}
            primary
            height={22}
          >
            hello
          </Text>

          <Text transform="capitalize" spacing={0.7}>
            {charity.description ? charity.description : charity.mission.substring(0, 10) + "..."}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  };

  renderCC() {
    return (
      <TouchableOpacity onPress={() => this.setState({ showCC: true })}>
        <Block horizontal >
          <LinearGradient
            end={{ x: 1, y: 0 }}
            style={[blockStyles.row, cardStyles.card, styles.awards, { paddingVertical: 20 }]}
            colors={["#2BDA8E", "#41cc66"]}
          >
            <Block middle flex={0.4}>
              <Badge color={rgba(theme.colors.white, "0.2")} size={74}>
                <Badge color={rgba(theme.colors.white, "0.2")} size={52}>
                  <Icon.FontAwesome
                    name="line-chart"
                    color="white"
                    size={30}
                  />
                </Badge>
              </Badge>
            </Block>
            <Block middle>
              <Text style={{ marginBottom: 4 }} size={20} spacing={0.4} bold white>
                You're on a roll!
              </Text>
              <Text size={theme.sizes.base} spacing={0.4} medium white>
                You???ve donated a total of 20 times to 7 different charities

              </Text>
            </Block>
          </LinearGradient>
        </Block>
      </TouchableOpacity >
    );
  }

  renderDestination = (item, isRecommended = false) => {
    const { navigation } = this.props;

    if (item.id === '-1') {
      return (
        <Div w={200} justifyContent="center">
          <Text>No More Charities!</Text>
          <Text>For more, Click{' '}
            <TouchableOpacity onPress={() => {

              navigation.navigate('Charities')
            }}>
              <Text style={{ fontWeight: 'bold', color: theme.colors.active, position: 'absolute', bottom: -3.5 }}>Here</Text>
            </TouchableOpacity>
          </Text>
        </Div>
      )
    }

    return (
      <TouchableOpacity style={styles.dCard} activeOpacity={0.8} onPress={() => {
        this.props.storeRecommended(item.category)
        navigation.navigate('CharityArticle', { article: item })
      }}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={item.source}
        >
          <View style={{ flex: 0 }}>
            {/* <Image source={{ uri: item.user.avatar }} style={styles.avatar} /> */}
          </View>
          <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
            {isRecommended && (
              <Div position="absolute" left={-25} top={-10} bg="red700" w={120} justifyContent="flex-end" alignItems="flex-end" pr={8} roundedTopRight={10} roundedBottomRight={10}>
                <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>Recommended</Text>
              </Div>
            )}
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Div flexDir="row">
            <Text style={{ fontSize: theme.sizes.font * 1.25, fontWeight: '500', paddingBottom: 8, }}>
              {item.title}
            </Text>
            <Div ml={10} borderColor="gray400" borderWidth={1} rounded="lg" h={20} px={10}>
              <MText color="gray600">{item.category}</MText>
            </Div>
          </Div>
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

  /*
  
  */
  render() {
    const { recommended, profile, navigation, charities } = this.props;
    const { lat, long } = this.state

    const onScroll = (event) => {
      const scrollOffset = event.nativeEvent.contentOffset
      if (scrollOffset.x < ((charitiesList.length - 1) * 375)) {
        const { lat, long } = charitiesList[Math.round(scrollOffset.x / 375)]
        this.setState({ curCharity: charitiesList[Math.round(scrollOffset.x / 375)] })
        if (!lat || !long) {
          alert('asf')
        } else if (lat !== this.state.lat && long !== this.state.long) {
          this.setState({ lat, long })
        }
      }
      Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], { useNativeDriver: false })
    }

    return (
      <ScrollView style={{ alignSelf: "stretch", marginTop: 22, backgroundColor: "white" }}>
        <View style={styles.view}>
          <View>
            <Text style={{ color: theme.colors.caption }}>Welcome Back,</Text>
            <Text style={{ fontSize: theme.sizes.font * 2 }}>Miguel</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "Settings",
                {},
                NavigationActions.navigate({ routeName: "Settings" })
              )
            }
          >
            <Image style={styles.avatar} source={profile.avatar} />
          </TouchableOpacity>
        </View>
        {this.renderCC()}
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
          <Div flexDir="row" alignItems="center" justifyContent="space-between">
            <Text spacing={0.4} transform="uppercase">
              Recommended Charities
            </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate("FullMap", {
                charity: this.state.curCharity
              })
            }}>

              <FontAwesome
                name="expand"
                size={25}
                color='#000'
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </Div>
          <Block style={{ width: '100%', height: 200 }}>
            <MapView
              ref={ref => { this.map = ref }}
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
            >
              <Marker
                rotation={-15}
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={{ latitude: 32.926987, longitude: -96.998866 }}
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
              {charitiesList.map((charity, idx) => {
                return (
                  <Marker
                    key={charity.lat + idx}
                    rotation={-15}
                    anchor={{ x: 0.5, y: 0.5 }}
                    coordinate={{ latitude: parseFloat(charity.lat), longitude: parseFloat(charity.long) }}
                  >
                    <Icon.MaterialCommunityIcons
                      name="map-marker"
                      size={57 / 2.5}
                      color="red"
                    />
                  </Marker>
                )
              })}
              <MapViewDirections
                origin={{ latitude: parseFloat(32.926987), longitude: parseFloat(-96.998866) }}
                destination={{ latitude: parseFloat(lat), longitude: parseFloat(long) }}
                strokeWidth={3}
                apikey="AIzaSyBqoTgyqFmFUpOn3neyDu5-1WinqTjRfmk"
                strokeColor="purple"
              />
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
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              scrollEventThrottle={16}
              // snapToAlignment="center"
              style={{ overflow: 'visible', height: 280 }}
              data={charitiesList.slice().filter(charity => {
                if (recommended.currentRecommended !== '') {
                  return recommended.currentRecommended === charity.category
                }
                return true
              })}
              keyExtractor={(item, index) => `${item.id}`}
              onScroll={onScroll}
              renderItem={({ item }) => this.renderDestination(item, recommended.currentRecommended === item.category)}
            />
            {/* {this.renderDots()} */}
          </View>
        </Block>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  categories: state
});

const mapDispatchToProps = () => ({
  addCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
Dashboard.defaultProps = { profile };


const mapState = state => {
  return {
    recommended: state.recommended
  };
};

const mapDispatch = dispatch => {
  return {
    getRecommended: () => dispatch(getRecommendedThunk()),
    storeRecommended: (category) => dispatch(storeRecommendedThunk(category))
  };
};

export default connect(mapState, mapDispatch)(Dashboard);

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
    height: 50,
    width: 50,
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
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin / 2,
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
