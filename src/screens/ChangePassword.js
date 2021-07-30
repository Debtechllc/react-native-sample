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
import {  fetchUserDataIfNeeded, changePasswordIfNeeded, clearData } from '../actions'


const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.props.clearData()
    this.state = {
      formData: {  password: "", confirm_password: "", old_password: "", id: (this.props.curState.Login_Reducer.user.id) },
      formError: { email: "", password: "", },
      showMessage: 0
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

  updateValues(text, filed) {
    //console.warn(text)
    if (filed == 'old_password') {

        this.state.formData.old_password = text

    }else if (filed == 'password') {

        this.state.formData.password = text

    } else if (filed == 'confirm_password') {

        this.state.formData.confirm_password = text

    }
}

  validatePassword(text, type) {
    console.warn(text);
    var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (re.test(text) === false) {
        if (type == "password") {
            alert("Password is Not Correct");
            this.state.formError.password = "error"
        } else {
            alert("Confirm Password is Not Correct");
            this.state.formError.conf_password = "error"
        }
        //return false;
    }
    else {
        // this.setState({email:text})
        if (type == "password") {
            this.state.formError.password = ""
        } else {
            this.state.formError.conf_password = ""
        }
    }
}
  updatedata = () => {
    this.state.showMessage = 0
    if (this.state.formData.old_password == "") {
      alert("Please enter your old password.")
      return
  }
  if (this.state.formError.old_password == "error") {
      alert("Old password must be 8 or more characters and should contain one capital letter, one special character, and one number.")
      return
  }
  if (this.state.formData.password == "") {
      alert("Please enter your password.")
      return
  }
  if (this.state.formError.password == "error") {
      alert("Password must be 8 or more characters and should contain one capital letter, one special character, and one number.")
      return
  }

  if (this.state.formData.confirm_password == "") {
    alert("Please confirm your password.")
    return
  }
  if (this.state.formError.confirm_password == "error") {
      alert("Confirm Password must be 8 or more characters and should contain one capital letter, one special character, and one number.")
      return
  }
  if (this.state.formData.confirm_password != this.state.formData.password) {
    alert("Password and Confirm password does not match.")
    return
  }
    
    this.state.formData.user_id = this.props.curState.Login_Reducer.user.id
    this.props.changePasswordIfNeeded(this.state.formData);
    this.state.showMessage = 1
    
  }
 
  
  render() {
    //  const { text, onPress, theme } = this.props;
    let name = this.props.curState.Login_Reducer.user.first_name+' '+this.props.curState.Login_Reducer.user.last_name;
    if (this.props.curState.ForgotPassword_Reducer && this.props.curState.ForgotPassword_Reducer.result.jsonresp && this.props.curState.ForgotPassword_Reducer.result.jsonresp.error == '1' && this.state.showMessage) {
      alert(this.props.curState.ForgotPassword_Reducer.result.jsonresp.message)
      
    }
    if (this.props.curState.ForgotPassword_Reducer && this.props.curState.ForgotPassword_Reducer.result.jsonresp && this.props.curState.ForgotPassword_Reducer.result.jsonresp.error == '0' && this.state.showMessage) {
      alert(this.props.curState.ForgotPassword_Reducer.result.jsonresp.message)
    }

    console.log('this.props.curState.ForgotPassword_Reducer')
    console.log(this.props.curState.ForgotPassword_Reducer)

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView style={{ flex: 1 }}>
          <TopBar notificationCount="9" cartCount="10" isTypeOfBack="back"  ></TopBar>
          <ImageBackground source={require('./../images/loginbg2.png')} style={{ width: '100%', height: '100%'}} >
          <Image source={require('./../images/nurse_avatar.png')} style={{ width: 60, height: 58, alignSelf: 'center', justifyContent: 'center',marginTop: 20}} >
            </Image>
            <View style={{ height: 40, margin:10 }}>
              <View style={{height: 40}}>
                  <Text style={{ paddingTop:10, paddingLeft: 20, fontSize: 20, color: '#fff', fontWeight: '500', textAlign:'center' }}>
                     {name}
                  </Text>
                  
              </View>

            </View>

            <View style={{ height: 40}}>
              <View style={{height: 40}}>
                  <Text style={{ paddingTop:10, paddingLeft: 20, fontSize: 20, color: '#fff', fontWeight: '500', textAlign:'center' }}>
                    {this.props.curState.Login_Reducer.user.email}
                  </Text>
              </View>
              
            </View>
            
            <View style={loginstyle.mainView}>
                <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5 }}>
                <Icon size={24} color= "#0040FF" name="lock" marginTop= "10" style={{ margin: 5 }}/>
                  <TextInput
                    defaultValue={this.state.formData.old_password}
                    style={loginstyle.TextInput}
                    underlineColorAndroid="transparent"
                    placeholder="Old Password"
                    placeholderTextColor="#A4A4A4"
                    autoCapitalize="none"
                    keyboardType={'default'}
                    style={{ width: '100%'}}
                    secureTextEntry={true}
                    onChangeText={(text) => this.updateValues(text, 'old_password')}
                    onEndEditing={() => this.validatePassword(this.state.formData.old_password)}
                  />
                </View>
                
                <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5, marginTop: 10 }}>
                <Icon size={24} color= "#0040FF" name="lock" marginTop= "10" style={{ margin: 5 }}/>
                  <TextInput
                    defaultValue={this.state.formData.password}
                    style={loginstyle.TextInput}
                    underlineColorAndroid="transparent"
                    placeholder="New Password"
                    placeholderTextColor="#A4A4A4"
                    autoCapitalize="none"
                    keyboardType={'default'}
                    style={{ width: '100%'}}
                    secureTextEntry={true}
                    onChangeText={(text) => this.updateValues(text, 'password')}
                    onEndEditing={() => this.validatePassword(this.state.formData.password)}
                  />
                  
                </View>
                <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5, marginTop: 10 }}>
                <Icon size={24} color= "#0040FF" name="lock" marginTop= "10" style={{ margin: 5 }}/>
                  <TextInput
                    defaultValue={this.state.formData.confirm_password}
                    style={loginstyle.TextInput}
                    underlineColorAndroid="transparent"
                    placeholder="Confirm New Password"
                    placeholderTextColor="#A4A4A4"
                    autoCapitalize="none"
                    keyboardType={'default'}
                    style={{ width: '100%'}}
                    secureTextEntry={true}
                    onChangeText={(text) => this.updateValues(text, 'confirm_password')}
                    onEndEditing={() => this.validatePassword(this.state.formData.confirm_password)}
                  />
                  
                </View>
                
                <TouchableOpacity
                  style={loginstyle.loginButton}
                  onPress={
                    () => this.updatedata()
                  }>
                  <Text style={loginstyle.loginButtonText}> SUBMIT </Text>
                </TouchableOpacity>
                
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
  changePasswordIfNeeded, clearData
})(withNavigation(ChangePassword));