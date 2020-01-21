import {PayloadAction} from "@reduxjs/toolkit";
import {handle} from 'redux-pack'
import {fetchErrors} from "../model/Api";
import {ErrorStreamEntry} from "../model/ErrorStreamEntry";

export interface ErrorState {
    isLoading: boolean
    data: ErrorStreamEntry[]
    error: string | null
}

export const LOAD_ERRORS = 'LOAD_ERRORS';

export function loadErrors() {
    return {
        type: LOAD_ERRORS,
        promise: fetchErrors(),
    };
}

export const initialState: ErrorState = {isLoading: false, data: [], error: null};

export default function errorsReducer(state = initialState, action: PayloadAction<any>) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_ERRORS:
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    isLoading: true,
                    error: null
                }),
                finish: prevState => ({...prevState, isLoading: false}),
                failure: prevState => {
                    return {...prevState, error: payload.error }
                },
                success: prevState => {
                    return {...prevState, data: payload.errors }
                }
            });
        default:
            return state;
    }
}



