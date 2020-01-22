import 'fetch'
import {OlapParams} from "./OlapParams";

const DATE_FORMAT = 'DD-MM-YYYY';

const API_ROOT = '//localhost:4700/';

function callApi(endpoint: string) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

    return fetch(fullUrl)
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
export const fetchOlapData = (params: OlapParams) => callApi(`datawarehouse/${params.from.format(DATE_FORMAT)}/${params.to.format(DATE_FORMAT)}/${params.zone}/${params.granularity}`)