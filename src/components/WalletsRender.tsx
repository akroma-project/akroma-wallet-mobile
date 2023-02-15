import { Divider } from '@ui-kitten/components';
import GlobalStyles, { DymanicStyles } from '../constants/GlobalStyles';
import React, { useEffect, useState, useContext } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { WalletCard } from './WalletCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalletContext } from '../providers/WalletProvider';

interface WalletsSectionProps {
  title: string;
  wallets: WalletModel[];
  style?: any;
}
const WalletsSection = (params: WalletsSectionProps) => {
  const { setActive, updateBalance } = useContext(WalletContext);

  const handleSelect = (id: string) => {
    updateBalance(id);
    setActive(id);
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

interface WalletsRenderProps {
  wallets: WalletModel[];
}

export const WalletsRender = ({ wallets }: WalletsRenderProps) => {
  const [walletsState, setWalletsState] = useState<WalletModel[]>();
  const [watchWallets, setWatchWallets] = useState<WalletModel[]>();
  const [viewHeight, setViewHeight] = useState(Dimensions.get('screen').height);

  useEffect(() => {
    const removeWatchedWallets = wallets.filter(element => element.encrypted !== 'watch');
    const orderWallets = removeWatchedWallets.sort((a, b) => Number(b.lastBalance) - Number(a.lastBalance));
    setWalletsState(orderWallets);

    const tempWatchwallet = wallets.filter(element => element.encrypted === 'watch');
    setWatchWallets(tempWatchwallet);
  }, [wallets]);
  Dimensions.addEventListener('change', () => {
    setViewHeight(Dimensions.get('screen').height);
  });

  return (
    <View style={[DymanicStyles({ viewHeight }).walletsContainer]}>
      <SafeAreaView style={GlobalStyles.mt20}>
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
