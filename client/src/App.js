import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import Home from './containers/Home';
import Register from './containers/Register';
import ProtectedRoute from './containers/ProtectedRoute';
import Login from './containers/Login';
import Sources from './containers/Sources';
import PageNotFound from './components/PageNotFound';


function App() {

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/sources" component={Sources} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>

      </Router>
    </>
  );
}

export default App;
