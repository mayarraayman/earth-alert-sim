import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Volume2, 
  X, 
  MapPin, 
  Clock, 
  Users, 
  Shield 
} from 'lucide-react';

interface AlertSystemProps {
  targetCity: string;
  impactTime: number; // seconds
  language: string;
  onDismiss: () => void;
}

interface AlertTranslation {
  [key: string]: {
    title: string;
    warning: string;
    evacuation: string;
    timeRemaining: string;
    affectedPopulation: string;
    evacuationRoute: string;
    stayCalm: string;
    flag: string;
    soundFile: string;
  };
}

const alertTranslations: AlertTranslation = {
  ar: {
    title: "تحذير اصطدام كويكب",
    warning: "كويكب متجه نحو القاهرة",
    evacuation: "غادر المنطقة فوراً",
    timeRemaining: "الوقت المتبقي",
    affectedPopulation: "السكان المعرضون للخطر",
    evacuationRoute: "اتبع طرق الإخلاء المحددة",
    stayCalm: "ابق هادئاً واتبع التعليمات",
    flag: "🇪🇬",
    soundFile: "/alert-arabic.mp3"
  },
  es: {
    title: "Alerta de Impacto de Asteroide",
    warning: "Asteroide dirigiéndose hacia Ciudad de México",
    evacuation: "Evacúe la zona inmediatamente",
    timeRemaining: "Tiempo restante",
    affectedPopulation: "Población en riesgo",
    evacuationRoute: "Siga las rutas de evacuación designadas",
    stayCalm: "Mantenga la calma y siga las instrucciones",
    flag: "🇲🇽",
    soundFile: "/alert-spanish.mp3"
  },
  ja: {
    title: "小惑星衝突警報",
    warning: "小惑星が東京に向かっています",
    evacuation: "直ちに避難してください",
    timeRemaining: "残り時間",
    affectedPopulation: "危険にさらされている人口",
    evacuationRoute: "指定された避難ルートに従ってください",
    stayCalm: "冷静になって指示に従ってください",
    flag: "🇯🇵",
    soundFile: "/alert-japanese.mp3"
  },
  en: {
    title: "Asteroid Impact Alert",
    warning: "Asteroid heading toward New York",
    evacuation: "Evacuate area immediately",
    timeRemaining: "Time remaining",
    affectedPopulation: "Population at risk",
    evacuationRoute: "Follow designated evacuation routes",
    stayCalm: "Stay calm and follow instructions",
    flag: "🇺🇸",
    soundFile: "/alert-english.mp3"
  }
};

export const AlertSystem: React.FC<AlertSystemProps> = ({
  targetCity,
  impactTime,
  language,
  onDismiss
}) => {
  const [timeLeft, setTimeLeft] = useState(impactTime);
  const [isVisible, setIsVisible] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);

  const translation = alertTranslations[language] || alertTranslations.en;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Play alert sound
  useEffect(() => {
    if (!soundPlayed) {
      // In a real implementation, you would load and play the actual audio file
      // For now, we'll simulate with a beep sound
      playAlertSound();
      setSoundPlayed(true);
    }
  }, [soundPlayed]);

  const playAlertSound = () => {
    // Simulate alert sound with Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.5);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-destructive/20 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Alert Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="alert-button border-2 border-destructive/50 shadow-destructive-glow">
              <div className="p-6 relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-destructive-foreground/70 hover:text-destructive-foreground"
                  onClick={handleDismiss}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Alert Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{translation.flag}</span>
                      <Badge variant="destructive" className="pulse-alert">
                        EMERGENCY ALERT
                      </Badge>
                    </div>
                    <h2 className="mission-subtitle text-xl text-destructive">
                      {translation.title}
                    </h2>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="space-glass"
                    onClick={playAlertSound}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Alert Content */}
                <div className="space-y-4 mb-6">
                  <div className="text-lg font-semibold text-destructive">
                    {translation.warning}
                  </div>
                  
                  <div className="text-xl font-bold text-destructive animate-pulse">
                    ⚠️ {translation.evacuation}
                  </div>

                  {/* Time and Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-4 space-glass rounded-lg border border-destructive/30">
                      <Clock className="w-6 h-6 text-destructive mx-auto mb-2" />
                      <div className="data-readout text-2xl font-bold text-destructive">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {translation.timeRemaining}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 space-glass rounded-lg border border-warning/30">
                      <Users className="w-6 h-6 text-warning mx-auto mb-2" />
                      <div className="data-readout text-2xl font-bold text-warning">2.3M</div>
                      <div className="text-xs text-muted-foreground">
                        {translation.affectedPopulation}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 space-glass rounded-lg border border-primary/30">
                      <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="data-readout text-2xl font-bold text-primary">15km</div>
                      <div className="text-xs text-muted-foreground">Blast Radius</div>
                    </div>
                    
                    <div className="text-center p-4 space-glass rounded-lg border border-success/30">
                      <Shield className="w-6 h-6 text-success mx-auto mb-2" />
                      <div className="data-readout text-2xl font-bold text-success">73%</div>
                      <div className="text-xs text-muted-foreground">DART Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 animate-pulse"></div>
                    <span>{translation.evacuationRoute}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 animate-pulse"></div>
                    <span>{translation.stayCalm}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                <Button className="flex-1" variant="alert">
                  <Shield className="w-4 h-4 mr-2" />
                  Activate DART Defense
                </Button>
                <Button 
                  variant="space"
                  onClick={handleDismiss}
                >
                  Acknowledge
                </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};