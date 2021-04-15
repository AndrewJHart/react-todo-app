import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { routes } from './routes';

function AppLayout({ routerHistory }) {
  return (
      <>
        <Router history={routerHistory}>
          {routes}
        </Router>
      </>
  );
}

AppLayout.propTypes = {
  routerHistory: PropTypes.any,
}

export default AppLayout;
