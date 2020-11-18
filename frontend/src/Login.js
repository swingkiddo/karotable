import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, TextField } from '@material-ui/core'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    }

    render() {
        return (
            <form onSubmit={e => this.props.handleLogin(e, this.state)}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button type="submit">Log in</button>
            </form>
        )
    }
}

export default Login