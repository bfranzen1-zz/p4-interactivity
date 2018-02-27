import React, { Component } from 'react';

class Home extends Component {
    render() {
        console.log(this.props.user);
        return (
            <h1>Welcome {this.props.user.displayName}!</h1>
        )
    }
}

export default Home 