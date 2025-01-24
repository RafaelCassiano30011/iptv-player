const getLocalStorageJson = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export { getLocalStorageJson };
