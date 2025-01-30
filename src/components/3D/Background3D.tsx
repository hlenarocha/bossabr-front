import { Canvas } from "@react-three/fiber"; // Canvas e animação
import { OrbitControls } from "@react-three/drei"; // Controles de câmera
import MovingSphere from "./MovingSphere";

const Background3D = () => {
  const spheres: { color: string; size: number; initialPosition: [number, number, number]; factors: [number, number, number] }[] = [];
  const minDistance = 1.5; // Distância mínima entre as bolotas (menor para permitir proximidade)
  const spawnRadius = 17; // Reduzido para garantir que as bolotas fiquem mais próximas da câmera

  const generateSphere = (color: string, size: number, factors: [number, number, number]) => {
    let position: [number, number, number] = [0, 0, 0];
    let isValidPosition = false;

    // Gera uma posição inicial que respeita a distância mínima
    while (!isValidPosition) {
      position = [
        (Math.random() - 0.5) * spawnRadius, // Coordenada X dentro de um raio menor
        (Math.random() - 0.5) * spawnRadius, // Coordenada Y dentro de um raio menor
        (Math.random() - 0.5) * spawnRadius, // Coordenada Z dentro de um raio menor
      ];

      isValidPosition = spheres.every(
          (sphere) =>
              Math.sqrt(
                  Math.pow(position[0] - sphere.initialPosition[0], 2) +
                  Math.pow(position[1] - sphere.initialPosition[1], 2) +
                  Math.pow(position[2] - sphere.initialPosition[2], 2)
              ) >= minDistance
      );
    }

    spheres.push({
      color,
      size,
      initialPosition: position as [number, number, number],
      factors: factors as [number, number, number],
    });
  };

  // Adiciona as bolotas (ajuste automático para entre 8 e 10 bolotas)
  const numSpheres = Math.floor(Math.random() * 3) + 8; // Gera um número aleatório entre 8 e 10
  for (let i = 0; i < numSpheres; i++) {
    generateSphere("#F6BC0A", Math.random() * 1.5 + 0.5, [Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5]);
  }

  // Adiciona as bolotas
  generateSphere("#F6BC0A", 1, [1, 1, 1]);
  generateSphere("#F6BC0A", 1.5, [1.2, 1, 0.8]);
  generateSphere("#F6BC0A", 0.8, [0.8, 1.2, 1.1]);
  generateSphere("#F6BC0A", 1.2, [1.4, 0.9, 1]);
  generateSphere("#F6BC0A", 0.6, [1, 1.5, 1.3]);
  generateSphere("#F6BC0A", 1, [0.9, 1, 1.2]);
  generateSphere("#F6BC0A", 1, [1.2, 1.1, 1.4]);
  generateSphere("#F6BC0A", 1.3, [0.9, 1, 1.2]);
  generateSphere("#F6BC0A", 0.5, [1.2, 1.1, 1.4]);
  generateSphere("#F6BC0A", 0.9, [1.3, 1.2, 0.8]);
  generateSphere("#F6BC0A", 1.3, [0.8, 1.4, 1.1]);


  return (
      <div className="w-full h-screen">
        <Canvas style={{ background: "radial-gradient(circle,#686868, #000000)" }}>
          {/* Luz ambiente para iluminação geral */}
          <ambientLight intensity={0.8} />

          {/* Luz direcional para criar sombras suaves */}
          <directionalLight
              position={[8, 10, -10]}
              intensity={2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
          />
          <directionalLight
              position={[-8, -10, 10]}
              intensity={0.2}
              color = "#B26400"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
          />

          {/* Controle de câmera */}
          <OrbitControls
              autoRotate={true}
              autoRotateSpeed={5}
              minDistance={2} // Distância mínima permitida
              maxDistance={8} // Distância máxima permitida
          />

          {/* Esferas em movimento */}
          {spheres.map((sphere, index) => (
              <MovingSphere
                  key={index}
                  color={sphere.color}
                  size={sphere.size}
                  initialPosition={sphere.initialPosition}
                  movementFactors={sphere.factors}
              />
          ))}
        </Canvas>
      </div>
  );
};

export default Background3D;
