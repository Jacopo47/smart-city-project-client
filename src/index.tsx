import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureAppStore from "./app/store";
import {initialState} from "./app/rootReducer";

const store = configureAppStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
