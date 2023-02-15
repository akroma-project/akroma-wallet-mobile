import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeStackNavigator } from './HomeStackNavigator';
import { WalletsStackNavigator } from './WalletsStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';

const ApplicationTable = createBottomTabNavigator();

export const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
      <ApplicationTable.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" tabBar={() => undefined}>
        <ApplicationTable.Screen name="Home" component={HomeStackNavigator} />
        <ApplicationTable.Screen name="Wallet" component={WalletsStackNavigator} />
        <ApplicationTable.Screen name="Settings" component={SettingsStackNavigator} />
      </ApplicationTable.Navigator>
    </NavigationContainer>
  );
};
