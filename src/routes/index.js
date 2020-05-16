import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '~/components';
import { PageNotFound, Main } from '~/pages';
import { Trucks, TruckCreate, TruckEdit } from '~/pages/Admin';

export default function Routes() {
  return (
    <>
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/caminhoes" component={Trucks} />
          <Route path="/create" component={TruckCreate} />
          <Route path="/edit/:id" component={TruckEdit} />

          <Route path="/relatorio" component={PageNotFound} />
          <Route path="/pedidos" component={PageNotFound} />
          <Route path="/usuarios" component={PageNotFound} />
          <Route path="/cargas" component={PageNotFound} />
          <Route path="/configuracoes" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}
