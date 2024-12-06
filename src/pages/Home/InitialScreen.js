import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Home/HomeScreen';
import Login from '../Login/LoginScreen';
import Agenda from '../Agendamentos/AgendamentosScreen';
import { useAuth } from '../../navigation/AuthContext/AuthProvider';  // Use the auth context

const InitialScreen = () => {
  const { isLoggedIn } = useAuth();  // Get the login state from the context

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([    
    { key: 'home', title: 'Home', icon: 'home' },
  ]);

  React.useEffect(() => {
    if (isLoggedIn) {
      // Add "Agenda" tab when logged in and remove "Login" tab
      setRoutes(prevRoutes => {
        // Remove "Login" if it's already in the routes
        const updatedRoutes = prevRoutes.filter(route => route.key !== 'login');
        
        // Add "Agenda" tab only if it's not already present
        if (!updatedRoutes.find(route => route.key === 'agenda')) {
          return [
            ...updatedRoutes,
            { key: 'agenda', title: 'Minha Agenda', icon: 'notebook-edit-outline' },
            { key: 'logout', title: 'Logout', icon: 'logout' }
          ];
        }
        return updatedRoutes;
      });
    } else {
      // Remove "Agenda" tab when logged out and add "Login" tab back
      setRoutes(prevRoutes => {
        // Remove the "Agenda" and "Logout" tabs
        const updatedRoutes = prevRoutes.filter(route => route.key !== 'agenda' && route.key !== 'logout');
        // Add the "Login" tab back
        return [
          ...updatedRoutes,
          { key: 'login', title: 'Login', icon: 'login' }
        ];
      });
    }
  }, [isLoggedIn]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    login: Login,
    agenda: Agenda, 
  });

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
      style={{ backgroundColor: '#6b726d' }} 
    />
  );
};

export default InitialScreen;
