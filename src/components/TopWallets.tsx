import { Card, Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { WalletModel } from '../data/entities/wallet';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

interface Props {
  wallets: WalletModel[];
}

export const TopWallets = ({ wallets }: Props) => {
  const [walletsState, setWalletsState] = useState<WalletModel[]>();

  useEffect(() => {
    const orderWallets = wallets.sort((a, b) => Number(b.lastBalance) - Number(a.lastBalance));
    const topWallets = orderWallets.slice(0, 3);
    setWalletsState(topWallets);
  }, [wallets]);
  return (
    <Layout>
      <Text style={styles.title}>Top Wallets</Text>
      {walletsState &&
        walletsState.map(wallet => (
          <Card key={wallet.id}>
            <Text style={styles.cardText}>Address name: {wallet.name}</Text>
            <Text style={styles.cardText}>Balance: {wallet.lastBalance.toString()} AKA</Text>
          </Card>
        ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    color: 'black',
  },
  cardText: {
    color: 'black',
    fontSize: 15,
  },
});
