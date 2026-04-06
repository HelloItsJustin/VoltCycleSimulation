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
  color: string
  gridPosition: number
}

const components: ComponentSpec[] = [
  {
    id: 'iot',
    name: 'IoT Gateway',
    label: 'CLOUD BRIDGE',
    description: 'LTE/GSM module for real-time SoH cloud-streaming (The SaaS Backbone).',
    specs: ['LTE/GSM', 'SoH streaming', 'Cloud integration', 'Remote monitoring'],
    color: '#00d9ff',
    gridPosition: 1
  },
  {
    id: 'pcs',
    name: 'Power Conversion System',
    label: 'PCS',
    description: 'Bi-directional 50Hz AC Output. Integrated Hybrid Inverter for grid-synchronous discharge.',
    specs: ['Bi-directional AC', '50Hz sync', 'Hybrid inverter', 'Grid discharge'],
    color: '#00d9ff',
    gridPosition: 3
  },
  {
    id: 'thermal',
    name: 'Thermal Management Hub',
    label: 'COOLING',
    description: 'NTC thermistor grid for individual cell monitoring. Integrated fire-suppressant gas modules.',
    specs: ['Thermistor grid', 'Cell monitoring', 'Fire suppressant', 'Thermal network'],
    color: '#00d9ff',
    gridPosition: 7
  },
  {
    id: 'hv',
    name: 'HV Safety System',
    label: 'SAFETY',
    description: 'High-Voltage DC Fuses and Pre-charge Resistors. Automated contactors for emergency isolation.',
    specs: ['DC fuses', 'Pre-charge', 'Contactors', 'Emergency isolation'],
    color: '#ff0055',
    gridPosition: 9
  },
  {
    id: 'cells',
    name: 'Cell Stack',
    label: 'ENERGY',
    description: 'Grade-B Repurposed LFP/NMC Cells. 75% original capacity. Configured in 7S/5P modular blocks.',
    specs: ['Grade-B cells', '75% capacity', 'LFP/NMC', '7S/5P config'],
    color: '#00d9ff',
    gridPosition: 6
  },
  {
    id: 'bms',
    name: 'Active Balancing BMS',
    label: 'BRAIN',
    description: 'Proprietary multi-degradation balancing. Equalizes voltage between heterogeneous cells to prevent thermal runaway.',
    specs: ['Multi-degradation', 'Cell balancing', 'Thermal protection', 'Voltage equalization'],
    color: '#8b5cf6',
    gridPosition: 5
  }
]

export default function ReflowPackExplodedView() {
  const [selectedComponent, setSelectedComponent] = useState<HardwareComponent>('bms')
  const selectedComponentData = components.find(c => c.id === selectedComponent)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h2
            className="text-5xl font-mono font-bold text-cyber-neon mb-3"
            animate={{ textShadow: ['0 0 20px rgba(0, 217, 255, 0.3)', '0 0 40px rgba(0, 217, 255, 0.8)', '0 0 20px rgba(0, 217, 255, 0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            HARDWARE ARCHITECTURE
          </motion.h2>
          <p className="text-cyber-blue/70 text-sm tracking-wider">
            Click any component to explore specifications
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main 3x3 Grid */}
          <div className="col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-6 bg-gradient-to-br from-cyber-dark/50 to-cyber-darker/80 border border-cyber-blue/20 rounded-lg p-8 min-h-[600px]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos) => {
                const comp = components.find(c => c.gridPosition === pos)
                const isSelected = selectedComponent === comp?.id

                return (
                  <motion.div
                    key={pos}
                    variants={itemVariants}
                  >
                    {comp ? (
                      <motion.button
                        onClick={() => setSelectedComponent(comp.id)}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full h-40 rounded-lg border-2 transition-all duration-300 flex flex-col items-center justify-center p-4 cursor-pointer hover:outline-none focus:outline-none relative overflow-hidden group ${
                          isSelected
                            ? 'border-cyber-neon bg-cyber-neon/10'
                            : 'border-cyber-blue/40 hover:border-cyber-blue/70 bg-cyber-blue/5'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: comp.color,
                                backgroundColor: `${comp.color}15`,
                                boxShadow: `0 0 40px ${comp.color}60, inset 0 0 20px ${comp.color}20`
                              }
                            : { borderColor: `${comp.color}60` }
                        }
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: isSelected
                              ? `linear-gradient(135deg, ${comp.color}20 0%, transparent 100%)`
                              : `linear-gradient(135deg, ${comp.color}08 0%, transparent 100%)`
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ pointerEvents: 'none' }}
                        />

                        {/* Content */}
                        <div className="relative z-10 text-center space-y-2">
                          <div
                            className="text-lg font-mono font-bold uppercase tracking-widest transition-all"
                            style={{ color: comp.color }}
                          >
                            {comp.label}
                          </div>
                          <div className="text-xxs text-cyber-blue/50 font-mono">{comp.name}</div>

                          {/* Hover indicator */}
                          <motion.div
                            animate={isSelected ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            className="h-1 w-8 rounded-full mx-auto mt-2"
                            style={{ backgroundColor: comp.color }}
                          />
                        </div>

                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          animate={isSelected ? { opacity: 0.3 } : { opacity: 0 }}
                          style={{
                            background: `radial-gradient(circle at center, ${comp.color}40 0%, transparent 70%)`,
                            pointerEvents: 'none'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    ) : (
                      // Empty grid position
                      <div className="w-full h-40 rounded-lg border border-dashed border-cyber-blue/10 flex items-center justify-center">
                        <div className="text-xxxs text-cyber-blue/20 font-mono">—</div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Grid Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {components
                .filter(c => c.id !== 'bms')
                .map((comp) => (
                  <motion.button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp.id)}
                    whileHover={{ scale: 1.03 }}
                    className="p-3 rounded text-center text-xs font-mono uppercase tracking-wider border border-cyber-blue/20 hover:border-cyber-blue/60 transition-all cursor-pointer hover:outline-none focus:outline-none"
                    style={{
                      color: selectedComponent === comp.id ? comp.color : '#667eea',
                      backgroundColor: selectedComponent === comp.id ? `${comp.color}15` : 'transparent',
                      borderColor: selectedComponent === comp.id ? comp.color : undefined
                    }}
                  >
                    {comp.label}
                  </motion.button>
                ))}
            </motion.div>
          </div>

          {/* Information Panel */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedComponent}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-cyber-dark/60 to-cyber-darker/80 border border-cyber-blue/40 rounded-lg p-8 h-[600px] overflow-y-auto sticky top-20 space-y-8"
              >
                {selectedComponentData && (
                  <>
                    {/* Header */}
                    <div className="space-y-3 pb-6 border-b border-cyber-blue/30">
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
                          style={{ backgroundColor: selectedComponentData.color }}
                        />
                        <span className="text-xs" style={{ color: selectedComponentData.color }}>
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
