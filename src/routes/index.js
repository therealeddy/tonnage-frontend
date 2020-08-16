import React from 'react';
import { Switch } from 'react-router-dom';

import { Dashboard, Login, Register } from '~/pages';
import {
  Users,
  UsersClients,
  UsersClientsCreate,
  UsersClientsEdit,
} from '~/pages/Admin';

import Route from './Routes';

export default function Routes() {
  return (
    <Switch>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />

        <Route
          path="/dashboard"
          component={Dashboard}
          isPrivate
          roles={['client', 'trucker', 'manager', 'admin']}
        />

        <Route
          path="/users"
          exact
          component={Users}
          isPrivate
          roles={['manager', 'admin']}
        />

        <Route
          path="/users/client"
          exact
          component={UsersClients}
          isPrivate
          roles={['admin']}
        />
        <Route
          path="/users/client/create"
          component={UsersClientsCreate}
          isPrivate
          roles={['admin']}
        />
        <Route
          path="/users/client/edit/:id"
          component={UsersClientsEdit}
          isPrivate
          roles={['admin']}
        />
      </Switch>
    </Switch>
  );
}
