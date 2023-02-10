import { Card } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import CreateWalletSvg from '../assets/svg/CreateWalletSvg';
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
      <Card style={[DymanicStyles({ viewWidth }).menuCard]} disabled={true}>
        {optionList.map(({ onPress, text, icon }: optionListItem) => (
          <TouchableOpacity onPress={onPress} style={[GlobalStyles.displayFlex, GlobalStyles.flexRow]}>
            <View style={[GlobalStyles.mr10]}>{icon}</View>
            <Text style={[GlobalStyles.menuOptionText]}>{text}</Text>
          </TouchableOpacity>
        ))}
      </Card>
    </Modal>
  );
};

export default BottomMenu;
