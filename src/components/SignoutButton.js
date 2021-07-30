import React, { Component } from 'react';
import styled from 'styled-components/native';
import {ScrollView,Container,Header,Body,Image,View,TouchableOpacity,Text,AsyncStorage, Alert} from 'react-native'
import Button from './Button';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { logout } from '../actions';

class SignoutButton extends Component {
   constructor(props){
       super(props)
       width: 0
       height: 0
   }
  render() {
    
    if(this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id){
        return (
            
            <TouchableOpacity onPress={()=> Alert.alert(
                'Log out',
              'Do you want to logout?',
              [
                {text: 'Cancel', onPress: () => {return null}},
                {text: 'Confirm', onPress: () => {
                  
                  AsyncStorage.clear();
                  this.props.logout();
                  this.props.navigation.navigate('App');
                }},
              ],
              { cancelable: false }
            )  
          } >
            <View style={{flexDirection:'row',  marginLeft:5, alignItems: 'center'}}>
            <Image source={require('./../images/login.png')}
      style={{ height: 25, width: 25, margin:10 }} />
            <Text style={{fontWeight: 'bold',color: '#000', marginLeft: 20}}>
            Logout</Text>
            </View>
            </TouchableOpacity>
             
        );
    }
    else{
        return null;
    }

    
  }
}

const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
  logout
})(withNavigation(SignoutButton));