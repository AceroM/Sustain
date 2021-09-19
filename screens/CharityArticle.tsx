// @ts-nocheck

import React, { Component } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Div, Icon, Input, Text as MText } from "react-native-magnus";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import CharityDropdown from '../components/CharityDropdown';
import theme from "../constants/Green";
import Layout from '../constants/Layout';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  dCenter: {
    marginTop: 40,
    marginLeft: 5,
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  donateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%'
  },
  donate: {
    fontWeight: 'bold',
    color: 'white'
  },
  white: {
    backgroundColor: 'white'
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
    zIndex: 10,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
  },
  contentHeader: {
    padding: theme.sizes.padding,
    paddingBottom: 16,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: 'bold'
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption
  }
});

class CharityArticle extends Component {
  scrollX = new Animated.Value(0);

  state = {
    isTimePickerVisible: false,
    isDatePickerVisible: false,
    date: new Date(),
    time: new Date(),
    item: '',
    qty: '',
    desc: this.props.route.params.article.description.split('').slice(0, 69),
    setDesc: false
  }

  componentDidMount() {
  }

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  }

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false })
  }

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false })
  }

  handleTimeConfirm = (time) => {
    this.setState({ time })
    this.hideTimePicker()
  }

  handleDateConfirm = (date) => {
    this.setState({ date })
    this.hideDatePicker();
  }

  renderDots = () => {
    const { article } = this.props.route.params
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View style={[styles.flex, styles.row, styles.dotsContainer]}>
        {article.images.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item}-${index}`}
              style={[styles.dots, { opacity }]}
            />
          )
        })}
      </View>
    )
  }

  renderRatings = (rating) => {
    const stars = new Array(5).fill(0);
    return (
      stars.map((_, index) => {
        const activeStar = Math.floor(rating) >= (index + 1);
        return (
          <FontAwesome
            name="star"
            key={`star-${index}`}
            size={theme.sizes.font}
            color={theme.colors[activeStar ? 'active' : 'gray']}
            style={{ marginRight: 4 }}
          />
        )
      })
    )
  }

  render() {
    const { navigation } = this.props
    const { article } = this.props.route.params

    const SummaryCard = ({ icon, description, value, color }: { icon: string, description: string, value: string, color: string }) => (
      <Div alignItems="center" flexDir="row" rounded="lg" w="80%" p={Layout.spacing} my={8} mx={Layout.spacing} bg={color}>
        <Div mr={Layout.spacing} justifyContent="center" alignItems="center" w={45} h={45} rounded="md" bg="black">
          <Icon name={icon} size={23} color="#fff" />
        </Div>
        <Div>
          <Text fontWeight="bold" fontSize={50}>{value}</Text>
          <Text fontWeight="bold" fontSize={15} color="gray700">{description}</Text>
        </Div>
      </Div>
    )

    const calculateTime = () => {
      const { date, time } = this.state
      date.setHours(time.getHours())
      date.setMinutes(time.getMinutes())
      date.setSeconds(time.getSeconds())
      const diffTime = Math.abs(new Date() - date)
      const diffHours = Math.ceil(diffTime / (1000 * 60))

      return diffHours
      // const newDate = new Date() - date
      // return newDate
    }

    const msg = `New Donation - Miguel is sending you 1 ${this.state.item} from 1580 Point W Blvd, Coppell, TX 75019 in ${calculateTime()} minutes!`

    return (
      <View style={[styles.flex, styles.white]}>
        <View style={[styles.flex, styles.row, styles.header]}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-horiz" color={theme.colors.black} size={theme.sizes.font * 1.5} />
          </TouchableOpacity>
        </View>
        <View style={[styles.flex]}>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], { useNativeDriver: false })}
          >
            <Image
              source={article.source}
              resizeMode='cover'
              style={{ width, height: width }}
            />
            {/* {
              article.images.map((img, index) =>
                <Image
                  key={`${index}-${img}`}
                  source={{ uri: img }}
                  resizeMode='cover'
                  style={{ width, height: width }}
                />
              )
            } */}
          </ScrollView>
          {/* {this.renderDots()} */}
        </View>
        <View style={[styles.flex, styles.content]}>
          <View style={[styles.flex, styles.contentHeader]}>
            {/* TODO: add avatar image */}
            {/* <Image style={[styles.avatar, styles.shadow]} source={{ uri: article.user.avatar }} /> */}
            <Text style={styles.title}>{article.title}</Text>
            {/* <View style={[
              styles.row,
              { alignItems: 'center', marginVertical: theme.sizes.margin / 4 }
            ]}>
              {this.renderRatings(4.4)}
              {this.renderRatings(article.rating)}
              <Text style={{ color: theme.colors.active }}>
                {4.4}
              </Text>
            </View> */}
            <Text style={{ fontWeight: 'bold', color: theme.colors.active, marginVertical: 12 }}>
              {article.website}
            </Text>
            <TouchableOpacity onPress={() => this.setState({ desc: !this.state.setDesc ? article.description : article.description.split('').slice(0, 69), setDesc: !this.state.setDesc })}>
              <Text style={styles.description}>
                {this.state.desc}{this.state.setDesc ? '' : '....'}
                <Text style={{ color: theme.colors.active }}> Read {!this.state.setDesc ? 'More' : 'Less'} </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <CharityDropdown
            zIndex={10}
            label="Donation Type"
            defaultItems={[
              { label: 'Clothes', value: 'apple' },
              { label: 'Food', value: 'applse' },
              { label: 'Money', value: 'banana' }
            ]}
          />
          <Div mt={15} flexDir="row">
            <CharityDropdown
              zIndex={100}
              w="32%"
              pr={16}
              placeholder="Qty"
              defaultItems={[
                { label: '0', value: 'apple' },
                { label: '1', value: 'applse' },
                { label: '2', value: 'bana' },
                { label: '3', value: 'baasdana' },
                { label: '4', value: 'baaadsfna' },
                { label: '5', value: 'baaasdfna' },
                { label: '6', value: 'banansa' },
                { label: '7', value: 'banasana' },
                { label: '8', value: 'bandfaana' }
              ]}
            />
            <Input
              w="63%"
              py={17}
              mr={40}
              placeholder="Item"
              focusBorderColor="blue700"
              value={this.state.item}
              onChangeText={text => this.setState({ item: text })}
            />
          </Div>
          <Div mt={16} ml={20} flexDir="row" w="100%" flexWrap="wrap">
            <TouchableOpacity onPress={() => {
              this.setState({ isDatePickerVisible: true })
            }}>
              <Div w="50%" flexDir="row" mr={30}>
                <MText mr={6} fontSize={16} fontWeight="bold">Date:</MText>
                <MText fontSize={16} w={100} borderColor="black" borderWidth={1} rounded="md">{this.state.time.toLocaleDateString()}</MText>
              </Div>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setState({ isTimePickerVisible: true })
            }}>
              <Div w="50%" flexDir="row">
                <MText mr={6} fontSize={16} fontWeight="bold">Time:</MText>
                <MText fontSize={16} w={100} borderColor="black" borderWidth={1} rounded="md">{this.state.time.toLocaleTimeString()}</MText>
              </Div>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.isTimePickerVisible}
              mode="time"
              onConfirm={this.handleTimeConfirm}
              onCancel={this.hideTimePicker}
            />
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={this.handleDateConfirm}
              onCancel={this.hideDatePicker}
            />
          </Div>
          <TouchableOpacity style={styles.dCenter}>
            <Button style={styles.donateContainer} gradient onPress={() => {
              // send twilio api request here
              console.log('sending request');
              fetch('https://pinnacle-6257.twil.io/text?Body=' + msg, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST'
              })
                .then(res => res.json())
                .then(data => {
                  console.log(`data :>> `, data)
                })
              this.props.navigation.navigate('DonateSuccess', {
                charity: article.title,
                donationAmount: this.state.qty
              })
            }}>
              <Text style={styles.donate}>Donate</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default CharityArticle;
