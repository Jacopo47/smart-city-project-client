import {Moment} from "moment";

export interface ErrorStreamEntry {
    dateTime: Moment,
    error: {
        errorMsg: string,
        deviceId: string,
        zone: string
    }
}

export interface Errors {
    errors: ErrorStreamEntry[]
}

export interface Error {
    cause: string
}