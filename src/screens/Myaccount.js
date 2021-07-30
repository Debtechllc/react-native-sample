import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import { HamburgerIcon, BackIcon } from './../components/icons';
import { AppRegistry, View, Text, Image, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import { StyleSheet } from 'react-native'
import SearchIcon from './../components/icons/Search';
import NotificationIcon from './../components/icons/Notification';
import CartIcon from './../components/icons/Cart';
import { withNavigation } from 'react-navigation';
import TopBar from './../components/Elements/TopBar';
import { connect } from 'react-redux';
import loginstyle from '../styles/loginstyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  fetchUserDataIfNeeded, updateUserIfNeeded } from '../actions'
import { Typography, Colors, Spacing, Buttons } from '../styles'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { getAvatar } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';


const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class Myaccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { first_name: this.props.curState.Login_Reducer.user.first_name, password: "", last_name: this.props.curState.Login_Reducer.user.last_name, notification_interval: (this.props.curState.Login_Reducer.user.notification_interval), avatar_id: this.props.curState.Login_Reducer.user.avatar_id },
      formError: { email: "", password: "", }
    };
  }
  componentDidMount(prevProps, prevState, snapshot) {
    this.props.navigation.addListener('willFocus', (playload)=>{
      if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
        let data = {user_id : this.props.curState.Login_Reducer.user.id}
        //this.props.fetchUserDataIfNeeded(data)
      }
    });
    
  }
  componentWillMount() {
    if (!this.props.curState.Login_Reducer.user_id) {
      this.props.navigation.navigate('App');
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Myaccount',
    drawerTitle: 'Myaccount',
    drawerIcon: ({ tintcolor }) => (
      <Image source={require('./../images/man_active.png')}
        style={{ height: 25, width: 25 }} />
    ),
  });

  handleFirstName = (text) => {
    console.log(text)
    this.state.formData.first_name = text
  }

  handleLastName = (text) => {
    this.state.formData.last_name = text
  }
  handleIntervalTime = (text) => {
    this.state.formData.notification_interval = text
  }
  updatedata = () => {
    if (this.state.formData.first_name == "") {
      alert("Please enter your first name.")
      return
    }
    if (this.state.formData.last_name == "") {
      alert("Please enter your last name.")
      return
    }
    if (this.state.formData.notification_interval == "" && this.props.curState.Login_Reducer.user.type == 1) {
      alert("Please enter your notification interval.")
      return
    }
    
    this.state.formData.user_id = this.props.curState.Login_Reducer.user.id
    this.props.updateUserIfNeeded(this.state.formData);
    Alert.alert(
      "Profile Update",
      "Data is successfully saved.",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
  selectAvatar = (avatar_id) => {
    console.log(avatar_id)
    this.state.formData.avatar_id = avatar_id
  }
  getInterHtml = (av) =>{
    if(this.props.curState.Login_Reducer.user.type == 1){
     
      return (
        <View style={{height: 160, width: '100%'}}>
            <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5, marginTop: 10 }}>
            <Icon size={24} color="#0040FF" name="clock" style={{ margin: 5 }} />

              <Text style={{ width: 20, height: 40, paddingTop: 10 }}>{this.state.formData.notification_interval}</Text>
              <TextInput
                defaultValue={this.state.formData.notification_interval}
                style={loginstyle.TextInput}
                underlineColorAndroid="transparent"
                placeholder="Feedback Interval in minutes"
                placeholderTextColor="#A4A4A4"
                keyboardType={'default'}
                onChangeText={this.handleIntervalTime}
                style={{ width: '100%'}}
              />
              
            </View>
            <View style={{height: 40,  marginTop: 10 }}>
              <Text style={{ width: 100, height: 40, paddingTop: 17 }}>Select Avatar</Text>
            </View>
            <View style={{height: 100, flex: 2, flexDirection: 'row', padding: 5, alignItems: 'center', alignContent: 'center'}}>
            <RadioGroup
              size={24}
              thickness={1}
              color='#9575b2'
              highlightColor='#fff'
              selectedIndex={this.state.formData.avatar_id}
              onSelect = {(value) => this.selectAvatar(value)}
              style= {{flex: 1, flexDirection: 'row', height: 60, paddingBottom: 30 }}
            >

              <RadioButton 
                style={{alignItems:'center'}}
                value='1' 
              >
                <Image
                  style={{width: 60, height: 58, alignSelf: 'center', justifyContent: 'center',marginTop: 5}}
                  source={require('./../images/avatar/0.png')}
                />
              </RadioButton>
              <RadioButton 
                style={{alignItems:'center'}}
                value='2' 
              >
                <Image
                  style={{width: 60, height: 58, alignSelf: 'center', justifyContent: 'center',marginTop: 5}}
                  source={require('./../images/avatar/1.png')}
                />
              </RadioButton>
              <RadioButton 
                style={{alignItems:'center'}}
                value='3' 
              >
                <Image
                  style={{width: 60, height: 58, alignSelf: 'center', justifyContent: 'center',marginTop: 5}}
                  source={require('./../images/avatar/2.png')}
                />
              </RadioButton>
             
                
                </RadioGroup>
            </View>          
        </View>
      );
    }
    else{

    }
    
  }
  addPatient = () =>{
    if(this.props.curState.Login_Reducer.user.type == 1){
      return (
        <View style={{ height: 40, width: '50%', alignItems: 'center', marginLeft: '25%'}}>
                <TouchableOpacity style={{...Colors.buttonBg, ...Buttons.rounded, height: 40, ...Spacing.padding}}  onPress={
          () => this.props.navigation.navigate('AddPatient')
        } >
                    <Text style={loginstyle.loginButtonText}> Add Patient </Text>
                  </TouchableOpacity>
                    
                
              </View>
      )
    }
  }
 

  render() {
    //  const { text, onPress, theme } = this.props;
    let name = this.props.curState.Login_Reducer.user.first_name+' '+this.props.curState.Login_Reducer.user.last_name;

    let addPatient = this.addPatient()
    let avatar = require('./../images/avatar/0.png')
    if(this.props.curState.Login_Reducer.user.type == 1){
      avatar = getAvatar(this.state.formData.avatar_id)
    }
    else{ if(this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.nurse && this.props.curState.Login_Reducer.user.nurse.avatar_id)
      avatar = getAvatar(this.props.curState.Login_Reducer.user.nurse.avatar_id)
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView style={{ flex: 1 }}>
          <TopBar notificationCount="9" cartCount="10" isTypeOfBack="back"  ></TopBar>
          <ImageBackground source={require('./../images/loginbg2.png')} style={{ width: '100%', height: '100%'}} >
          <Image source={avatar} style={{ width: 60, height: 58, alignSelf: 'center', justifyContent: 'center',marginTop: 10}} >
            </Image>
            <View style={{ height: 40}}>
              <View style={{height: 40}}>
                  <Text style={{ paddingLeft: 20, fontSize: 20, color: '#fff', fontWeight: '500', textAlign:'center' }}>
                     {name}
                  </Text>
                  
              </View>

            </View>

            <View style={{ height: 40}}>
              <View style={{height: 40}}>
                  <Text style={{paddingLeft: 20, fontSize: 20, color: '#fff', fontWeight: '500', textAlign:'center' }}>
                    {this.props.curState.Login_Reducer.user.email}
                  </Text>
              </View>
              
            </View>
            {addPatient}
           
            <View style={{ flex: 1, flexDirection: 'column', position: 'absolute', top: 200, left: 10, right: 10, justifyContent: 'center', backgroundColor: Colors.lightColor, padding: 10 }}>
               
            <ScrollView scrollEventThrottle={16} style={{ width: '100%'}}> 
            
                <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5 }}>
                <Icon size={24} color= "#0040FF" name="face-profile" marginTop= "10" style={{ margin: 5 }}/>
                  <TextInput
                    defaultValue={this.state.formData.first_name}
                    style={loginstyle.TextInput}
                    underlineColorAndroid="transparent"
                    placeholder="First name"
                    placeholderTextColor="#A4A4A4"
                    autoCapitalize="none"
                    keyboardType={'default'}
                    onChangeText={this.handleFirstName}
                    style={{ width: '100%'}}
                  />
                </View>
                
                <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5, marginTop: 10 }}>
                <Icon size={24} color= "#0040FF" name="face" marginTop= "10" style={{ margin: 5 }}/>
                  <TextInput
                    defaultValue={this.state.formData.last_name}
                    style={loginstyle.TextInput}
                    underlineColorAndroid="transparent"
                    placeholder="Last name"
                    placeholderTextColor="#A4A4A4"
                    autoCapitalize="none"
                    keyboardType={'default'}
                    onChangeText={this.handleLastName}
                    style={{ width: '100%'}}
                  />
                  
                </View>
                
                {this.getInterHtml(this.state.formData.avatar_id)}

                <TouchableOpacity
                  style={loginstyle.loginButton}
                  onPress={
                    () => this.updatedata()
                  }>
                  <Text style={loginstyle.loginButtonText}> SUBMIT </Text>
                </TouchableOpacity>
                <View style={{ height: 60 }}>
                        <TouchableOpacity
                         style={{height: 60}}
                      onPress={
                        () => this.props.navigation.navigate('ChangePassword')
                      }>
                    <Text 
                    style={loginstyle.forgotPasswordTxt}>
                        Change password
                        </Text>
                  </TouchableOpacity>
                </View>
                </ScrollView> 
              </View>

          </ImageBackground>
        </ContainerView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  curState: state
});

// fetchUserDataIfNeeded, 
export default connect(mapStateToProps, {
  updateUserIfNeeded
})(withNavigation(Myaccount));