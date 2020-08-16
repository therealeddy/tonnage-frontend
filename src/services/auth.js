import authConfig from '~/config/authConfig';
import api from '~/services/api';

const auth = (data) => {
  const content = JSON.stringify(data);

  const { keyRootStorage } = authConfig;

  localStorage.setItem(keyRootStorage, content);

  const { href } = window.location;

  window.location.href = href;
};

const logout = () => {
  const { keyRootStorage } = authConfig;

  localStorage.removeItem(keyRootStorage);

  const { href } = window.location;

  window.location.href = href;
};

const setHeaders = () => {
  const { keyRootStorage } = authConfig;

  const root = JSON.parse(localStorage.getItem(keyRootStorage));

  if (root) {
    api.defaults.headers.Authorization = `Bearer ${root.token}`;
  }
};

export { auth, logout, setHeaders };
