import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer, {DashboardState, initialState as dashboardInitialState} from '../redux/Dashboard';
import errorsReducer, {ErrorState, initialState as errorsInitialState} from '../redux/Errors';

export interface State {
    dashboard: DashboardState,
    errors: ErrorState
}

export const initialState: State = {
    dashboard: dashboardInitialState,
    errors: errorsInitialState
}

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    errors: errorsReducer
});

/** Root Redux store types. */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;