import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
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
        return (<div>
            {this.state.error &&
                <p className="alert alert-danger">{this.state.error}</p>
            }

            {this.state.user &&
                <NavBar user={this.state.user} />
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

class NavBar extends Component {

    signOut() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <div>
                <nav id="nav" className="navbar">
                    <Router>
                        <div className="container">
                            <span id="SiteName">ReciMe</span>
                            <Link className="link" to="/">My Recipes</Link>
                            <Link className="link" to="/Recipes">Explore</Link>
                            <Link className="link" to="/Account">Account</Link>
                            <button id="signout" className="btn btn-warning mr-2" onClick={() => this.onSignOut()}>
                                Sign Out
                            </button>
                        </div>
                    </Router>
                </nav>
                <Router>
                    <div>
                        <Route exact path='/' render={() => <UserRecipes user={this.props.user} />} />
                        <Route path='/Recipes' render={() => <Recipes user={this.props.user} />} />
                        <Route path='/Account' render={() => <Account user={this.props.user} />} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;
