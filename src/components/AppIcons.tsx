import { Icon, IconElement } from '@ui-kitten/components';
import * as React from 'react';
import { ImageStyle } from 'react-native';

export const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

export const WalletIcon = (props: any) => <Icon {...props} name="credit-card-outline" />;

export const ShareIcon = (props: any) => <Icon {...props} name="share-outline" />;

export const SendIcon = (props: any) => <Icon {...props} name="diagonal-arrow-right-up-outline" />;

export const ReceiveIcon = (props: any) => <Icon {...props} name="diagonal-arrow-right-down-outline" />;

export const SettingsIcon = (props: any) => <Icon {...props} name="settings-outline" />;

export const ArrowForwardIcon = (style: ImageStyle): IconElement => <Icon {...style} name="arrow-forward-outline" />;

export const GoogleIcon = (style: ImageStyle): IconElement => <Icon {...style} name="google" />;

export const WatchIcon = (style: ImageStyle): IconElement => <Icon {...style} name="eye-outline" />;

export const ImportIcon = (style: ImageStyle): IconElement => <Icon {...style} name="file-add-outline" />;
