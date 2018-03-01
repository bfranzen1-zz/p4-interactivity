import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import UserRecipes from './pages/userRecipes.jsx';
import Recipes from './pages/Recipes.jsx';
import Account from './pages/account.jsx';
import firebase from 'firebase';
import logo from './icon3.png';

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
                <NavBar onSignOut={this.onSignOut} user={this.state.user} />
            }
            {!this.state.user &&
                <div id="background">
                    <div id="container">
                        <i className="fa fa-cutlery"></i>
                        <h1 className="auth">Log in to ReciMe!</h1>
                        <div id="authentication">
                            <div className="form-group">
                                <input className="form-control"
                                    name="email"
                                    placeholder="E-mail address"
                                    value={this.state.email}
                                    onChange={(event) => { this.onChange(event) }}
                                />
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(event) => { this.onChange(event) }}
                                />
                            </div>

                            <div className="form-group">
                                <input className="form-control"
                                    name="username"
                                    placeholder={"Username"}
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
<<<<<<< HEAD
                            <span className="title">ReciMe</span>
                            <Link className="link" to="/">Home</Link>
                            <Link className="link" to="/userRecipes">My Recipes</Link>
                            <Link className="link" to="/Recipes">Explore</Link>
                            <Link className="link" to="/Account">Account</Link>
                            <button id="signout" className="btn btn-warning mr-2" onClick={() => this.signOut()}>
=======
                            <span id="SiteName">ReciMe</span>
                            <Link className="link" to="/">My Recipes</Link>
                            <Link className="link" to="/Recipes">Explore</Link>
                            <Link className="link" to="/Account">Account</Link>
                            <button id="signout" className="btn btn-warning mr-2" onClick={() => this.props.onSignOut()}>
>>>>>>> 839b42b394d774eb36f2bda9f112cfbae118b59d
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
