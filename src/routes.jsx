import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import AuthRoute from './components/auth-route/auth-route';
import HomePage from './pages/home/home';
import LoginPage from './pages/login/login';
import NotFoundPage from './pages/not-found/not-found';

/**
 * Insert routes and map them to components using Route directive
 *
 * These routes are injected into the app container component
 */
export const routes = (
    <Switch>
        {/* open routes to the public */}
        <AuthRoute path='/' exact={true} component={HomePage} />
        <Route path='/login' exact={true} component={LoginPage} />

        {/* incomplete */}
        {/*<Route path='/not-found' exact={true} component={NotFoundPage} />*/}

        {/* catch all that re-routes back to home if any other unknown routes entered */}
        <Redirect from='**' exact={true} to='/' />
    </Switch>
);
