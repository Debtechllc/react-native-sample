import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { HamburgerIcon, BackIcon } from './../icons';
import { AppRegistry, View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { StyleSheet } from 'react-native'
import SearchIcon from './../icons/Search';
import NotificationIcon from './../icons/Notification';
import CartIcon from './../icons/Cart';
import { withNavigation } from 'react-navigation';
import { constants } from './../../utils/constants';
import Back from '../icons/Back';
import Icon from 'react-native-vector-icons/Ionicons';


const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flex: 2,
    padding: 5,
  },
  menuSection: {
    flexDirection: 'row',
    flex: 3
  },
  cartIcon: {
    backgroundColor: '#fff',
    paddingRight: 10
    // flex: 1,
  },
  notificationBadge: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 30,
    position: 'absolute',
    height: 20,
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    left: 27,
    top: 5
  },
  cartBadge: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 30,
    position: 'absolute',
    height: 20,
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    left: 30,
    top: 5
  },
  badgeCount: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 66,
    marginTop: 15,
    backgroundColor: '#0d63f1',
  },
  touchable: {
    height: 40, alignContent: 'center', justifyContent: 'center', marginTop: 30, paddingLeft: 15
  },
  headertxt: {
    paddingTop: 35, paddingLeft: 20, fontSize: 20, color: '#fff', fontWeight: '500', textAlign: 'center'
  }
})


class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCount: "0",
      cartCount: "0",
      isTypeOfBack: ""
    };
  }

  componentDidMount() {

  }

  displayMenuIcon() {
    if (this.props.isTypeOfBack == "back") {
      return (
        <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.touchable}>

          <Icon name="ios-arrow-back" size={40} color="white" />
        </TouchableHighlight>

      )
    } else {
      return (<HamburgerIcon onPress={() => this.props.navigation.openDrawer()} />)
    }
  }
  headText() {
    if (this.props.headText) {
      return (<View style={{ width: '75%', height: 90 }}>
        <Text style={styles.headertxt}>
          {this.props.headText}
        </Text>

      </View>)
    }
    else {

    }
  }
  render() {

    return (
      <View style={styles.header}>
        <View style={styles.menuSection}>
          {this.displayMenuIcon()}
          {this.headText()}
        </View>
      </View>
    );
  }
}

export default withNavigation(TopBar);
