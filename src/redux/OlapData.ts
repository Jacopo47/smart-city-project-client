import {PayloadAction} from "@reduxjs/toolkit";
import {handle} from 'redux-pack'
import {fetchOlapData} from "../model/Api";
import {Fact} from "../model/Fact";
import {OlapParams} from "../model/OlapParams";
import moment, {Moment} from "moment";

export enum Granularity {
    Hour = 'hour',
    Day = 'day',
    Month = 'month',
    Year = 'year'
}

export const getGranularity = (input: string | undefined): Granularity => {
    if (input === undefined) return Granularity.Day;
    switch (input) {
        case Granularity.Hour:
            return Granularity.Hour;
        case Granularity.Day:
            return Granularity.Day;
        case Granularity.Month:
            return Granularity.Month;
        case Granularity.Year:
            return Granularity.Year
    }

    return Granularity.Day
};
export const GranularityValues = [Granularity.Hour, Granularity.Day, Granularity.Month, Granularity.Year];


export interface OlapDataState {
    isLoading: boolean
    data: Fact[]
    error: string | null
    from: Moment
    to: Moment
    granularity: Granularity
}

export const LOAD_OLAP_DATA = 'LOAD_OLAP_DATA';
export const SET_FROM = 'SET_FROM';
export const SET_TO = 'SET_FROM';
export const SET_GRANULARITY = 'SET_GRANULARITY';
export const RESET = 'RESET';
export const RESET_DATA = 'RESET_DATA';

export function loadOlapData(payload: OlapParams) {
    return {
        type: LOAD_OLAP_DATA,
        promise: fetchOlapData(payload),
    };
}

export function setFrom(from: Moment) {
    return {
        type: SET_FROM,
        payload: from
    }
}

export function setTo(to: Moment) {
    return {
        type: SET_TO,
        payload: to
    }
}

export function setGranularity(granularity: Granularity) {
    return {
        type: SET_GRANULARITY,
        payload: granularity
    }
}

export function reset() {
    return {
        type: RESET
    }
}

export function resetOnlyData() {
    return {
        type: RESET_DATA
    }
}

export const initialState: OlapDataState = {
    isLoading: false,
    data: [],
    error: null,
    from: moment().startOf('month'),
    to: moment().endOf('year'),
    granularity: Granularity.Month
};

export default function olapReducer(state = initialState, action: PayloadAction<any>) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_OLAP_DATA:
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
                    const app = Array.from(prevState.data);
                    app.push(...payload.data);

                    return {...prevState, data: app}
                }
            });
        case SET_FROM:
            return {
                ...state,
                from: payload
            };
        case SET_TO:
            return {
                ...state,
                to: payload
            };
        case SET_GRANULARITY:
            return {
                ...state,
                granularity: payload
            };
        case RESET:
            return initialState;
        case RESET_DATA:
            return {
                ...state,
                data: []
            };
        default:
            return state;
    }
}



