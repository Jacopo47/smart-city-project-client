import 'fetch'
import {OlapParams} from "./OlapParams";

const DATE_FORMAT = 'DD-MM-YYYY';

const API_ROOT = '//localhost:4700/';

function callApi(endpoint: string, post: boolean = false) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    const action = post ? fetch(fullUrl, {
        method: "POST"
    }): fetch(fullUrl);
    return action
        .then(response => {
            if (!response.ok) {
                return Promise.reject({
                    message: 'Errore durante la richiesta'
                });
            }

            return response.json();
        }).catch(err => Promise.reject({error: err.message}))

}

// api services
export const fetchErrors = () => callApi(`api/errors`);
export const fetchSensorInfo = () => callApi('api/zone/last');
export const fetchOlapData = (params: OlapParams) => callApi(`datawarehouse/${params.from.format(DATE_FORMAT)}/${params.to.format(DATE_FORMAT)}/${params.zone}/${params.granularity}`);
export const fetchConsumerGroupsInfo = () => callApi('api/consumerGroup/info ');
export const fetchDestroyGroup = (group: string) => callApi(`api/consumerGroup/destroy/${group}`, true);
export const fetchDeleteConsumer = (group: string, consumer: string) => callApi(`api/consumerGroup/remove/${group}/${consumer}`, true);
export const fetchSetGroupId = (group: string, id: string) => callApi(`api/consumerGroup/set-id/${group}/${id}`, true);
