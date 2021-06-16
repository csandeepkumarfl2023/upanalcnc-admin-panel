import React from 'react';

const Breadcrumbs = React.lazy(() => import('./containers/Breadcrumbs'));
const Overview = React.lazy(() => import('./layout/Overview/overview'));
const ServiceRequest = React.lazy(() => import('./layout/ServiceRequests/servicerequest'));
const SalesVisit = React.lazy(() => import('./layout/SalesVisit/salesVisit'));
const Customermanagement = React.lazy(() => import('./layout/CustomerManagement/customermanagement'));
const Employeemanagement = React.lazy(() => import('./layout/EmployeeManagement/employeemanagement'));
const Payment = React.lazy(() => import('./layout/Payments/payments'));
const PM = React.lazy(() => import('./layout/PM/pm'));
const Profile =  React.lazy(() => import('./layout/Profile/profile'));
const Invoices =  React.lazy(() => import('./layout/Invoices/invoices'));
const BroadcastMessages =  React.lazy(() => import('./layout/BroadcastMessages/broadcastMessages'));
const Attendance =  React.lazy(() => import('./layout/Attendance/attendance'));
const Settings =  React.lazy(() => import('./layout/Settings/settings'));
const EditServiceRequest = React.lazy(() => import('./layout/ServiceRequests/editServiceRequest'));
const CreateServiceRequest = React.lazy(() => import('./layout/ServiceRequests/createServiceRequest'));
const EditCustomer = React.lazy(() => import('./layout/CustomerManagement/Customers/editCustomer'));
const CreateCustomer = React.lazy(() => import('./layout/CustomerManagement/Customers/createCustomer'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', exact: true, name: 'login' },
  { path: '/overview', name: 'Overview', component: Overview },
  { path: '/servicerequest', name: 'ServiceRequest', component: ServiceRequest },
  { path: '/salesvisit', name: 'SaleVisit', component: SalesVisit },
  { path: '/customermanagement', name: 'Customermanagement', component: Customermanagement },
  { path: '/employeemanagement', name: 'Employeemanagement', component: Employeemanagement },
  { path: '/payments', name: 'Payments', component: Payment },
  { path: '/pm', name: 'PM', component: PM },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/editServiceRequest/:id', name: 'EditServiceRequest', component: EditServiceRequest },
  { path: '/invoices', name: 'Invoices', component: Invoices },
  { path: '/broadcastMessages', name: 'BroadcastMessages', component: BroadcastMessages },
  { path: '/attendance', name: 'Attendance', component: Attendance },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/createServiceRequest', name: 'createServiceRequest', component: CreateServiceRequest },
  { path: '/overview/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/editCustomer/:id', name: 'EditCustomer', component: EditCustomer },
  { path: '/createCustomer', name: 'createCustomer', component: CreateCustomer },


];

export default routes;
