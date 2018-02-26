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
      <div>
        <Router>
          <div className="container">
            <Link to="/home">Home</Link>
            {' '}
            <Link to="/userRecipes">My Recipes</Link>
            {' '}
            <Link to="/Recipes">Explore</Link>
            {' '}
            <Link to="/Account">Account</Link>
              <Route path='/home' component={Home} />
              <Route path='/userRecipes' component={userRecipes} />
              <Route path='/Recipes' component={Recipes} />
              <Route path='/Account' component={Account} />
          </div>
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
