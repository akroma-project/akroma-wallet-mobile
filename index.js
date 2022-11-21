/**
 * @format
 */
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7e18eb8944ef4599af7dc7f9523da24b@o950757.ingest.sentry.io/6058292',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
