import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);
import { WithSplashScreen } from './src/components/Splash';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationNavigation } from './src/navigation/ApplicationNavigation';
import 'react-native-get-random-values';
import { WalletProvider } from './src/providers/WalletProvider';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { DatabaseConnectionProvider } from './src/data/connection';
import Toast from 'react-native-toast-message';
import { AkromaTheme } from './src/custom-theme';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import { GlobalProvider } from './src/providers/GlobalProvider';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <DatabaseConnectionProvider>
        <GlobalProvider>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...AkromaTheme }}>
            <IconRegistry icons={EvaIconsPack} />
            <ActionSheetProvider>
              <WalletProvider>
                <Toast />
                <ApplicationNavigation />
              </WalletProvider>
            </ActionSheetProvider>
          </ApplicationProvider>
        </GlobalProvider>
      </DatabaseConnectionProvider>
    </WithSplashScreen>
  );
};
const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;
