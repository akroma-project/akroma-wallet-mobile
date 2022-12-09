import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { WalletsScreen } from '../screens/wallets/WalletsScreen';
import { BlockDetails } from '../screens/wallets/BlockDetails';
import { WalletTransactionHistory } from '../screens/wallets/WalletTransactionHistory';
import { DetailsScreenHeaderRight } from '../components/DetailsScreenHeaderRight';
import { WalletDetailsScreen } from '../screens/wallets/WalletDetailsScreen';
import { WalletModel } from '../data/entities/wallet';

export type WalletsStackParamList = {
  Wallets: undefined;
  BlockNumber: { blockNumber: string };
  WalletTransactionHistory: undefined;
  WalletScreen: { wallet: WalletModel };
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
      <WalletsStack.Screen name="BlockNumber" component={BlockDetails} options={{ title: 'Block Details' }} />
      <WalletsStack.Screen name="WalletTransactionHistory" component={WalletTransactionHistory} options={{ title: 'Wallet Transaction History' }} />
      <WalletsStack.Screen name="WalletScreen" component={WalletDetailsScreen} options={{ title: 'Details', headerRight: () => <DetailsScreenHeaderRight /> }} />
    </WalletsStack.Navigator>
  );
}
