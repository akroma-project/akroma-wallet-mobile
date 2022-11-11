/**
 * @format
 */

import * as React from 'react';
import { render } from '@testing-library/react-native';
import 'react-native';
// import { HomeScreenHeaderRight } from '../src/components/HomeScreenHeaderRight';
import { CreateWalletScreen } from '../src/screens/home/CreateWalletScreen';
// import App from '../App';
// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

describe('Initial test', () => {
  it('renders correctly', () => {
    render(<CreateWalletScreen />);
  });
});
