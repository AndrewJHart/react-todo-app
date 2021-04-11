import React, { useContext , useEffect} from 'react';
import { Route, Redirect } from 'react-router';
import AuthContext from '../../context/auth/auth-context';
import { AuthService } from '../../services/auth';


/**
 * Functional component used in place of a traditional HOC
 * to handle redirect if user is not authenticated. Used in
 * routes.
 *
 * @note HOC are still achievable and we could return a component
 *   instead of JSX and still use composition
 *   to decorate auth routes with something like a middleware
 *   component but this for this use case this will suffice
 *
 * @param {Function} Component (Alias) - component to be rendered if user is authenticated
 * @param {Object} otherProps
 * @return {JSX.Element} - JSX to render if user is valid
 * @constructor
 */
const AuthRoute = ({ component: Component, ...otherProps }) => {
    const authContext = useContext(AuthContext)
    const { getUser, isLoggedIn } = authContext;

    return (
        <Route {...otherProps} render={props =>
            !AuthService.isLoggedIn()
                ? <Redirect to='/login' />
                : <Component {...props} />
        }
        />
    );
};

export default AuthRoute;
