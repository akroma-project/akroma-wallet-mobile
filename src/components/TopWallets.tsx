import { Card, Layout } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import React, { useEffect, useState } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { StyleSheet, Text, View } from 'react-native';

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
    <Layout style={GlobalStyles.bgTransparent}>
      <Text style={styles.title}>Top Wallets</Text>
      {walletsState &&
        walletsState.map(wallet => (
          <Card key={wallet.id}>
            <View style={GlobalStyles.flexRow}>
              <Text style={[styles.fieldText, styles.cardText]}>Address name: </Text>
              <Text style={styles.cardText}>{wallet.name}</Text>
            </View>

            <View style={GlobalStyles.flexRow}>
              <Text style={[styles.fieldText, styles.cardText]}>Balance:</Text>
              <Text style={[styles.cardText, styles.balance]}>{wallet.lastBalance.toString()} AKA</Text>
            </View>
          </Card>
        ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    paddingHorizontal: 20,
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    paddingHorizontal: '5%',
    paddingVertical: 8,
  },
  cardText: {
    color: 'black',
    fontSize: 15,
  },
  fieldText: {
    fontWeight: 'bold',
  },
  balance: {
    color: 'purple',
    paddingLeft: 5,
  },
});
