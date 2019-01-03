/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator,createAppContainer } from "react-navigation";
import HomeScreen from './src/scenes/HomeScreen'

const App = createStackNavigator({
  Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        headerStyle: {
          backgroundColor: '#ff9800'
        }
      },
  }
});

export default createAppContainer(App)