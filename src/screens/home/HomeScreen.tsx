import * as React from 'react';
import { AppState, Platform, SafeAreaView } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useCallback, useEffect, useState } from 'react';

import RNPermissions, { NotificationsResponse, Permission, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { HomeHeader } from '../../components/HomeHeader';
import { HomeResumeAmount } from '../../components/HomeResumeAmount';
import { WalletContext } from '../../providers/WalletProvider';
export const HomeScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statuses, setStatuses] = useState<Partial<Record<Permission, PermissionStatus>>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState<NotificationsResponse>({
    settings: {},
    status: 'unavailable',
  });
  const { state, loadWallets, refreshWallets } = React.useContext(WalletContext);

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
    async function init() {
      console.log('antes++++++++++');
      await loadWallets();
      await refreshWallets();
      console.log('despues++++++++++');
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <HomeHeader />
      <HomeResumeAmount balance={state.totalBalance} />
    </SafeAreaView>
  );
};
