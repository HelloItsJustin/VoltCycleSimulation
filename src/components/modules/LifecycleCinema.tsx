'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Stage = 'idle' | 'arrival' | 'scanning' | 'assembly' | 'sealing' | 'dispatch'

export default function LifecycleCinema() {
  const [stage, setStage] = useState<Stage>('idle')
  const [isPlaying, setIsPlaying] = useState(false)

  const handleInitiate = () => {
    if (isPlaying) return
    setIsPlaying(true)
    setStage('arrival')
    
    setTimeout(() => setStage('scanning'), 1500)
    setTimeout(() => setStage('assembly'), 4500)
    setTimeout(() => setStage('sealing'), 7500)
    setTimeout(() => setStage('dispatch'), 10000)
    setTimeout(() => {
      setStage('idle')
      setIsPlaying(false)
    }, 12500)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-5xl font-mono font-bold text-cyber-neon mb-3"
            animate={{ textShadow: ['0 0 20px rgba(0, 217, 255, 0.3)', '0 0 40px rgba(0, 217, 255, 0.8)', '0 0 20px rgba(0, 217, 255, 0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            LIFECYCLE CINEMA
          </motion.h2>
          <p className="text-cyber-blue/70 text-sm tracking-wider">
            Five-Stage Battery Recycling & Reflow Assembly Process
          </p>
        </motion.div>

        {/* Main Animation Canvas */}
        <div className="relative w-full h-[700px] bg-gradient-to-br from-cyber-dark/50 to-cyber-darker border-2 border-cyber-blue/30 rounded-xl overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(0deg, #00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Lighting effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyber-indigo/20 blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyber-blue/20 blur-3xl -z-10" />

          {/* Stage: Idle */}
          <AnimatePresence>
            {stage === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-8"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-6xl font-mono font-bold text-cyber-blue/40"
                >
                  READY
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Battery Arrival */}
          <AnimatePresence>
            {stage === 'arrival' && (
              <motion.div
                key="arrival"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Incoming battery from left */}
                <motion.div
                  initial={{ x: -200, y: 0, opacity: 0 }}
                  animate={{ x: 100, y: 0, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute top-1/2 -translate-y-1/2"
                >
                  <div className="flex items-center gap-6">
                    {/* Battery stack visualization */}
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <motion.div
                          key={idx}
                          animate={{ y: [0, -2, 0] }}
                          transition={{ delay: idx * 0.1, duration: 1.5, repeat: Infinity }}
                          className="w-16 h-6 bg-gradient-to-r from-cyber-indigo/60 to-cyber-blue/60 border-2 border-cyber-neon rounded-sm relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyber-neon/20 to-transparent rounded-sm" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Connection points indicator */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex flex-col gap-2"
                    >
                      {[1, 2].map((idx) => (
                        <div key={idx} className="w-3 h-3 rounded-full bg-cyber-neon" />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Processing station */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-dashed border-cyber-blue/40 rounded-lg flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-sm font-mono text-cyber-blue/60 mb-2">INTAKE STATION</div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 border-2 border-cyber-neon rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Status text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-mono text-cyber-neon text-center"
                >
                  Battery pack detected
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: AI Scanning */}
          <AnimatePresence>
            {stage === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Centered battery */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <motion.div
                        key={idx}
                        animate={stage === 'scanning' ? { x: [0, 30, 0] } : {}}
                        transition={{ delay: idx * 0.15, duration: 1.2, repeat: Infinity }}
                        className="w-20 h-8 bg-gradient-to-r from-cyber-indigo/70 to-cyber-blue/70 border-2 border-cyber-neon rounded-sm relative overflow-hidden"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-neon/40 to-transparent"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Scanning beams */}
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
                  {/* Top beam */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], y: [-60, 0, -60] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-cyber-neon/60 to-transparent"
                  />
                  {/* Bottom beam */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], y: [60, 0, 60] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-cyber-neon/60 to-transparent"
                  />
                  {/* Side beams */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], x: [-60, 0, -60] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.1 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-80 bg-gradient-to-b from-transparent via-cyber-indigo/60 to-transparent"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], x: [60, 0, 60] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-80 bg-gradient-to-b from-transparent via-cyber-indigo/60 to-transparent"
                  />
                </motion.div>

                {/* Scan readout */}
                <div className="absolute top-12 left-12 bg-cyber-dark/80 border border-cyber-neon/40 rounded-lg p-4 space-y-2 max-w-xs">
                  <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue">Scan Analysis</p>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="space-y-1 text-xs font-mono text-cyber-neon"
                  >
                    <p>SoH: 78.4%</p>
                    <p>Cells: 20/20 Viable</p>
                    <p>Grade: APPROVED</p>
                  </motion.div>
                </div>

                {/* Status text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-mono text-cyber-neon text-center"
                >
                  AI scanning in progress...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Assembly - Robotic Arms */}
          <AnimatePresence>
            {stage === 'assembly' && (
              <motion.div
                key="assembly"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Left robotic arm */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <svg width="200" height="300" viewBox="0 0 200 300" className="text-cyber-indigo">
                    <motion.line
                      x1="10" y1="150" x2="50" y2="100"
                      stroke="currentColor"
                      strokeWidth="4"
                      animate={{ rotate: [25, -25, 25] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="50" cy="100"
                      r="8"
                      fill="currentColor"
                      animate={{
                        x: [0, 40, 0],
                        y: [0, 30, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                </motion.div>

                {/* Right robotic arm */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 scale-x-[-1]"
                >
                  <svg width="200" height="300" viewBox="0 0 200 300" className="text-cyber-indigo">
                    <motion.line
                      x1="10" y1="150" x2="50" y2="100"
                      stroke="currentColor"
                      strokeWidth="4"
                      animate={{ rotate: [-25, 25, -25] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.circle
                      cx="50" cy="100"
                      r="8"
                      fill="currentColor"
                      animate={{
                        x: [0, -40, 0],
                        y: [0, -30, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>

                {/* Central workspace */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4"
                >
                  {/* Battery cells being transferred */}
                  {[1, 2, 3].map((idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        x: [0, 140, 280, 280],
                        y: [0, -80, -80, 0],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: idx * 0.5,
                        repeat: Infinity
                      }}
                      className="w-12 h-8 bg-gradient-to-r from-cyber-neon to-cyber-indigo rounded-md border border-cyber-neon"
                    />
                  ))}

                  {/* Reflow packet assembly area */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-40 h-48 border-2 border-dashed border-cyber-blue/50 rounded-lg flex items-end justify-center p-4"
                  >
                    <div className="space-y-2 w-full">
                      {[1, 2, 3].map((idx) => (
                        <div key={idx} className="w-full h-6 bg-cyber-indigo/40 rounded border border-cyber-neon/40" />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Status text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-mono text-cyber-neon text-center"
                >
                  Robotic assembly active
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Sealing */}
          <AnimatePresence>
            {stage === 'sealing' && (
              <motion.div
                key="sealing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Main package */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Reflow packet */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0px rgba(0, 217, 255, 0.3)',
                        '0 0 40px rgba(0, 217, 255, 0.8)',
                        '0 0 0px rgba(0, 217, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-48 h-56 border-3 border-cyber-neon rounded-xl bg-gradient-to-br from-cyber-indigo/30 to-cyber-blue/20 flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Sealing beam top */}
                    <motion.div
                      animate={{ width: ['0%', '100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-0 h-1 bg-gradient-to-r from-transparent via-cyber-neon to-transparent"
                    />

                    {/* Sealing beam bottom */}
                    <motion.div
                      animate={{ width: ['0%', '100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute bottom-0 h-1 bg-gradient-to-r from-transparent via-cyber-neon to-transparent"
                    />

                    {/* Contents */}
                    <div className="space-y-2 text-center">
                      <p className="text-sm font-mono text-cyber-neon uppercase tracking-wider">
                        REFLOW-PACK
                      </p>
                      <p className="text-xs font-mono text-cyber-blue/70">
                        Sealed &amp; Ready
                      </p>
                    </div>

                    {/* Lock indicators */}
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 right-4 w-6 h-6 border-2 border-cyber-neon rounded-full"
                    />
                  </motion.div>
                </motion.div>

                {/* Status indicators */}
                <div className="absolute top-12 right-12 space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyber-neon">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-cyber-neon"
                    />
                    <span>Seal 100%</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyber-neon">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-cyber-neon"
                    />
                    <span>Pressure OK</span>
                  </div>
                </div>

                {/* Status text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm font-mono text-cyber-neon text-center"
                >
                  Thermal sealing in progress
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Dispatch */}
          <AnimatePresence>
            {stage === 'dispatch' && (
              <motion.div
                key="dispatch"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Reflow packet leaving to right */}
                <motion.div
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 400, opacity: 0 }}
                  transition={{ duration: 2.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-56 border-3 border-cyber-neon rounded-xl bg-gradient-to-br from-cyber-indigo/40 to-cyber-blue/30 flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-sm font-mono text-cyber-neon uppercase tracking-wider">
                      READY FOR GRID
                    </p>
                  </div>
                </motion.div>

                {/* Energy output visualization */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute top-1/4 right-20 space-y-2"
                >
                  {[1, 2, 3, 4].map((idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        x: [0, 40, 80],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        delay: idx * 0.3,
                        duration: 1.5,
                        repeat: Infinity
                      }}
                      className="w-3 h-3 rounded-full bg-cyber-neon"
                    />
                  ))}
                </motion.div>

                {/* Power output gauge */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-cyber-dark/80 border border-cyber-neon/40 rounded-lg p-4 text-center"
                >
                  <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue mb-2">Energy Output</p>
                  <p className="text-lg font-mono text-cyber-neon">2.1kW</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Control Button */}
        <div className="flex justify-center pt-8">
          <motion.button
            onClick={handleInitiate}
            disabled={isPlaying}
            whileHover={{ scale: isPlaying ? 1 : 1.05 }}
            whileTap={{ scale: isPlaying ? 1 : 0.95 }}
            className={`px-12 py-4 font-mono uppercase text-sm tracking-wider border-2 rounded-lg transition-all font-bold ${
              isPlaying
                ? 'border-cyber-blue/30 text-cyber-blue/30 bg-transparent'
                : 'border-cyber-neon text-cyber-neon bg-cyber-neon/10 hover:bg-cyber-neon/20 shadow-lg'
            }`}
          >
            {isPlaying ? 'PROCESSING CYCLE' : 'START CYCLE'}
          </motion.button>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-4 gap-4 pt-8">
          <SpecMetric label="Cycle Time" value="12 Seconds" />
          <SpecMetric label="Throughput" value="40 Packs/Hour" />
          <SpecMetric label="Energy Output" value="2.1 kW" />
          <SpecMetric label="Success Rate" value="99.87%" />
        </div>
      </div>
    </div>
  )
}

function SpecMetric({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-cyber-dark/50 to-cyber-darker border border-cyber-blue/30 rounded-lg p-4 text-center"
    >
      <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60 mb-2">{label}</p>
      <p className="text-xl font-mono font-bold text-cyber-neon">{value}</p>
    </motion.div>
  )
}
