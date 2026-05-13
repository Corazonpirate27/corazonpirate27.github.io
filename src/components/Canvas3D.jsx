import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Stars, OrbitControls } from '@react-three/drei';

const AnimatedSphere = ({ reducedMotion }) => {
    const sphereRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (!reducedMotion && sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere
            ref={sphereRef}
            args={[1, 32, 32]}
            scale={hovered ? 1.2 : 1}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}
        >
            <MeshDistortMaterial
                color={hovered ? '#10b981' : '#059669'}
                attach="material"
                distort={reducedMotion ? 0.2 : 0.42}
                speed={reducedMotion ? 0 : 1.15}
                roughness={0.2}
                metalness={0.8}
                wireframe={hovered}
            />
        </Sphere>
    );
};

export default function Canvas3D() {
    const isCoarsePointer = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(pointer: coarse)').matches;
    }, []);

    const reducedMotion = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    const dpr = isCoarsePointer ? [1, 1.15] : [1, 1.35];
    const starCount = isCoarsePointer ? 900 : 1800;

    return (
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-45 md:opacity-55">
            <Canvas
                camera={{ position: [0, 0, 3] }}
                dpr={dpr}
                performance={{ min: 0.5 }}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00ff41" />
                <AnimatedSphere reducedMotion={reducedMotion} />
                <Stars radius={90} depth={35} count={starCount} factor={3.5} saturation={0} fade speed={reducedMotion ? 0 : 0.45} />
                {!isCoarsePointer && (
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reducedMotion} autoRotateSpeed={0.35} />
                )}
            </Canvas>
        </div>
    );
}
