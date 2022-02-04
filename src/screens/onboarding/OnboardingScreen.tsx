import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Divider, Text } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../../extra/3rd-party';
import { ImageOverlay } from '../../extra/image-overlay.component';
import { ImportIcon, WatchIcon } from '../../components/AppIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/ApplicationNavigation';
import GlobalStyles from '../../constants/GlobalStyles';

export const OnboardingScreen = () => {
  type onboardingScreenProps = StackNavigationProp<OnboardingStackParamList, 'OnboardingScreen'>;
  const navigator = useNavigation<onboardingScreenProps>();

  const onCreateWalletPress = (): void => {
    navigator && navigator.navigate('CreateWalletScreen');
  };

  const onAddWatchWalletPress = (): void => {
    navigator && navigator.navigate('CreateWalletScreen');
  };

  const onImportWalletPress = (): void => {
    navigator && navigator.goBack();
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={require('../../assets/images/background.png')}>
        <View style={GlobalStyles.logoContainer}>
          <Avatar style={GlobalStyles.logoImage} source={require('../../assets/images/icon.png')} />
        </View>
        <View style={styles.formContainer} />
        <Button size="large" onPress={onCreateWalletPress}>
          CREATE WALLET
        </Button>
        <View style={styles.socialAuthContainer}>
          <Divider style={styles.profileSocialsDivider} />
          <Text style={styles.socialAuthHintText} status="control">
            Use existing wallet
          </Text>
          <View style={styles.profileButtonsContainer}>
            <Button style={styles.profileButton} accessoryLeft={WatchIcon} onPress={onAddWatchWalletPress}>
              WATCH
            </Button>
            <Button style={styles.profileButton} accessoryLeft={ImportIcon} onPress={onImportWalletPress}>
              IMPORT
            </Button>
          </View>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profileSocialsDivider: {
    marginHorizontal: -16,
    marginBottom: 32,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
