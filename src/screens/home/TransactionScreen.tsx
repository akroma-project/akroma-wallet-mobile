import React from 'react';
import { useState } from 'react';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';
import { TransactionSection } from '../../components/TransactionSection';
import MainLayout from '../../layout/MainLayout';

export const TransactionScreen = () => {
  const [, setDisplayButtons] = useState(undefined);

  return (
    <MainLayout>
      <HomeTransferButtons />

      <TransactionSection setDisplayButtons={setDisplayButtons} />
    </MainLayout>
  );
};
