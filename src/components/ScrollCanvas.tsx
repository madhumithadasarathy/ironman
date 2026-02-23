import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { interpolateKeyframes } from '../hooks/useScrollAnimation';

/*
  Scroll-driven keyframes for the Iron Man model.
  progress 0.0 = top of page (hero)
  progress 0.25 = section 01
  progress 0.5 = section 02
  progress 0.75 = section 03
  progress 1.0 = I AM IRON MAN / footer
*/

const POSITION_KEYFRAMES = [
    { at: 0.0, value: [3.5, -2.8, 0.5] as [number, number, number] },    // Hero: right side, head visible
    { at: 0.12, value: [1.5, -2.8, 0.3] as [number, number, number] },   // Transition
    { at: 0.22, value: [-1.5, -2.8, 0.3] as [number, number, number] },  // Section 01: left side
    { at: 0.32, value: [1.8, -2.2, 1.0] as [number, number, number] },   // Section 01 bottom: flying right
    { at: 0.5, value: [-1.2, -2.8, 0.3] as [number, number, number] },   // Section 02: left side
    { at: 0.62, value: [1.2, -2.8, 0.3] as [number, number, number] },   // Transition to section 03
    { at: 0.75, value: [1.5, -2.8, 0.3] as [number, number, number] },   // Section 03: right side
    { at: 0.88, value: [0, -2.8, 0.5] as [number, number, number] },     // I AM IRON MAN: centered
    { at: 1.0, value: [0, -3.5, -1] as [number, number, number] },       // Footer: recede
];

const ROTATION_KEYFRAMES = [
    { at: 0.0, value: [0, -0.4, 0] as [number, number, number] },        // Hero: angled toward viewer
    { at: 0.12, value: [0, -0.2, 0] as [number, number, number] },
    { at: 0.22, value: [0, 0.4, 0] as [number, number, number] },        // Section 01: facing right
    { at: 0.32, value: [0.3, 0.2, 0.1] as [number, number, number] },    // Flying pose
    { at: 0.5, value: [0, 0.5, 0] as [number, number, number] },         // Section 02: facing right
    { at: 0.62, value: [0, -0.3, 0] as [number, number, number] },
    { at: 0.75, value: [0, -0.5, 0] as [number, number, number] },       // Section 03: facing left
    { at: 0.88, value: [0, 0, 0] as [number, number, number] },          // Centered, facing forward
    { at: 1.0, value: [0, 0.3, 0] as [number, number, number] },
];

const SCALE_KEYFRAMES = [
    { at: 0.0, value: [2.2, 2.2, 2.2] as [number, number, number] },     // Hero: big but fits in view
    { at: 0.12, value: [2.0, 2.0, 2.0] as [number, number, number] },
    { at: 0.22, value: [2.0, 2.0, 2.0] as [number, number, number] },    // Section 01
    { at: 0.32, value: [1.8, 1.8, 1.8] as [number, number, number] },    // Flying: slightly smaller
    { at: 0.5, value: [2.0, 2.0, 2.0] as [number, number, number] },     // Section 02
    { at: 0.62, value: [2.0, 2.0, 2.0] as [number, number, number] },
    { at: 0.75, value: [2.0, 2.0, 2.0] as [number, number, number] },    // Section 03
    { at: 0.88, value: [2.2, 2.2, 2.2] as [number, number, number] },    // I AM IRON MAN
    { at: 1.0, value: [1.5, 1.5, 1.5] as [number, number, number] },
];

interface ScrollModelProps {
    scrollProgress: number;
}

const ScrollDrivenModel: React.FC<ScrollModelProps> = ({ scrollProgress }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const { scene } = useGLTF('/iron_man.glb');
    const clonedScene = useRef<THREE.Object3D | null>(null);
    const initialized = useRef(false);
    const [startAnim, setStartAnim] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnim(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        clonedScene.current = scene.clone();
        clonedScene.current.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    if (mat.isMeshStandardMaterial) {
                        mat.envMapIntensity = 1.8;
                        mat.needsUpdate = true;
                    }
                }
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
    }, [scene]);

    useFrame((state) => {
        if (!groupRef.current) return;

        const t = state.clock.getElapsedTime();

        // Interpolate from keyframes
        const targetPos = interpolateKeyframes(scrollProgress, POSITION_KEYFRAMES);
        const targetRot = interpolateKeyframes(scrollProgress, ROTATION_KEYFRAMES);
        const targetScale = interpolateKeyframes(scrollProgress, SCALE_KEYFRAMES);

        // On first frame, instead of snapping, we set it far to the right
        // but normal sized, so it lerps into the Hero position horizontally.
        if (!initialized.current) {
            groupRef.current.position.set(10.0, -2.8, 0.5); // Far right
            groupRef.current.rotation.set(0, -0.4, 0); // Exact target rotation
            groupRef.current.scale.set(2.2, 2.2, 2.2); // Exact target scale
            initialized.current = true;
            return;
        }

        if (startAnim) {
            // Smooth lerp toward target (slightly slower for a more cinematic entry & scroll catchup)
            const lerpSpeed = 0.06;
            groupRef.current.position.x += (targetPos[0] - groupRef.current.position.x) * lerpSpeed;
            groupRef.current.position.y += (targetPos[1] - groupRef.current.position.y) * lerpSpeed;
            groupRef.current.position.z += (targetPos[2] - groupRef.current.position.z) * lerpSpeed;

            groupRef.current.rotation.x += (targetRot[0] - groupRef.current.rotation.x) * lerpSpeed;
            groupRef.current.rotation.y += (targetRot[1] - groupRef.current.rotation.y) * lerpSpeed;
            groupRef.current.rotation.z += (targetRot[2] - groupRef.current.rotation.z) * lerpSpeed;

            groupRef.current.scale.x += (targetScale[0] - groupRef.current.scale.x) * lerpSpeed;
            groupRef.current.scale.y += (targetScale[1] - groupRef.current.scale.y) * lerpSpeed;
            groupRef.current.scale.z += (targetScale[2] - groupRef.current.scale.z) * lerpSpeed;
        }

        // Add gentle floating
        groupRef.current.position.y += Math.sin(t * 0.6) * 0.003;
    });

    if (!clonedScene.current) return null;

    return (
        <group
            ref={groupRef}
            position={[2.0, -2.8, 0.5]}
            rotation={[0, -0.4, 0]}
            scale={[2.2, 2.2, 2.2]}
        >
            <primitive object={clonedScene.current} />
        </group>
    );
};

/* Component that reads scrollProgress and passes it into the R3F scene */
const ScrollCanvas: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress(window.scrollY / totalHeight);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1,
            pointerEvents: 'none',
        }}>
            <Canvas
                camera={{ position: [0, 1, 6], fov: 50 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true, alpha: true }}
                shadows
            >
                {/* Lighting setup */}
                <ambientLight intensity={0.8} />
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={2.8}
                    color="#ffffff"
                    castShadow
                />
                <directionalLight position={[-4, 3, -3]} intensity={1.2} color="#ff4444" />
                <spotLight
                    position={[2, 10, 5]}
                    angle={0.35}
                    penumbra={0.6}
                    intensity={3}
                    color="#d4a843"
                />
                <pointLight position={[0, 1, 4]} intensity={2.5} color="#4ecdff" distance={10} />
                <pointLight position={[-3, 0, 2]} intensity={1.5} color="#ff6633" distance={8} />

                <Suspense fallback={null}>
                    <ScrollDrivenModel scrollProgress={scrollProgress} />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
};

useGLTF.preload('/iron_man.glb');

export default ScrollCanvas;
