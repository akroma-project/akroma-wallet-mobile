import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStackNavigator } from './HomeStackNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import { CreateWalletScreen } from '../screens/CreateWalletScreen';
import { ImportWalletScreen } from '../screens/ImportWalletScreen';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: 'right' }} initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackNavigator} />
        <Drawer.Screen name="Create Wallet" component={CreateWalletScreen} />
        <Drawer.Screen name="Import Wallet" component={ImportWalletScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
