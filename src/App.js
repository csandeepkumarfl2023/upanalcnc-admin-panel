import React from 'react';

import './App.css';
import './scss/style.scss';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/login'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
function App() {
  const TheLayout = React.lazy(() => import('./containers/TheLayout'));
 const Login = React.lazy(() => import('./pages/Login/login'));


  return (   
    <HashRouter>
    <React.Suspense fallback={loading}>
    <Switch>
    <Route path="/login"  name="login" render={props => <Login {...props}/>}  />
        <Route path="/overview" name="Overview" render={props => <TheLayout {...props}/>} />
         <Route path="/" name="Overview" render={props => <TheLayout {...props}/>} />

    </Switch>
    </React.Suspense>
    </HashRouter>

  );
}

export default App;
