import React from 'react';

import './App.css';
import './scss/style.scss';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
function App() {
  const TheLayout = React.lazy(() => import('./containers/TheLayout'));
  return (   
    <HashRouter>
       <React.Suspense fallback={loading}>
    <Switch>
  {/* <Login /> */}
  <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
    </Switch>
    </React.Suspense>
    </HashRouter>

  );
}

export default App;
