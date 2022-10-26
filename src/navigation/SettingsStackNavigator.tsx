import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type SettingsStackParamList = {
  SettingsWalletScreen: undefined;
};

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        headerShown: true,
      })}>
      <SettingsStack.Screen name="SettingsWalletScreen" component={SettingsScreen} options={{ title: 'Settings' }} />
    </SettingsStack.Navigator>
  );
}
