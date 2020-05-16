import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from '~/components';
import { PageNotFound, Main } from '~/pages';
import { Trucks, TruckCreate, TruckEdit, Loads } from '~/pages/Admin';
import { Solicitation } from '~/pages/User';

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
          <Route path="/loads" component={Loads} />

          <Route path="/create-request" component={Solicitation} />
          <Route path="/settings" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}
