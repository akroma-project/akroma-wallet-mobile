import { Divider } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import React, { useEffect, useState } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { WalletCard } from './WalletCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalletContext } from '../providers/WalletProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useNavigation } from '@react-navigation/core';
interface Props {
  wallets: WalletModel[];
}
interface WalletsSectionParams {
  title: string;
  wallets: WalletModel[];
  style?: any;
}
const WalletsSection = (params: WalletsSectionParams) => {
  const { setActive } = React.useContext(WalletContext);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const handleSelect = (id: string) => {
    setActive(id);
    navigator.navigate('TransactionScreen');
  };
  return (
    <View style={params.style}>
      <Text style={styles.subTitle}>{params.title}</Text>
      {params.wallets?.map(wallet => (
        <TouchableHighlight underlayColor="#DDDDDD" key={wallet.id} onPress={() => handleSelect(wallet.id)}>
          <View>
            <WalletCard wallet={wallet} />
            <Divider />
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};
export const TopWallets = ({ wallets }: Props) => {
  const [walletsState, setWalletsState] = useState<WalletModel[]>();
  const [watchWallets, setWatchWallets] = useState<WalletModel[]>();

  useEffect(() => {
    const removeWatchedWallets = wallets.filter(element => element.encrypted !== 'watch');
    const orderWallets = removeWatchedWallets.sort((a, b) => Number(b.lastBalance) - Number(a.lastBalance));
    const topWallets = orderWallets.slice(0, 3);
    setWalletsState(topWallets);
    const tempWatchwallet = wallets.filter(element => element.encrypted === 'watch');
    setWatchWallets(tempWatchwallet);
  }, [wallets]);
  return (
    <View style={[GlobalStyles.walletsContainer]}>
      <Text style={[GlobalStyles.titleText, GlobalStyles.pv24]}>Wallets</Text>
      <SafeAreaView>
        <ScrollView>
          <WalletsSection title={'My Wallets'} wallets={walletsState} />
          {watchWallets?.length > 0 && <WalletsSection title={'Watched Wallets'} wallets={watchWallets} style={styles.walletsSection} />}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  walletsSection: {
    paddingTop: 30,
  },
  subTitle: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  container: {
    height: '29%',
    backgroundColor: 'red',
  },
});
