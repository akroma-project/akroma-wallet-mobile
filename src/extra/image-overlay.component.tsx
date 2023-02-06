// @ts-nocheck

import React from 'react';
import { ImageBackgroundProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface ImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactNode;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.45)';

export const ImageOverlay = (props?: ImageOverlayProps): React.ReactElement<ImageBackgroundProps> => {
  const { style, children, ...imageBackgroundProps } = props;
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  return (
    <LinearGradient colors={['#4C4C5280', '#050505']} {...imageBackgroundProps} style={imageBackgroundStyle}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }]} />
      {children}
    </LinearGradient>
  );
};
