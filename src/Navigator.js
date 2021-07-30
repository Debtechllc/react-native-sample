import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import HomeScreen from './screens/Home';
import Myaccount from './screens/Myaccount';
import LoginScreen from './screens/Login';
import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';
import {Image} from 'react-native'
import Signout from './screens/Signout';
import navigation from './reducers/navigation';
import NurseHomeScreen from './screens/NurseHomeScreen';
import PatientMoreOption from './screens/PatientMoreOption';
import Feedbackdetails from './screens/Feedbackdetails';
import AddPatient from './screens/AddPatient';
import SignUp from './screens/SignUp';
import PatientList from './screens/PatientList';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import Otp from './screens/Otp';
import ResetPassword from './screens/ResetPassword';


//createAppContainer,
  //createSwitchNavigator

export const AppMainTab = createBottomTabNavigator({
  Home: {
     screen: HomeScreen,
     navigationOptions:{  
      tabBarLabel:'Home',  
      tabBarIcon:({tintColor})=>(  
        <Image source={require('./images/home.png')}
        style={{ height: 30, width: 30, marginTop: 10, marginBottom: 10 }} />
      ),
      activeTintColor: '#fff',   
    }  
  },
  Myaccount: {
    screen: Myaccount,
    navigationOptions:{  
      tabBarLabel:'My Account',  
      tabBarIcon:({tintColor})=>(  
        <Image source={require('./images/account.png')}
        style={{ height: 30, width: 30, marginTop: 10, marginBottom: 10 }} />
      ),
      activeTintColor: '#fff',   
    }  
  },
  Signout: {
    screen: Signout,
    navigationOptions:{  
      tabBarLabel:'Signout',  
      tabBarIcon:({tintColor})=>(  
        <Image source={require('./images/logouticon.png')}
        style={{ height: 30, width: 30, marginTop: 10, marginBottom: 10 }} />
      ),
      activeTintColor: '#fff',   
    }  
  },
}, {
  tabBarOptions: {
    activeTintColor: '#0845a8',//colors.WHITE,
    inactiveTintColor: '#0D63F1',
    inactiveBackgroundColor: colors.FOOTER_BG,
    activeBackgroundColor: colors.FOOTER_BG,
    showIcon: true,
    //showLabel: Platform.OS === 'ios',
    indicatorStyle: {
      backgroundColor: 'white',//colors.PINK_300
    },
    style: {
      backgroundColor: colors.FOOTER_BG,
    },
    upperCaseLabel: false,
  },
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  initialRouteName:'Home',
  navigationOptions:
  {
    title: 'Home',
    drawerLabel: 'Home',
    tabBarVisible: true,
    drawerIcon: ({ tintcolor }) => (
    <Image source={require('./images/home.png')}
                   style={{height: 25,width: 25}}/>
    ),
  },
});


const AppDrawer = createDrawerNavigator({
  Home: {
    screen: AppMainTab
  },
  Login: {
    screen: LoginScreen
  }
},

{
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
    />),
    contentOptions: {
      activeBackgroundColor: 'red', //colors.BLUE_TRANSPERENT,
      activeTintColor: 'green', //colors.BLACK,
      inactiveTintColor: 'yellow' //colors.BLACK,
    },
  initialRouteName:'Home',
});

const AuthDrawer = createDrawerNavigator({
  Home: {
    screen: AppMainTab,

  },
  Myaccount: {
    screen: Myaccount,

  },
  
  Signout: {
    screen: Signout,
  }


},

{
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
    />),
  contentOptions: {
    activeBackgroundColor: 'red', //colors.BLUE_TRANSPERENT,
    activeTintColor: 'green', //colors.BLACK,
		inactiveTintColor: 'yellow' //colors.BLACK,
  },
  initialRouteName:'Home',
});


export const AppMainStack = createStackNavigator({


  Login: { screen: LoginScreen,
    navigationOptions: {
      header: null
    } 
  },
  SignUp: { screen: SignUp,
    navigationOptions: {
      header: null
    } 
  },
  ForgotPassword: { screen: ForgotPassword,
    navigationOptions: {
      header: null
    } 
  },
  Otp: { screen: Otp,
    navigationOptions: {
      header: null
    } 
  },
  ResetPassword: { screen: ResetPassword,
    navigationOptions: {
      header: null
    } 
  }

}, {
  cardStyle: {
    backgroundColor: 'white', //colors.PINK_50
  },
  mode: 'modal',
    headerStyle: {display:"none"},
    headerLeft: null

});

