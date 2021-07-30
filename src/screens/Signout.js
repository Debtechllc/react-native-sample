import React, { Component } from 'react';
import styled from 'styled-components/native';
import {ScrollView,Container,Header,Body,Image,View,TouchableOpacity,Text,AsyncStorage, Alert} from 'react-native'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { logout } from '../actions';

class Signout extends Component {
   constructor(props){
       super(props)
   }

    componentWillMount(prevProps, prevState, snapshot) {
        
        AsyncStorage.clear();
        this.props.logout();
        this.props.navigation.replace('Home');
        this.props.navigation.navigate('App');
    }
   
   static navigationOptions = ({ navigation }) => ({
        title: 'Signout',
        drawerTitle: 'Signout',
        drawerIcon: ({ tintcolor }) => (
        <Image source={require('./../images/logouticon.png')}
            style={{ height: 25, width: 25 }} />
        ),
    });
  render() {
    
    return null;
    
  }
}
//export default Signout
const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
  logout
})(Signout);