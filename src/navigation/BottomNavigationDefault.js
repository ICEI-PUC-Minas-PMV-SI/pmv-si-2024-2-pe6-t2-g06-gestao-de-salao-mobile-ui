import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { routes } from '../navigation/RouteConfig';
import { renderScene } from '../navigation/SceneConfig';

const BottomNavigationDefault = () => {
  const [index, setIndex] = useState(0); // Controla a aba selecionada

  const renderIcon = ({ route }) => {
    let iconColor = '#000';  // Default icon color

    // Customize icon color based on the active route
    if (route.key === 'home') {
      iconColor = '#B68D40';  // Color for Login icon
    }
    if (route.key === 'login') {
      iconColor = '#7f7f7f';  // Color for Login icon
    }
    if (route.key === 'logout') {
      iconColor = '#FF6347';  // Color for Logout icon
    }
    if (route.key === 'agenda') {
      iconColor = '#B68D40';  // Color for Agenda icon
    }

    return <MaterialCommunityIcons name={route.icon} size={24} color={iconColor} />;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      style={{ backgroundColor: '#000' }} // Cor de fundo do BottomNavigation
    />
  );
};

export default BottomNavigationDefault;
