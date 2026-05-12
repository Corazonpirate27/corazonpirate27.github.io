import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Stars, OrbitControls } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Sphere 
            ref={sphereRef}
            args={[1, 64, 64]} 
            scale={hovered ? 1.2 : 1}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}
        >
            <MeshDistortMaterial 
                color={hovered ? '#10b981' : '#059669'} 
                attach="material" 
                distort={0.5} 
                speed={2} 
                roughness={0.2}
                metalness={0.8}
                wireframe={hovered}
            />
        </Sphere>
    );
};

export default function Canvas3D() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00ff41" />
                <AnimatedSphere />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
