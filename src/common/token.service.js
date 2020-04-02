const TOKEN_KEY = 'jwt_token';

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export default {getToken, setToken, removeToken};
