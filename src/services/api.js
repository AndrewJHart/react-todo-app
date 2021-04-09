import axios from 'axios/index';

/**
 * wrapper for axios api calls that assists with
 * loading indicators, managing state, and specific
 * error handling
 *
 * @param {string} method - http method to use
 * @param {string} resource - api resource name
 * @param {object} data - data for the request payload
 * @param {object} extraHeaders
 * @returns {Promise<T>}
 */
export function api(method, resource, data = {}, extraHeaders = {}) {
    let headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        ...extraHeaders
    };

    return axios(resource,
        {
            method,
            headers,
            data
        }
    )
    .then(handleResponse())
    .catch(error => handleError(error));
}

/**
 * success callback handler defined separately because its
 * used more than once in the axios switch case method handler;
 *
 * This is actually a function that is called immediately to keep
 * scope of the loading bar indicator, yet also returns a function
 * to handle the then-able callback for the response
 *
 * @type {function(*=)}
 */
const handleResponse = (
    () => {
        return function(response) {
            return response;
        };
    }
);

/**
 * error callback handler defined separately, instead of inline,
 * because the function is used multiple times
 *
 * @type {function(*=)}
 */
const handleError = (
    error => {
        throw error;
    }
);

export default api;
