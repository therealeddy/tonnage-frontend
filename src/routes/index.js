import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '~/components';
import { Trucks, Create, Edit, Page404, Main } from '~/pages';

export default function Routes() {
  return (
    <>
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/caminhoes" component={Trucks} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:id" component={Edit} />

          <Route path="/relatorio" component={Page404} />
          <Route path="/pedidos" component={Page404} />
          <Route path="/usuarios" component={Page404} />
          <Route path="/cargas" component={Page404} />
          <Route path="/configuracoes" component={Page404} />
        </Switch>
      </div>
    </>
  );
}
