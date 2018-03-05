import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import UserRecipes from './pages/userRecipes.jsx';
import Recipes from './pages/Recipes.jsx';
import Account from './pages/account.jsx';
import firebase from 'firebase';
import Recipe from './pages/Recipe.jsx';
import 'font-awesome/css/font-awesome.min.css';

//handles/shows react app 
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            recipe: {}
        }
    }

    //handles setting state based on who is signed in 
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

    //sets the state of recipe based on the recipe parameter
    //used for displaying recipe page of what user clicked on 
    select(recipe) {
        this.setState({
            recipe: recipe
        })
    }

    //handles when user has signed up, sends user info to firebase
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

    //handles when user signs in, changes user information in state
    onSignIn() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                this.setState({ error: err.message })
            });
    }

    //handles when user signs out, signs them out of firebase
    onSignOut() {
        firebase.auth().signOut();
    }

    //renders app, shows navbar and myrecipes page if signed in, or authentication page
    //if not
    render() {
        return (<div id="page">
            {this.state.user &&
                <NavBar recipe={this.state.recipe} select={(recipe) => this.select(recipe)} onSignOut={this.onSignOut} user={this.state.user} />
            }
            {!this.state.user &&
                <div id="background">
                    <div id="container">
                        <i id="icon" className="fa fa-cutlery"></i>
                        <h1 className="auth">Log in to ReciMe!</h1>
                        <div id="authentication">
                            {this.state.error &&
                                <p className="alert alert-danger">{this.state.error}</p>
                            }
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

//class that shows/handles the navigation bar
class NavBar extends Component {
    //renders nav bar along with react router for navigation
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
                            <button id="signout" className="btn btn-warning mr-2" onClick={() => this.props.onSignOut()}>
                                Sign Out
                            </button>
                        </div>
                    </Router>
                </nav>
                <Router>
                    <div>
                        <Route exact path='/' render={() => <UserRecipes select={(recipe) => this.props.select(recipe)} user={this.props.user} />} />
                        <Route path='/Recipes' render={() => <Recipes select={(recipe) => this.props.select(recipe)} user={this.props.user} />} />
                        <Route path='/Account' render={() => <Account user={this.props.user} />} />
                        <Route path='/recipe' render={() => <Recipe recipe={this.props.recipe} />} />
                    </div>
                </Router>
            </div>
        )
    }
}
export default App;