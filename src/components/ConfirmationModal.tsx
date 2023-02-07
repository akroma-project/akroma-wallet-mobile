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
            <Pressable style={[styles.button, styles.buttonDelete]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, styles.redColor]}>Delete Wallet</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(!modalVisible)}>
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
