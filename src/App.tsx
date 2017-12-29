import * as React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Routes } from './routes';

// const logo = require('./images/logo.svg');

class App extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <NavigationBar/>

                <Routes/>
            </div>
        );
    }
}

export default App;
