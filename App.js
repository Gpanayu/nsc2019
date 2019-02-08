/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 
import React, {Component} from 'react';
import { createStackNavigator,createAppContainer } from "react-navigation";
import HomeScreen from './src/scenes/HomeScreen';
import StatScreen from './src/scenes/StatScreen';
import DashboardScreen from './src/scenes/DashboardScene';
import HeatMapScreen from './src/scenes/HeatMapScreen';


const App = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: "Dashboard",
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home",
      headerStyle: {
        backgroundColor: '#ff9800'
      }
    }
  },
  Stat: {
    screen: StatScreen,
    navigationOptions: {
      title: "Statistics",
    }
  },
  HeatMap: {
    screen: HeatMapScreen,
    navigationOptions: {
      title: "Sample",
    }
  },
});

export default createAppContainer(App)