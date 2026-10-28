import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneProps {
  reducedMotion: boolean;
}

const BrandEmblem = ({ reducedMotion }: SceneProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load official logo texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/logo.png',
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.generateMipmaps = true;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      (err) => {
        console.warn('Could not load logo texture in 3D scene:', err);
      }
    );
  }, []);

  // Pointer tracking coordinates in NDC [-1, 1]
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const { viewport } = useThree();

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.targetX = nx;
      mouse.current.targetY = ny;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth) * 2 - 1;
        const ny = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouse.current.targetX = nx;
        mouse.current.targetY = ny;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [reducedMotion]);

  // Cylinder geometry for the 3D emblem disc
  // In Three.js CylinderGeometry: radiusTop, radiusBottom, height, radialSegments
  // Materials: index 0 = side rim, index 1 = top face, index 2 = bottom face
  const materials = useMemo(() => {
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: '#15191C',
      metalness: 0.85,
      roughness: 0.25,
      emissive: '#00C878',
      emissiveIntensity: 0.15,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.35,
      metalness: 0.3,
      transparent: true,
      color: texture ? '#ffffff' : '#00C878',
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: '#101214',
      metalness: 0.9,
      roughness: 0.4,
    });

    return [rimMaterial, frontMaterial, backMaterial];
  }, [texture]);

  // Clean disposal of materials on unmount
  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  // Dynamic responsive scale based on viewport width
  const responsiveScale = Math.min(Math.max(viewport.width * 0.22, 1.4), 2.8);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (reducedMotion) {
      // Static, clean isometric resting pose
      meshRef.current.rotation.set(0.1, 0, 0);
      meshRef.current.position.set(0, 0, -1);
      return;
    }

    const t = state.clock.getElapsedTime();

    // Smooth lerp mouse coordinates
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05);

    // Subtle gentle floating oscillation
    const floatY = Math.sin(t * 0.8) * 0.12;
    const idleRotY = Math.sin(t * 0.4) * 0.06;

    // Apply interactive tilt (constrained to subtle elegance: max ±15 deg)
    meshRef.current.position.y = floatY;
    meshRef.current.position.z = -0.8 + Math.cos(t * 0.6) * 0.08;

    meshRef.current.rotation.x = 0.08 - mouse.current.y * 0.28;
    meshRef.current.rotation.y = idleRotY + mouse.current.x * 0.35;

    // Animate point light position to track mouse and cast dynamic specular shine
    if (pointLightRef.current) {
      pointLightRef.current.position.x = mouse.current.x * 4;
      pointLightRef.current.position.y = mouse.current.y * 3 + 1;
    }

    // Counter-rotate the precision technological rings
    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.12;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.08;
    }
  });

  return (
    <group ref={meshRef} scale={[responsiveScale, responsiveScale, responsiveScale]}>
      {/* 3D Brand Mark Disc */}
      {/* Rotate geometry so front face (+Y of cylinder) faces forward toward camera (+Z) */}
      <mesh
        material={materials}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.35, 1.35, 0.14, 64]} />
      </mesh>

      {/* Outer Precision Tech Orbital Ring 1 */}
      <mesh ref={ringRef1} position={[0, 0, -0.05]}>
        <ringGeometry args={[1.58, 1.62, 64]} />
        <meshBasicMaterial
          color="#00C878"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Segmented Accent Ring 2 */}
      <mesh ref={ringRef2} position={[0, 0, -0.08]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[1.78, 1.81, 48]} />
        <meshBasicMaterial
          color="#00D2FF"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dynamic Specular Point Light (Emerald Glow) */}
      <pointLight
        ref={pointLightRef}
        position={[0, 1, 2.5]}
        color="#00C878"
        intensity={3.2}
        distance={8}
      />
    </group>
  );
};

// Subtle ambient depth dust particles
const AmbientDust = ({ count = 35 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const emerald = new THREE.Color('#00C878');
    const cyan = new THREE.Color('#00D2FF');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;

      const mixed = emerald.clone().lerp(cyan, Math.random() * 0.4);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const Hero3DScene: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <Canvas
        role="img"
        aria-label="Interactive 3D ArenaX Brand Installation"
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight color="#181D20" intensity={1.5} />
        <directionalLight position={[-4, 5, 4]} color="#ffffff" intensity={1.4} />
        <directionalLight position={[4, -3, 2]} color="#00D2FF" intensity={0.7} />

        <BrandEmblem reducedMotion={reducedMotion} />
        <AmbientDust count={40} />
      </Canvas>

      {/* Dark radial vignette overlay to ensure pristine contrast for text & buttons */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#101214]/65 via-[#101214]/80 to-[#101214]"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(16, 18, 20, 0.45) 0%, rgba(16, 18, 20, 0.85) 65%, #101214 100%)',
        }}
      />
    </div>
  );
};

export default Hero3DScene;

