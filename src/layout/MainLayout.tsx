import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

import { HomeHeader } from '../components/HomeHeader';
import { HomeResumeAmount } from '../components/HomeResumeAmount';
import { WalletContext } from '../providers/WalletProvider';
import { getAkromaPrice } from '../services/AkromaApi';

const MainLayout = ({ children }) => {
  const { state } = useContext(WalletContext);
  const resumeBalance = state.wallet.address ? state.wallet.lastBalance : state.totalBalance;
  const [usdBalance, setUsdBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const currentPrice = await getAkromaPrice();
      setUsdBalance(currentPrice * (resumeBalance as number));
    })();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.generalBackground, GlobalStyles.flex]}>
      <HomeHeader address={state.wallet.address || ''} name={state.wallet.name || ''} />
      <HomeResumeAmount balance={resumeBalance} usdBalance={usdBalance} />
      {children}
      {/* <LastTransactions wallets={state.wallets} /> */}
    </SafeAreaView>
  );
};

export default MainLayout;
