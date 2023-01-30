import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@ui-kitten/components';
import AkaIcon from '../assets/svg/AkaIconSvg';
import { WalletContext } from '../providers/WalletProvider';
import { useDatabaseConnection } from '../data/connection';
import { getAkromaPrice } from '../services/AkromaApi';
import { AkaModel } from '../data/entities/akaInfo';

export const HomeResumeAmount = () => {
  const localStringOptions = {
    maximumFractionDigits: 12,
    minimumFractionDigits: 2,
  };

  const { state } = useContext(WalletContext);
  const [usdBalance, setUsdBalance] = useState(0);
  const mainBalance = state.wallet.address ? state.wallet.lastBalance : state.totalBalance;
  const { akaInfoRepository } = useDatabaseConnection();

  const createAkaPrice = async () => {
    const currentPrice = (await getAkromaPrice()) as number;
    setUsdBalance(currentPrice);
    try {
      const newAkaPrice = await akaInfoRepository.create({
        name: 'akroma',
        lastValueUsd: currentPrice,
        updated_at: new Date(),
      });
      console.debug('New aka price', newAkaPrice);
    } catch (error) {
      console.error(error);
    }
  };

  const checkForUpdatePrice = async aka => {
    const currentDate = new Date();
    const difference = (currentDate.getTime() - aka[0].updated_at.getTime()) / 60000;

    if (difference > 5) {
      const newPrice = (await getAkromaPrice()) as number;
      setUsdBalance(newPrice);
      const updateAkaValue: AkaModel = {
        id: aka[0].id,
        name: aka[0].name,
        lastValueUsd: newPrice,
        updated_at: new Date(),
      };
      const newAkaPrice = await akaInfoRepository.update(updateAkaValue);
    }
  };

  useEffect(() => {
    console.log('main Balance ', mainBalance, state.wallet.address, state.wallet.lastBalance);
    (async () => {
      const aka: AkaModel[] = await akaInfoRepository.getAll();
      if (aka.length > 0) {
        setUsdBalance(aka[0].lastValueUsd);
        checkForUpdatePrice(aka);
      } else {
        createAkaPrice();
      }
    })();
  }, [usdBalance]);

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
