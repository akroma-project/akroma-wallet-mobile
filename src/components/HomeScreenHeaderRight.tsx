import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Dimensions, LayoutChangeEvent, Text, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card, Icon } from '@ui-kitten/components';
import GlobalStyles from '../constants/GlobalStyles';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
// import { Modal } from 'react-native';
// import { Modal } from '@ui-kitten/components';
import Modal from 'react-native-modal';

let layoutUpdate = 0;

export const HomeScreenHeaderRight = () => {
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();
  const { showActionSheetWithOptions } = useActionSheet();
  const [visible, setVisible] = useState(false);
  const [viewWidth, setViewWidth] = useState(Dimensions.get('screen').width);
  Dimensions.addEventListener('change', () => {
    setViewWidth(Dimensions.get('screen').width);
  });
  const [viewHeight, setViewHeight] = useState(Dimensions.get('screen').height);
  Dimensions.addEventListener('change', () => {
    setViewHeight(Dimensions.get('screen').height);
  });

  const [modalHeight, setModalHeight] = useState(0);
  const [modalWidth, setModalWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setModalHeight(ref?.current?.clientHeight);
      setModalWidth(ref?.current?.clientWidth);
    }, 1000);
  }, [ref]);

  const menuActionSheet = () =>
    showActionSheetWithOptions(
      {
        options: ['Create Wallet', 'Import Keystore', 'Import Private Key', 'Import Seed Phrase', 'Watch Wallet', 'Cancel'],
        cancelButtonIndex: 5 || 99,
        destructiveButtonIndex: 5,
        showSeparators: true,
      },
      (index: number) => {
        if (index === 0) {
          navigator.navigate('CreateWalletScreen');
        }
        if (index === 1) {
          navigator.navigate('ImportWalletKeystore');
        }
        if (index === 2) {
          navigator.navigate('ImportWalletPrivateKey');
        }
        if (index === 3) {
          navigator.navigate('ImportWalletSeedPhrase');
        }
        if (index === 4) {
          navigator.navigate('ImportWalletWatch');
        }
      },
    );
  const layoutSet = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.debug('layoutSet', layoutUpdate, 'PositionX:', x, 'PositionY:', y, 'cardWidth:', width, 'cardHeight', height, 'vh', viewHeight, 'vw', viewWidth);
    layoutUpdate = layoutUpdate + 1;
    if (modalWidth !== width && modalHeight !== height) {
      setModalWidth(width);
      setModalHeight(height);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Icon name="more-vertical-outline" style={GlobalStyles.iconRight} fill="#fff" />
      </TouchableOpacity>
      {/* <Modal visible={visible} backdropStyle={[GlobalStyles.modalBackdrop]} onBackdropPress={() => setVisible(false)}> */}
      <Modal isVisible={visible} onDismiss={() => setVisible(false)} onBackButtonPress={() => setVisible(false)} onBackdropPress={() => setVisible(false)} style={{ marginLeft: 0, marginBottom: 0}}>
        <Card
          onLayout={e => layoutSet(e)}
          style={[
            {
              width: viewWidth,
              position: 'absolute',
              // left: -(isNaN(modalWidth) ? 0 : modalWidth) / 2,
              left: 0,
              bottom: 0,
              // marginLeft: 0,
              // // bottom: viewHeight/2 - (isNaN(modalHeight) ? 0 : modalHeight) / 2,
              // bottom: 2 - viewHeight / 2 + (isNaN(modalHeight) ? 0 : modalHeight) / 2,
              borderBottomWidth: 1,
              borderBottomColor: '#f00',
            },
          ]}
          disabled={true}>
          <Text>Hello world</Text>
          <Text>Hello world</Text>
          <Text>Hello world</Text>
        </Card>
      </Modal>
    </>
  );
};
