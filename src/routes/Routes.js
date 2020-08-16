import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import authConfig from '~/config/authConfig';
import AuthLayout from '~/layouts/Auth';
import DefaultLayout from '~/layouts/Default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  roles,
  ...rest
}) {
  const { keyRootStorage, configRolesObject } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  const rolesRote = roles.map((role) => configRolesObject[role]);

  if (!root && isPrivate) {
    return <Redirect to="/" />;
  }

  if (root && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  if (root && isPrivate && rolesRote.indexOf(root.user.role) === -1) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = root ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  roles: PropTypes.array,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  roles: [],
};
