import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from '~/components';
import { PageNotFound, Main } from '~/pages';
import {
  Trucks,
  TruckCreate,
  TruckEdit,
  Loads,
  SolicitationAdminList,
  SolicitationAdminEdit,
  History,
} from '~/pages/Admin';
import { SolicitationUserCreate } from '~/pages/User';

export default function Routes() {
  return (
    <>
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Main} />

          <Route path="/trucks" exact component={Trucks} />
          <Route path="/trucks/create" component={TruckCreate} />
          <Route path="/trucks/edit/:id" component={TruckEdit} />

          <Route path="/requests" exact component={SolicitationAdminList} />
          <Route path="/requests/create" component={SolicitationUserCreate} />
          <Route path="/requests/edit/:id" component={SolicitationAdminEdit} />

          <Route path="/historic" component={History} />

          <Route path="/loads" component={Loads} />
          <Route path="/settings" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}
