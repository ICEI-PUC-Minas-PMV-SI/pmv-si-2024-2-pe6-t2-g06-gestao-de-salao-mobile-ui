import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationScreens } from './NavigationScreens';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="BottomNavigationDefault">
        {NavigationScreens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default MainNavigation;
