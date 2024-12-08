import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { routes } from '../navigation/RouteConfig';
import { renderScene } from '../navigation/SceneConfig';

const BottomNavigationDefault = () => {
  const [index, setIndex] = useState(0); 

  const renderIcon = ({ route }) => {
    let iconColor = '#000';  

    if (route.key === 'home') {
      iconColor = '#B68D40'; 
    }
    if (route.key === 'login') {
      iconColor = '#7f7f7f';  
    }
    if (route.key === 'logout') {
      iconColor = '#FF6347'; 
    }
    if (route.key === 'agenda') {
      iconColor = '#B68D40'; 
    }

    return <MaterialCommunityIcons name={route.icon} size={24} color={iconColor} />;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      style={{ backgroundColor: '#000' }} 
    />
  );
};

export default BottomNavigationDefault;
