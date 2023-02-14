import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
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
    const rightLimitNew = appHeight - balanceHeaderHeight - mainHeaderHeight + 10;
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
            overflow: 'hidden',
            position: 'absolute',
            width: '100%',
            display: 'flex',
            paddingTop: 10,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: '#ffffff',
            bottom: 0,
            zIndex: 1000,
          },
        ]}>
        <TransactionSectionTop />
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default PanUpHandler;
