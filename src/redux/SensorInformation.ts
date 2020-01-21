import {PayloadAction} from "@reduxjs/toolkit";
import {handle} from 'redux-pack'
import {fetchSensorInfo} from "../model/Api";
import {SensorRead} from "../model/SensorRead";

export interface SensorInfoState {
    isLoading: boolean
    data: SensorRead[]
    error: string | null
}

export const LOAD_SENSOR_INFO = 'LOAD_SENSOR_INFO';
export const UPDATE_SENSOR_INFO = 'UPDATE_SENSOR_INFO';

export function updateSensorInfo(data: SensorRead) {
    return {
        type: UPDATE_SENSOR_INFO,
        payload: data
    }
}

export function loadSensorInfo() {
    return {
        type: LOAD_SENSOR_INFO,
        promise: fetchSensorInfo(),
    };
}

export const initialState: SensorInfoState = {isLoading: false, data: [], error: null};

export default function sensorInfoReducer(state = initialState, action: PayloadAction<any>) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_SENSOR_INFO:
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    isLoading: true,
                    error: null
                }),
                finish: prevState => ({...prevState, isLoading: false}),
                failure: prevState => {
                    return {...prevState, error: payload.error}
                },
                success: prevState => {
                    return {...prevState, data: payload.data}
                }
            });
        case UPDATE_SENSOR_INFO:
            const newData = state.data.filter(e => e.zone !== payload.zone);
            newData.push(payload);

            return {
                ...state,
                data: newData
            };
        default:
            return state;
    }
}



