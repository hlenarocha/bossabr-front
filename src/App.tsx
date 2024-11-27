import React, { useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // Canvas e animação
import { OrbitControls } from '@react-three/drei'; // Controles de câmera
import { getTestMessage, getTestSelect, postNameInput } from './api/axiosInstance';

const MovingSphere: React.FC<{ color: string; initialX: number }> = ({ color, initialX }) => {
  const [position, setPosition] = useState([initialX, 0, 0]); // Estado da posição da esfera

  // Animação usando useFrame
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime(); // Tempo total decorrido
    setPosition([initialX + Math.sin(time) * 2, Math.cos(time) * 1.5, 0]); // Movimento circular
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.6}
        clearcoat={0.9}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
};

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTestSelect();
        setOptions(response.map((item: any) => item.descricao));
      } catch (error: any) {
        console.error(error);
      }
    } ;
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTestMessage();
        setMessage(response.message);
      } catch (error: any) { 
        setError(error?.message || 'Ocorreu um erro desconhecido');
      }
    };
    fetchData();
  }, []);

  const handleNameSubmit = async () => {
    try {
      const response = await postNameInput(name);
      console.log(response);
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-100">
      <h1 className="text-4xl font-bold text-pink-600">Teste de Integração</h1>
      {error ? (
        <p className="text-red-500">Erro: {error}</p>
      ) : (
        <p className="text-yellow-700 text-2xl mt-2">
          Mensagem do Back-End: <i>"{message}"</i>
        </p>
      )}

      <select>{options.map(item => {
        return <option key={item} value={item}>{item}</option>
      })}</select>


      <input type='text' placeholder='Nome' onChange={(e) => setName(e.target.value)}></input>
      <button type='submit' onClick={handleNameSubmit} className='bg-red-400 p-4 mt-4'>ENVIAR</button>

      {/* Canvas para renderizar 3D */}
      <div className="w-full h-3/4 mt-5">
        <Canvas>
          {/* Luzes */}
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={2} intensity={600} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0} />

          {/* Controle de câmera */}
          <OrbitControls />

          {/* Esferas em movimento */}
          <MovingSphere color="pink" initialX={-2} />
          <MovingSphere color="yellow" initialX={2} />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
