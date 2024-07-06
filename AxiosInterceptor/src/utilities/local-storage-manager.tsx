export enum LocalStorageKeys {
  REFRESH_TOKEN = "refreshToken",
  TOKEN = "token",
}

export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getInLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);
  if (!result) {
    return null;
  }
  try {
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
};


export const clearLocalStorage = () => {
  localStorage.clear();
};
