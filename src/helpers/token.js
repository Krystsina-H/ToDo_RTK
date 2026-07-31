const TOKEN = 'token';
export const token = {
  get: () => localStorage.getItem(TOKEN),
  set: (value) => localStorage.setItem(TOKEN, value),
  remove: () => localStorage.removeItem(TOKEN),
  isAuthorized: () => !!token.get(),
};
