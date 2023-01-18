import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

export function WithSplashScreen({ children, isAppReady }: { isAppReady: boolean; children: React.ReactNode }) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const IMAGE_INCREMENT = 'Image increment';
const IMAGE_DECREMENT = 'Image decrement';
const IMAGE_BIG = 'Image bigger';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({ isAppReady }: { isAppReady: boolean }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageSize = useRef(new Animated.Value(120)).current;
  const textToUp = useRef(new Animated.Value(-30)).current;

  const [state, setState] = useState<typeof LOADING_IMAGE | typeof IMAGE_INCREMENT | typeof IMAGE_DECREMENT | typeof IMAGE_BIG | typeof WAIT_FOR_APP_TO_BE_READY | typeof FADE_OUT | typeof HIDDEN>(LOADING_IMAGE);

  useEffect(() => {
    if (state === IMAGE_INCREMENT) {
      Animated.timing(imageSize, {
        toValue: 250,
        delay: 500,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setState(IMAGE_DECREMENT);
      });
    } else if (state === IMAGE_DECREMENT) {
      Animated.timing(imageSize, {
        toValue: 120,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setState(IMAGE_BIG);
      });
      Animated.timing(textToUp, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else if (state === IMAGE_BIG) {
      Animated.timing(imageSize, {
        toValue: 10000,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageSize, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View collapsable={false} style={[style.container, { opacity: containerOpacity }]}>
      <Animated.Image
        source={require('../assets/images/icon.png')}
        fadeDuration={0}
        onLoad={() => {
          setState(IMAGE_INCREMENT);
        }}
        style={[style.image, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
      <Animated.Text style={[style.appNameText, { bottom: textToUp }]}>AKROMA</Animated.Text>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F20000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  appNameText: {
    position: 'absolute',
    fontSize: 25,
    color: 'white',
    bottom: -30,
  },
});
