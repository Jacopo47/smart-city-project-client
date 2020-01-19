import {Moment} from "moment";

export interface Facts {
    facts: Fact[]
}

export interface Fact {
    id: number,
    zone: string,
    dateTime: Moment,
    temperature: number
}