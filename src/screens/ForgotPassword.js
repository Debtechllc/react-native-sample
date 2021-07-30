import React, {Component} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, View, Text, Image, TextInput, ImageBackground} from 'react-native';

import {connect} from 'react-redux';
import {forgotPasswordIfNeeded, clearData} from '../actions';
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



class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.props.clearData()
    this.state = {
      email: '',
      password: '',
      formData: { email: "" },
      formError: { email: ""},
      showMessage: 0
    };
    // DeviceInfo.getDeviceToken().then((deviceToken) => {
    //   this.state.formData.deviceToken = deviceToken
    // });
  }
  handleEmail = (text) => {
    this.state.formData.email = text
  }
 
  forgotpassword = () => {
    if (this.state.formData.email == "") {
      alert("Please enter your email.")
      return
    }
    if (this.state.formError.email == "error") {
      alert("Email is not valid.")
      return
    }
   
    let data = { "email": this.state.formData.email}
    this.props.forgotPasswordIfNeeded(data);
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
      formData: { email: "" },
      formError: { email: "" }
    };
  }


  render() {
    
    if (this.props.curState.ForgotPassword_Reducer && this.props.curState.ForgotPassword_Reducer.result.jsonresp && this.props.curState.ForgotPassword_Reducer.result.jsonresp.error == '1' && this.state.showMessage) {
      alert(this.props.curState.ForgotPassword_Reducer.result.jsonresp.message)
      
    }
    if (this.props.curState.ForgotPassword_Reducer && this.props.curState.ForgotPassword_Reducer.result.jsonresp && this.props.curState.ForgotPassword_Reducer.result.jsonresp.error == '0' && this.state.showMessage) {
      this.props.navigation.navigate('Otp',{user_id: this.props.curState.ForgotPassword_Reducer.result.jsonresp.data.id});
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={loginstyle.containerCenter}>
            <ImageBackground source={require('./../images/loginbg2.png')} style={loginstyle.imageBg} >
            <Image source={require('./../images/logo.png')} style={loginstyle.imageView} >
            </Image>
            <View style={{width: 400, top: 10}}>
                      
                        <Text style={loginstyle.logoTxt}>
                         Forgot Password </Text>
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
                    
                    <TouchableOpacity
                      style={loginstyle.loginButton}
                      onPress={
                        () => this.forgotpassword()
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
                        () => this.props.navigation.navigate('Login')
                      }>
                        <Text 
                        style={loginstyle.forgotPasswordTxt}>
                           Login
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
  forgotPasswordIfNeeded, clearData
})(withNavigation(ForgotPassword));
