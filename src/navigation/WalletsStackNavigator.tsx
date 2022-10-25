import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { WalletsScreen } from '../screens/wallets/WalletsScreen';

export type WalletsStackParamList = {
  Wallets: undefined;
};

const WalletsStack = createStackNavigator<WalletsStackParamList>();

export function WalletsStackNavigator() {
  const nav = useNavigation();
  console.debug(nav.getState());
  return (
    <WalletsStack.Navigator
      screenOptions={() => ({
        title: '',
      })}>
      <WalletsStack.Screen name="Wallets" component={WalletsScreen} options={{ title: 'Wallets' }} />
    </WalletsStack.Navigator>
  );
}
