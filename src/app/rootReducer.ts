import {combineReducers} from '@reduxjs/toolkit';
import dashboardReducer, {DashboardState, initialState as dashboardInitialState} from '../redux/Dashboard';
import errorsReducer, {ErrorState, initialState as errorsInitialState} from '../redux/Errors';
import mapInfoReducer, {initialState as mapInfoInitialState, MapInfoState} from '../redux/MapInfo';
import sensorInfoReducer, {initialState as sensorInfoInitialState, SensorInfoState} from "../redux/SensorInformation";
import olapReducer, {initialState as OlapInitialState, OlapDataState} from "../redux/OlapData";
import consumerGroupReducer, {
    ConsumerGroupState,
    initialState as ConsumerGroupInfoInitialState
} from "../redux/ConsumerGroupInfo";

export interface State {
    dashboard: DashboardState,
    errors: ErrorState
    mapInfo: MapInfoState,
    sensor: SensorInfoState,
    olap: OlapDataState,
    consumerGroup: ConsumerGroupState
}

export const initialState: State = {
    dashboard: dashboardInitialState,
    errors: errorsInitialState,
    mapInfo: mapInfoInitialState,
    sensor: sensorInfoInitialState,
    olap: OlapInitialState,
    consumerGroup: ConsumerGroupInfoInitialState
};

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    errors: errorsReducer,
    mapInfo: mapInfoReducer,
    sensor: sensorInfoReducer,
    olap: olapReducer,
    consumerGroup: consumerGroupReducer
});

/** Root Redux store types. */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;