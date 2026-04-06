'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type HardwareComponent = 'bms' | 'pcs' | 'cells' | 'hv' | 'thermal' | 'iot'

interface ComponentSpec {
  id: HardwareComponent
  name: string
  label: string
  description: string
  specs: string[]
  angle: number
  radius: number
  color: string
}

const components: ComponentSpec[] = [
  {
    id: 'bms',
    name: 'Active Balancing BMS',
    label: 'THE BRAIN',
    description: 'Proprietary multi-degradation balancing. Equalizes voltage between heterogeneous cells to prevent thermal runaway.',
    specs: [
      'Multi-degradation algorithm',
      'Heterogeneous cell balancing',
      'Thermal runaway prevention',
      'Real-time voltage equalization'
    ],
    angle: 0,
    radius: 0,
    color: '#8b5cf6'
  },
  {
    id: 'pcs',
    name: 'Power Conversion System',
    label: 'PCS',
    description: 'Bi-directional 50Hz AC Output. Integrated Hybrid Inverter for grid-synchronous discharge.',
    specs: [
      'Bi-directional AC output',
      '50Hz synchronization',
      'Hybrid inverter topology',
      'Grid-synchronous discharge'
    ],
    angle: 0,
    radius: 280,
    color: '#00d9ff'
  },
  {
    id: 'cells',
    name: 'Cell Stack',
    label: 'ENERGY CORE',
    description: 'Grade-B Repurposed LFP/NMC Cells. 75% original capacity. Configured in 7S/5P modular blocks.',
    specs: [
      'Grade-B repurposed cells',
      '75% retained capacity',
      'LFP/NMC chemistry',
      '7S/5P module configuration'
    ],
    angle: 60,
    radius: 280,
    color: '#00d9ff'
  },
  {
    id: 'hv',
    name: 'HV Safety System',
    label: 'SAFETY CONTROLLER',
    description: 'High-Voltage DC Fuses and Pre-charge Resistors. Automated contactors for emergency isolation.',
    specs: [
      'DC fuse protection',
      'Pre-charge resistors',
      'Automated contactors',
      'Emergency isolation system'
    ],
    angle: 120,
    radius: 280,
    color: '#ff0055'
  },
  {
    id: 'thermal',
    name: 'Thermal Management Hub',
    label: 'COOLING SYSTEM',
    description: 'NTC thermistor grid for individual cell monitoring. Integrated fire-suppressant gas modules.',
    specs: [
      'NTC thermistor grid',
      'Individual cell monitoring',
      'Fire-suppressant modules',
      'Thermal distribution network'
    ],
    angle: 180,
    radius: 280,
    color: '#00d9ff'
  },
  {
    id: 'iot',
    name: 'IoT Gateway',
    label: 'CLOUD BRIDGE',
    description: 'LTE/GSM module for real-time SoH cloud-streaming (The SaaS Backbone).',
    specs: [
      'LTE/GSM connectivity',
      'Real-time SoH streaming',
      'Cloud integration',
      'Remote monitoring capability'
    ],
    angle: 240,
    radius: 280,
    color: '#00d9ff'
  }
]

