import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer from '../redux/Dashboard';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    // TODO
});

/** Root Redux store types. */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;