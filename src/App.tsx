import * as React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Routes } from './routes';

// const logo = require('./images/logo.svg');

class App extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <Header/>

                <Routes/>
            </div>
        );
    }
}

export default App;
