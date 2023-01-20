import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Animated } from 'react-native';
import { HomeTransferButtons } from '../../components/HomeTransferButtons';
import { TransactionSection } from '../../components/TransactionSection';
import MainLayout from '../../layout/MainLayout';

export const TransactionScreen = () => {
  const [displayButtons, setDisplayButtons] = useState(undefined);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  return (
    <MainLayout>
      <HomeTransferButtons />

      <TransactionSection setDisplayButtons={setDisplayButtons} />
    </MainLayout>
  );
};
