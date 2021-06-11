import React from 'react';

const Overview = React.lazy(() => import('./layout/Overview/overview'));
const ServiceRequest = React.lazy(() => import('./layout/ServiceRequests/servicerequest'));
const SalesVisit = React.lazy(() => import('./layout/SalesVisit/salesVisit'));
const Customermanagement = React.lazy(() => import('./layout/CustomerManagement/customermanagement'));
const Employeemanagement = React.lazy(() => import('./layout/EmployeeManagement/employeemanagement'));
const Payment = React.lazy(() => import('./layout/Payments/payments'));
const PM = React.lazy(() => import('./layout/PM/pm'));
const Profile =  React.lazy(() => import('./layout/Profile/profile'));

const routes = [
  { path: '/login', exact: true, name: 'login' },
  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/servicerequest', name: 'ServiceRequest', component: ServiceRequest },
  { path: '/sales_visit', name: 'SaleVisit', component: SalesVisit },
  { path: '/customermanagement', name: 'Customermanagement', component: Customermanagement },
  { path: '/employeemanagement', name: 'Employeemanagement', component: Employeemanagement },
  { path: '/payments', name: 'Payments', component: Payment },
  { path: '/pm', name: 'PM', component: PM },
  { path: '/profile', name: 'Profile', component: Profile },

];

export default routes;
