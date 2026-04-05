'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type HardwareComponent = 'bms' | 'pcs' | 'cells' | 'hv' | 'thermal' | 'iot'

interface ComponentSpec {
  id: HardwareComponent
  name: string
  label: string
  description: string
  specs: string[]
  position: { top: string; left: string }
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
    position: { top: '15%', left: '15%' },
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
    position: { top: '15%', left: '85%' },
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
    position: { top: '50%', left: '20%' },
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
    position: { top: '50%', left: '80%' },
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
    position: { top: '80%', left: '20%' },
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
    position: { top: '80%', left: '80%' },
    color: '#00d9ff'
  }
]

export default function ReflowPackExplodedView() {
  const [selectedComponent, setSelectedComponent] = useState<HardwareComponent>('bms')
  const [hoveredComponent, setHoveredComponent] = useState<HardwareComponent | null>(null)

  const selectedComponentData = components.find(c => c.id === selectedComponent)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-mono font-bold text-cyber-neon mb-2">
            HARDWARE ARCHITECTURE
          </h2>
          <p className="text-cyber-blue/70 text-sm">
            Reflow-Pack System | 6-Component Integrated Assembly
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Visualization */}
          <div className="col-span-2">
            <div className="relative w-full h-[650px] bg-gradient-to-br from-cyber-dark/70 to-cyber-darker border border-cyber-blue/30 rounded-lg overflow-hidden">
              {/* Subtle grid background */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(0deg, #00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
              </div>

              {/* Center Chassis - 3D Box */}
              <motion.div
                animate={{
                  scale: hoveredComponent ? 0.95 : [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-56"
              >
                {/* 3D Perspective Box */}
                <div className="relative w-full h-full" style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}>
                  <motion.div
                    animate={{ rotateX: [5, -5, 5], rotateY: [10, -10, 10] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-full h-full bg-gradient-to-br from-cyber-indigo/40 to-cyber-blue/30 border-2 border-cyber-blue/60 rounded-lg flex flex-col items-center justify-center shadow-2xl"
                    style={{
                      boxShadow: 'inset 0 0 40px rgba(0, 217, 255, 0.2), 0 20px 60px rgba(139, 92, 246, 0.3)'
                    } as React.CSSProperties}
                  >
                    {/* Internal structure lines */}
                    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/40 to-transparent" />
                      <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/40 to-transparent" />
                      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyber-blue/40 to-transparent" />
                      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyber-blue/40 to-transparent" />
                    </div>

                    <div className="text-center z-10">
                      <div className="text-4xl font-mono font-bold text-cyber-neon mb-2">
                        REFLOW-PACK
                      </div>
                      <div className="text-xs text-cyber-blue/60 font-mono">v3.0 Architecture</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Component Nodes */}
              {components.map((comp) => {
                const isSelected = selectedComponent === comp.id
                const isHovered = hoveredComponent === comp.id

                return (
                  <motion.div
                    key={comp.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      top: comp.position.top,
                      left: comp.position.left
                    } as React.CSSProperties}
                    onMouseEnter={() => setHoveredComponent(comp.id)}
                    onMouseLeave={() => setHoveredComponent(null)}
                    onClick={() => setSelectedComponent(comp.id)}
                    animate={{
                      scale: isSelected ? 1.3 : isHovered ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Connecting line to center */}
                    <svg
                      className="absolute inset-0 w-96 h-96 pointer-events-none"
                      style={{
                        top: '-192px',
                        left: '-192px'
                      }}
                    >
                      <motion.line
                        x1="192"
                        y1="192"
                        x2="192"
                        y2="192"
                        stroke={isSelected || isHovered ? '#00d9ff' : '#1a4d66'}
                        strokeWidth={isSelected || isHovered ? '2' : '1'}
                        animate={{
                          x2: comp.position.left === '15%' ? '96' : comp.position.left === '85%' ? '288' : comp.position.left === '20%' ? '96' : '288',
                          y2: comp.position.top === '15%' ? '96' : comp.position.top === '50%' ? '192' : '288'
                        }}
                        transition={{ duration: 0.3 }}
                        opacity={isSelected || isHovered ? 0.8 : 0.3}
                      />
                    </svg>

                    {/* Component Node */}
                    <motion.div
                      animate={{
                        scale: isSelected ? 1.1 : isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative w-20 h-20 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm"
                      style={{
                        borderColor: comp.color,
                        backgroundColor: `${comp.color}15`,
                        boxShadow: isSelected || isHovered
                          ? `0 0 30px ${comp.color}, 0 0 60px ${comp.color}80`
                          : `0 0 15px ${comp.color}40`,
                        color: comp.color
                      } as React.CSSProperties}
                    >
                      {/* Rotating border effect */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderColor: `${comp.color}30`
                        } as React.CSSProperties}
                      />

                      {/* Component identifier */}
                      <div className="relative z-10 text-center">
                        <div className="text-xs uppercase tracking-widest">{comp.label.split(' ')[0]}</div>
                      </div>
                    </motion.div>

                    {/* Label below */}
                    <motion.p
                      animate={{ opacity: isSelected || isHovered ? 1 : 0.6 }}
                      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap"
                      style={{ color: isSelected || isHovered ? comp.color : '#1a7a8a' } as React.CSSProperties}
                    >
                      {comp.label}
                    </motion.p>
                  </motion.div>
                )
              })}
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
              className="bg-gradient-to-br from-cyber-dark/60 to-cyber-darker/80 border border-cyber-blue/40 rounded-lg p-8 h-[650px] overflow-y-auto sticky top-20 space-y-8"
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

        {/* Component Selector Grid */}
        <div className="grid grid-cols-3 gap-4 pt-8">
          {components.map((comp) => (
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
        </div>
      </div>
    </div>
  )
}
