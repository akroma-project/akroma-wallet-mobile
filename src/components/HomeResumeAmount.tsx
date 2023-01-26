import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@ui-kitten/components';
import AkaIcon from '../assets/svg/AkaIconSvg';
import { getAkromaPrice } from '../services/AkromaApi';
import { WalletContext } from '../providers/WalletProvider';

export const HomeResumeAmount = () => {
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };

  const { state } = useContext(WalletContext);
  const [usdBalance, setUsdBalance] = useState(0);
  const mainBalance = state.wallet.address ? state.wallet.lastBalance : state.totalBalance;

  useEffect(() => {
    (async () => {
      const getPrice = (await getAkromaPrice()) as number;
      setUsdBalance(getPrice);
    })();
  }, []);

  return (
    <View style={styles.resumeContainer}>
      <AkaIcon style={styles.icon} />

      <LinearGradient style={styles.resumeCard} colors={['#8F0000', '#DB0000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0.0588, 0.9449]}>
        <View>
          <Text style={styles.title}>AKA Balance</Text>
          <Text style={styles.textAmount}>{mainBalance?.toLocaleString('en-US', localStringOptions)}</Text>
          <Text style={styles.label}>$ {(usdBalance * (mainBalance as number)).toLocaleString('en-US', localStringOptions)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 32,
    position: 'absolute',
    top: 15,
    zIndex: 99,
  },
  resumeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '24%',
  },
  resumeCard: {
    borderRadius: 24,
    minWidth: 344,
    minHeight: 125,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
});
