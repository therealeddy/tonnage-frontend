import React from 'react';
import { Switch } from 'react-router-dom';

import { Dashboard, Login, Register } from '~/pages';
import {
  Users,
  UsersClients,
  UsersClientsCreate,
  UsersClientsEdit,
  UsersManagers,
  UsersManagersCreate,
  UsersManagersEdit,
  UsersTruckers,
  UsersTruckersCreate,
  UsersTruckersEdit,
  Trucks,
  TrucksEdit,
  TrucksCreate,
} from '~/pages/Admin';
import {
  SolicitationUserCreate,
  SolicitationUser,
  SolicitationUserView,
} from '~/pages/Client';

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
          roles={['admin', 'manager']}
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

        <Route
          path="/users/manager"
          exact
          component={UsersManagers}
          isPrivate
          roles={['admin']}
        />
        <Route
          path="/users/manager/create"
          component={UsersManagersCreate}
          isPrivate
          roles={['admin']}
        />
        <Route
          path="/users/manager/edit/:id"
          component={UsersManagersEdit}
          isPrivate
          roles={['admin']}
        />

        <Route
          path="/users/trucker"
          exact
          component={UsersTruckers}
          isPrivate
          roles={['admin', 'manager']}
        />
        <Route
          path="/users/trucker/create"
          component={UsersTruckersCreate}
          isPrivate
          roles={['admin', 'manager']}
        />
        <Route
          path="/users/trucker/edit/:id"
          component={UsersTruckersEdit}
          isPrivate
          roles={['admin', 'manager']}
        />

        <Route
          path="/trucks"
          exact
          component={Trucks}
          isPrivate
          roles={['admin', 'manager']}
        />
        <Route
          path="/trucks/create"
          component={TrucksCreate}
          isPrivate
          roles={['admin', 'manager']}
        />
        <Route
          path="/trucks/edit/:id"
          component={TrucksEdit}
          isPrivate
          roles={['admin', 'manager']}
        />

        <Route
          path="/requests"
          exact
          component={SolicitationUser}
          isPrivate
          roles={['client']}
        />
        <Route
          path="/requests/create"
          component={SolicitationUserCreate}
          isPrivate
          roles={['client']}
        />
        <Route
          path="/requests/view/:id"
          component={SolicitationUserView}
          isPrivate
          roles={['client']}
        />
      </Switch>
    </Switch>
  );
}
