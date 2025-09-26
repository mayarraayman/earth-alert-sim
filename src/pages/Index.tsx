import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EarthScene } from '@/components/EarthScene';
import { MissionControl } from '@/components/MissionControl';
import { AlertSystem } from '@/components/AlertSystem';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import heroBackground from '@/assets/hero-space-background.jpg';
import oblivaraLogo from '@/assets/oblivara-logo.png';

const Index = () => {
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [asteroidParams, setAsteroidParams] = useState({
    size: 500, // meters
    speed: 20000, // m/s
    angle: 45, // degrees
    target: { lat: 30.0444, lng: 31.2357 } // Cairo coordinates
  });

  const startSimulation = () => {
    setIsSimulationActive(true);
    setTimeout(() => setShowAlerts(true), 2000); // Show alerts 2 seconds after start
  };

  const pauseSimulation = () => {
    setIsSimulationActive(false);
    setShowAlerts(false);
  };

  const resetSimulation = () => {
    setIsSimulationActive(false);
    setShowAlerts(false);
    // Reset asteroid params to default
    setAsteroidParams({
      size: 500,
      speed: 20000,
      angle: 45,
      target: { lat: 30.0444, lng: 31.2357 }
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-space-deep">
      {/* 3D Earth Scene - Base Layer */}
      <div className="absolute inset-0 z-0">
        <EarthScene 
          isActive={isSimulationActive}
          asteroidParams={asteroidParams}
        />
      </div>

      {/* Space Background Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-60"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply'
        }}
      />

      {/* UI Layer */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Hero Header */}
        <motion.header 
          className="p-4 lg:p-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={oblivaraLogo} 
                  alt="Oblivara Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="mission-title text-2xl lg:text-3xl">OBLIVARA</h1>
                <p className="control-label text-xs opacity-75">NASA Space Apps Challenge 2024</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={isSimulationActive ? pauseSimulation : startSimulation}
                variant="mission"
                className={`px-6 py-3 font-semibold ${isSimulationActive ? 'bg-warning' : ''}`}
              >
                {isSimulationActive ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause Mission
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Simulation
                  </>
                )}
              </Button>
              
              <Button
                onClick={resetSimulation}
                variant="space"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Mission Brief - Left Side */}
          <motion.section 
            className="absolute top-4 left-4 lg:left-6 max-w-sm z-30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="space-glass p-4 lg:p-6 rounded-2xl">
              <h2 className="mission-subtitle text-base lg:text-lg mb-3">Mission Objective</h2>
              <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed mb-4">
                Simulate real asteroid impacts on Earth. Zoom into any city to witness destruction patterns, 
                receive multilingual emergency alerts, and test NASA's DART deflection technology.
              </p>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="data-readout">REAL-TIME DATA ACTIVE</span>
              </div>
            </div>
          </motion.section>

          {/* Central 3D Viewing Area - This is where the Earth simulation shows */}
          <div className="absolute inset-x-0 top-0 bottom-32 lg:bottom-40 mx-4 lg:mx-6 mt-80 lg:mt-32 mb-4">
            {/* This area is intentionally transparent to show the 3D scene */}
          </div>
        </div>

        {/* Mission Control Panel - Bottom */}
        <motion.div 
          className="p-4 lg:p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MissionControl
            asteroidParams={asteroidParams}
            setAsteroidParams={setAsteroidParams}
            isActive={isSimulationActive}
          />
        </motion.div>
      </div>

      {/* Alert System - Top Layer */}
      {showAlerts && (
        <div className="z-50">
          <AlertSystem
            targetCity="Cairo"
            impactTime={180} // 3 minutes
            language="ar"
            onDismiss={() => setShowAlerts(false)}
          />
        </div>
      )}
    </main>
  );
};

export default Index;