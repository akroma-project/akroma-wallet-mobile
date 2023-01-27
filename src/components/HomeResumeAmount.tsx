import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@ui-kitten/components';
import AkaIcon from '../assets/svg/AkaIconSvg';
import { WalletContext } from '../providers/WalletProvider';
import { useDatabaseConnection } from '../data/connection';

export const HomeResumeAmount = () => {
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };

  const { state, akaState, getAkaPrice } = useContext(WalletContext);
  const [usdBalance, setUsdBalance] = useState(0);
  const mainBalance = state.wallet.address ? state.wallet.lastBalance : state.totalBalance;
  const { akaInfoRepository } = useDatabaseConnection();

  const createAkaPrice = async price => {
    console.log('EN CREATE AKA PRICE');
    try {
      setTimeout(async () => {
        const newAkaPrice = await akaInfoRepository.create({
          name: 'akroma',
          lastValueUsd: price,
        });
        console.debug('New aka price', newAkaPrice);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const akaPrice = await getAkaPrice();
      setUsdBalance(akaPrice);

      if (!akaState) {
        console.log('En crear');
        createAkaPrice(akaPrice);
      }
      const aka = await akaInfoRepository.getAll();
      console.log('BASE DE DATOS', akaState, akaPrice, aka);
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
