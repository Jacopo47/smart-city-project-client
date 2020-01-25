import {PayloadAction} from "@reduxjs/toolkit";
import {ConsumerGroup} from "../model/ConsumerGroup";
import {fetchConsumerGroupsInfo} from "../model/Api";
import {handle} from "redux-pack";

export interface ConsumerGroupState {
    isLoading: boolean
    data: ConsumerGroup[]
    error: string | null
}

const LOAD_CONSUMER_GROUP_DATA: string = 'LOAD_CONSUMER_GROUP_DATA';

export function loadConsumerGroupData() {
    return {
        type: LOAD_CONSUMER_GROUP_DATA,
        promise: fetchConsumerGroupsInfo()
    }
}

export const initialState: ConsumerGroupState = {isLoading: false, data: [], error: null};


export default function consumerGroupReducer(state = initialState, action: PayloadAction<any>) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_CONSUMER_GROUP_DATA:
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
        default:
            return state;
    }
}





