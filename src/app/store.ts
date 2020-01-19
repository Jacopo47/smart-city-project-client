import {configureStore} from '@reduxjs/toolkit';

import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {middleware as reduxPackMiddleware} from 'redux-pack'

import rootReducer, {State} from './rootReducer';

const loggerMiddleware = createLogger();

export default function configureAppStore(preloadedState: State) {
    const middleware = [loggerMiddleware, thunkMiddleware, reduxPackMiddleware];

    const store = configureStore({
        reducer: rootReducer,
        middleware,
        preloadedState
    });

    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./rootReducer', () => {
            /* eslint-disable-next-line global-require */ /* require needed for Hot-Module-Reload */
            const newRootReducer = require('./rootReducer').default;
            store.replaceReducer(newRootReducer);
        });
    }

    return store;
}



