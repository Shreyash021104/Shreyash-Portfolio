import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

// Anime-style 3D boy avatar built from primitives.
// - Sphere head with glowing cyan eyes
// - Hoodie body (sphere + cylinder) with violet trim
// - Idle float, cursor look-at, orbiting cyan ring, sparkle aura
export function AvatarBoy({ wave = false, scale = 1 }: { wave?: boolean; scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const leftArm = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.2) * 0.12;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
    if (head.current) {
      target.set(mouse.x * 2, mouse.y * 1.5 + 1.2, 4);
      head.current.lookAt(target);
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.6;
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.5) * 0.1;
    }
    if (leftArm.current && wave) {
      leftArm.current.rotation.z = -1.1 + Math.sin(t * 6) * 0.35;
    }
  });

  return (
    <group ref={group} scale={scale} position={[0, -0.6, 0]}>
      {/* Cyan orbit ring */}
      <mesh ref={ring} position={[0, 1.0, 0]}>
        <torusGeometry args={[1.35, 0.025, 16, 96]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>

      {/* Hoodie body */}
      <mesh position={[0, -0.55, 0]}>
        <capsuleGeometry args={[0.55, 0.7, 12, 24]} />
        <meshStandardMaterial color="#0a1428" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Hoodie trim glow */}
      <mesh position={[0, -0.1, 0.02]}>
        <torusGeometry args={[0.55, 0.04, 12, 48]} />
        <meshStandardMaterial color="#7B5EF8" emissive="#7B5EF8" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>

      {/* Arms */}
      <group ref={leftArm} position={[-0.55, -0.25, 0]}>
        <mesh position={[-0.15, -0.25, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.13, 0.55, 8, 16]} />
          <meshStandardMaterial color="#0a1428" roughness={0.6} />
        </mesh>
      </group>
      <mesh position={[0.62, -0.55, 0]} rotation={[0, 0, -0.25]}>
        <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
        <meshStandardMaterial color="#0a1428" roughness={0.6} />
      </mesh>

      {/* Head group */}
      <group ref={head} position={[0, 0.55, 0]}>
        {/* Hood */}
        <mesh position={[0, 0.05, -0.08]} scale={[1.15, 1.05, 1.15]}>
          <sphereGeometry args={[0.52, 32, 32]} />
          <meshStandardMaterial color="#0a1428" roughness={0.7} />
        </mesh>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.46, 48, 48]} />
          <meshStandardMaterial color="#f3d9c1" roughness={0.55} />
        </mesh>
        {/* Hair tuft */}
        <mesh position={[0, 0.35, 0.05]} rotation={[0.2, 0, 0.3]}>
          <coneGeometry args={[0.32, 0.5, 12]} />
          <meshStandardMaterial color="#1a1530" roughness={0.5} />
        </mesh>
        {/* Eyes - glowing cyan */}
        <mesh position={[-0.16, 0.04, 0.4]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#00F5FF" toneMapped={false} />
        </mesh>
        <mesh position={[0.16, 0.04, 0.4]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#00F5FF" toneMapped={false} />
        </mesh>
        {/* Visor reflection bar */}
        <mesh position={[0, 0.06, 0.42]}>
          <boxGeometry args={[0.5, 0.02, 0.005]} />
          <meshBasicMaterial color="#00F5FF" toneMapped={false} transparent opacity={0.55} />
        </mesh>
        {/* Smile */}
        <mesh position={[0, -0.18, 0.42]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.012, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#5a2030" />
        </mesh>
      </group>

      <Sparkles count={60} scale={3.2} size={3} speed={0.4} color="#00F5FF" />
      <Sparkles count={30} scale={4} size={2} speed={0.3} color="#7B5EF8" />
      <pointLight position={[1.5, 1.5, 1.5]} intensity={3} color="#00F5FF" distance={6} />
      <pointLight position={[-1.5, 0.5, 1]} intensity={2} color="#7B5EF8" distance={6} />
    </group>
  );
}

export function AvatarFloat(props: { wave?: boolean; scale?: number }) {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <AvatarBoy {...props} />
    </Float>
  );
}
