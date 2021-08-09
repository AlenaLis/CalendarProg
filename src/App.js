import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {routes} from './routes/routes';

const App = () => {

  return (
      <BrowserRouter>
        <div className="App">
          <head>
            <meta charSet="utf-8" />
          </head>
          <Switch>
            <div className="wrapper__all">
              {routes.map((route, index) => (
                  <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                  />
              ))}
            </div>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;