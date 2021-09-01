import {
    Error404,
    Dashboard
  } from '../../container/pages';
  
  const AppRoutes = [
    {
      id: 2,
      path: 'dashboard',
      component: Dashboard,
      exact: true
    },
    {
      id: 9,
      path: '/error-404',
      component: Error404,
      exact: true
    }
  ];
  export default AppRoutes;