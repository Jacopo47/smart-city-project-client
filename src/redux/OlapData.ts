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

export interface OlapDataState {
    isLoading: boolean
    data: Fact[]
    error: string | null
    from: Moment
    to: Moment
    granularity: Granularity
}

export const LOAD_OLAP_DATA = 'LOAD_OLAP_DATA';

export function loadOlapData(payload: OlapParams) {
    return {
        type: LOAD_OLAP_DATA,
        promise: fetchOlapData(payload),
    };
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

                    return {...prevState, data: app }
                }
            });
        default:
            return state;
    }
}



