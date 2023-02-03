import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import SuccessIcon from '../../assets/svg/SuccessSvg';
import LinearGradient from 'react-native-linear-gradient';

export const SuccessScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('HomeScreen'), 3000);
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.flex}>
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#4C4C52', '#050505']} style={{ flex: 1 }}>
          <View style={Style.containerCenter}>
            <Text style={Style.mainText}>Success!</Text>
            <Text style={Style.msgText}>Your wallet has been created!.</Text>
            <SuccessIcon />
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
