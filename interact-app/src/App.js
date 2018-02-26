import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './pages/home.jsx';
import userRecipes from './pages/userRecipes.jsx';
import signIn from './pages/signIn.jsx';
import Recipes from './pages/Recipes.jsx';
import Account from './pages/account.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Router>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/userRecipes' component={userRecipes} />
            <Route path='/Recipes' component={Recipes} />
            <Route path='/Account' component={Account} />
            <Route path='/signIn' component={signIn} />
          </Switch>
        </Router>
      </div>
    );
  }
}

//Pages:
//User Recipes
//User Settings/account
//recipes
//signin/up/out
//Home page (informational/how to use site)

export default App;
