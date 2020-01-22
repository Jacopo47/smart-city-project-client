import moment, {Moment} from "moment";
import {Granularity} from "../redux/OlapData";

export interface OlapParams {
    from: Moment,
    to: Moment,
    zone: string,
    granularity: Granularity
}
