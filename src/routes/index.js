import React from 'react';
import { Switch } from 'react-router-dom';

import { Dashboard, Login, Register } from '~/pages';

import Route from './Routes';

// import {
//   Trucks,
//   TruckCreate,
//   TruckEdit,
//   Loads,
//   SolicitationAdminList,
//   SolicitationAdminEdit,
//   History,
// } from '~/pages/Admin';
// import { SolicitationUserCreate } from '~/pages/User';

export default function Routes() {
  return (
    <Switch>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/dashboard" component={Dashboard} isPrivate />

        {/* <Route path="/trucks" component={Trucks} isPrivate />
        <Route path="/trucks/create" component={TruckCreate} isPrivate />
        <Route path="/trucks/edit/:id" component={TruckEdit} isPrivate />

        <Route path="/requests" component={SolicitationAdminList} isPrivate />
        <Route
          path="/requests/create"
          component={SolicitationUserCreate}
          isPrivate
        />
        <Route
          path="/requests/edit/:id"
          component={SolicitationAdminEdit}
          isPrivate
        />

        <Route path="/historic" component={History} isPrivate />

        <Route path="/loads" component={Loads} isPrivate /> */}
      </Switch>
    </Switch>
  );
}
