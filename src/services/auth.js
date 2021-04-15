import api from './api';
import moment from 'moment';
import { decodeJWT, getJWT, setJWT, removeJWT } from '../utils/storage';
// const baseURL = process.env.REACT_APP_AUTH_URL;
const baseUrl = 'https://diversy-api.herokuapp.com/api/users';

/**
 * Accesses the redux store to determine if the
 * current user making the request is logged in
 *
 * @return {boolean}
 */
function isLoggedIn() {
    const jwt = getJWT();

    return !!jwt;
}

/**
 * Register a new user
 *
 * @param {String} email
 * @param {String} password
 * @returns {Promise<String>}
 */
function register(email, password) {
    return api('post', `${baseUrl}/register`, { email, password })
    .then(response => {
        // login successful if there's a jwt token in the response
        if (response?.data) {
            return response.data;
        } else {
            throw 'Error, response was missing required data to register';
        }
    })
    .catch(error => {
        throw `${error.toString()} failed attempting to register your account with server, please try again`;
    });
}

/**
 * Authentication function - takes user & pass and hands off to
 * api to authenticate the user.
 *
 * @note - would like to add SSO and setup to take code & supply it to server for
 *   to validate and return jwt
 *
 * @param {String} email
 * @param {String} password
 * @returns {Promise<String>}
 */
function login(email, password) {
    return api('post', `${baseUrl}/login`, { email, password })
    .then(response => {
        // login successful if there's a jwt token in the response
        if (response?.data?.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            setJWT(response.data.token);

            return response.data.token;
        } else {
            throw 'Error, response was missing required data to authenticate';
        }
    })
    .catch(error => {
        throw `${error.toString()} failed attempting to authenticate with server, please try again`;
    });
}

/**
 * Allows us to send a token that is close to expiration
 * and get a new token with fully updated expiry time so
 * we don't have to just wait till token expires and log the
 * user out
 *
 * @returns {Promise<T>}
 */
function refresh() {
    return api('get', `${baseUrl}/refresh`)
    .then(response => {
        if (response.data && response.data.token) {
            // replace the original jwt with the newly created one
            setJWT(response.data.token);

            // must return the token so it gets added into redux
            // in case user's permissions or roles have changed
            return response.data.token;
        } else {
            throw 'Error refreshing the token; please logout and back in';
        }
    })
    .catch(error => {
        throw `${error.toString()} failed to refresh your user session, please logout and back in`;
    });
}

/**
 * This dispatches the logout action which will
 * call the method above to remove the JWT,
 * push the user to the home page and reset the
 * state
 *
 * @note this was moved from api.js into here because
 *    it makes more sense since the `isLoggedIn` method
 *    is also in the authService and they require dispatch
 *
 * @returns {Promise<T>}
 */
function logout() {
    const jwt = getJWT();

    if (jwt) {
        // decode the token & get the expiration date in unix timestamp
        const tokenExpiration = decodeJWT(jwt).exp;

        // get the remaining amount of time before expiration.
        const diff = moment.duration(moment.unix(tokenExpiration).diff(moment())).asHours();

        // if the token has not already expired but is still stored in local storage
        // it will cause a 401 logout loop - so ensure the token is still valid before
        // invalidating it, else remove the token from local storage to prevent loop
        if (diff > 0) {
            // invalidate the the token on the server
            return api('get', `${baseUrl}/logout`)
                .catch(error => {
                    throw `${error.toString()} failed to invalidate token`;
                })
                .finally(() => {
                    // remove the JWT
                    removeJWT();
                });
        } else {
            // remove the JWT
            removeJWT();
        }
    }

    return Promise.resolve();
}

// export as one item since we can't wrap services in classes without instantiating them somewhere first
export const AuthService = {
    register,
    login,
    refresh,
    isLoggedIn,
    logout,
};
