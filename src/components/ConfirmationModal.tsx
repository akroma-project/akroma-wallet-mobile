import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const ConfirmationModal = forwardRef((props: {}, ref: ForwardedRef<unknown>) => {
  useImperativeHandle(ref, () => {
    return {
      openModal: showModal,
    };
  });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this wallet?</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Delete Wallet</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 0,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    borderTopEndRadius: 8,
    paddingVertical: 8,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: '#1C1C1E',
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    width: '100%',
    marginBottom: 1,
    backgroundColor: '#1C1C1E',
    borderTopEndRadius: 25,
  },
});

export default ConfirmationModal;
