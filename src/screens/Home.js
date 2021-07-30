import React, {Component} from 'react';
import styled from 'styled-components/native';
import {BackIcon} from './../components/icons';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  ImageBackground,
  Animated
} from 'react-native';
import Header from './../components/Elements/Header'
import { StyleSheet, TouchableOpacity } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components';
import { saveFeedbackDataIfNeeded, assign_storage_user, fetchUserDataIfNeeded } from '../actions'
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native"
import { getUser } from './../actions/auth'
import moment from "moment"; 
import { getAvatarBg } from '../utils/constants';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
   width: '100%' ;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
     width: '100%'
  },

  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  banner: {
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#dcdbde'
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
})

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      answer: null,
      answer_type: null
    };

  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        //console.log('kkk')
        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
          //console.log(this.props.curState.Login_Reducer.user.id)
          let data = {user_id : this.props.curState.Login_Reducer.user.id}
          this.props.fetchUserDataIfNeeded(data)
        }
        
        this.setState({ position: this.state.position === 2 ? 0 : this.state.position + 1 });
      }, 15000)
    });
    
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidMount(prevProps, prevState, snapshot) {
    this.props.navigation.addListener('willFocus', (playload)=>{
    getUser()


    // // AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
    // //   AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
    let user = null
    AsyncStorage.getItem('user', (err, result) => {
      user = result
    });
    // //   });
    // // });
    // if (user) {
    //   this.props.assign_storage_user(user)
    // }
    // if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
    //   let today = moment(new Date()).format("YYYY-MM-DD");
    //   let data = { start_date: today, end_date: today, user_id: this.props.curState.Login_Reducer.user.id }
    //   //this.props.fetchOrderIfNeeded(data);
    // }
    // if (this.props.curState.Home && this.props.curState.Home.user && this.props.curState.Home.user.jsonresp && this.props.curState.Home.user.jsonresp.id) {
    //   this.props.assign_storage_user(this.props.curState.Home.user.jsonresp);
    // }
  });
    
  }
  saveAnswer = (answer) => {
    console.log(answer)
    this.state.answer = answer
    let answer_type = null
    if(answer == 'Not Good'){
      answer_type = 1
    }
    else if(answer == 'Ok'){
      answer_type = 2
    }
    else if(answer == 'Great'){
      answer_type = 3
    }
    

    let data = { "user_id": this.props.curState.Login_Reducer.user.id, "is_good": answer, answer_type:answer_type}
    this.props.saveFeedbackDataIfNeeded(data);
    if(answer == 'Not Good'){
      this.props.navigation.navigate('PatientMoreOption');
    }
    
    //this.props.assign_storage_user(user)

  }

  state = {
    fadeAnim: new Animated.Value(0)
  };

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };


  getHtml = () => {
    let good = this.state.answer == 'Great' ? {backgroundColor: "#def4cb"}: '';
      let ok = this.state.answer == 'Ok' ? {backgroundColor: "#fff3c9"}: '';
      let notgood = this.state.answer == 'Not Good' ? {backgroundColor: "#f9a9ad"}: '';
    if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.can_feedback) {
      let name = this.props.curState.Login_Reducer.user.first_name;
      return (
        <View style={{  width: '100%', height: 90, alignItems:'center'}}>
          <Text style={{ paddingTop:10, paddingLeft: 20, fontSize: 35, color: '#fff', fontWeight: '400', textAlign:'center', borderBottomWidth: 5, borderColor: '#fff' }}>
          Hello {name},
          </Text>
          <Text style={{ paddingTop:10, paddingStart: '5%', fontSize: 25, color: '#fff', fontWeight: '400', textAlign:'center' }}>
          How are you
          </Text>
          <Text style={{ paddingTop:5, paddingStart: '5%', fontSize: 25, color: '#fff', fontWeight: '400', textAlign:'center' }}>
          feeling right now?
          </Text>
          <TouchableOpacity onPress={() => this.saveAnswer('Great')} style={{width: '100%', height: 90, marginTop:30, marginBottom: 10,alignItems: 'center'}} >
            <Image  source={require('./../images/great.png')} style={{width: '50%', height: 90, marginLeft:10, paddingLeft: '15%'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.saveAnswer('Ok')}  style={{width: '100%', height: 90, margin:10, alignItems: 'center'}}>
            <Image  source={require('./../images/ok.png')} style={{width: '50%', height: 90, marginLeft:10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => this.saveAnswer('Not Good')} style={{width: '100%', height: 90, margin:10, alignItems: 'center'}}>
            <Image  source={require('./../images/notgood.png')} style={{width: '50%', height: 90, marginLeft:10}}  />
          </TouchableOpacity>
          
      </View>
      );
    }
    else if(this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.welcome_msg){
      return(
        <Animated.View
        style={{  width: '80%', height: 90, alignItems:'center'}}
      >
         <Text style={{ fontSize: 25, marginLeft: 50,paddingTop: 30, color: '#fff', fontWeight: '400' }}>
          {this.props.curState.Login_Reducer.user.welcome_msg}	
          </Text>
      </Animated.View>
        
      );
    }
    else{
      return(
        <Animated.View
        style={{  width: '100%', height: 90, alignItems:'center'}}
      >
         <Text style={{ paddingTop:10, paddingLeft: 20, fontSize: 25, color: '#fff', fontWeight: '400', textAlign:'center' }}>
          Welcome to your nurse line.	
          </Text>
          <Text style={{ paddingTop:10, paddingLeft: 20, fontSize: 25, color: '#fff', fontWeight: '400', textAlign:'center' }}>
           Your nurse will check on you soon.	
          </Text>
      </Animated.View>
       
      );
    }
  }
  

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
  });

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>There are no orders to deliver today.</Text>
      </View>
    );
  };

  render() {
    let orderlist = []
    let cartCount = 0
    let notifCount = 0
      
      let res = this.getHtml();

      let bg = this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.nurse && this.props.curState.Login_Reducer.user.nurse.avatar_id ? getAvatarBg(this.props.curState.Login_Reducer.user.nurse.avatar_id) : require('./../images/avatar/bg/0.png');
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', width: '100%' }}>
        {/* <View style={{lex: 1,
justifyContent: 'center',
alignItems: 'center'}}> */}
        <ImageBackground source={bg} style={{ width: '100%', height: '100%'}} >

        {/* <ContainerView style={styles.container}>
        
          {/* <TopBar notificationCount={notifCount} isTypeOfBack="" headText="Feedback"></TopBar> */}
          {/* <ScrollView scrollEventThrottle={16} style={styles.container}> } */}
       
            <View style={{  flex: 1, marginStart: 50, flexDirection: 'row',  width: '100%', height: 60, borderTopLeftRadius: 20,
                borderTopRightRadius: 20,borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20, paddingTop: '10%'   }}>
              
             {res}
            </View>
              
            
          {/* </ScrollView>
          
        </ContainerView> */}
        </ImageBackground>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}

//export default HomeScreen;

const mapStateToProps = (state) => ({
  curState: state
});


export default connect(mapStateToProps, {
  saveFeedbackDataIfNeeded, assign_storage_user, fetchUserDataIfNeeded
})(HomeScreen);
