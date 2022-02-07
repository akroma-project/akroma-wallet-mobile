import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SendCoinScreen } from '../screens/home/SendCoinScreen';
import { ReceiveCoinScreen } from '../screens/home/ReceiveCoinScreen';
import { WalletScreen } from '../screens/home/WalletScreen';
import { ScannerScreen } from '../screens/home/ScannerScreen';
import { WalletModel } from '../data/entities/wallet';
import { CreateWalletScreen } from '../screens/onboarding/CreateWalletScreen';
import { TouchableOpacity } from 'react-native';
import { WalletSettingsScreen } from '../screens/home/WalletSettingsScreen';
import { Icon } from '@ui-kitten/components/ui';
import GlobalStyles from '../constants/GlobalStyles';
import { useActionSheet } from '@expo/react-native-action-sheet';

export type HomeStackParamList = {
  HomeScreen: { update: boolean } | undefined;
  WalletScreen: { wallet: WalletModel };
  SendCoinScreen: { address: string } | undefined;
  ScannerScreen: undefined;
  ReceiveCoinScreen: undefined;
  CreateWalletScreen: undefined;
  WalletSettingsScreen: { wallet: WalletModel };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  const { showActionSheetWithOptions } = useActionSheet();
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerStyle: GlobalStyles.header,
        headerRight: (style: any) => (
          <TouchableOpacity
            onPress={() =>
              showActionSheetWithOptions(
                {
                  options: ['Copy Wallet Address', 'Show Wallet Address', 'Add / Hide Tokens', 'Rename Wallet'],
                  cancelButtonIndex: 99,
                  showSeparators: true,
                },
                (index: number) => {
                  if (index === 0) {
                    console.debug('delete called');
                  }
                },
              )
            }>
            <Icon name="menu-outline" {...style} style={GlobalStyles.iconRight} fill="#000000" />
          </TouchableOpacity>
        ),
        title: '',
      })}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <HomeStack.Screen name="SendCoinScreen" component={SendCoinScreen} options={{ title: 'Send' }} />
      <HomeStack.Screen name="ScannerScreen" component={ScannerScreen} options={{ title: 'Scan' }} />
      <HomeStack.Screen name="ReceiveCoinScreen" component={ReceiveCoinScreen} options={{ title: 'Receive' }} />
      <HomeStack.Screen name="WalletScreen" component={WalletScreen} options={{ title: 'Details' }} />
      <HomeStack.Screen name="CreateWalletScreen" component={CreateWalletScreen} options={{ title: 'Create' }} />
      <HomeStack.Screen name="WalletSettingsScreen" component={WalletSettingsScreen} options={{ title: 'Settings' }} />
    </HomeStack.Navigator>
  );
}
