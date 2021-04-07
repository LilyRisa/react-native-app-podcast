import * as React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Untitled from './src/screens/Untitled';
// import Player from './src/screens/Player';
import PlayerMediaTest from './src/screens/PlayerMediaTest';

const AppNavigation = createStackNavigator({
  Podcast: {
    screen: Untitled
  },
  Music: {
    screen: PlayerMediaTest
  }
});


export default AppNavigation;