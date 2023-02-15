import * as React from 'react';
import { AppState, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import RNPermissions, { NotificationsResponse, Permission, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { WalletContext } from '../../providers/WalletProvider';
import { TopWallets } from '../../components/TopWallets';
import { useDatabaseConnection } from '../../data/connection';
import MainLayout from '../../layout/MainLayout';

export const HomeScreen = ({ navigation }) => {
  const { walletsRepository, isConnected } = useDatabaseConnection();

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
    (async () => {
      const wallets = await walletsRepository.any();

      if (!wallets && isConnected) {
        navigation.navigate('SignIn');
      }
      await refreshWallets();
      await loadWallets();
    })();
  }, [isConnected]);

  return (
    <MainLayout>
      <TopWallets wallets={state.wallets} />
    </MainLayout>
  );
};
