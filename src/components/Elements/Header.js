import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    headerView:{
        flex:1,
        height: 40,
        width: 300,
        backgroundColor: '#000'
    }
  })


class Header extends Component {
  render() {
    const { text, onPress, theme } = this.props;

    return (
      <View style={styles.headerView}>
          <Text style={styles.red} >
              Header
          </Text>
      </View>
    );
  }
}

export default withTheme(Header);
