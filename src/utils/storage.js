/**
 * Helper method to dynamically fetch the current token
 * from local store to set as header for request to api(s)
 *
 * @note Add error handling try/catch because the JWT
 *       key may not exist if user is logged out
 * @returns {string | null}
 */
export const getJWT = () => {
    return localStorage.getItem('token') || false;
};

/**
 * Sets the JWT in local storage for user on per-request basis
 *
 * @param token
 * @returns none (setItem only returns undefined unless it fails)
 */
export const setJWT = (token) => {
    localStorage.setItem('token', token);
};

/**
 * removes the JWT from local storage
 *
 * @returns none
 */
export const removeJWT = () => {
    localStorage.removeItem('token');
};

/**
 * Decodes the user info from the signed jwt
 *
 * @param jwt
 * @returns {*}
 */
export const decodeJWT = (jwt) => {
    if (jwt === null || jwt === undefined) {
        return false;
    }

    let components = jwt.split('.', 3);
    if (components.length < 3) {
        return false;
    }

    let payload = components[1];
    let regex = new RegExp('[-_a-zA-Z0-9/+=]+');
    let matches = regex.test(payload);

    if (matches) {
        return JSON.parse(atob(payload));
    } else {
        return false;
    }
};
