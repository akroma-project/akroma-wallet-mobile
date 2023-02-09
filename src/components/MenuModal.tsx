import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {},
});

const ModalDynamyStyles = ({ viewHeight, viewWidth }: dynamicStylesProps = defaultValues) =>
  StyleSheet.create({
    walletsContainer: {
      display: 'flex',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: '#fff',
      height: 'auto',
      minHeight: viewHeight * 0.61,
    },
  });

const MenuModal = ({ children }) => {
  useEffect(() => {

  }, [])

  return <View style={[styles.modalContainer]}>{children}</View>;
};

export default MenuModal;
