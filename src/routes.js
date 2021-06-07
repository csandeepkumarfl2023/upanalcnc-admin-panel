import React from 'react';



const Overview = React.lazy(() => import('./layout/Overview/overview'));
const Breakdown = React.lazy(() => import('./layout/Breakdown/breakdown'));
const Customermanagement = React.lazy(() => import('./layout/CustomerManagement/customermanagement'));


const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/breakdown', name: 'Breakdown', component: Breakdown },
  { path: '/customermanagement', name: 'Customermanagement', component: Customermanagement },

 
];

export default routes;
