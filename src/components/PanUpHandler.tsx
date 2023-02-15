import React, { useContext, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import GlobalStyles from '../constants/GlobalStyles';
import { GlobalContext } from '../providers/GlobalProvider';
import { TransactionSectionTop } from './TransactionSectionTop';

let PanUpHandler = ({ children }) => {
  const { appHeight, mainHeaderHeight, balanceHeaderHeight, sendButtonsHeight } = useContext(GlobalContext);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(appHeight * 0.3));
  const [leftLimit, setLeftLimit] = useState(appHeight * 0.3);
  const [rightLimit, setRightLimit] = useState(appHeight * 0.59);
  let onGestureTopEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: animatedHeight,
        },
      },
    ],
    { useNativeDriver: false },
  );
  useEffect(() => {
    const leftLimitNew = appHeight - balanceHeaderHeight - mainHeaderHeight - sendButtonsHeight - 10;
    const rightLimitNew = appHeight - balanceHeaderHeight - mainHeaderHeight + 5;
    setLeftLimit(leftLimitNew);
    setRightLimit(rightLimitNew);
    setAnimatedHeight(new Animated.Value(leftLimitNew));
  }, [balanceHeaderHeight, mainHeaderHeight, sendButtonsHeight, appHeight]);
  return (
    <PanGestureHandler onGestureEvent={onGestureTopEvent}>
      <Animated.View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: animatedHeight.interpolate({
              inputRange: [0, sendButtonsHeight],
              outputRange: [rightLimit, leftLimit],
              extrapolate: 'clamp',
            }),
          },
          GlobalStyles.panUpCard,
        ]}>
        <TransactionSectionTop />
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default PanUpHandler;
