import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';

import { HomeHeader } from '../components/HomeHeader';
import { HomeResumeAmount } from '../components/HomeResumeAmount';
import { WalletContext } from '../providers/WalletProvider';
import { GlobalContext } from '../providers/GlobalProvider';

const MainLayout = ({ children }) => {
  const { setAppHeight } = useContext(GlobalContext);
  const { state } = useContext(WalletContext);

  return (
    <SafeAreaView
      onLayout={event => {
        let { height } = event.nativeEvent.layout;
        setAppHeight(height);
      }}
      style={[GlobalStyles.generalBackground, GlobalStyles.flex]}>
      <HomeHeader address={state.wallet.address || ''} name={state.wallet.name || ''} />
      <HomeResumeAmount />
      {children}
      {/* <LastTransactions wallets={state.wallets} /> */}
    </SafeAreaView>
  );
};

export default MainLayout;
