import React from 'react';



const Overview = React.lazy(() => import('./layout/Overview/overview'));
const Breakdown = React.lazy(() => import('./layout/Breakdown/breakdown'));
const SalesVisit = React.lazy(() => import('./layout/SalesVisit/salesVisit'));
const Customermanagement = React.lazy(() => import('./layout/CustomerManagement/customermanagement'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/breakdown', name: 'Breakdown', component: Breakdown },
  { path: '/sales_visit', name: 'SaleVisit', component: SalesVisit },
  { path: '/customermanagement', name: 'Customermanagement', component: Customermanagement },

 
];

export default routes;
