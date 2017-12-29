import * as React from 'react';
import './NavigationBar.css';
import { authenticationService } from '../../services/authenticationService';
import { Link } from 'react-router-dom';

interface NavigationBarState {
    isAuthenticated: boolean;
}

class NavigationBar extends React.Component<{}, NavigationBarState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            isAuthenticated: authenticationService.isAuthenticated()
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.setItem('token', '');
        localStorage.clear();
        this.setState({
            isAuthenticated: false
        });
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <a className="navbar-brand" href="/">Actions</a>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/'}>Home</Link>
                        </li>
                        {!this.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to={'/login'}>Login</Link>
                        </li>
                        }
                        {this.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to={'/'} onClick={this.logout}>Logout</Link>
                        </li>
                        }
                        {!this.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to={'/signup'}>Sign Up</Link>
                        </li>
                        }
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;