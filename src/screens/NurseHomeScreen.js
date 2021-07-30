import React, {Component} from 'react';
import styled from 'styled-components/native';
import {BackIcon} from '../components/icons';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  ImageBackground
} from 'react-native';
import Header from '../components/Elements/Header'
import { StyleSheet, TouchableOpacity } from 'react-native'
import TopBar from '../components/Elements/TopBar';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components';
import { fetchFeedbackIfNeeded } from '../actions'
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native"
import { getUser } from '../actions/auth'
import moment from "moment"; 
import loginstyle from '../styles/loginstyle'
import { Typography, Colors, Spacing, Buttons } from '../styles'
import { getAvatar } from '../utils/constants';


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
     width: '100%',
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

class NurseHomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      answer_type: 0
    };

  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
          let data = { nurse_id: this.props.curState.Login_Reducer.user.id }
          this.props.fetchFeedbackIfNeeded(data);
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


    if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
      let data = { nurse_id: this.props.curState.Login_Reducer.user.id }
      this.props.fetchFeedbackIfNeeded(data);
    }
  });
    
  }
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>There are no data to show.</Text>
      </View>
    );
  };
  

  getFeedback = (feedbacks) => {
    let result = []

    for (let feedback of feedbacks) {
      let dark = '#EC5858'
      let light = '#EF706F'
      let thx = (<Text style={{  height: 60,  fontSize: 20, color: '#fff', fontWeight: 'bold'}}> 
      {feedback.answer}
    </Text>)
      if(feedback.answer == 'Ok'){
         dark = '#F8C145'
        light = '#F9D050'
      }
      else if(feedback.answer == 'Great'){
        dark = '#8BD48D'
       light = '#85C588'
      }
      else if(feedback.answer == 'Not Good'){
        thx = (<Text  onPress={ () => this.props.navigation.navigate('Feedbackdetails',{feedback:feedback}) } 
      style={{  height: 60,  fontSize: 20, color: '#fff', fontWeight: 'bold'}}> 
      {feedback.answer} ->
    </Text> )
      }
      result.push(
        <View key={feedback.user.id} 
        style={{width:'80%', height:60,  flex: 1, flexDirection: 'row' , backgroundColor: dark, justifyContent: 'center', margin:5, padding:10, paddingHorizontal: 10,
        paddingVertical: 12, borderRadius: 20, alignItems: 'center', alignSelf: 'center'}}>
            
              <Text style={{width:'50%',height: 40, padding: 5, fontSize: 20, color: '#fff',  }}>{feedback.user.first_name}</Text>
            
              <View style={{  width:'50%',height: 60, backgroundColor: light, paddingHorizontal: 10,
                  paddingVertical: 12, borderRadius: 20, alignItems: 'center', alignSelf: 'center' }}>
                {thx}
              </View>
                
           
      </View>)
    }
    return result
  }
  render() {
    let feedbacks = null
    let feedbackBox = null
    let notgood_count = 0
    let ok_count = 0
    let great_count = 0

    if (this.props.curState.Feedback_Reducer && this.props.curState.Feedback_Reducer.feedbacks.jsonresp && this.props.curState.Feedback_Reducer.feedbacks.jsonresp.data) {
      feedbacks = this.props.curState.Feedback_Reducer.feedbacks.jsonresp.data.data
      feedbackBox = this.getFeedback(feedbacks)
      notgood_count = this.props.curState.Feedback_Reducer.feedbacks.jsonresp.data.notgood_count
      ok_count = this.props.curState.Feedback_Reducer.feedbacks.jsonresp.data.ok_count
      great_count = this.props.curState.Feedback_Reducer.feedbacks.jsonresp.data.great_count
    }

    if(!feedbackBox){
      feedbackBox = this.ListEmpty()
    }
 
  
    return (
      <SafeAreaView style={{ flex: 1}}>
        <ContainerView style={styles.container}>
          {/* <ScrollView scrollEventThrottle={16} style={styles.container}> */}
          <ImageBackground source={require('./../images/loginbg2.png')} style={{ width: '100%', height: '100%'}} >
            <Image source={getAvatar(this.props.curState.Login_Reducer.user.avatar_id)} style={{ width: 50, height: 48, alignSelf: 'center', justifyContent: 'center',marginTop: 20}} >
            </Image>
            <View style={{ height: 40}}>
              <View style={{height: 40}}>
                  <Text style={{ fontSize: 30, color: '#fff', fontWeight: "100", textAlign:'center' }}>
                     Patient Feedback
                  </Text>

              </View>

            </View>

            <View style={{height: 40,flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={{height: 40,flexDirection: 'row', justifyContent: 'center', marginTop: 10}}  onPress={
              () => this.props.navigation.navigate('AddPatient')
            } >
                 <Text style={{  fontSize: 20, color: '#fff', fontWeight: 'normal', textAlign: 'center' }}>
                  Add Patient
                  </Text>
                  <Image source={require('./../images/add_icon.png')} style={{ width: 25, height: 25, marginStart: 5}} >
                  </Image>
              </TouchableOpacity>
            </View>
            <View style={{height: 40}}>
            <TouchableOpacity
  
                      onPress={
                        () => this.props.navigation.navigate('PatientList')
                      }>
                        <Text 
                        style={{ fontSize: 20, color: '#fff', fontWeight: 'normal', textAlign: 'center' }}>
                         Patient List
                           </Text>
                      </TouchableOpacity>
          </View>
            <View style={{height: 40}}>
                 <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'normal', textAlign:'center' }}>
                  Patient recent feedbacks
                  </Text>
          </View>

          <View style={{ height: 40, flex: 1, flexDirection: 'row',  alignSelf: 'center'}}>
              <ImageBackground source={require('./../images/red_round.png')} style={{ width: 40, height: 40,marginTop: 10}} >
              <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign:'center', margin: 10 }}>
                 {notgood_count}
                  </Text>
              </ImageBackground>
              <ImageBackground source={require('./../images/yellow_round.png')} style={{ width: 40, height: 40,marginTop: 10,marginStart: 10}} >
              <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign:'center', margin: 10 }}>
                 {ok_count}
                  </Text>
              </ImageBackground>
              <ImageBackground source={require('./../images/green_round.png')} style={{ width: 40, height: 40 ,marginTop: 10, marginStart: 10}} >
              <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign:'center', margin: 10 }}>
                 {great_count}
                  </Text>
              </ImageBackground>
              
            </View>
          
              <ScrollView scrollEventThrottle={16} style={{ width: '100%',marginTop: 50}}> 
                {feedbackBox}
              </ScrollView> 
            </ImageBackground>
       
        </ContainerView>
      </SafeAreaView>
    );
  }
}

//export default HomeScreen;

const mapStateToProps = (state) => ({
  curState: state
});


export default connect(mapStateToProps, {
  fetchFeedbackIfNeeded
})(NurseHomeScreen);
