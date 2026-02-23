import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import IronManModel from './IronManModel';

interface HeroCanvasProps {
    pose?: string;
    cameraPosition?: [number, number, number];
    modelPosition?: [number, number, number];
    modelScale?: number;
    modelRotation?: [number, number, number];
    enableOrbit?: boolean;
    environmentPreset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city' | 'park' | 'lobby';
    floatIntensity?: number;
    rotateSpeed?: number;
    showShadow?: boolean;
}

const HeroCanvas: React.FC<HeroCanvasProps> = ({
    pose = 'hero',
    cameraPosition = [0, 1.5, 6],
    modelPosition = [1.5, -0.5, 0],
    modelScale = 1,
    modelRotation = [0, -0.4, 0],
    enableOrbit = false,
    environmentPreset = 'city',
    floatIntensity = 0.15,
    rotateSpeed = 0.3,
    showShadow = false,
}) => {
    return (
        <Canvas
            camera={{ position: cameraPosition, fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
            shadows
        >
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1.5}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#ff4444" />
            <spotLight
                position={[0, 8, 4]}
                angle={0.4}
                penumbra={0.5}
                intensity={2}
                color="#d4a843"
                castShadow
            />
            <pointLight position={[0, 1, 3]} intensity={0.8} color="#4ecdff" distance={8} />

            <Suspense fallback={null}>
                <group position={modelPosition} scale={modelScale} rotation={modelRotation}>
                    <IronManModel pose={pose} floatIntensity={floatIntensity} rotateSpeed={rotateSpeed} />
                </group>
                {showShadow && (
                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={2}
                        far={4}
                    />
                )}
                <Environment preset={environmentPreset} />
            </Suspense>

            {enableOrbit && <OrbitControls enableZoom={false} enablePan={false} />}
        </Canvas>
    );
};

export default HeroCanvas;
