import { Divider } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import React, { useEffect, useState } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { WalletCard } from './WalletCard';
interface Props {
  wallets: WalletModel[];
}
export const TopWallets = ({ wallets }: Props) => {
  const [walletsState, setWalletsState] = useState<WalletModel[]>();

  useEffect(() => {
    const removeWatchedWallets = wallets.filter(element => element.encrypted !== 'watch');
    const orderWallets = removeWatchedWallets.sort((a, b) => Number(b.lastBalance) - Number(a.lastBalance));
    const topWallets = orderWallets.slice(0, 3);
    setWalletsState(topWallets);
  }, [wallets]);
  return (
    <View style={[GlobalStyles.walletsContainer]}>
      <Text style={styles.title}>Wallets</Text>
      <Text style={styles.subTitle}>My Wallets</Text>
      {walletsState &&
        walletsState.map(wallet => (
          <TouchableHighlight underlayColor="#DDDDDD" key={wallet.id} onPress={() => console.log(wallet.address)}>
            <View>
              <WalletCard wallet={wallet} />
              <Divider />
            </View>
          </TouchableHighlight>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1C1C1E',
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
