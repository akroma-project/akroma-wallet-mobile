import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeScreenHeaderRight } from './HomeScreenHeaderRight';
export const HomeHeader = () => {
  return (
    <Layout style={GlobalStyles.headerContainer} level="3">
      <ImageBackground source={require('../assets/images/background-grey.png')} resizeMode="cover" imageStyle={styles.bottomRadius} style={styles.backgroundImage}>
        <View>
          <View style={styles.menuIconContainer}>
            <HomeScreenHeaderRight />
          </View>
          <Layout style={styles.iconContainer}>
            <Image source={require('../assets/images/icon.png')} style={styles.icon} />
          </Layout>
          <Text style={[GlobalStyles.titleText, styles.titleText]}>AKROMA WALLET</Text>
        </View>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  icon: {
    height: 85,
    width: 85,
  },
  bottomRadius: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  container: {
    borderBottomLeftRadius: 20,
  },
  iconContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,

    backgroundColor: 'transparent',
  },
  menuIconContainer: {
    alignSelf: 'flex-end',
    paddingTop: 20,
  },
  titleText: {
    paddingTop: 20,
  },
});
