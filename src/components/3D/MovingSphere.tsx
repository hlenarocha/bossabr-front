import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

interface MovingSphereProps {
  color: string;
  size: number;
  initialPosition: [number, number, number];
  movementFactors: [number, number, number];
}

const MovingSphere: React.FC<MovingSphereProps> = ({
  color,
  size,
  initialPosition,
  movementFactors,
}) => {
  const ref = React.useRef<THREE.Mesh>(null!);

  // Animação das esferas
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.set(
      initialPosition[0] + Math.sin(t * movementFactors[0]),
      initialPosition[1] + Math.cos(t * movementFactors[1]),
      initialPosition[2] + Math.sin(t * movementFactors[2])
    );
  });

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
    </mesh>
  );
};

export default MovingSphere;
