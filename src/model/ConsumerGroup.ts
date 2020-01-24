import {Moment} from "moment";

export interface ConsumerGroup {
    name: string
    consumers: number
    pendingMessages: number
    lastDeliveredIdTime: Moment
    consumersList: Consumer[]
}

export interface Consumer {
    name: string
    pendingMessages: number
    idle: number
}