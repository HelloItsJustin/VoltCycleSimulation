'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Stage = 'idle' | 'arrival' | 'liberation' | 'scanning' | 'assembly' | 'generation'
type PlaySpeed = 0.5 | 1 | 1.5 | 2

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

const STAGE_COLORS = {
  idle: { primary: '#00d9ff', accent: '#667eea', dark: '#0f3460' },
  arrival: { primary: '#00d9ff', accent: '#0ff', dark: '#051e3e' },
  liberation: { primary: '#ff6b35', accent: '#ff0055', dark: '#1a0e0e' },
  scanning: { primary: '#8b5cf6', accent: '#00d9ff', dark: '#1e1035' },
  assembly: { primary: '#00d9ff', accent: '#8b5cf6', dark: '#0a1f2e' },
  generation: { primary: '#00ff00', accent: '#00d9ff', dark: '#0a2e0a' }
}

const STAGE_METRICS = {
  arrival: [
    { label: 'Incoming Voltage', value: '48.2V', unit: 'V' },
    { label: 'Pack Weight', value: '15.4', unit: 'kg' },
    { label: 'Chemistry', value: 'LFP', unit: '' }
  ],
  liberation: [
    { label: 'Extracted Cells', value: '96', unit: 'units' },
    { label: 'Separation Rate', value: '99.8', unit: '%' },
    { label: 'Material Recovered', value: '94.2', unit: 'kg' }
  ],
  scanning: [
    { label: 'State of Health', value: '78.4', unit: '%' },
    { label: 'Grade', value: 'A', unit: '' },
    { label: 'Usable Cells', value: '94', unit: 'units' }
  ],
  assembly: [
    { label: 'Cells Assembled', value: '95', unit: 'units' },
    { label: 'Configuration', value: '7S/14P', unit: '' },
    { label: 'Target Capacity', value: '51.8', unit: 'kWh' }
  ],
  generation: [
    { label: 'Discharge Rate', value: '2.5', unit: 'kW' },
    { label: 'Energy Generated', value: '38.5', unit: 'kWh' },
    { label: 'CO2 Prevented', value: '2.4', unit: 'tons' }
  ]
}

