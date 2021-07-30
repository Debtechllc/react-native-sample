import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let user = null;
    AsyncStorage.getItem('user', (err, result) => {
      user = result;
    });

    if(user && user.type == 1){
      this.props.navigation.navigate('Nurse' );
    }
    else if(user && user.type == 2){
      this.props.navigation.navigate('Auth');
    }
    else{
      this.props.navigation.navigate('App');
    }
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    curState: state
  });


  export default connect(mapStateToProps, {

  })(AuthLoadingScreen);
