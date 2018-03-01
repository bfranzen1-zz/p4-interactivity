import React, {Component} from 'react';
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
            rePassword: ''
        };
    }

    toggleName() {
        this.setState({
            userNameHidden: !this.state.userNameHidden            
        });
    }

    toggleEmail() {
        this.setState({
            emailHidden: !this.state.emailHidden
        });
    }

    toggleSuccess() {
        this.setState({
            success: !this.state.success
        })
    }

    updateValue(event) {    
        let val = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = val;
        this.setState(change);
    }

    updateUser(event) {
        this.setState({
            success: false
        });
        let currentUser = firebase.auth().currentUser;
        let field = event.target.name;
        let val = ''; 
        if(field === "displayName") {
            val = this.state.displayName;
            this.toggleName();
            
        } else if (field === 'email') {
            val = this.state.email;
            this.toggleEmail();
            
        }
        console.log(val);
        let change = {};
        change[field] = val;
        if (field === 'email') {
            // let credential = firebase.auth.EmailAuthProvider.credential(
            //     currentUser.email
                
            // );
            // currentUser.reauthenticateWithCredential(credential).then(() => {
                
            //   }).catch(function(error) {
            //     // An error happened.
            //   });
            currentUser.updateEmail(
                val
            ).then(() => {
                this.toggleSuccess();
            }).catch(function (error) {
                // An error happened.
            });
        } else {
            currentUser.updateProfile(
                change
            ).then(() => {
                this.toggleSuccess();
            }).catch(function (error) {
                // An error happened.
            });
        }


    }

    render() {
        let currentUser = firebase.auth().currentUser;
        let type='';
        return (
            <div>
                <h1>Account Page</h1>
                {this.state.success &&
                <p className="alert alert-success">{'Successfully Updated Account Information'}</p>
                }
                <div className="info-container">
                    <span className="info-item">
                        <div>
                            Username: {currentUser.displayName}
                        </div>
                        <div>
                            <button type="button" className={this.state.userNameHidden ? "btn btn-warning btn-sm" : "btn btn-outline-primary btn-sm"} onClick={() => this.toggleName()}>{this.state.userNameHidden ? "Cancel" : "Change Username"}</button>
                        </div>

                        {this.state.userNameHidden && <UpdateForm updateUser={(event) => this.updateUser(event)} updateValue={(event) => this.updateValue(event)} changeType='displayName'/>}

                    </span>
                    <span className="info-item">
                        <div>
                            Email: {currentUser.email}
                        </div>
                        <div>
                            <button type="button" className={this.state.emailHidden ? "btn btn-warning btn-sm" : "btn btn-outline-primary btn-sm"} onClick={() => this.toggleEmail()}>{this.state.emailHidden ? "Cancel" : "Change Email"}</button>
                        </div>
                        {this.state.emailHidden && <UpdateForm updateUser={(event) => this.updateUser(event)} updateValue={(event) => this.updateValue(event)} changeType='email' />}
                    </span>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => { this.onChange(event) }}
                    />
                </div>
            </div>
        )
    }
}
export default Account

class UpdateForm extends Component {
    render() {
        let changeType =''
        if(this.props.changeType === 'displayName') {
            changeType = 'Username';
        } else if (this.props.changeType === 'email') {
            changeType = 'Email';
        }
        return (
            <div className="form-group">
                <label htmlFor="Username">{"New " + changeType + ": "}</label>
                <input type="text" className="form-control" id={this.props.changeType} name={this.props.changeType} onChange={(event) => { this.props.updateValue(event) }} />
                <button name={this.props.changeType} onClick={(event) => this.props.updateUser(event)} >Set {changeType}</button>
            </div>
        )
    }
}