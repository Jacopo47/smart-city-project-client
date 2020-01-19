import 'isomorphic-fetch'


const API_ROOT = 'http://localhost:4700/'

function callApi(endpoint: string) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json)
            }


            return Object.assign({},
                json, response
            )
        })
        .then(
            response => ({response}),
            error => ({error: error.message || error || 'Something bad happened'})
        ).then(Promise.reject)

}

// api services
export const fetchErrors = () => callApi(`api/errors`);
