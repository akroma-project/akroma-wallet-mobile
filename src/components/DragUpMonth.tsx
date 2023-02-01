import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import GlobalStyles from '../constants/GlobalStyles';
import { GlobalContext } from '../providers/GlobalProvider';

const DragUpMonth = () => {
  const { panelRef } = useContext(GlobalContext);
  return (
    <View style={[GlobalStyles.monthSelectorContainer]}>
      <BottomSheet ref={(ref: any) => (panelRef.current = ref)} isOpen>
        {onScrollEndDrag => (
          <ScrollView onScrollEndDrag={onScrollEndDrag} style={[GlobalStyles.marginBottom20]}>
            <Text style={[GlobalStyles.textBold, GlobalStyles.marginBottom20]}>Select the month you want to visualize</Text>
            <Text style={[GlobalStyles.marginBottom20]}>2023</Text>
            <View style={[GlobalStyles.displayFlex, GlobalStyles.justifyBetween, GlobalStyles.flexRow, GlobalStyles.marginBottom20]}>
              <View style={[GlobalStyles.monthButtonContainer]}>
                <TouchableOpacity style={GlobalStyles.monthButton}>
                  <Text>January</Text>
                </TouchableOpacity>
              </View>
              <View style={[GlobalStyles.monthButtonContainer]}>
                <TouchableOpacity style={GlobalStyles.monthButton}>
                  <Text>February</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </BottomSheet>
    </View>
  );
};

export default DragUpMonth;
