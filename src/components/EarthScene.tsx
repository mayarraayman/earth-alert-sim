import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

interface EarthSceneProps {
  isActive: boolean;
  asteroidParams: {
    size: number;
    speed: number;
    angle: number;
    target: { lat: number; lng: number };
  };
}

// Earth component with realistic textures
const Earth = ({ target }: { target: { lat: number; lng: number } }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Create earth geometry and materials
  const earthGeometry = useMemo(() => new THREE.SphereGeometry(5, 64, 64), []);
  const earthMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      shininess: 0.8,
    });
    return material;
  }, []);

  // Rotate earth
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  // Convert lat/lng to 3D coordinates for target marker
  const targetPosition = useMemo(() => {
    const phi = (90 - target.lat) * (Math.PI / 180);
    const theta = (target.lng + 180) * (Math.PI / 180);
    const radius = 5.1;
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }, [target]);

  return (
    <group>
      {/* Earth Sphere */}
      <mesh ref={earthRef} geometry={earthGeometry} material={earthMaterial} />
      
      {/* Atmosphere */}
      <Sphere args={[5.2, 64, 64]}>
        <meshPhongMaterial
          color={0x93cfef}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Target Impact Marker */}
      <mesh position={targetPosition}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
      
      {/* Impact Ring Animation */}
      <mesh position={targetPosition}>
        <ringGeometry args={[0.2, 0.4, 32]} />
        <meshBasicMaterial 
          color={0xff0000} 
          transparent 
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Asteroid component
const Asteroid = ({ 
  isActive, 
  params, 
  targetPosition 
}: { 
  isActive: boolean; 
  params: any; 
  targetPosition: THREE.Vector3;
}) => {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState(new THREE.Vector3(50, 20, 30));
  const [progress, setProgress] = useState(0);

  const asteroidGeometry = useMemo(() => {
    // Create irregular asteroid shape
    const geometry = new THREE.SphereGeometry(0.3, 8, 6);
    const positions = geometry.attributes.position;
    
    // Randomize vertices for irregular shape
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      );
      vertex.multiplyScalar(0.8 + Math.random() * 0.4);
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Animate asteroid movement
  useFrame((state, delta) => {
    if (isActive && asteroidRef.current) {
      setProgress(prev => {
        const newProgress = prev + delta * 0.2;
        return newProgress > 1 ? 0 : newProgress;
      });

      // Interpolate position from start to target
      const startPos = new THREE.Vector3(50, 20, 30);
      const currentPos = startPos.clone().lerp(targetPosition, progress);
      
      asteroidRef.current.position.copy(currentPos);
      asteroidRef.current.rotation.x += 0.02;
      asteroidRef.current.rotation.z += 0.01;
    }
  });

  // Trajectory line
  const trajectoryPoints = useMemo(() => {
    const points = [];
    const start = new THREE.Vector3(50, 20, 30);
    const segments = 50;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = start.clone().lerp(targetPosition, t);
      points.push(point);
    }
    
    return points;
  }, [targetPosition]);

  return (
    <group>
      {/* Asteroid */}
      <mesh ref={asteroidRef} geometry={asteroidGeometry}>
        <meshPhongMaterial 
          color={0x654321}
          emissive={0x331100}
          shininess={30}
        />
      </mesh>
      
      {/* Trajectory Line */}
      <Line
        points={trajectoryPoints}
        color={0xff4444}
        lineWidth={2}
        dashed={true}
        dashScale={50}
        dashSize={3}
        gapSize={1}
      />
      
      {/* Asteroid Glow Effect */}
      {isActive && (
        <mesh position={asteroidRef.current?.position}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial 
            color={0xff4400}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// Main Scene Component
export const EarthScene: React.FC<EarthSceneProps> = ({ isActive, asteroidParams }) => {
  const targetPosition = useMemo(() => {
    const phi = (90 - asteroidParams.target.lat) * (Math.PI / 180);
    const theta = (asteroidParams.target.lng + 180) * (Math.PI / 180);
    const radius = 5.1;
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }, [asteroidParams.target]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [15, 5, 15],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Space Background */}
        <color attach="background" args={[0x000011]} />
        
        {/* Earth and Asteroid */}
        <Earth target={asteroidParams.target} />
        <Asteroid 
          isActive={isActive}
          params={asteroidParams}
          targetPosition={targetPosition}
        />
        
        {/* Stars Background */}
        <Stars />
        
        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={100}
          autoRotate={!isActive}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

// Stars component for background
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const starMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: false
    });
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef} geometry={starGeometry} material={starMaterial} />
  );
};