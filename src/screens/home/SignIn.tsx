import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ButtonDesign } from '../../components/ButtonDesign';
import GlobalStyles from '../../constants/GlobalStyles';
import { ImageOverlay } from '../../extra/image-overlay.component';

export const SignIn = () => {
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#4C4C52', '#050505']} style={{ flex: 1 }}>
          <View style={Style.containerCenter}>
            <View style={Style.flexCenter}>
              <Image style={Style.akromaIcon} source={require('../../assets/images/icon.png')} />
              <Text style={Style.mainText}>Welcome to Akroma</Text>
              <ButtonDesign colorBtn={'#DB0000'} colorText={'white'} textBtn={'Create Wallet'} />
              <View style={Style.dividerContainer}>
                <View style={Style.lineDivider} />
                <View style={{ width: '16%' }}>
                  <Text style={Style.textDivider}>or</Text>
                </View>
                <View style={Style.lineDivider} />
              </View>
              <ButtonDesign colorBtn={'white'} colorText={'black'} textBtn={'Import Key'} />
            </View>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  akromaIcon: {
    height: 180,
    width: 180,
  },
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
