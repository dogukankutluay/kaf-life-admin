export const checkLogin = () => {
  return localStorage.getItem('auth-token') ? true : false;
};
