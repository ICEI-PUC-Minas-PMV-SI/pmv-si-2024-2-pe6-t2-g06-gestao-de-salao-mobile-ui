import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { BagProvider } from './src/context/BagContext'; 
import MainNavigation from './src/navigation/MainNavigation'; 

const App = () => {
  return (
    <BagProvider>  
      <NavigationContainer>
        <MainNavigation /> 
      </NavigationContainer>
    </BagProvider>
  );
};

registerRootComponent(App);
