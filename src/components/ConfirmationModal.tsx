import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { WalletContext } from '../providers/WalletProvider';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

const ConfirmationModal = forwardRef((props: {}, ref: ForwardedRef<unknown>) => {
  const { state, removeWallet } = React.useContext(WalletContext);
  type homeScreenProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
  const navigator = useNavigation<homeScreenProp>();

  useImperativeHandle(ref, () => {
    return {
      openModal: showModal,
    };
  });
  const [modalVisible, setModalVisible] = useState(false);

  const deleteWallet = () => {
    removeWallet(state.wallet);
    setModalState(firstModalState);
    setModalVisible(false);
  };

  const goToExportScreen = () => {
    setModalVisible(false);
    setModalState(firstModalState);
    navigator.navigate('CreateWalletScreen'); //Test route while export screen is finish
  };

  const changeModalState = () => {
    setModalState({
      state: 2,
      modalText: 'Once you delete this wallet you will lose all your data. Try exporting your key first to avoid losing your data.',
      firstBtnText: 'Export Key',
      firstBtnEvent: () => goToExportScreen(),
      secondBtnText: 'Delete Wallet',
      secondBtnEvent: () => {},
    });
  };

  const firstModalState = {
    state: 1,
    modalText: 'Are you sure you want to delete this wallet?',
    firstBtnText: 'Delete Wallet',
    firstBtnEvent: () => changeModalState(),
    secondBtnText: 'Cancel',
    secondBtnEvent: () => setModalVisible(false),
  };

  const [modalState, setModalState] = useState(firstModalState);
  const showModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalState.modalText}</Text>
            <Pressable style={[styles.button, styles.buttonDelete]} onPress={modalState.firstBtnEvent}>
              <Text style={[styles.textStyle, styles.redColor]}>{modalState.firstBtnText}</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={modalState.state === 1 ? modalState.secondBtnEvent : () => deleteWallet()}>
              <Text style={styles.textStyle}>{modalState.secondBtnText}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginVertical: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '85%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    width: '100%',
    backgroundColor: '#1C1C1E',
  },
  buttonDelete: {
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  buttonCancel: {
    borderRadius: 8,
    marginTop: 8,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
  redColor: {
    color: '#F65454',
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 1,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontSize: 12,
  },
});

export default ConfirmationModal;
