import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import SuccessIcon from '../../assets/svg/SuccessSvg';
import LinearGradient from 'react-native-linear-gradient';

export const SuccessScreen = ({ route, navigation }) => {
  const message: string = route.params?.message ?? null;
  const navigateTo = direction => setTimeout(() => navigation.navigate(direction), 3000);
  const defaultMessage = 'Your wallet has been created!.';

  useEffect(() => {
    if (message) {
      navigateTo('HomeScreen');
    } else {
      navigateTo('ExportWalletNotice');
    }
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={Style.container}>
        <LinearGradient colors={['#4C4C52', '#050505']} style={Style.container}>
          <View style={Style.containerCenter}>
            <Text style={Style.mainText}>Success!</Text>
            <Text style={Style.msgText}>{message ?? defaultMessage}</Text>
            <SuccessIcon />
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  mainText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '600',
  },
  msgText: {
    color: '#E8E8E9',
    fontSize: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
});
