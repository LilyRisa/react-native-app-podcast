import * as React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppNavigation from './AppNavigation';

function App(){
    const AppNavigator = createAppContainer(AppNavigation);
    return(
        <AppNavigator></AppNavigator>
    );
}

export default App;