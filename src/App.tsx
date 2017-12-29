import * as React from 'react';
import './App.css';
import { Routes } from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

// const logo = require('./images/logo.svg');
const theme = createMuiTheme();

class App extends React.Component<{}, {}> {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Routes/>
            </MuiThemeProvider>
        );
    }
}

export default App;
