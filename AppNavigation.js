import * as React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Untitled from './src/screens/Untitled';
import Player from './src/screens/Player';

const AppNavigation = createStackNavigator({
  Podcast: {
    screen: Untitled
  },
  Episode: {
    screen: Player
  }
});


export default AppNavigation;