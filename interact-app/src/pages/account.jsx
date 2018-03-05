import React, { Component } from 'react';
import firebase from 'firebase';


class Account extends Component {

    constructor() {
        super();
        this.state = {
            userNameHidden: false,
            emailHidden: false,
            success: false,
            displayName: '',
            email: '',
            reEmail: '',
            rePassword: '',
            authenticating: false
        };
    }
    // Toggles the form for changing a user's display name
    toggleName() {
        this.setState({
            userNameHidden: !this.state.userNameHidden
        });
    }

    // Toggles the form for changing a user's password
    toggleEmail() {
        this.setState({
            emailHidden: !this.state.emailHidden
        });
    }

    // Toggles a succcess notification to be shown above form upon
    // successful information change
    toggleSuccess() {
        if(this.state.error) {
            this.setState({error: !this.state.error})
        }
        this.setState({
            success: !this.state.success
            
        })
    }

    // Toggles the re-authentication form
    toggleAuthenticating() {
        this.setState({
            authenticating: !this.state.authenticating
        });
    }

    // Updates values held in the state
    updateValue(event) {
        let val = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = val;
        this.setState(change);
    }

    // Reauthenticates the current user
    reAuth(email, password) {
        let currentUser = firebase.auth().currentUser;
        let credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );
        currentUser.reauthenticateWithCredential(credential).then(() => {
            this.toggleAuthenticating();
            this.setState({ emailHidden: true });
        }).catch((error) => {
            this.setState({ error: error.message })
        });
    }

    // Updates the given user information(email or displayname)
    updateUser(event, credential) {
        this.setState({
            success: false
        });
        let currentUser = firebase.auth().currentUser;
        let field = event.target.name;
        let val = '';
        if (field === "displayName") {
            val = this.state.displayName;
            this.toggleName();

        } else if (field === 'email') {
            val = this.state.email;
            this.toggleEmail();

        }
        let change = {};
        change[field] = val;
        if (field === 'email') {
            currentUser.updateEmail(
                val
            ).then(() => {
                this.toggleSuccess();
            }).catch((error) => {
                console.log(error);
                this.setState({ error: error.message })
                if (error.code === 'auth/requires-recent-login') {
                    this.toggleAuthenticating()
                }
            });
        } else {
            currentUser.updateProfile(
                change
            ).then(() => {
                this.toggleSuccess();
            }).catch((error) => {
                this.setState({ error: error.message });
            });
        }


    }

    render() {
        let currentUser = firebase.auth().currentUser;
        return (
            <div>
                <h1>Your Account</h1>
                {this.state.success &&
                    <p className="alert alert-success">{'Successfully Updated Account Information'}</p>
                }
                {this.state.error &&
                    <p className="alert alert-danger">{this.state.error}</p>
                }
                {!this.state.authenticating && <div id="authentication">
                    <span className="info-item">
                        <div className="info-sub-item">
                            Username: {currentUser.displayName}
                        </div>
                        <div className="info-sub-button">
                            <button type="button" className={this.state.userNameHidden ? "btn btn-warning btn-sm" : "btn btn-link btn-sm"} onClick={() => this.toggleName()}>{this.state.userNameHidden ? "Cancel" : "Change Username"}</button>
                        </div>

                        {this.state.userNameHidden && <UpdateForm className="info-sub-item" updateUser={(event) => this.updateUser(event)} updateValue={(event) => this.updateValue(event)} changeType='displayName' />}

                    </span>
                    <span className="info-item">
                        <div className="info-sub-item">
                            Email: {currentUser.email}
                        </div>
                        <div className="info-sub-button">
                            <button type="button" className={this.state.emailHidden ? "btn btn-warning btn-sm" : "btn btn-link btn-sm"} onClick={() => this.toggleEmail()}>{this.state.emailHidden ? "Cancel" : "Change Email"}</button>
                        </div>
                        {this.state.emailHidden && <UpdateForm className="info-sub-item" updateUser={(event) => this.updateUser(event)} updateValue={(event) => this.updateValue(event)} changeType='email' />}
                    </span>
                </div>}
                {this.state.authenticating && <div>
                    <div id="container">
                        <h4 className="auth">Please Enter Original Email and Password</h4>
                        <div id="authentication">
                            <div className="form-group top-form">
                                <input
                                    name="reEmail"
                                    placeholder="E-mail address"
                                    value={this.state.reEmail}
                                    onChange={(event) => { this.updateValue(event) }}
                                />
                            </div>

                            <div className="form-group">
                                <input type="password"
                                    name="rePassword"
                                    placeholder="Password"
                                    value={this.state.rePassword}
                                    onChange={(event) => { this.updateValue(event) }}
                                />
                            </div>
                            <div className="set-button">
                                <button id="try-again" className="btn btn-success mr-2" onClick={() => this.reAuth(this.state.reEmail, this.state.rePassword)}>
                                    Try Again
                            </button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}
export default Account

// Form for changing either email or displayname
class UpdateForm extends Component {
    render() {
        let changeType = ''
        if (this.props.changeType === 'displayName') {
            changeType = 'Username';
        } else if (this.props.changeType === 'email') {
            changeType = 'Email';
        }
        return (
            <div className="form-group">
                <label htmlFor="Username">{"New " + changeType + ": "}</label>
                <input type="text" className="form-control" id={this.props.changeType} name={this.props.changeType} onChange={(event) => { this.props.updateValue(event) }} />
                <div className="set-button">
                    <button className="btn btn-success btn-sm" name={this.props.changeType} onClick={(event) => this.props.updateUser(event)} >Set {changeType}</button>
                </div>
            </div>
        )
    }
}