import React from 'react';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';
import { TransactionSection } from '../../components/TransactionSection';
import MainLayout from '../../layout/MainLayout';

export const TransactionScreen = () => {
  return (
    <MainLayout>
      <HomeTransferButtons />
      <TransactionSection />
    </MainLayout>
  );
};
