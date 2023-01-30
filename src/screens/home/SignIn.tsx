import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CreateStackParamList } from '../../navigation/CreateStackNavigator';

import LinearGradient from 'react-native-linear-gradient';
import { ButtonDesign } from '../../components/ButtonDesign';
import GlobalStyles from '../../constants/GlobalStyles';
import AkaIcon from '../../assets/svg/AkaIconSvg';

export const SignIn = () => {
  type createWalletProp = StackNavigationProp<CreateStackParamList, 'CreateWalletScreen'>;
  const navigator = useNavigation<createWalletProp>();
  const navigationCreateWallet = () => navigator.navigate('CreateWalletScreen');

  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#4C4C52', '#050505']} style={{ flex: 1 }}>
          <View style={Style.containerCenter}>
            <View style={Style.flexCenter}>
              <AkaIcon size={180} />
              <Text style={Style.mainText}>Welcome to Akroma</Text>
              <ButtonDesign route={navigationCreateWallet} colorBtn={'#DB0000'} colorText={'white'} textBtn={'Create Wallet'} />
              {/* <View style={Style.dividerContainer}>
                <View style={Style.lineDivider} />
                <View style={{ width: '16%' }}>
                  <Text style={Style.textDivider}>or</Text>
                </View>
                <View style={Style.lineDivider} />
              </View>
              <ButtonDesign colorBtn={'white'} colorText={'black'} textBtn={'Import Key'} /> */}
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 32,
    paddingTop: 40,
    paddingBottom: 70,
  },
  lineDivider: {
    width: '37%',
    height: 1,
    backgroundColor: 'white',
  },
  textDivider: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
});
