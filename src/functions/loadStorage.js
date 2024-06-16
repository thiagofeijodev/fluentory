export const loadStorage = (key) => {
  const user = localStorage.getItem(key);

  if (user) {
    return JSON.parse(user) || {};
  }
  return null;
};

export default loadStorage;
