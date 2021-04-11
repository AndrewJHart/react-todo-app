import { createContext } from 'react';

/**
 * Define simple context for authentication
 *
 * @type {React.Context<{logout: logout, isLoggedIn: boolean, login: login, token: null}>}
 */
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: () => {},  // todo add login cb
    logout: () => {}  // todo add logout cb
});

export default AuthContext;
