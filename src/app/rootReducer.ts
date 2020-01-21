import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer, {DashboardState, initialState as dashboardInitialState} from '../redux/Dashboard';
import errorsReducer, {ErrorState, initialState as errorsInitialState} from '../redux/Errors';
import mapInfoReducer, { MapInfoState, initialState as mapInfoInitialState} from '../redux/MapInfo';
export interface State {
    dashboard: DashboardState,
    errors: ErrorState
    mapInfo: MapInfoState
}

export const initialState: State = {
    dashboard: dashboardInitialState,
    errors: errorsInitialState,
    mapInfo: mapInfoInitialState
}

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    errors: errorsReducer,
    mapInfo: mapInfoReducer
});

/** Root Redux store types. */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;