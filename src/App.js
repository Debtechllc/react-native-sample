import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import RootContainer from './RootContainer';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
			     <RootContainer />
        </View>
      </Provider>
    );
  }
}
