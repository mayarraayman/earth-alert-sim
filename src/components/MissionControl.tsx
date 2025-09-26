import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  Globe, 
  AlertTriangle, 
  Shield,
  Gauge,
  MapPin
} from 'lucide-react';

interface MissionControlProps {
  asteroidParams: {
    size: number;
    speed: number;
    angle: number;
    target: { lat: number; lng: number };
  };
  setAsteroidParams: React.Dispatch<React.SetStateAction<any>>;
  isActive: boolean;
}

export const MissionControl: React.FC<MissionControlProps> = ({
  asteroidParams,
  setAsteroidParams,
  isActive
}) => {
  // Calculate impact energy (simplified)
  const kineticEnergy = (0.5 * (asteroidParams.size ** 3) * (asteroidParams.speed ** 2)) / 1e15;
  const impactRadius = Math.sqrt(kineticEnergy) * 10; // km
  const economicDamage = kineticEnergy * 50; // Billions USD

  const updateParameter = (param: string, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setAsteroidParams(prev => ({
      ...prev,
      [param]: newValue
    }));
  };

  const presetTargets = [
    { name: "Cairo", lat: 30.0444, lng: 31.2357, flag: "🇪🇬" },
    { name: "New York", lat: 40.7128, lng: -74.0060, flag: "🇺🇸" },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503, flag: "🇯🇵" },
    { name: "London", lat: 51.5074, lng: -0.1278, flag: "🇬🇧" },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777, flag: "🇮🇳" }
  ];

  const selectTarget = (target: { lat: number; lng: number }) => {
    setAsteroidParams(prev => ({
      ...prev,
      target
    }));
  };

  return (
    <div className="space-glass rounded-2xl border border-card-border/30 backdrop-blur-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-nasa-white" />
            </div>
            <h3 className="mission-subtitle text-lg">Mission Control</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={isActive ? "destructive" : "secondary"} className="pulse-alert">
              {isActive ? "SIMULATION ACTIVE" : "STANDBY"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asteroid Parameters */}
          <Card className="space-glass border-card-border/20 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-4 h-4 text-accent" />
              <span className="control-label">Asteroid Parameters</span>
            </div>
            
            <div className="space-y-4">
              {/* Size Control */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Diameter: {asteroidParams.size}m
                </label>
                <Slider
                  value={[asteroidParams.size]}
                  onValueChange={(value) => updateParameter('size', value)}
                  max={2000}
                  min={10}
                  step={10}
                  className="w-full"
                  disabled={isActive}
                />
              </div>

              {/* Speed Control */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Velocity: {asteroidParams.speed.toLocaleString()} m/s
                </label>
                <Slider
                  value={[asteroidParams.speed]}
                  onValueChange={(value) => updateParameter('speed', value)}
                  max={50000}
                  min={5000}
                  step={1000}
                  className="w-full"
                  disabled={isActive}
                />
              </div>

              {/* Angle Control */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">
                  Impact Angle: {asteroidParams.angle}°
                </label>
                <Slider
                  value={[asteroidParams.angle]}
                  onValueChange={(value) => updateParameter('angle', value)}
                  max={90}
                  min={15}
                  step={5}
                  className="w-full"
                  disabled={isActive}
                />
              </div>
            </div>
          </Card>

          {/* Target Selection */}
          <Card className="space-glass border-card-border/20 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-4 h-4 text-destructive" />
              <span className="control-label">Impact Target</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presetTargets.map((target) => (
                <Button
                  key={target.name}
                  variant="space"
                  size="sm"
                  className="text-xs justify-start"
                  onClick={() => selectTarget({ lat: target.lat, lng: target.lng })}
                  disabled={isActive}
                >
                  <span className="mr-1">{target.flag}</span>
                  {target.name}
                </Button>
              ))}
            </div>
            
            <div className="text-xs text-muted-foreground">
              <div>Lat: {asteroidParams.target.lat.toFixed(4)}°</div>
              <div>Lng: {asteroidParams.target.lng.toFixed(4)}°</div>
            </div>
          </Card>

          {/* Impact Analysis */}
          <Card className="space-glass border-card-border/20 p-4">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="control-label">Impact Analysis</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Kinetic Energy:</span>
                <span className="data-readout text-sm">{kineticEnergy.toFixed(2)} PT</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Blast Radius:</span>
                <span className="data-readout text-sm text-destructive">{impactRadius.toFixed(1)} km</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Est. Damage:</span>
                <span className="data-readout text-sm text-destructive">${economicDamage.toFixed(0)}B</span>
              </div>
              
              <div className="mt-4 pt-3 border-t border-card-border/20">
                <Button 
                  size="sm" 
                  variant="success"
                  className="w-full"
                  disabled={isActive}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Deploy DART Mission
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Readouts */}
        <motion.div 
          className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center p-3 space-glass rounded-lg">
            <Globe className="w-6 h-6 text-primary mx-auto mb-1" />
            <div className="data-readout text-lg font-bold">12.7</div>
            <div className="text-xs text-muted-foreground">Richter Scale</div>
          </div>
          
          <div className="text-center p-3 space-glass rounded-lg">
            <Gauge className="w-6 h-6 text-accent mx-auto mb-1" />
            <div className="data-readout text-lg font-bold">847°C</div>
            <div className="text-xs text-muted-foreground">Fireball Temp</div>
          </div>
          
          <div className="text-center p-3 space-glass rounded-lg">
            <Target className="w-6 h-6 text-destructive mx-auto mb-1" />
            <div className="data-readout text-lg font-bold">2.3M</div>
            <div className="text-xs text-muted-foreground">People at Risk</div>
          </div>
          
          <div className="text-center p-3 space-glass rounded-lg">
            <Shield className="w-6 h-6 text-success mx-auto mb-1" />
            <div className="data-readout text-lg font-bold">73%</div>
            <div className="text-xs text-muted-foreground">DART Success</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};