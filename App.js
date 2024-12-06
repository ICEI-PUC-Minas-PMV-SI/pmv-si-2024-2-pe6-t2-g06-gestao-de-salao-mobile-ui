import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/navigation/AuthContext/AuthProvider';

import Main from './src/navigation/Main';

const App = () => {
  return(
    <AuthProvider>
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    </AuthProvider>
  );
};

registerRootComponent(App);