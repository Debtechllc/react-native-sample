import React, {Component} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, View, Text, Image, TextInput, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {fetchLoginIfNeeded} from '../actions';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation';

import loginstyle from '../styles/loginstyle'
import { Loginstyle } from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import DeviceInfo from 'react-native-device-info';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;



class LoginScreen extends Component {
  constructor(props) {
    super(props);
    
    let deviceId = '' // DeviceInfo.getDeviceId();
    let deviceType = '' // DeviceInfo.getDeviceType();
    this.state = {
      email: '',
      password: '',
      formData: { email: "", password: "", deviceId: deviceId, deviceType: deviceType, deviceToken:'' },
      formError: { email: "", password: "", },
      showMessage: 0
    };
    // DeviceInfo.getDeviceToken().then((deviceToken) => {
    //   this.state.formData.deviceToken = deviceToken
    // });
  }
  handleEmail = (text) => {
    this.state.formData.email = text
  }
  handlePassword = (text) => {
    this.state.formData.password = text
  }
  login = (email, pass, prop) => {
    this.state.showMessage = 0

    if (this.state.formData.email == "") {
      alert("Please enter your email.")
      return
    }
    if (this.state.formError.email == "error") {
      alert("Email is not valid.")
      return
    }
    if (this.state.formData.password == "") {
      alert("Please enter your password.")
      return
    }
    if (this.state.formError.password == "error") {
      alert("Password should contain one capital letter, one special character, one number and atleast 8 characters long.")
      return
    }
    let data = { "email": this.state.formData.email, "password": this.state.formData.password, deviceId: this.state.formData.deviceId, deviceType: this.state.formData.deviceType, deviceToken: this.state.formData.deviceToken}
    prop.fetchLoginIfNeeded(data);
    this.state.showMessage = 1


  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    drawerTitle: 'Login',
    drawerIcon: ({ tintcolor }) => (
      <Image source={require('./../images/login.png')}
        style={{ height: 25, width: 25 }} />
    ),
  });

  validatePassword(text) {
    var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (re.test(text) === false) {
      alert("Password is Not Correct");
      this.state.formError.password = "error"
      //return false;
    }
    else {
      // this.setState({email:text})
      this.state.formError.password = ""
      console.warn("Password is Correct");
    }
  }

  validateEmail(text) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(text) === false) {
      alert("Email is Not Correct");
      this.state.formError.email = "error"
      //return false;
    }
    else {
      // this.setState({email:text})
      this.state.formError.email = ""
      console.warn("Email is Correct");
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    this.state = {
      email: '',
      password: '',
      formData: { email: "", password: "" },
      formError: { email: "", password: "", }
    };
  }


  render() {
    let userLoginData = []
    let UID_object = null
    if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.error == 1  && this.state.showMessage ){
      alert(this.props.curState.Login_Reducer.message);
      AsyncStorage.setItem('User', JSON.stringify(UID_object), () => {

      });
    }
    else if (this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
      userLoginData = this.props.curState.Login_Reducer.user
        UID_object = {
          user: userLoginData,
          user_id: userLoginData.id
        };
          AsyncStorage.setItem('User', JSON.stringify(UID_object), () => {
            console.log("Local storage data - " + UID_object);
        });
        if(userLoginData && userLoginData.type == 1){
          this.props.navigation.navigate('Nurse' );
        }
        else if(userLoginData && userLoginData.type == 2){
          this.props.navigation.navigate('Auth');
        }
        else{
          this.props.navigation.navigate('App');
        }
        
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={loginstyle.containerCenter}>
            <ImageBackground source={require('./../images/loginbg2.png')} style={loginstyle.imageBg} >
            <Image source={require('./../images/logo.png')} style={loginstyle.imageView} >
            </Image>
            <View style={{width: 400, top: 10}}>
                      <Text style={loginstyle.welcometxt}>
                        Hello! {'\n'} Welcome To </Text>
                        <Text style={loginstyle.logoTxt}>
                          Health Check </Text>
                    </View>
                <View style={loginstyle.mainView}>

                    <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5 }}>
                    <Icon size={24} color= "#0040FF" name="email" marginTop= "10" style={{ margin: 5 }}/>
                      <TextInput
                        style={loginstyle.TextInput}
                        underlineColorAndroid="transparent"
                        placeholder="Enter  email id"
                        placeholderTextColor="#A4A4A4"
                        autoCapitalize="none"
                        keyboardType={'email-address'}
                        onChangeText={this.handleEmail}
                        onEndEditing={() => this.validateEmail(this.state.formData.email)}
                      />
                    </View>
                    <View style={{height: 50, flex: 2, flexDirection: 'row', padding: 5, borderColor: '#000', borderWidth: 0.5, marginTop: 10 }}>
                    <Icon size={24} color="#0040FF" name="lock" style={{ margin: 5 }} />
                      <TextInput
                        style={loginstyle.TextInput}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="#A4A4A4"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}
                        onEndEditing={() => this.validatePassword(this.state.formData.password)}
                      />
                    </View>
                    <TouchableOpacity
                      style={loginstyle.loginButton}
                      onPress={
                        () => this.login(this.state.email, this.state.password, this.props)
                      }>
                      <Text style={loginstyle.loginButtonText}> SUBMIT </Text>
                    </TouchableOpacity>
                    <View style={{ height: 40, flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                      <Text style={loginstyle.signupTxt1}>
                        New nurse? </Text>
                        <TouchableOpacity
                      onPress={
                        () => this.props.navigation.navigate('SignUp')
                      }>
                        <Text 
                        style={loginstyle.signupTxt2}>
                           Signup now 
                           </Text>
                      </TouchableOpacity>
                        
                    </View>
                    <View style={{ height: 40 }}>
                        <TouchableOpacity
                         style={{height: 60}}
                      onPress={
                        () => this.props.navigation.navigate('ForgotPassword')
                      }>
                        <Text 
                        style={loginstyle.forgotPasswordTxt}>
                           Forgot password?
                           </Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  curState: state
});


export default connect(mapStateToProps, {
  fetchLoginIfNeeded,
})(withNavigation(LoginScreen));
