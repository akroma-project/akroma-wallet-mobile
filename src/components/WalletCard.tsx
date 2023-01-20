import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { WalletModel } from '../data/entities/wallet';
import { getAddressFormat } from '../utils/Wallet';
interface Params {
  wallet: WalletModel;
}
export const WalletCard = (params: Params) => {
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };
  return (
    <View style={[GlobalStyles.walletCard, GlobalStyles.flexRowBetween, GlobalStyles.ph24]}>
      <View>
        <Text style={[GlobalStyles.generalText, GlobalStyles.textBold]}>{params.wallet.name}</Text>
        <Text style={[GlobalStyles.smallText]}>{getAddressFormat(params.wallet.address)}</Text>
      </View>
      <View>
        <Text style={[GlobalStyles.generalText, GlobalStyles.textBold]}>{params.wallet.lastBalance.toLocaleString('en-US', localStringOptions)}</Text>
      </View>
    </View>
  );
};
