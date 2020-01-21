import {Moment} from "moment";

export interface SensorRead {
    id: string,
    dateTime: Moment,
    name: string,
    temperature: number,
    humidity: number,
    coordinate: Coordinate
}

export interface Coordinate {
    latitude: number,
    longitude: number
}