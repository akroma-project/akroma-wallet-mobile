import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useContext, useEffect } from 'react';
import { Text, ListItem } from '@ui-kitten/components';
import _ from 'lodash';
import { WalletModel } from '../../data/entities/wallet';
import { WalletContext } from '../../providers/WalletProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WalletsScreen = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { state, loadWallets, refreshWallets } = useContext(WalletContext);

  useEffect(() => {
    async function init() {
      await loadWallets();
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [refreshing] = React.useState(false);
  const onRefresh = async () => {
    await refreshWallets();
    await loadWallets();
  };

  const onWalletPress = async (wallet: WalletModel) => {
    await AsyncStorage.setItem('walletSelected', JSON.stringify(wallet));
    navigator.navigate('WalletScreen', { wallet: wallet });
  };

  const renderWalletRight = (item: WalletModel) => <Text>{item.lastBalance?.toString()}</Text>;

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.container}>
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
      </View>
    </SafeAreaView>
  );
};