function Battery3D({ stage, colors }: { stage: Stage; colors: typeof STAGE_COLORS.idle }) {
  return (
    <motion.div
      className="relative w-32 h-48"
      animate={{
        rotateY: stage === 'scanning' ? 360 : 0,
        scale: stage === 'liberation' ? 1.1 : 1
      }}
      transition={{ duration: stage === 'scanning' ? 3 : 0.6 }}
    >
      {/* Battery casing */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 overflow-hidden"
        style={{ borderColor: colors.primary }}
        animate={{
          boxShadow: [
            `0 0 20px ${colors.primary}40`,
            `0 0 40px ${colors.primary}80`,
            `0 0 20px ${colors.primary}40`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* 3D cell stack effect */}
        <div className="relative w-full h-full bg-gradient-to-br from-cyber-dark/80 to-cyber-darker/60 flex flex-col">
          {/* Individual cells */}
          {[1, 2, 3, 4, 5].map((idx) => (
            <motion.div
              key={idx}
              className="flex-1 border-t border-t-cyber-blue/30 bg-gradient-to-r from-cyber-indigo/40 to-cyber-blue/40 relative overflow-hidden"
              animate={
                stage === 'liberation'
                  ? {
                      x: Math.random() > 0.5 ? 100 : -100,
                      y: Math.random() * 200 - 100,
                      opacity: 0,
                      rotate: Math.random() * 360
                    }
                  : stage === 'assembly'
                  ? {
                      scale: [0.8, 1],
                      opacity: 1
                    }
                  : {}
              }
              transition={{
                delay: stage === 'liberation' ? idx * 0.1 : idx * 0.08,
                duration: stage === 'liberation' ? 1.2 : 0.6
              }}
            >
              {/* Cell detail */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-neon/20 to-transparent"
                animate={stage !== 'liberation' ? { x: ['-100%', '100%'] } : {}}
                transition={{ duration: 2, repeat: stage !== 'liberation' ? Infinity : 0 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Status glow */}
        {stage === 'scanning' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyber-neon/30 to-transparent rounded-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Heat visualization indicator */}
      {stage === 'liberation' && (
        <motion.div
          className="absolute -inset-4 rounded-xl border-2 border-dashed"
          style={{ borderColor: colors.accent, opacity: 0.6 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.2, 0.6]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}

function Particle({ particle, color }: { particle: Particle; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: particle.size,
        height: particle.size,
        background: color,
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        opacity: particle.opacity,
        boxShadow: `0 0 ${particle.size * 2}px ${color}`
      }}
      animate={{
        x: particle.vx * 120,
        y: particle.vy * 120,
        opacity: 0
      }}
      transition={{ duration: 2.5, ease: 'easeOut' }}
    />
  )
}

function DataOverlay({ metrics }: { metrics: (typeof STAGE_METRICS)[Exclude<Stage, 'idle'>] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="absolute top-8 right-8 bg-gradient-to-br from-cyber-dark/90 to-cyber-darker/80 border border-cyber-neon/40 rounded-lg p-4 space-y-3 max-w-sm backdrop-blur-sm"
    >
      <div className="text-xs font-mono uppercase tracking-widest text-cyber-neon">Live Metrics</div>
      <div className="space-y-3">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex justify-between items-end gap-4"
          >
            <span className="text-xs text-cyber-blue/70">{metric.label}</span>
            <motion.div
              className="text-sm font-mono text-cyber-neon"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
            >
              {metric.value}
              <span className="text-cyber-blue/60 ml-1">{metric.unit}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ProgressBar({ stage, totalStages }: { stage: Stage; totalStages: number }) {
  const stages: Stage[] = ['arrival', 'liberation', 'scanning', 'assembly', 'generation']
  const currentIndex = stages.indexOf(stage)
  const progress = (currentIndex + 1) / totalStages

  return (
    <motion.div className="absolute bottom-8 left-8 right-8 space-y-3">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-cyber-neon uppercase tracking-wider">{stage}</span>
        <motion.span
          className="text-cyber-blue/60"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.round(progress * 100)}%
        </motion.span>
      </div>
      <div className="w-full h-2 bg-cyber-dark/60 rounded-full border border-cyber-blue/30 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-neon to-cyber-blue rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

export default function LifecycleCinema() {
  const [stage, setStage] = useState<Stage>('idle')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState<PlaySpeed>(1)
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const currentColors = STAGE_COLORS[stage]
  const currentMetrics = stage !== 'idle' ? STAGE_METRICS[stage as Exclude<Stage, 'idle'>] : ([] as unknown as (typeof STAGE_METRICS)[Exclude<Stage, 'idle'>])

  const stageSequence = [
    { name: 'arrival' as Stage, duration: 1500 / speed },
    { name: 'liberation' as Stage, duration: 3000 / speed },
    { name: 'scanning' as Stage, duration: 3000 / speed },
    { name: 'assembly' as Stage, duration: 2500 / speed },
    { name: 'generation' as Stage, duration: 2500 / speed }
  ]

  const handleInitiate = () => {
    if (isPlaying) return
    setIsPlaying(true)
    setStage('arrival')

    let timeOffset = 0
    stageSequence.forEach(({ name, duration }) => {
      setTimeout(() => {
        setStage(name)
        if (name === 'liberation') {
          generateParticles()
        }
      }, timeOffset)
      timeOffset += duration
    })

    setTimeout(() => {
      setStage('idle')
      setIsPlaying(false)
    }, timeOffset)
  }

  const generateParticles = () => {
    const newParticles: Particle[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 50,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() - 0.5,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.8 + 0.2
    }))
    setParticles(newParticles)
  }

  const handleSpeedChange = (newSpeed: PlaySpeed) => {
    setSpeed(newSpeed)
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
        <div
          ref={containerRef}
          className="relative w-full h-[700px] bg-gradient-to-br from-cyber-dark/50 to-cyber-darker border-2 rounded-xl overflow-hidden"
          style={{
            borderColor: currentColors.primary,
            boxShadow: `0 0 40px ${currentColors.primary}40, inset 0 0 60px ${currentColors.primary}20`
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `linear-gradient(135deg, ${currentColors.dark}00 0%, ${currentColors.primary}10 50%, ${currentColors.dark}00 100%)`,
                `linear-gradient(135deg, ${currentColors.dark}00 0%, ${currentColors.accent}10 50%, ${currentColors.dark}00 100%)`
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Grid background */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(0deg, #00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Lighting effects - Dynamic colors */}
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl -z-10"
            animate={{
              background: [
                `radial-gradient(circle, ${currentColors.accent}40 0%, transparent 70%)`,
                `radial-gradient(circle, ${currentColors.primary}40 0%, transparent 70%)`
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl -z-10"
            animate={{
              background: [
                `radial-gradient(circle, ${currentColors.primary}40 0%, transparent 70%)`,
                `radial-gradient(circle, ${currentColors.accent}40 0%, transparent 70%)`
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

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
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-6xl font-mono font-bold text-cyber-blue/40"
                >
                  READY
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs font-mono text-cyber-neon/60 uppercase tracking-wider"
                >
                  Click play to begin lifecycle simulation
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Arrival */}
          <AnimatePresence>
            {stage === 'arrival' && (
              <motion.div
                key="arrival"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Incoming battery from left */}
                <motion.div
                  initial={{ x: -400, y: 0, opacity: 0, rotateZ: -45 }}
                  animate={{ x: 0, y: 0, opacity: 1, rotateZ: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute left-12"
                >
                  <Battery3D stage="arrival" colors={currentColors} />
                  {/* Motion trail */}
                  <motion.div
                    className="absolute inset-0 border-2 border-dashed rounded-xl"
                    style={{ borderColor: currentColors.primary }}
                    animate={{
                      scale: [1, 1.2],
                      opacity: [1, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>

                {/* Logistics icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-12 left-12"
                >
                  <div className="text-5xl opacity-40">🚚</div>
                </motion.div>

                {/* Receiving station */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute right-12 w-40 h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center"
                  style={{ borderColor: currentColors.accent, opacity: 0.4 }}
                >
                  <div className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60 text-center">
                    Intake
                    <br />
                    Station
                  </div>
                </motion.div>

                {/* Data transfer visual */}
                <motion.div
                  className="absolute left-96 top-1/2 h-1 -translate-y-1/2"
                  style={{
                    width: 300,
                    background: `linear-gradient(90deg, transparent, ${currentColors.primary}, transparent)`
                  }}
                  animate={{
                    x: [0, 100],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Liberation */}
          <AnimatePresence>
            {stage === 'liberation' && (
              <motion.div
                key="liberation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Exploding battery */}
                <Battery3D stage="liberation" colors={currentColors} />

                {/* Particle effects */}
                {particles.map((particle) => (
                  <Particle key={particle.id} particle={particle} color={currentColors.accent} />
                ))}

                {/* Heat waves */}
                <motion.div
                  className="absolute inset-1/3 border-2 border-dashed rounded-full"
                  style={{ borderColor: currentColors.accent }}
                  animate={{
                    scale: [1, 1.4],
                    opacity: [1, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-1/4 border-2 border-dashed rounded-full"
                  style={{ borderColor: currentColors.primary, opacity: 0.6 }}
                  animate={{
                    scale: [1.2, 1.8],
                    opacity: [0.6, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />

                {/* Extraction readout */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-20"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl font-mono font-bold"
                      style={{ color: currentColors.primary }}
                    >
                      LIBERATION COMPLETE
                    </motion.div>
                    <div className="text-sm text-cyber-blue/60 mt-2">Material Separation Complete</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Scanning */}
          <AnimatePresence>
            {stage === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Rotating battery */}
                <Battery3D stage="scanning" colors={currentColors} />

                {/* Holographic scanner rings */}
                {[1, 2, 3].map((idx) => (
                  <motion.div
                    key={`ring-${idx}`}
                    className="absolute rounded-full border-2"
                    style={{
                      width: 200 + idx * 80,
                      height: 200 + idx * 80,
                      borderColor: currentColors.primary,
                      opacity: 0.4
                    }}
                    animate={{
                      rotate: idx % 2 === 0 ? 360 : -360,
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 3 + idx * 0.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                ))}

                {/* Scanner beams */}
                {[0, 90, 180, 270].map((angle) => (
                  <motion.div
                    key={`beam-${angle}`}
                    className="absolute w-64 h-1 origin-center"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${currentColors.accent}, transparent)`,
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: angle * 0.15
                    }}
                  />
                ))}

                {/* Gradient overlay for scanning effect */}
                <motion.div
                  className="absolute inset-0 bg-radial-gradient pointer-events-none"
                  animate={{
                    background: [
                      `radial-gradient(circle at 50% 50%, ${currentColors.primary}20 0%, transparent 60%)`,
                      `radial-gradient(circle at 50% 50%, ${currentColors.accent}20 0%, transparent 60%)`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Scan result display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-20 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-2xl font-mono font-bold"
                    style={{ color: currentColors.primary }}
                  >
                    GRADE A APPROVED
                  </motion.div>
                  <div className="text-xs text-cyber-blue/60 mt-2">AI Classification Complete</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Assembly */}
          <AnimatePresence>
            {stage === 'assembly' && (
              <motion.div
                key="assembly"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Left robotic arm */}
                <motion.svg
                  width="250"
                  height="300"
                  viewBox="0 0 250 300"
                  className="absolute left-8 top-1/2 -translate-y-1/2"
                  animate={{ rotate: 0 }}
                >
                  <motion.line
                    x1="20"
                    y1="150"
                    x2="100"
                    y2="80"
                    stroke={currentColors.primary}
                    strokeWidth="6"
                    strokeLinecap="round"
                    animate={{ rotate: [15, -15, 15] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.line
                    x1="100"
                    y1="80"
                    x2="140"
                    y2="40"
                    stroke={currentColors.accent}
                    strokeWidth="5"
                    strokeLinecap="round"
                    animate={{ rotate: [-20, 20, -20] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="140"
                    cy="40"
                    r="12"
                    fill={currentColors.primary}
                    animate={{
                      r: [12, 16, 12]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.svg>

                {/* Assembling battery */}
                <Battery3D stage="assembly" colors={currentColors} />

                {/* Right robotic arm (mirrored) */}
                <motion.svg
                  width="250"
                  height="300"
                  viewBox="0 0 250 300"
                  className="absolute right-8 top-1/2 -translate-y-1/2 scale-x-[-1]"
                  animate={{ rotate: 0 }}
                >
                  <motion.line
                    x1="20"
                    y1="150"
                    x2="100"
                    y2="80"
                    stroke={currentColors.primary}
                    strokeWidth="6"
                    strokeLinecap="round"
                    animate={{ rotate: [-15, 15, -15] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.line
                    x1="100"
                    y1="80"
                    x2="140"
                    y2="40"
                    stroke={currentColors.accent}
                    strokeWidth="5"
                    strokeLinecap="round"
                    animate={{ rotate: [20, -20, 20] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.circle
                    cx="140"
                    cy="40"
                    r="12"
                    fill={currentColors.primary}
                    animate={{
                      r: [12, 16, 12]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  />
                </motion.svg>

                {/* Assembly status */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-20"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl font-mono font-bold"
                      style={{ color: currentColors.primary }}
                    >
                      REFLOW ASSEMBLY
                    </motion.div>
                    <div className="text-xs text-cyber-blue/60 mt-2">Robotic Bonding in Progress</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage: Generation */}
          <AnimatePresence>
            {stage === 'generation' && (
              <motion.div
                key="generation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* New battery spinning into view */}
                <motion.div
                  initial={{ x: 400, y: 0, opacity: 0, rotateY: 180 }}
                  animate={{ x: 0, y: 0, opacity: 1, rotateY: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  <Battery3D stage="generation" colors={currentColors} />
                </motion.div>

                {/* Power discharge rays */}
                {Array.from({ length: 12 }).map((_, idx) => (
                  <motion.div
                    key={`ray-${idx}`}
                    className="absolute w-32 h-1 origin-center"
                    style={{
                      background: `linear-gradient(90deg, ${currentColors.primary}, transparent)`,
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${idx * 30}deg)`,
                      opacity: 0.6
                    }}
                    animate={{
                      scaleX: [1, 1.5],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: idx * 0.1
                    }}
                  />
                ))}

                {/* Success message */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-20 text-center space-y-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-3xl font-mono font-bold"
                    style={{ color: currentColors.primary }}
                  >
                    GENERATION ACTIVE
                  </motion.div>
                  <div className="text-sm text-cyber-blue/60">Renewable Energy Output Begins</div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-xs font-mono"
                    style={{ color: currentColors.accent }}
                  >
                    📊 2.4 tons CO2 prevented
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Data Overlay */}
          <AnimatePresence mode="wait">
            {stage !== 'idle' && (
              <DataOverlay metrics={currentMetrics as (typeof STAGE_METRICS)[Exclude<Stage, 'idle'>]} />
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <AnimatePresence>
            {isPlaying && (
              <ProgressBar stage={stage} totalStages={5} />
            )}
          </AnimatePresence>
        </div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-6 items-center"
        >
          {/* Main Play Button */}
          <motion.button
            onClick={handleInitiate}
            disabled={isPlaying}
            whileHover={{ scale: isPlaying ? 1 : 1.08 }}
            whileTap={{ scale: isPlaying ? 1 : 0.92 }}
            className={`px-16 py-4 font-mono uppercase text-lg tracking-widest rounded-lg border-2 transition-all ${
              isPlaying
                ? 'border-cyber-blue/40 text-cyber-blue/40 bg-transparent cursor-not-allowed'
                : 'border-cyber-neon text-cyber-neon bg-cyber-neon/10 hover:bg-cyber-neon/20 shadow-lg'
            }`}
          >
            {isPlaying ? 'RUNNING...' : 'PLAY SIMULATION'}
          </motion.button>

          {/* Speed Controls */}
          <div className="flex gap-3">
            <span className="text-xs font-mono text-cyber-blue/60 uppercase tracking-wider self-center">Speed:</span>
            {([0.5, 1, 1.5, 2] as const).map((s) => (
              <motion.button
                key={s}
                onClick={() => handleSpeedChange(s)}
                disabled={isPlaying}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                  speed === s
                    ? 'border-cyber-neon text-cyber-neon bg-cyber-neon/20'
                    : 'border-cyber-blue/40 text-cyber-blue/60 hover:border-cyber-blue/70'
                }`}
              >
                {s}x
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
