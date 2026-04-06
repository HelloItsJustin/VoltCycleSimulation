'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type HardwareComponent = 'bms' | 'pcs' | 'cells' | 'hv' | 'thermal' | 'iot' | 'combus' | 'sensors' | 'interface'

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
    id: 'combus',
    name: 'Communication Bus',
    label: 'CAN-BUS',
    description: 'Real-time CAN protocol interface for component synchronization and data multiplexing.',
    specs: ['CAN 2.0B', 'Real-time sync', 'Data multiplexing', 'Protocol layer'],
    color: '#00d9ff',
    gridPosition: 2
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
    id: 'sensors',
    name: 'Sensor Array',
    label: 'SENSORS',
    description: 'Multi-axis voltage, current, and temperature sensing array with adaptive filtering.',
    specs: ['Multi-axis sensing', 'Voltage monitoring', 'Current metering', 'Adaptive filtering'],
    color: '#00d9ff',
    gridPosition: 4
  },
  {
    id: 'bms',
    name: 'Active Balancing BMS',
    label: 'BRAIN',
    description: 'Proprietary multi-degradation balancing. Equalizes voltage between heterogeneous cells to prevent thermal runaway.',
    specs: ['Multi-degradation', 'Cell balancing', 'Thermal protection', 'Voltage equalization'],
    color: '#8b5cf6',
    gridPosition: 5
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
    id: 'thermal',
    name: 'Thermal Management Hub',
    label: 'COOLING',
    description: 'NTC thermistor grid for individual cell monitoring. Integrated fire-suppressant gas modules.',
    specs: ['Thermistor grid', 'Cell monitoring', 'Fire suppressant', 'Thermal network'],
    color: '#00d9ff',
    gridPosition: 7
  },
  {
    id: 'interface',
    name: 'Integration Interface',
    label: 'I/O BRIDGE',
    description: 'Standardized mechanical and electrical interface for modular component assembly.',
    specs: ['Mechanical interface', 'Electrical connector', 'Modular assembly', 'Quick disconnect'],
    color: '#00d9ff',
    gridPosition: 8
  },
  {
    id: 'hv',
    name: 'HV Safety System',
    label: 'SAFETY',
    description: 'High-Voltage DC Fuses and Pre-charge Resistors. Automated contactors for emergency isolation.',
    specs: ['DC fuses', 'Pre-charge', 'Contactors', 'Emergency isolation'],
    color: '#ff0055',
    gridPosition: 9
  }
]

export default function ReflowPackExplodedView() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<HardwareComponent>('bms')
  const selectedComponentData = components.find(c => c.id === selectedComponent)

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
            {isExpanded ? 'Click any component to explore specifications' : 'Click to dissect and explore'}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Grid / Center Button */}
          <div className="col-span-2">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                // Collapsed - Show REFLOW PACKET button
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center h-[600px] bg-gradient-to-br from-cyber-dark/50 to-cyber-darker/80 border border-cyber-blue/20 rounded-lg"
                >
                  <motion.button
                    onClick={() => {
                      setIsExpanded(true)
                      setSelectedComponent('bms')
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Outer glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl -inset-4"
                      animate={{
                        boxShadow: ['0 0 60px #8b5cf6, 0 0 120px #8b5cf688', '0 0 80px #8b5cf6, 0 0 160px #8b5cf6']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main button */}
                    <div className="relative w-80 h-64 bg-gradient-to-br from-purple-900/60 to-purple-800/40 rounded-3xl border-2 border-purple-500/60 flex flex-col items-center justify-center p-8 cursor-pointer hover:outline-none focus:outline-none overflow-hidden">
                      {/* Background gradient effect */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        animate={{
                          background: ['linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 100%)', 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, transparent 100%)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <motion.h3
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="text-5xl font-mono font-bold text-cyber-neon mb-4 tracking-widest"
                        >
                          REFLOW
                        </motion.h3>
                        <div className="text-2xl text-cyber-neon/80 font-mono tracking-widest">PACKET</div>
                        <p className="text-xs text-cyber-blue/60 font-mono mt-6 tracking-wider">v3.0</p>

                        {/* Click indicator */}
                        <motion.div
                          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mt-8 text-xs text-cyber-blue/60 font-mono tracking-widest"
                        >
                          CLICK TO DISSECT
                        </motion.div>
                      </div>

                      {/* Inner glow pulse */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-cyber-neon/30"
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </div>
                  </motion.button>
                </motion.div>
              ) : (
                // Expanded - Show grid
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-3 gap-6 bg-gradient-to-br from-cyber-dark/50 to-cyber-darker/80 border border-cyber-blue/20 rounded-lg p-8 min-h-[600px]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos) => {
                    const comp = components.find(c => c.gridPosition === pos)
                    const isSelected = selectedComponent === comp?.id

                    return (
                      <motion.div
                        key={pos}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: pos * 0.05, ease: 'easeOut' }}
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
                          // Empty grid position (shouldn't happen now with 9 components)
                          <div className="w-full h-40 rounded-lg border border-dashed border-cyber-blue/10 flex items-center justify-center">
                            <div className="text-xxxs text-cyber-blue/20 font-mono">—</div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapse button - visible only when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-6"
                >
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 text-xs font-mono uppercase tracking-wider rounded-lg border-2 border-cyber-blue/40 hover:border-cyber-blue/70 text-cyber-blue/70 hover:text-cyber-neon transition-all"
                  >
                    Collapse to Packet
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
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
