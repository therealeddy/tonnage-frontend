import React from 'react';

import authConfig from '~/config/authConfig';
import { Dashboard as AdminDasboard } from '~/pages/Admin';
import { Dashboard as ClientDashboard } from '~/pages/Client';
import TruckerDasboard from '~/pages/Trucker/Solicitation';

export default function Dashboard() {
  const { keyRootStorage } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  switch (root.user.role) {
    case 1:
      return <ClientDashboard />;
    case 2:
      return <TruckerDasboard />;
    case 3:
      return <AdminDasboard />;
    case 4:
      return <AdminDasboard />;
    default:
      return <div />;
  }
}
