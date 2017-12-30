import * as React from 'react';
import './Login.css';
import { authenticationService } from '../../services/authenticationService';
import NavigationBar from '../NavigationBar/NavigationBar';
import { TextField } from 'material-ui';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { RouteComponentProps, withRouter } from 'react-router';

interface LoginState {
    username?: string;
    password?: string;
}

class Login extends React.Component<RouteComponentProps<{}>, LoginState> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined
        };
        this.login = this.login.bind(this);

        if (authenticationService.isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    login() {
        if (this.state.username && this.state.password) {
            authenticationService.login(this.state.username as string, this.state.password as string)
                .then(item => {
                    localStorage.setItem('token', item.token);
                    this.props.history.push('/');
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

export default withRouter(Login);
