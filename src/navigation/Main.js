import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/HomeScreen';
import InitialScreen from '../pages/Home/InitialScreen';
import SalaoScreen from '../pages/Saloes/SalaoScreen'; 
import ProfissionalScreen from '../pages/Profissionais/ProfissionalScreen'; 

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen 
        name="InitialScreen"
        component={InitialScreen} 
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen 
        name="Home"
        component={Home} 
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen 
        name="SalaoScreen" 
        component={SalaoScreen}
      />
      <Stack.Screen 
        name="ProfissionalScreen" 
        component={ProfissionalScreen}
      />
    </Stack.Navigator>
  );
};

export default Main;