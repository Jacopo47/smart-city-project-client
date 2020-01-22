import { combineReducers } from '@reduxjs/toolkit';
import dashboardReducer, {DashboardState, initialState as dashboardInitialState} from '../redux/Dashboard';
import errorsReducer, {ErrorState, initialState as errorsInitialState} from '../redux/Errors';
import mapInfoReducer, { MapInfoState, initialState as mapInfoInitialState} from '../redux/MapInfo';
import sensorInfoReducer, { SensorInfoState, initialState as sensorInfoInitialState } from "../redux/SensorInformation";
import olapReducer, { OlapDataState, initialState as OlapInitialState } from "../redux/OlapData";

export interface State {
    dashboard: DashboardState,
    errors: ErrorState
    mapInfo: MapInfoState,
    sensor: SensorInfoState,
    olap: OlapDataState
}

export const initialState: State = {
    dashboard: dashboardInitialState,
    errors: errorsInitialState,
    mapInfo: mapInfoInitialState,
    sensor: sensorInfoInitialState,
    olap: OlapInitialState
}

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    errors: errorsReducer,
    mapInfo: mapInfoReducer,
    sensor: sensorInfoReducer,
    olap: olapReducer
});

/** Root Redux store types. */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;