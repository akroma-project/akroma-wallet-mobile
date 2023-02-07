// @ts-nocheck

import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

export const GradientOverlay = (props?: any) => {
  const { style, children, ...imageBackgroundProps } = props;
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <LinearGradient colors={['#4C4C5280', '#050505']} {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }]} />
      {children}
    </LinearGradient>
  );
};
