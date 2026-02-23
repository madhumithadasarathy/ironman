import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface IronManModelProps {
    pose?: string;
    floatIntensity?: number;
    rotateSpeed?: number;
}

const IronManModel: React.FC<IronManModelProps> = ({
    pose = 'hero',
    floatIntensity = 0.15,
    rotateSpeed = 0.3
}) => {
    const groupRef = useRef<THREE.Group>(null!);
    const { scene } = useGLTF('/iron_man.glb');

    useEffect(() => {
        // Enhance materials for a more cinematic look
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    if (mat.isMeshStandardMaterial) {
                        mat.envMapIntensity = 1.5;
                        mat.needsUpdate = true;
                    }
                }
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
    }, [scene]);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.getElapsedTime();
            // Gentle floating animation
            groupRef.current.position.y += Math.sin(t * 0.5) * 0.001 * floatIntensity;
            // Subtle rotation
            groupRef.current.rotation.y = Math.sin(t * rotateSpeed) * 0.08;
        }
    });

    // Pose-based transform adjustments
    const getPoseProps = () => {
        switch (pose) {
            case 'fly':
                return {
                    rotation: [0.5, 0.3, 0.1] as [number, number, number],
                };
            case 'landing':
                return {
                    rotation: [-0.15, -0.3, 0] as [number, number, number],
                };
            case 'front':
                return {
                    rotation: [0, Math.PI, 0] as [number, number, number],
                };
            default:
                return {
                    rotation: [0, 0, 0] as [number, number, number],
                };
        }
    };

    const poseProps = getPoseProps();

    return (
        <group ref={groupRef}>
            <primitive
                object={scene.clone()}
                rotation={poseProps.rotation}
            />
        </group>
    );
};

// Preload the model
useGLTF.preload('/iron_man.glb');

export default IronManModel;
