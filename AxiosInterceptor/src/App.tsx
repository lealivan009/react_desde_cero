import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import './App.css';
import { testingService } from './services/testing.service';
import { SnackbarUtilitiesConfigurator } from './utilities/snackbar-manager';

function App() {
  const [info, setInfo] = useState({} as any);

  //async: Palabra clave que declara una función asíncrona. Indica que la función puede contener expresiones await y que siempre devuelve una promesa.
  const fetchInfo = async () => {

    //await: Pausa la ejecución de la función fetchData hasta que la promesa devuelta por testingService() se resuelva.
    // {data} : de la consulta, solo guarda la parte de data que es la que contiene la informacion importante

    //partes de una respuesta: config, data, headers, request, status, statusText
    //Esta estructura crea una variable de manera oculta llamada igual que la parte de la respuesta
    const { data } = await testingService();

    setInfo(data);
  };

  /*
  Se utiliza useEffect para ejecutar la funcion cuando el componente se monta. 
  El primer argumento de useEffect es una funcion, por lo que se debe ejecutar la funcion fetchInfo dentro de una funcion anonima en este caso.
  [] esto representa que solo se va a ejecutar una sola vez.
  */
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <SnackbarProvider>
      <SnackbarUtilitiesConfigurator />
      <div className="App">{JSON.stringify(info)}</div>
    </SnackbarProvider>
  );
}

export default App;
