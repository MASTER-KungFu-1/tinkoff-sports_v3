import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';

function HomePage() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/App" component={App} />
          <Route path="/HomePage" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default HomePage;