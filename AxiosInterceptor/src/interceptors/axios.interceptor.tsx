import axios, { AxiosRequestConfig } from 'axios';
import { getInLocalStorage, getValidationError, LocalStorageKeys, saveInLocalStorage } from '../utilities';
import { SnackbarUtilities } from '../utilities/snackbar-manager';

/*
La funcion del interceptor es interceptar paquetes, modificar solicitudes y respuestas, 
capturar codigos de errores y realizar acciones basadas en las solicitudes o respuestas
*/

export const AxiosInterceptor = () => {
  /* 
  Forma de guardar y caputar un token mediante funciones y enum, es una forma mas prolija y parametrizada:
  */
    saveInLocalStorage(LocalStorageKeys.TOKEN, 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXRhbGlhY29ydGVzQHRhbGsyZ2V0aGVyLmNvbSIsImV4cCI6MTcyMDg4ODY1OSwiaWF0IjoxNzIwMjgzODU5fQ.ac5ikfpAxZ_lj7iCDaGH0aqQEsEYir4tm-NBkp88VlU');
    const token = getInLocalStorage(LocalStorageKeys.TOKEN);
  
  /* 
  Forma de guardar y caputar un token de forma simple:
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXRhbGlhY29ydGVzQHRhbGsyZ2V0aGVyLmNvbSIsImV4cCI6MTcyMDg4ODY1OSwiaWF0IjoxNzIwMjgzODU5fQ.ac5ikfpAxZ_lj7iCDaGH0aqQEsEYir4tm-NBkp88VlU");
  */

  /*
  Actualizar encabezado de peticiones
  */
  const updateHeader = (request: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    const newHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    request.headers = newHeaders;
    return request;
  };

  /*
  Interceptar todas las consultas e implementar condiciones en caso de que algunas consultas no lleven token o lleven palabras claves y si no realizar la consulta
  */
  axios.interceptors.request.use((request) => {
    if (request.url?.includes('assets')) return request;
    return updateHeader(request);
  });

  /*
  Interceptar todas las respuestas para implementar logica en caso de ser necesario
  */
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
