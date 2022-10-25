import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import { HomeStackNavigator } from './HomeStackNavigator';
import { HomeIcon, SettingsIcon } from '../components/AppIcons';
import { WalletsStackNavigator } from './WalletsStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';

const ApplicationTable = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="Wallets" icon={HomeIcon} />
    <BottomNavigationTab title="Settings" icon={SettingsIcon} />
  </BottomNavigation>
);

export const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
      <ApplicationTable.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />}>
        <ApplicationTable.Screen name="Home" component={HomeStackNavigator} />
        <ApplicationTable.Screen name="Wallet" component={WalletsStackNavigator} />
        <ApplicationTable.Screen name="Settings" component={SettingsStackNavigator} />
      </ApplicationTable.Navigator>
    </NavigationContainer>
  );
};
