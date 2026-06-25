import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, Sparkles, ChefHat } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
  key?: string;
}

const BAKING_PHASES = [
  { progress: 15, text: "Preheating virtual brick ovens..." },
  { progress: 40, text: "Sifting organic single-origin flour..." },
  { progress: 65, text: "Folding heritage velvet batter..." },
  { progress: 85, text: "Piping artisanal gourmet frosting..." },
  { progress: 100, text: "Applying delicate edible gold leaf..." }
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Elegant progression interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600); // Wait for exit animation
          }, 400);
          return 100;
        }

        // Variable speed progression
        const increment = Math.floor(Math.random() * 8) + 4;
        const nextProgress = Math.min(prev + increment, 100);

        // Update baking phase message based on progress
        let currentPhaseIndex = 0;
        for (let i = BAKING_PHASES.length - 1; i >= 0; i--) {
          if (nextProgress >= BAKING_PHASES[i].progress) {
            currentPhaseIndex = i;
            break;
          }
        }
        setPhaseIndex(currentPhaseIndex);

        return nextProgress;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 bg-surface-deep flex flex-col items-center justify-center p-6 text-on-surface"
        >
          {/* Ambient Glowing Background Spot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

          {/* Luxury Box/Container */}
          <div className="relative max-w-sm w-full flex flex-col items-center text-center space-y-8">
            
            {/* Animated Pastry Icon Stack */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.05, 1], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="relative w-24 h-24 flex items-center justify-center"
            >
              {/* Outer decorative luxury ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-outline/10 fill-none"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-primary fill-none"
                  strokeWidth="3.5"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * progress) / 100}
                  strokeLinecap="round"
                  transition={{ ease: "easeInOut" }}
                />
              </svg>

              {/* Inside Icon changing with phase or pulsing */}
              <div className="relative w-16 h-16 bg-surface-alt/60 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/20 shadow-lg">
                <AnimatePresence mode="wait">
                  {progress < 50 ? (
                    <motion.div
                      key="hat"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChefHat className="w-7 h-7 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cake"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <Cake className="w-7 h-7 text-primary" />
                      <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-primary animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Typography */}
            <div className="space-y-2">
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-3xl font-bold tracking-tight text-on-surface"
              >
                Sons Bakery
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                transition={{ delay: 0.35 }}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-primary"
              >
                Bespoke Sugar Artistry
              </motion.p>
            </div>

            {/* Dynamic Baking Messages */}
            <div className="w-full h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={phaseIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="font-sans text-xs text-on-surface-variant font-light tracking-wide italic"
                >
                  {BAKING_PHASES[phaseIndex]?.text || "Creating masterpiece..."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress Percentage Counter */}
            <div className="flex flex-col items-center space-y-1.5 w-44">
              <span className="font-mono text-sm font-semibold text-primary">
                {progress}%
              </span>
              <div className="w-full h-1 bg-outline/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
