import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home.jsx';
import UserRecipes from './pages/userRecipes.jsx';
import Recipes from './pages/Recipes.jsx';
import Account from './pages/account.jsx';
import firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: ''
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(User => {
            if (User) {
                this.setState({
                    user: User,
                    email: '',
                    password: '',
                    username: '',
                    error: ''
                })
            } else {
                this.setState({
                    user: null
                })
            }
        })
    }

    onChange(event) {
        let val = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = val;
        this.setState(change);
    }

    onSignUp() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email,
            this.state.password).then(User => {
                return User.updateProfile({
                    displayName: this.state.username
                })
            }).catch(err => {
                this.setState({ error: err.message })
            });
    }

    onSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                this.setState({ error: err.message })
            });
    }

    onSignOut() {
        firebase.auth().signOut();
    }

    render() {
        return (<div className="container">
            {this.state.error &&
                <p className="alert alert-danger">{this.state.error}</p>
            }

            {this.state.user &&
                <div>
                    <Router>
                        <div className="container">
                            <Link to="/">Home</Link>
                            {' '}
                            <Link to="/userRecipes">My Recipes</Link>
                            {' '}
                            <Link to="/Recipes">Explore</Link>
                            {' '}
                            <Link to="/Account">Account</Link>
                            {' '}
                            <button className="btn btn-warning mr-2" onClick={() => this.onSignOut()}>
                                Sign Out
                            </button>
                            <Route exact path='/' render={() => <Home user={this.state.user} />} />
                            <Route path='/userRecipes' render={() => <UserRecipes user={this.state.user} />} />
                            <Route path='/Recipes' render={() => <Recipes user={this.state.user} />} />
                            <Route path='/Account' render={() => <Account user={this.state.user} />} />
                        </div>
                    </Router>
                </div>
            }
            {!this.state.user &&
                <div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={(event) => { this.onChange(event) }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={(event) => { this.onChange(event) }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username:</label>
                        <input className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={(event) => { this.onChange(event) }}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary mr-2" onClick={() => this.onSignUp()}>
                            Sign Up
             </button>
                        <button className="btn btn-success mr-2" onClick={() => this.onSignIn()}>
                            Sign In
            </button>
                    </div>
                </div>
            }
        </div>)

    }
}

//Pages:
//User Recipes
//User Settings/account
//recipes
//signin/up/out
//Home page (informational/how to use site)

export default App;
