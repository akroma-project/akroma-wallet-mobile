import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import GlobalStyles, { DymanicStyles } from '../constants/GlobalStyles';

interface Props {
  visible: boolean;
  onDismiss?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  optionList: optionListItem[];
}

export interface optionListItem {
  icon?: React.ReactNode;
  text: string;
  onPress: (...args: any) => any;
}

const BottomMenu = ({ visible, onDismiss, onBackButtonPress, onBackdropPress, optionList }: Props) => {
  const [viewWidth, setViewWidth] = useState(Dimensions.get('screen').width);
  Dimensions.addEventListener('change', () => {
    setViewWidth(Dimensions.get('screen').width);
  });
  return (
    <Modal isVisible={visible} onDismiss={onDismiss} onBackButtonPress={onBackButtonPress} onBackdropPress={onBackdropPress} style={[GlobalStyles.menuModal]}>
      <View style={[DymanicStyles({ viewWidth }).menuCard]}>
        {optionList.map(({ onPress, text, icon }: optionListItem) => (
          <TouchableOpacity key={text} onPress={onPress} style={[GlobalStyles.displayFlex, GlobalStyles.flexRow, GlobalStyles.menuOption]}>
            <View style={[GlobalStyles.mr16, GlobalStyles.menuOptionCenter]}>{icon}</View>
            <Text style={[GlobalStyles.menuOptionText, GlobalStyles.menuOptionCenter]}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default BottomMenu;
