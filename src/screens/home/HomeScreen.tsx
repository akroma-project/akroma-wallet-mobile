import * as React from 'react';
import { AppState, Platform, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Text, ListItem } from '@ui-kitten/components';
import _ from 'lodash';
import { WalletModel } from '../../data/entities/wallet';
import { WalletContext } from '../../providers/WalletProvider';
import RNPermissions, { NotificationsResponse, Permission, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import { ImageOverlay } from '../../extra/image-overlay.component';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { state, loadWallets } = useContext(WalletContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statuses, setStatuses] = useState<Partial<Record<Permission, PermissionStatus>>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState<NotificationsResponse>({
    settings: {},
    status: 'unavailable',
  });

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
      setTimeout(async () => {
        await loadWallets();
      }, 500);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [refreshing] = React.useState(false);
  const onRefresh = async () => {
    await loadWallets();
  };

  const onWalletPress = async (wallet: WalletModel) => {
    await AsyncStorage.setItem('walletSelected', JSON.stringify(wallet));
    navigator.navigate('WalletScreen', { wallet: wallet });
  };

  const renderWalletRight = (item: WalletModel) => <Text>{item.lastBalance?.toString()}</Text>;

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <ImageOverlay style={GlobalStyles.container} source={require('../../assets/images/background.png')}>
        <ScrollView contentContainerStyle={GlobalStyles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {/* {state.wallets.length < 1 && <NoWallet />} */}
          {state.wallets.length > 0 &&
            _.sortBy(state.wallets, x => x.address).map((item, index) => (
              <ListItem
                key={index}
                title={item.name}
                description={item.address}
                // accessoryLeft={renderWalletLeft}
                onPress={() => onWalletPress(item)}
                accessoryRight={() => renderWalletRight(item)}
              />
            ))}
        </ScrollView>
      </ImageOverlay>
    </SafeAreaView>
  );
};
