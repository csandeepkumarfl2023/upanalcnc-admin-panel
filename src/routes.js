import React from 'react';
import Payments from './layout/Payments/payments';



const Overview = React.lazy(() => import('./layout/Overview/overview'));
const Breakdown = React.lazy(() => import('./layout/Breakdown/breakdown'));
const SalesVisit = React.lazy(() => import('./layout/SalesVisit/salesVisit'));
const Customermanagement = React.lazy(() => import('./layout/CustomerManagement/customermanagement'));
const Employeemanagement = React.lazy(() => import('./layout/EmployeeManagement/employeemanagement'));
const Payment = React.lazy(() => import('./layout/Payments/payments'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/breakdown', name: 'Breakdown', component: Breakdown },
  { path: '/sales_visit', name: 'SaleVisit', component: SalesVisit },
  { path: '/customermanagement', name: 'Customermanagement', component: Customermanagement },
  { path: '/employeemanagement', name: 'Employeemanagement', component: Employeemanagement },
  { path: '/payments', name: 'Payments', component: Payment },

 
];

export default routes;
