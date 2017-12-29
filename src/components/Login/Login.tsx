import * as React from 'react';
import './Login.css';
import { Redirect } from 'react-router';
import { authenticationService } from '../../services/authenticationService';
import NavigationBar from '../NavigationBar/NavigationBar';
import { TextField } from 'material-ui';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

interface LoginState {
    username?: string;
    password?: string;
    redirect?: boolean;
}

class Login extends React.Component<{}, LoginState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            redirect: false
        };
        this.login = this.login.bind(this);
    }

    login() {
        if (this.state.username && this.state.password) {
            authenticationService.login(this.state.username as string, this.state.password as string)
                .then(item => {
                    localStorage.setItem('token', item.token);
                    this.setState({
                        redirect: true
                    });
                    this.context.push({pathname: '/'});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as LoginState);
    }

    render() {
        if (this.state.redirect || authenticationService.isAuthenticated()) {
            return (<Redirect to={'/'}/>);
        }

        return (
            <div>
                <NavigationBar/>
                <Grid container alignItems="center" justify="center">
                    <div>
                        <h1>Login Page</h1>

                        <TextField
                            name="username"
                            placeholder="username"
                            onChange={this.onChange}
                            label="username"/>
                        <br/>
                        <TextField
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={this.onChange}
                            label="password"/>
                        <br/>

                        <Button raised color="primary" onClick={this.login}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default Login;
