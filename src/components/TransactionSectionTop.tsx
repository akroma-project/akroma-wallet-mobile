import React from 'react';
import { Button } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { Text, View } from 'react-native';
import ArrowleftSvg from '../assets/svg/ArrowleftSvg';
import MinusSvg from '../assets/svg/MinusSvg';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { useNavigation } from '@react-navigation/core';
import { WalletContext } from '../providers/WalletProvider';

export const TransactionSectionTop = () => {
  const { cleanWalletActive } = React.useContext(WalletContext);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const handleBack = () => {
    cleanWalletActive();
    navigator.navigate('HomeScreen');
  };
  return (
    <View style={GlobalStyles.pt8}>
      <View style={GlobalStyles.alingItemsCenter}>
        <MinusSvg />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.displayFlex]}>
        <View style={[GlobalStyles.flex, GlobalStyles.alingItemsStart]}>
          <Button onPress={handleBack} appearance="ghost" accessoryLeft={<ArrowleftSvg />} />
        </View>
        <View style={GlobalStyles.flex}>
          <Text style={[GlobalStyles.titleText, GlobalStyles.pt10]}>Transactions</Text>
        </View>
        <View style={GlobalStyles.flex} />
      </View>
    </View>
  );
};
