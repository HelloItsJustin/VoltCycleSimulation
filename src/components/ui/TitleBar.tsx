'use client'

import { motion } from 'framer-motion'

export default function TitleBar() {
  return (
    <div className="border-b border-cyber-blue/30 bg-gradient-to-r from-cyber-dark to-cyber-darker/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyber-blue animate-pulse" />
            <h1 className="text-3xl font-bold font-mono tracking-tighter">
              <span className="text-cyber-neon">VOLT</span>
              <span className="text-cyber-blue">CYCLE</span>
            </h1>
          </div>
          <p className="text-xs font-mono text-cyber-blue/70 uppercase tracking-widest">
            Digital Twin MVP | Industrial Cyber-Command Interface
          </p>
          <p className="text-xs text-cyber-blue/50 mt-3">
            Second-Life Battery Energy Storage | AI-Powered Lifecycle Management
          </p>
        </motion.div>
      </div>
    </div>
  )
}
