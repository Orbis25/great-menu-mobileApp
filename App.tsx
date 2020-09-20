import React from 'react';
import Navigation from './src/navigation';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider as UIProvider,
  IconRegistry,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {LogBox} from 'react-native';

import AuthProvider from './src/store/contexts/auth/AuthContext';

LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <UIProvider {...eva} theme={eva.light}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </UIProvider>
    </>
  );
};

export default App;