export const AuthMainStack = createStackNavigator({
  Home: { screen: AuthDrawer ,
    navigationOptions: {
      header: null,
  }},
  PatientMoreOption:{
    screen: PatientMoreOption ,
    navigationOptions: {
      header: null
  }},
  ChangePassword:{
    screen: ChangePassword ,
    navigationOptions: {
      header: null
  }},
  Signout:{
    screen: Signout ,
    navigationOptions: {
      header: null
  }},
}, {
  cardStyle: {
    backgroundColor: 'white',//colors.PINK_50
  },
  mode: 'modal',
    headerStyle: {display:"none"},
    headerLeft: null

});


export const NurseMainTab = createBottomTabNavigator({
  NurseHome: {
     screen: NurseHomeScreen,
     navigationOptions:{  
      //tabBarLabel:'Home',  
      tabBarIcon:({tintColor})=>(  
        <Image source={require('./images/home.png')}
        style={{ height: 30, width: 30, marginTop: 10, marginBottom: 10 }} />
      ),
      activeTintColor: '#1160E5',   
    }  
  },
  Myaccount: {
    screen: Myaccount,
    navigationOptions:{  
      //tabBarLabel:'My Account',  
      tabBarIcon:({tintColor})=>(  
        <Image source={require('./images/account.png')}
        style={{ height: 30, width: 30, marginTop: 10, marginBottom: 10 }} />
      ),
      activeTintColor: '#1160E5',   
    }  
  },
  Signout: {
    screen: Signout,
    navigationOptions:{  
      //tabBarLabel:'Signout',  
      tabBarIcon:({tintColor})=>(  
        <Image source={require('./images/logouticon.png')}
        style={{ height: 30, width: 30, marginTop: 10 }} />
      ),
      activeTintColor: '#1160E5',   
    }  
  },
}, {
  tabBarOptions: {
    activeTintColor: '#0845a8',//colors.WHITE,
    inactiveTintColor: '#0D63F1',
    inactiveBackgroundColor: colors.FOOTER_BG,
    activeBackgroundColor: colors.FOOTER_BG,
    showIcon: true,
    //showLabel: Platform.OS === 'ios',
    indicatorStyle: {
      backgroundColor: 'white',//colors.PINK_300
    },
    style: {
      backgroundColor: colors.FOOTER_BG,
    },
    upperCaseLabel: false,
  },
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  initialRouteName:'NurseHome',
  navigationOptions:
  {
    title: 'Home',
    drawerLabel: 'NurseHome',
    tabBarVisible: true,
    drawerIcon: ({ tintcolor }) => (
    <Image source={require('./images/home.png')}
                   style={{height: 40,width: 40, paddingTop: 10}}/>
    ),
  },
});


export const NurseDrawer = createDrawerNavigator({
  NurseHome: {
    screen: NurseMainTab,

  },
  Myaccount: {
    screen: Myaccount,

  },
  
  Signout: {
    screen: Signout,
  }


},

{
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
    />),
    contentOptions: {
      activeBackgroundColor: 'red', //colors.BLUE_TRANSPERENT,
      activeTintColor: 'green', //colors.BLACK,
      inactiveTintColor: 'yellow' //colors.BLACK,
    },
  initialRouteName:'NurseHome',
});


export const NurseMainStack = createStackNavigator({
  NurseHome: { screen: NurseDrawer,
    navigationOptions: {
      header: null,
  }},

  Signout:{
    screen: Signout ,
    navigationOptions: {
      header: null
  }},
  ChangePassword:{
    screen: ChangePassword ,
    navigationOptions: {
      header: null
  }},
  AddPatient:{
    screen: AddPatient ,
    navigationOptions: {
      header: null
  }},
  PatientList:{
    screen: PatientList ,
    navigationOptions: {
      header: null
  }},
  Feedbackdetails:{
    screen: Feedbackdetails ,
    navigationOptions: {
      header: null
  }},
}, {
  cardStyle: {
    backgroundColor: 'white',//colors.PINK_50
  },
  mode: 'modal',
    headerStyle: {display:"none"},
    headerLeft: null

});




export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading:AuthLoadingScreen,
      App:AppMainStack,
      Auth: AuthMainStack,
      Nurse: NurseMainStack
    },
    {
      initialRouteName: 'AuthLoading',
    }

  ));
