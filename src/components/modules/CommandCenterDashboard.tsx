'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CommandCenterDashboard() {
  const MONTHLY_ENERGY_UNITS = 5000 // Monthly energy storage capacity/usage in units
  
  const calculateGridSpend = (rate: number) => {
    return Math.round(rate * MONTHLY_ENERGY_UNITS)
  }

  const calculateSavings = (rate: number) => {
    const voltcycleCost = 2.1 * MONTHLY_ENERGY_UNITS
    const gridCost = rate * MONTHLY_ENERGY_UNITS
    return Math.round(gridCost - voltcycleCost)
  }

  const [metrics, setMetrics] = useState({
    soh: 78.4,
    rul: 5.4,
    regulatoryCerts: 1247,
    gridRate: 12,
    monthlySavings: 49500, // (12 - 2.1) * 5000 = 49,500
    margin: 45.2
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newGridRate = 12 + Math.sin(Date.now() / 10000) * 2
        return {
          ...prev,
          soh: Math.min(100, prev.soh + (Math.random() - 0.45) * 0.5),
          rul: prev.rul + (Math.random() - 0.5) * 0.05,
          regulatoryCerts: prev.regulatoryCerts + Math.floor(Math.random() * 3),
          gridRate: newGridRate,
          monthlySavings: calculateSavings(newGridRate)
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-mono font-bold text-cyber-neon mb-2">
            COMMAND CENTER
          </h2>
          <p className="text-cyber-blue/70 text-sm">
            Live Heartbeat Metrics | Real-Time System Monitoring
          </p>
        </div>

        {/* Main metrics grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* SoH Dial */}
          <MetricCard title="STATE OF HEALTH" icon="📊">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-40 h-40">
                {/* Dial background */}
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#1a4d66" strokeWidth="2" />
                  
                  {/* Progress arc */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#00d9ff"
                    strokeWidth="4"
                    strokeDasharray={`${(metrics.soh / 100) * 565} 565`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    animate={{
                      strokeDasharray: [`${(metrics.soh / 100) * 565} 565`]
                    }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{
                      transformOrigin: '100px 100px',
                      transform: 'rotate(-90deg)'
                    } as React.CSSProperties}
                  />

                  {/* Tick marks */}
                  {[0, 25, 50, 75, 100].map((val) => {
                    const angle = (val / 100) * 360 - 90
                    const rad = (angle * Math.PI) / 180
                    const x1 = 100 + 80 * Math.cos(rad)
                    const y1 = 100 + 80 * Math.sin(rad)
                    const x2 = 100 + 90 * Math.cos(rad)
                    const y2 = 100 + 90 * Math.sin(rad)
                    return (
                      <line
                        key={val}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#00d9ff"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    )
                  })}
                </svg>

                {/* Center readout */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-mono font-bold text-cyber-neon">
                      {metrics.soh.toFixed(1)}%
                    </div>
                    <div className="text-xs text-cyber-blue/60 font-mono">Live Average</div>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse" />
                <span className="text-xs font-mono text-cyber-neon">HEALTHY</span>
              </div>
            </div>
          </MetricCard>

          {/* RUL Predictor */}
          <MetricCard title="REMAINING USEFUL LIFE" icon="⏱️">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-5xl font-mono font-bold text-cyber-indigo mb-2">
                  {metrics.rul.toFixed(1)}
                </div>
                <div className="text-sm text-cyber-blue/70 font-mono">Years</div>
              </motion.div>

              <div className="w-full bg-cyber-dark rounded-sm h-2 overflow-hidden border border-cyber-blue/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-indigo to-cyber-blue"
                  animate={{
                    width: `${Math.min(100, (metrics.rul / 10) * 100)}%`
                  }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              </div>

              <p className="text-xs text-cyber-blue/60 text-center">
                Physics-informed SEI modeling | Predictive algorithm
              </p>
            </div>
          </MetricCard>

          {/* EPR Compliance Counter */}
          <MetricCard title="EPR CERTIFICATES" icon="📜">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-5xl font-mono font-bold text-cyber-neon mb-2">
                  {metrics.regulatoryCerts}
                </div>
                <div className="text-sm text-cyber-blue/70 font-mono">Generated</div>
              </motion.div>

              <div className="p-3 bg-cyber-dark/50 rounded-sm border border-cyber-blue/20 w-full text-center">
                <p className="text-xs text-cyber-blue/60 font-mono">
                  OEM Trade Compliance
                </p>
                <p className="text-xs text-cyber-neon font-mono mt-1">
                  ✓ 2026-27 Mandate
                </p>
              </div>

              <p className="text-xs text-cyber-blue/60 text-center">
                Extended Producer Responsibility certified
              </p>
            </div>
          </MetricCard>
        </div>

        {/* Arbitrage Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-cyber-dark/50 to-cyber-indigo/20 border border-cyber-blue/30 rounded-sm p-8"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-mono font-bold text-cyber-neon mb-2">
                ⚡ ARBITRAGE CALCULATOR
              </h3>
              <p className="text-sm text-cyber-blue/70">
                Real-time economics modeling | Grid Peak Rate simulation
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Grid Rate Slider */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-cyber-blue/70 uppercase tracking-wider">
                    Grid Peak Rate (₹/kWh)
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="range"
                      min="8"
                      max="16"
                      step="0.1"
                      value={metrics.gridRate}
                      onChange={(e) => {
                        const newRate = parseFloat(e.target.value)
                        setMetrics(prev => ({
                          ...prev,
                          gridRate: newRate,
                          monthlySavings: calculateSavings(newRate)
                        }))
                      }}
                      className="flex-1 h-1 bg-cyber-blue/30 rounded-lg appearance-none cursor-pointer accent-cyber-neon"
                    />
                    <div className="text-2xl font-mono font-bold text-cyber-neon min-w-16">
                      ₹{metrics.gridRate.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Comparison */}
                <div className="pt-4 border-t border-cyber-blue/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-cyber-blue/70">Grid Power Cost</span>
                    <span className="text-lg font-mono font-bold text-danger-red">
                      ₹{metrics.gridRate.toFixed(2)}/unit
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-cyber-blue/70">VoltCycle Cost</span>
                    <span className="text-lg font-mono font-bold text-cyber-neon">
                      ₹2.1/unit
                    </span>
                  </div>
                  <div className="pt-3 border-t border-cyber-blue/30 flex justify-between items-center">
                    <span className="text-sm font-mono text-cyber-blue/70">Savings per Unit</span>
                    <motion.span
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xl font-mono font-bold text-cyber-neon"
                      style={{
                        textShadow: '0 0 10px #00d9ff'
                      } as React.CSSProperties}
                    >
                      ₹{(metrics.gridRate - 2.1).toFixed(2)}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Monthly Projections */}
              <div className="space-y-4">
                <div className="bg-cyber-dark rounded-sm p-4 border border-cyber-blue/20 space-y-3">
                  <h4 className="text-sm font-mono text-cyber-blue/70 uppercase">Monthly Projections</h4>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-cyber-blue/60">Grid Spend</span>
                      <span className="text-xs font-mono text-danger-red">
                        ₹{calculateGridSpend(metrics.gridRate).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-cyber-dark/50 h-1 rounded border border-danger-red/30">
                      <div className="h-full bg-danger-red/50 rounded" style={{width: '100%'}} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-cyber-blue/60">VoltCycle Savings</span>
                      <span className="text-xs font-mono text-cyber-neon">
                        ₹{(metrics.monthlySavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-cyber-dark/50 h-1 rounded border border-cyber-neon/30">
                      <motion.div
                        className="h-full bg-cyber-neon rounded"
                        animate={{
                          width: `${Math.min(100, metrics.monthlySavings / 100)}%`
                        }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Margin Display */}
                <div className="bg-gradient-to-br from-cyber-indigo/20 to-cyber-blue/10 rounded-sm p-4 border border-cyber-neon/30">
                  <p className="text-xs text-cyber-blue/70 mb-2 uppercase">Gross Margin</p>
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="text-4xl font-mono font-bold text-cyber-neon">
                      {metrics.margin.toFixed(1)}%
                    </div>
                  </motion.div>
                  <p className="text-xs text-cyber-blue/50 mt-2">
                    Current market positioning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Status Summary */}
        <div className="grid grid-cols-4 gap-4">
          <StatusIndicator label="LIFECYCLE STATUS" value="ACTIVE" status="healthy" />
          <StatusIndicator label="THERMAL STATUS" value="NOMINAL" status="healthy" />
          <StatusIndicator label="VOLTAGE BALANCE" value="OPTIMAL" status="healthy" />
          <StatusIndicator label="CLOUD SYNC" value="CONNECTED" status="healthy" />
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-cyber-dark/50 border border-cyber-blue/30 rounded-sm p-6"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyber-blue/20">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xs font-mono uppercase tracking-wider text-cyber-blue/70">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

function StatusIndicator({ label, value, status }: { label: string; value: string; status: 'healthy' | 'warning' | 'critical' }) {
  const colors = {
    healthy: 'text-cyber-neon border-cyber-neon/30 bg-cyber-neon/10',
    warning: 'text-danger-red border-danger-red/30 bg-danger-red/10',
    critical: 'text-danger-red border-danger-red/50 bg-danger-red/20'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border rounded-sm p-4 ${colors[status]}`}
    >
      <p className="text-xs font-mono text-cyber-blue/60 uppercase mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-current"
        />
        <p className="font-mono font-bold text-sm">{value}</p>
      </div>
    </motion.div>
  )
}
