import axios, { AxiosRequestConfig } from 'axios';
import { getInLocalStorage, getValidationError, LocalStorageKeys, saveInLocalStorage } from '../utilities';
import { SnackbarUtilities } from '../utilities/snackbar-manager';

/*
La funcion del interceptor es interceptar paquetes, modificar solicitudes y respuestas, 
capturar codigos de errores y realizar acciones basadas en las solicitudes o respuestas
*/

export const AxiosInterceptor = () => {
  /* 
  Otras formas de guardar y caputar un token:
    saveInLocalStorage(LocalStorageKeys.TOKEN, 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXRhbGlhY29ydGVzQHRhbGsyZ2V0aGVyLmNvbSIsImV4cCI6MTcyMDg4ODY1OSwiaWF0IjoxNzIwMjgzODU5fQ.ac5ikfpAxZ_lj7iCDaGH0aqQEsEYir4tm-NBkp88VlU');
    const token = getInLocalStorage(LocalStorageKeys.TOKEN);
  */

  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXRhbGlhY29ydGVzQHRhbGsyZ2V0aGVyLmNvbSIsImV4cCI6MTcyMDg4ODY1OSwiaWF0IjoxNzIwMjgzODU5fQ.ac5ikfpAxZ_lj7iCDaGH0aqQEsEYir4tm-NBkp88VlU");
  
  const updateHeader = (request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    const newHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    request.headers = newHeaders;
    return request;
  };

  axios.interceptors.request.use((request) => {
    if (request.url?.includes('assets')) return request;
    return updateHeader(request);
  });

  axios.interceptors.response.use(
    (response) => {
      console.log('response', response);
      SnackbarUtilities.success('Success');
      return response;
    },
    (error) => {
      SnackbarUtilities.error(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};
