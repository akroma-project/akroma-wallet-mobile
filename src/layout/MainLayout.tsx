import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

import { HomeHeader } from '../components/HomeHeader';
import { HomeResumeAmount } from '../components/HomeResumeAmount';
import { WalletContext } from '../providers/WalletProvider';

const MainLayout = ({ children }) => {
  const { state } = useContext(WalletContext);
  const resumeBalance = state.wallet.address ? state.wallet.lastBalance : state.totalBalance;

  return (
    <SafeAreaView style={[GlobalStyles.generalBackground, GlobalStyles.flex]}>
      <HomeHeader address={state.wallet.address || ''} name={state.wallet.name || ''} />
      <HomeResumeAmount balance={resumeBalance} />
      {children}
      {/* <LastTransactions wallets={state.wallets} /> */}
    </SafeAreaView>
  );
};

export default MainLayout;
