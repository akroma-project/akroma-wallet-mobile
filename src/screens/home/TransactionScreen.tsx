import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';
import PanUpHandler from '../../components/PanUpHandler';
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
      {!isWatchWallet ? (
        <PanUpHandler>
          <TransactionSection setDisplayButtons={setDisplayButtons} />
        </PanUpHandler>
      ) : (
        <TransactionSection setDisplayButtons={setDisplayButtons} />
      )}
    </MainLayout>
  );
};
