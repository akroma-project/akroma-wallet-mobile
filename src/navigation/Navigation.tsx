import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStackNavigator } from './HomeStackNavigator';
import { CreateStackNavigator } from './CreateStackNavigator';
import { ImportStackNavigator } from './ImportStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: 'right' }} initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="Create Wallet" component={CreateStackNavigator} />
        <Drawer.Screen name="Import Wallet" component={ImportStackNavigator} />
        <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
