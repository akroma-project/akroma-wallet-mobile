import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';
import { TransactionSection } from '../../components/TransactionSection';
import MainLayout from '../../layout/MainLayout';

export const TransactionScreen = () => {
  const [displayButtons, setDisplayButtons] = useState<'flex' | 'none'>('flex');

  return (
    <MainLayout>
      <View style={{ display: displayButtons }}>
        <HomeTransferButtons />
      </View>

      <TransactionSection setDisplayButtons={setDisplayButtons} />
    </MainLayout>
  );
};
