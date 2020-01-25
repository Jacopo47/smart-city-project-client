import {PayloadAction} from "@reduxjs/toolkit";
import {handle} from 'redux-pack'
import {fetchErrors} from "../model/Api";
import {ErrorStreamEntry} from "../model/ErrorStreamEntry";
import moment from "moment";

export interface ErrorState {
    isLoading: boolean
    data: ErrorStreamEntry[],
    unread: number,
    error: string | null
}

export const LOAD_ERRORS = 'LOAD_ERRORS';

export function loadErrors() {
    return {
        type: LOAD_ERRORS,
        promise: fetchErrors(),
    };
}

export const ADD_ERROR = 'ADD_ERRORS';

export function addErrors(error: ErrorStreamEntry) {
    return {
        type: ADD_ERROR,
        payload: error
    };
}

export const RESET_UNREAD = 'RESET_UNREAD';

export function resetUnread() {
    return {
        type: RESET_UNREAD
    };
}

export const initialState: ErrorState = {isLoading: false, data: [], error: null, unread: 0};

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
                    return {...prevState, error: payload.error}
                },
                success: prevState => {
                    return {...prevState, data: payload.errors, unread: payload.errors.length}
                }
            });
        case ADD_ERROR:
            const app = Array.from(state.data);
            app.push(payload);
            const data = app.sort((a, b) => moment(a.dateTime).valueOf() - moment(b.dateTime).valueOf());

            return {
                ...state,
                data,
                unread: state.unread + 1
            };
        case RESET_UNREAD:
            return {
                ...state,
                unread: 0
            };
        default:
            return state;
    }
}



