import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SendCoinScreen } from '../screens/home/SendCoinScreen';
import { ReceiveCoinScreen } from '../screens/home/ReceiveCoinScreen';
import { ScannerScreen } from '../screens/home/ScannerScreen';
import { CreateWalletScreen } from '../screens/home/CreateWalletScreen';
import { WalletSettingsScreen } from '../screens/home/WalletSettingsScreen';
import { ImportWalletKeystore } from '../screens/home/ImportWalletKeystore';
import { ImportWalletPrivateKey } from '../screens/home/ImportWalletPrivateKey';
import { ImportWalletSeedPhrase } from '../screens/home/ImportWalletSeedPhrase';
import { ImportWalletWatch } from '../screens/home/ImportWalletWatch';
import { SignIn } from '../screens/home/SignIn';
import { WalletSettingsHeaderRight } from '../components/WalletSettingsHeaderRight';
import { WalletModel } from '../data/entities/wallet';
import { TransactionScreen } from '../screens/home/TransactionScreen';

export type HomeStackParamList = {
  HomeScreen: { update: boolean } | undefined;
  SignIn: undefined;
  TransactionScreen: undefined;
  SendCoinScreen: { address: string } | undefined;
  ScannerScreen: undefined;
  ReceiveCoinScreen: undefined;
  CreateWalletScreen: undefined;
  WalletSettingsScreen: { wallet: WalletModel };
  ImportWalletKeystore: undefined;
  ImportWalletPrivateKey: undefined;
  ImportWalletSeedPhrase: undefined;
  ImportWalletWatch: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerShown: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      })}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <HomeStack.Screen name="TransactionScreen" component={TransactionScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="CreateWalletScreen" component={CreateWalletScreen} options={{ title: 'Create' }} />
      <HomeStack.Screen name="SendCoinScreen" component={SendCoinScreen} options={{ title: 'Send' }} />
      <HomeStack.Screen name="ScannerScreen" component={ScannerScreen} options={{ title: 'Scan' }} />
      <HomeStack.Screen name="ReceiveCoinScreen" component={ReceiveCoinScreen} options={{ title: 'Receive' }} />

      <HomeStack.Screen name="WalletSettingsScreen" component={WalletSettingsScreen} options={{ title: 'Settings', headerRight: () => <WalletSettingsHeaderRight /> }} />
      <HomeStack.Screen name="ImportWalletKeystore" component={ImportWalletKeystore} options={{ title: 'Import Keystore' }} />
      <HomeStack.Screen name="ImportWalletPrivateKey" component={ImportWalletPrivateKey} options={{ title: 'Import Private Key' }} />
      <HomeStack.Screen name="ImportWalletSeedPhrase" component={ImportWalletSeedPhrase} options={{ title: 'Import Seed Phrase' }} />
      <HomeStack.Screen name="ImportWalletWatch" component={ImportWalletWatch} options={{ title: 'Watch Wallet' }} />
    </HomeStack.Navigator>
  );
}
