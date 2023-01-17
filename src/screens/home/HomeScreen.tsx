import * as React from 'react';
import { AppState, Platform, SafeAreaView, ScrollView } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useCallback, useEffect, useState } from 'react';

import RNPermissions, { NotificationsResponse, Permission, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { HomeHeader } from '../../components/HomeHeader';
import { HomeResumeAmount } from '../../components/HomeResumeAmount';
import { WalletContext } from '../../providers/WalletProvider';
import { TopWallets } from '../../components/TopWallets';
import { LastTransactions } from '../../components/LastTransactions';
import { useDatabaseConnection } from '../../data/connection';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';

export const HomeScreen = () => {
  const { isConnected } = useDatabaseConnection();

  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statuses, setStatuses] = useState<Partial<Record<Permission, PermissionStatus>>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState<NotificationsResponse>({
    settings: {},
    status: 'unavailable',
  });
  const { state, loadWallets, refreshWallets, setActive } = React.useContext(WalletContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { SIRI, ...PERMISSIONS_IOS } = PERMISSIONS.IOS; // remove siri (certificate required)

  const PLATFORM_PERMISSIONS = Platform.select<typeof PERMISSIONS.ANDROID | typeof PERMISSIONS_IOS | typeof PERMISSIONS.WINDOWS | {}>({
    android: PERMISSIONS.ANDROID,
    ios: PERMISSIONS_IOS,
    windows: PERMISSIONS.WINDOWS,
    default: {},
  });

  const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

  const check = useCallback(() => {
    RNPermissions.checkMultiple(PERMISSIONS_VALUES)
      .then(setStatuses)
      .then(() => RNPermissions.checkNotifications())
      .then(setNotifications)
      .catch(error => console.warn(error));
  }, [PERMISSIONS_VALUES]);

  useEffect(() => {
    const { remove } = AppState.addEventListener('change', status => status === 'active' && check());
    return remove;
  }, [check]);

  useEffect(() => {
    (async () => {
      await refreshWallets();
      await loadWallets();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
  React.useEffect(() => {
    if (!state.wallet.address && state.wallets.length > 0) {
      setActive(state.wallets[0].id);
    }
  }, [state, setActive]);
  return (
    <SafeAreaView style={GlobalStyles.generalBackground}>
      <HomeHeader address={state.wallet.address || ''} name={state.wallet.name || ''} />
      <HomeResumeAmount balance={state.wallet?.lastBalance} />
      <HomeTransferButtons />
      <ScrollView>
        <TopWallets wallets={state.wallets} />
        <LastTransactions wallets={state.wallets} />
      </ScrollView>
    </SafeAreaView>
  );
};
