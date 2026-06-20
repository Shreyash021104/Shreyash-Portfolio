import { Canvas } from "@react-three/fiber";
import { Stars, PerspectiveCamera, AdaptiveDpr } from "@react-three/drei";
import { Suspense } from "react";
import { AvatarFloat } from "./AvatarBoy";

export function HeroCanvas({ wave = false }: { wave?: boolean }) {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0.3, 4.5]} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <Stars radius={60} depth={40} count={2500} factor={3} saturation={0} fade speed={0.6} />
        <AvatarFloat wave={wave} />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
