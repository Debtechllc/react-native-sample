import React, { Component } from 'react';
import styled from 'styled-components/native';
import {ScrollView,Container,Header,Body,Image,View,TouchableOpacity,Text,AsyncStorage, Alert} from 'react-native'
import Button from './Button';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class LoginButton extends Component {
   constructor(props){
       super(props)
       width: 0
       height: 0
   }
  render() {
    
    if(this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id){
        return (
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Myaccount')
          } >
            <View style={{flexDirection:'row',marginLeft:15, alignItems: 'center'}}>
            <Image source={require('./../images/login.png')}
      style={{ height: 25, width: 25, padding:10 }} />
            <Text style={{fontWeight: 'bold',color: '#000', marginLeft: 30}}>
            Myaccount</Text>
            </View>
            </TouchableOpacity>
             
        );
    }
    else{
        return (
            
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')
          } >
            <View style={{flexDirection:'row' ,marginLeft:15, alignItems: 'center'}}>
            <Image source={require('./../images/login.png')}
      style={{ height: 25, width: 25, padding:10 }} />
            <Text style={{fontWeight: 'bold',color: '#000', marginLeft: 30}}>
            Login</Text>
            </View>
            </TouchableOpacity>
             
        );;
    }

    
  }
}

const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
    
})(LoginButton);