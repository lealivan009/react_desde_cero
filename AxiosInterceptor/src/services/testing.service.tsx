import axios from "axios";
import { getInLocalStorage, LocalStorageKeys } from "../utilities";

export const testingService = () => {
  return axios.get("http://localhost:8080/reunionvirtual/listarsalasactivas?idCuenta=3");
};

export const refreshToken = () => {
  return axios.post(
    "https://rickandmortyapi.com/api/refreshtoken",
    {},
    {
      headers: {
        Authorization: getInLocalStorage(LocalStorageKeys.REFRESH_TOKEN),
      },
    }
  );
};
