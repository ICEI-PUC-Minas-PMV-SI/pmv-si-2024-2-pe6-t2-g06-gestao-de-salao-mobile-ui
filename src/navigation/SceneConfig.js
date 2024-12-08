import Home from '../pages/Home/HomeScreen';
import Agenda from '../pages/Agendamentos/AgendamentosScreen';
import { BottomNavigation } from 'react-native-paper';

export const renderScene = BottomNavigation.SceneMap({
  home: Home,
  agenda: Agenda,
});
