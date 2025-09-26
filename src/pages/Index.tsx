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
    <main 
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,17,0.7), rgba(0,0,17,0.9)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Hero Header */}
      <motion.header 
        className="relative z-50 p-6 lg:p-8"
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

      {/* Mission Brief */}
      <motion.section 
        className="absolute top-32 left-6 lg:left-8 z-40 max-w-md"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="space-glass p-6 rounded-2xl">
          <h2 className="mission-subtitle text-lg mb-3">Mission Objective</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Simulate real asteroid impacts on Earth. Zoom into any city to witness destruction patterns, 
            receive multilingual emergency alerts, and test NASA's DART deflection technology.
          </p>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="data-readout">REAL-TIME DATA ACTIVE</span>
          </div>
        </div>
      </motion.section>

      {/* 3D Earth Scene */}
      <div className="absolute inset-0">
        <EarthScene 
          isActive={isSimulationActive}
          asteroidParams={asteroidParams}
        />
      </div>

      {/* Mission Control Panel */}
      <motion.div 
        className="absolute bottom-6 left-6 right-6 z-40"
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

      {/* Alert System */}
      {showAlerts && (
        <AlertSystem
          targetCity="Cairo"
          impactTime={180} // 3 minutes
          language="ar"
          onDismiss={() => setShowAlerts(false)}
        />
      )}

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-space-deep/20 via-transparent to-space-deep/10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-deep/40 to-transparent" />
      </div>
    </main>
  );
};

export default Index;