export default function ReflowPackExplodedView() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<HardwareComponent>('bms')
  const [hoveredComponent, setHoveredComponent] = useState<HardwareComponent | null>(null)

  const getPeripheralComponents = () => components.filter(c => c.id !== 'bms')
  const selectedComponentData = components.find(c => c.id === selectedComponent)

  const calculatePosition = (angle: number, radius: number, expand: boolean) => {
    const actualRadius = expand ? radius : 0
    const radians = (angle * Math.PI) / 180
    const x = Math.cos(radians) * actualRadius
    const y = Math.sin(radians) * actualRadius
    return { x, y }
  }

  const getComponentPixelPosition = (angle: number, radius: number, expand: boolean, canvasWidth: number, canvasHeight: number) => {
    const pos = calculatePosition(angle, radius, expand)
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    return {
      x: centerX + pos.x,
      y: centerY + pos.y
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-mono font-bold text-cyber-neon mb-2">
            HARDWARE ARCHITECTURE
          </h2>
          <p className="text-cyber-blue/70 text-sm">
            {isExpanded ? 'Reflow-Pack Dissected | Click Components to Explore' : 'Reflow-Pack System | Click to Dissect'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Visualization */}
          <div className="col-span-2">
            <div className="relative w-full h-[700px] bg-gradient-to-br from-cyber-dark/70 to-cyber-darker border border-cyber-blue/20 rounded-lg overflow-hidden">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(0deg, #00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
              </div>

              {/* Radial gradient */}
              <div className="absolute inset-0 bg-radial-gradient" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)`
              }} />

              {/* SVG Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connecting lines from brain to peripherals */}
                <AnimatePresence>
                  {isExpanded && getPeripheralComponents().map((comp) => {
                    const startPos = getComponentPixelPosition(0, 0, true, 800, 700) // Brain center
                    const endPos = getComponentPixelPosition(comp.angle, comp.radius, true, 800, 700)
                    
                    return (
                      <line
                        key={`line-${comp.id}`}
                        x1={startPos.x}
                        y1={startPos.y}
                        x2={endPos.x}
                        y2={endPos.y}
                        stroke={hoveredComponent === comp.id ? comp.color : '#1a7a8a'}
                        strokeWidth={hoveredComponent === comp.id ? '2' : '1'}
                        opacity={hoveredComponent === comp.id ? 0.8 : 0.3}
                        filter="url(#glow)"
                      />
                    )
                  })}
                </AnimatePresence>
              </svg>

              {/* Central Brain (BMS) */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: isExpanded ? 1.1 : [1, 1.03, 1]
                }}
                transition={{
                  scale: isExpanded
                    ? { duration: 0.6, ease: 'easeOut' }
                    : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <motion.button
                  onClick={() => {
                    setIsExpanded(!isExpanded)
                    setSelectedComponent('bms')
                  }}
                  onMouseEnter={() => setHoveredComponent('bms')}
                  onMouseLeave={() => setHoveredComponent(null)}
                  className="relative w-32 h-32 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-purple-500/40"
                    animate={{
                      boxShadow: isExpanded
                        ? '0 0 60px #8b5cf6, 0 0 120px #8b5cf6AA'
                        : '0 0 40px #8b5cf6, 0 0 80px #8b5cf6'
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Rotating border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{
                      borderImage: 'linear-gradient(45deg, #8b5cf6, #00d9ff, #8b5cf6) 1'
                    } as React.CSSProperties}
                  />

                  {/* Main box */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-purple-800/40 rounded-2xl border-2 border-purple-500/60 flex flex-col items-center justify-center overflow-hidden">
                    {/* Internal glow lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
                      <div className="absolute top-2/3 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="text-3xl font-mono font-bold text-cyber-neon mb-1 tracking-wide">
                        BRAIN
                      </div>
                      <div className="text-xs text-purple-300/70 font-mono tracking-widest uppercase">
                        Control Hub
                      </div>
                    </div>

                    {/* Center pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-cyber-neon/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.button>
              </motion.div>

              {/* Peripheral Components */}
              <AnimatePresence>
                {getPeripheralComponents().map((comp) => {
                  const isSelected = selectedComponent === comp.id
                  const isHovered = hoveredComponent === comp.id
                  const pixelPos = getComponentPixelPosition(comp.angle, comp.radius, isExpanded, 800, 700)

                  return (
                    <motion.div
                      key={comp.id}
                      className="absolute"
                      style={{
                        left: pixelPos.x,
                        top: pixelPos.y,
                        transform: 'translate(-50%, -50%)'
                      } as React.CSSProperties}
                      animate={{
                        scale: isSelected ? 1.25 : isHovered ? 1.15 : 1,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut'
                      }}
                    >
                      <motion.button
                        onClick={() => setSelectedComponent(comp.id)}
                        onMouseEnter={() => setHoveredComponent(comp.id)}
                        onMouseLeave={() => setHoveredComponent(null)}
                        className="relative w-32 h-32 cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                      >
                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2"
                          animate={{
                            boxShadow: isSelected || isHovered
                              ? `0 0 50px ${comp.color}, 0 0 100px ${comp.color}88`
                              : `0 0 25px ${comp.color}40`,
                            borderColor: isSelected || isHovered ? comp.color : `${comp.color}60`
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            background: `${comp.color}08`
                          } as React.CSSProperties}
                        />

                        {/* Rotating ring */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                          style={{
                            borderImage: `linear-gradient(45deg, ${comp.color}, transparent, ${comp.color}) 1`
                          } as React.CSSProperties}
                        />

                        {/* Component label */}
                        <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                          <div className="text-center z-10">
                            <div
                              className="text-sm font-mono font-bold uppercase tracking-widest"
                              style={{ color: comp.color }}
                            >
                              {comp.label.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Information Panel */}
          <div>
            <motion.div
              key={selectedComponent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-cyber-dark/60 to-cyber-darker/80 border border-cyber-blue/40 rounded-lg p-8 h-[700px] overflow-y-auto sticky top-20 space-y-8"
            >
              {selectedComponentData && (
                <>
                  {/* Header with color coding */}
                  <div
                    className="space-y-3 pb-6 border-b border-cyber-blue/30"
                    style={{ borderColor: `${selectedComponentData.color}40` }}
                  >
                    <div
                      className="text-sm font-mono font-bold tracking-widest uppercase"
                      style={{ color: selectedComponentData.color }}
                    >
                      {selectedComponentData.label}
                    </div>
                    <h3 className="text-lg font-mono font-bold text-cyber-neon">
                      {selectedComponentData.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60">Function</p>
                    <p className="text-sm leading-relaxed text-cyber-blue/80">
                      {selectedComponentData.description}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60">Specifications</p>
                    <div className="space-y-3">
                      {selectedComponentData.specs.map((spec, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex gap-3"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: selectedComponentData.color }}
                          />
                          <span className="text-sm text-cyber-blue/70">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="pt-6 border-t border-cyber-blue/30 space-y-2">
                    <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60">Status</p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedComponentData.color } as React.CSSProperties}
                      />
                      <span className="text-xs" style={{ color: selectedComponentData.color }}>
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Hidden until expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {getPeripheralComponents().map((comp) => (
                <motion.button
                  key={comp.id}
                  onClick={() => setSelectedComponent(comp.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-4 text-xs font-mono uppercase tracking-wider rounded-lg border-2 transition-all backdrop-blur-sm ${
                    selectedComponent === comp.id
                      ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-neon shadow-lg'
                      : 'bg-transparent border-cyber-blue/30 text-cyber-blue/70 hover:border-cyber-blue/60 hover:text-cyber-blue'
                  }`}
                >
                  {comp.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div
          className="text-center pt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-xs text-cyber-blue/60 font-mono">
            {isExpanded ? '↓ CLICK ON COMPONENTS TO EXPLORE ↓' : 'CLICK THE BRAIN TO DISSECT ARCHITECTURE'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
