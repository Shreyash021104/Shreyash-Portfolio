import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const FACES = [
  { label: "Python", color: "#00F5FF" },
  { label: "React", color: "#7B5EF8" },
  { label: "Docker", color: "#00F5FF" },
  { label: "AWS", color: "#7B5EF8" },
  { label: "LLM", color: "#00F5FF" },
  { label: "K8s", color: "#7B5EF8" },
];

function Cube() {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.4;
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.4;
  });
  const positions: [number, number, number, [number, number, number]][] = [
    [0, 0, 1.01, [0, 0, 0]],
    [0, 0, -1.01, [0, Math.PI, 0]],
    [1.01, 0, 0, [0, Math.PI / 2, 0]],
    [-1.01, 0, 0, [0, -Math.PI / 2, 0]],
    [0, 1.01, 0, [-Math.PI / 2, 0, 0]],
    [0, -1.01, 0, [Math.PI / 2, 0, 0]],
  ];
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#0a1428" metalness={0.4} roughness={0.4} transparent opacity={0.85} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.02, 2.02, 2.02)]} />
        <lineBasicMaterial color="#00F5FF" />
      </lineSegments>
      {FACES.map((f, i) => {
        const [x, y, z, rot] = positions[i];
        return (
          <group key={i} position={[x, y, z]} rotation={rot}>
            <Text fontSize={0.32} color={f.color} anchorX="center" anchorY="middle" outlineWidth={0.01} outlineColor="#050A14">
              {f.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export function TechCube() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3, 2.2, 3.5], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#00F5FF" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#7B5EF8" />
        <Cube />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
}
