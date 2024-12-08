import BottomNavigationDefault from '../navigation/BottomNavigationDefault';
import Home from '../pages/Home/HomeScreen';
import SalaoScreen from '../pages/Saloes/SalaoScreen';
import ProfissionalScreen from '../pages/Profissionais/ProfissionalScreen';
import AgendamentoScreen from '../pages/Agendamentos/AgendamentosScreen';
import AgendamentoForm from '../pages/Agendamentos/AgendamentoForm';
import BagScreen from '../pages/Bag/BagScreen';

export const NavigationScreens = [
  {
    name: 'BottomNavigationDefault',
    component: BottomNavigationDefault,
    options: {
      header: () => null,
    },
  },
  {
    name: 'Home',
    component: Home,
    options: {
      header: () => null,
    },
  },
  {
    name: 'SalaoScreen',
    component: SalaoScreen,
    options: {},
  },
  {
    name: 'ProfissionalScreen',
    component: ProfissionalScreen,
    options: {},
  },
  {
    name: 'Agendamentos',
    component: AgendamentoScreen,
    options: {},
  },
  {
    name: 'AgendamentoForm',
    component: AgendamentoForm,
    options: {},
  },
  {
    name:"Sacola",
    component: BagScreen,
    options:{},
  },
];

