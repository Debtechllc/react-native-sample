import React, { Component } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions'
import GridView from 'react-native-super-grid';
import { StyleSheet, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from './../components/Elements/TopBar';
import {common_styles} from './../css/style'

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class ProfileScreen extends Component {
  componentDidMount(prevProps, prevState, snapshot){
    let data = {param1:'reactjs'}
    this.props.fetchPostsIfNeeded(data);
    console.log('GrandChild did mount.');
  }

  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: ({tintColor}) => (
      <Icon name ='ios-contact' size={23} color={tintColor}/>
    )
  };
  render() {
    //let productlist = this.props.curState.Profile.posts.jsonresp.data

      //console.log(this.props.curState.Profile.posts.jsonresp)
    let productlist = []
      if(this.props.curState.Profile.posts.jsonresp)
        productlist = this.props.curState.Profile.posts.jsonresp.data
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView style={{ flex: 1 }}>
          <TopBar notificationCount="9" cartCount="10" isTypeOfBack="back"  ></TopBar>
          <View style={{flex:1, backgroundColor:'white'}}><Text>Profile</Text></View>
        </ContainerView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
	curState:state
});


export default connect(mapStateToProps, {
	fetchPostsIfNeeded,
})(ProfileScreen);
