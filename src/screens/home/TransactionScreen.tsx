import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';
import { WalletContext } from '../../providers/WalletProvider';
import { TransactionSection } from '../../components/TransactionSection';
import MainLayout from '../../layout/MainLayout';

export const TransactionScreen = () => {
  const [displayButtons, setDisplayButtons] = useState<'flex' | 'none'>('flex');
  const { state } = useContext(WalletContext);
  const isWatchWallet = state.wallet.encrypted === 'watch';

  return (
    <MainLayout>
      <View style={{ display: displayButtons }}>{!isWatchWallet && <HomeTransferButtons />}</View>
      <TransactionSection setDisplayButtons={setDisplayButtons} />
    </MainLayout>
  );
};
