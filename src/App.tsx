import React, { useEffect, useState } from 'react';
import getTestMessage from './api/axiosInstance';

const App: React.FC = () => { // tipagem da função App. Como é um const, é preciso especificar o retorno 
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTestMessage();
        setMessage(response.message);
      } catch (error: string | any) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
  <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 ">
  <h1 className="text-4xl font-bold text-pink-600">
      Teste de Integração
  </h1>
  {error ? <p className='text-red-100'>Error: {error}</p> : <p className='text-yellow-700 text-2xl mt-2'>Mensagem do Back-End: <i>"{message}"</i></p>}

  </div>
  );
}

export default App;
