import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useContext, useEffect } from 'react';
import { Text, ListItem, Button } from '@ui-kitten/components';
import _ from 'lodash';
import { useDatabaseConnection } from '../../data/connection';
import { WalletModel } from '../../data/entities/wallet';
import { WalletContext } from '../../providers/WalletProvider';

export const HomeScreen = () => {
  const { walletsRepository } = useDatabaseConnection();
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { state, setWallets } = useContext(WalletContext);

  const loadWallets = async () => {
    const fromDb = await walletsRepository.getAll();
    console.debug('home: wallet count: ', fromDb.length);
    setWallets(fromDb);
  };

  useEffect(() => {
    async function init() {
      await loadWallets();
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [refreshing] = React.useState(false);
  const onRefresh = async () => {
    await loadWallets();
  };

  const onWalletPress = (wallet: WalletModel) => {
    navigator.navigate('WalletScreen', { wallet: wallet });
    console.debug(wallet.address);
  };

  const renderWalletRight = (item: WalletModel) => <Text>{item.lastBalance?.toString()}</Text>;

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={GlobalStyles.container}>
        <ScrollView contentContainerStyle={GlobalStyles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {state.wallets.length < 1 && <Button onPress={() => navigator.navigate('CreateWalletScreen')}>CREATE WALLET</Button>}
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
