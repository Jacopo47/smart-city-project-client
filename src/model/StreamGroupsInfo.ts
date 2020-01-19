import {Moment} from "moment";

export interface StreamGroupsInfo {
    name: String,
    consumers: number,
    pendingMessages: number,
    lastDeliveredIdTime: Moment
}

export interface ConsumerInfo {
    name: String,
    pendingMessages: number,
    idle: number
}