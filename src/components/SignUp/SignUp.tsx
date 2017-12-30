import * as React from 'react';
import './SignUp.css';
import { authenticationService } from '../../services/authenticationService';
import NavigationBar from '../NavigationBar/NavigationBar';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import {
    RouteComponentProps,
    withRouter} from 'react-router';

interface SignUpProperties extends RouteComponentProps<{}>{
    title: string;
}

interface SignUpState {
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

class SignUp extends React.Component<SignUpProperties, SignUpState> {

    constructor(props: SignUpProperties) {
        super(props);
        this.state = {
            username: undefined,
            password: undefined,
            email: undefined,
            firstName: undefined,
            lastName: undefined
        };
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);

        if (authenticationService.isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    register() {
        authenticationService.register(this.state.username as string, this.state.password as string, this.state.email as string,
                                       this.state.firstName as string, this.state.lastName as string)
            .then(item => {
                localStorage.setItem('token', item.token);
                this.props.history.push('/');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as SignUpState);
    }

    render() {
        return (
            <div>
                <NavigationBar/>

                <Grid container alignItems="center" justify="center">
                    <div>
                        <h1>Sign Up Page</h1>

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
                        <TextField
                            name="email"
                            placeholder="name@example.com"
                            onChange={this.onChange}
                            label="email"/>
                        <br/>
                        <TextField
                            name="firstName"
                            placeholder="name"
                            onChange={this.onChange}
                            label="firstName"/>
                        <br/>
                        <TextField
                            name="lastName"
                            placeholder="surname"
                            onChange={this.onChange}
                            label="lastName"/>
                        <br/>

                        <Button raised color="primary" onClick={this.register}>
                            Submit
                        </Button>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default withRouter(SignUp);
