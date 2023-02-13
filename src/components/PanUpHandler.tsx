import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { GlobalContext } from '../providers/GlobalProvider';
import { TransactionSectionTop } from './TransactionSectionTop';

let PanUpHandler = ({ children }) => {
  const { mainHeaderHeight, balanceHeaderHeight, sendButtonsHeight } = useContext(GlobalContext);
  const [viewHeight, setViewHeight] = useState(Dimensions.get('screen').height);
  const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(viewHeight * 0.61));
  const [leftLimit, setLeftLimit] = useState(viewHeight * 0.3);
  const [rightLimit, setRightLimit] = useState(viewHeight * 0.59);
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
  Dimensions.addEventListener('change', () => {
    setViewHeight(Dimensions.get('screen').height);
  });
  useEffect(() => {
    const leftLimitNew = viewHeight - 80 - balanceHeaderHeight - mainHeaderHeight - sendButtonsHeight;
    const rightLimitNew = viewHeight - 70 - balanceHeaderHeight - mainHeaderHeight;
    setLeftLimit(leftLimitNew);
    setRightLimit(rightLimitNew);
    setAnimatedHeight(new Animated.Value(leftLimitNew));
  }, [balanceHeaderHeight, mainHeaderHeight, sendButtonsHeight, viewHeight]);
  return (
    <PanGestureHandler onGestureEvent={onGestureTopEvent}>
      <Animated.View
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: animatedHeight.interpolate({
              inputRange: [rightLimit - leftLimit, rightLimit],
              outputRange: [rightLimit, leftLimit],
              extrapolate: 'clamp',
            }),
            paddingTop: 20,
            overflow: 'hidden',
            position: 'absolute',
            width: '100%',
            display: 'flex',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: '#fff',
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
