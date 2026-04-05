'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DigitalBatteryPassport() {
  const [isScanning, setIsScanning] = useState(false)
  const [isScanned, setIsScanned] = useState(false)

  const handleScan = () => {
    if (isScanning) return
    setIsScanning(true)
    setTimeout(() => {
      setIsScanned(true)
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-mono font-bold text-cyber-neon mb-2">
            DIGITAL BATTERY PASSPORT
          </h2>
          <p className="text-cyber-blue/70 text-sm">
            Compliance Verification & Circularity Certification
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* Scanner Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-mono font-bold text-cyber-neon mb-2">BATCH SCANNER</h3>
              <p className="text-sm text-cyber-blue/70">
                Initiate passport verification protocol
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Outer glow frame */}
                <motion.div
                  className="w-80 h-80 rounded-xl border-2 border-cyber-blue/50 bg-gradient-to-br from-cyber-dark/50 to-cyber-darker/80 flex items-center justify-center overflow-hidden"
                  style={{
                    boxShadow: isScanning
                      ? '0 0 40px rgba(0, 217, 255, 0.8)'
                      : isScanned
                      ? '0 0 20px rgba(0, 217, 255, 0.6), inset 0 0 20px rgba(0, 217, 255, 0.2)'
                      : '0 0 10px rgba(0, 217, 255, 0.3)'
                  } as React.CSSProperties}
                  animate={{
                    opacity: isScanning ? [1, 1, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: isScanning ? Infinity : 0 }}
                >
                  {/* QR Code SVG */}
                  <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    className="relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background */}
                    <rect width="300" height="300" fill="#050814" />

                    {/* Position markers (clean squares) */}
                    {[
                      { x: 10, y: 10 },
                      { x: 250, y: 10 },
                      { x: 10, y: 250 }
                    ].map((pos, idx) => (
                      <g key={`marker-${idx}`}>
                        {/* Outer square */}
                        <rect x={pos.x} y={pos.y} width="40" height="40" fill="none" stroke="#00d9ff" strokeWidth="3" />
                        {/* Middle square */}
                        <rect x={pos.x + 5} y={pos.y + 5} width="30" height="30" fill="none" stroke="#00d9ff" strokeWidth="2" />
                        {/* Inner filled */}
                        <rect x={pos.x + 10} y={pos.y + 10} width="20" height="20" fill="#00d9ff" />
                      </g>
                    ))}

                    {/* Data modules - organized grid pattern */}
                    {Array.from({ length: 14 }).map((_, row) => (
                      Array.from({ length: 14 }).map((_, col) => {
                        const x = 60 + col * 14
                        const y = 60 + row * 14
                        // Create a pattern that looks like real QR data
                        const isDataPoint = (row + col) % 3 === 0 || (row * col) % 5 === 0
                        return isDataPoint ? (
                          <motion.rect
                            key={`data-${row}-${col}`}
                            x={x}
                            y={y}
                            width="10"
                            height="10"
                            fill="#00d9ff"
                            animate={isScanning ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: isScanning ? (row + col) * 0.02 : 0,
                              repeat: isScanning ? Infinity : 0
                            }}
                          />
                        ) : null
                      })
                    ))}

                    {/* Timing patterns */}
                    <line x1="50" y1="30" x2="250" y2="30" stroke="#00d9ff" strokeWidth="1" opacity="0.4" />
                    <line x1="30" y1="50" x2="30" y2="250" stroke="#00d9ff" strokeWidth="1" opacity="0.4" />

                    {/* Format information areas */}
                    <rect x="50" y="250" width="40" height="20" fill="none" stroke="#00d9ff" strokeWidth="1" opacity="0.3" />
                    <rect x="250" y="50" width="20" height="40" fill="none" stroke="#00d9ff" strokeWidth="1" opacity="0.3" />
                  </svg>

                  {/* Scanning beam overlay */}
                  {isScanning && (
                    <motion.div
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 pointer-events-none z-20"
                    >
                      <div className="w-full h-1 bg-gradient-to-b from-transparent via-cyber-neon to-transparent opacity-60" />
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Scan Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleScan}
                disabled={isScanning}
                whileHover={{ scale: isScanning ? 1 : 1.05 }}
                whileTap={{ scale: isScanning ? 1 : 0.95 }}
                className={`px-12 py-3 font-mono uppercase text-sm tracking-wider border-2 rounded-lg transition-all ${
                  isScanned
                    ? 'border-cyber-neon text-cyber-neon bg-cyber-neon/10'
                    : isScanning
                    ? 'border-cyber-blue/40 text-cyber-blue/40 bg-transparent'
                    : 'border-cyber-blue text-cyber-blue bg-cyber-blue/10 hover:bg-cyber-blue/20 shadow-lg'
                }`}
              >
                {isScanned ? 'SCAN COMPLETE' : isScanning ? 'SCANNING...' : 'INITIATE SCAN'}
              </motion.button>
            </div>

            {/* Scanner status */}
            {isScanned && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyber-neon/10 to-cyber-blue/10 border border-cyber-neon/40 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-cyber-neon"
                  />
                  <div>
                    <p className="text-sm font-mono text-cyber-neon">Batch VC-2026-001847</p>
                    <p className="text-xs text-cyber-blue/70">Verification successful</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Certificate Display */}
          <AnimatePresence>
            {isScanned && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-mono font-bold text-cyber-neon mb-2">
                    CERTIFICATE OF COMPLIANCE
                  </h3>
                  <p className="text-sm text-cyber-blue/70">
                    Extended Producer Responsibility Certification
                  </p>
                </div>

                {/* Certificate Card */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-cyber-indigo/20 to-cyber-dark/60 border-2 border-cyber-neon/40 rounded-xl p-8 space-y-6 backdrop-blur-sm"
                >
                  {/* Certificate Header */}
                  <div className="text-center pb-6 border-b border-cyber-neon/30">
                    <div className="text-sm font-mono tracking-widest uppercase text-cyber-blue mb-3">
                      Verification Certificate
                    </div>
                    <h4 className="text-2xl font-mono font-bold text-cyber-neon">
                      VOLTCYCLE PASSPORT
                    </h4>
                  </div>

                  {/* Batch Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60 mb-2">Batch ID</p>
                      <p className="text-lg font-mono text-cyber-neon">VC-2026-001847</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60 mb-2">Date</p>
                      <p className="text-lg font-mono text-cyber-neon">2026-04-05</p>
                    </div>
                  </div>

                  {/* Mineral Composition */}
                  <div className="space-y-4 pt-6 border-t border-cyber-neon/30">
                    <p className="text-xs font-mono uppercase tracking-wider text-cyber-blue/60">
                      Mineral Composition
                    </p>

                    <div className="space-y-3">
                      {[
                        { name: 'Lithium', pct: 8.2 },
                        { name: 'Nickel', pct: 15.4 },
                        { name: 'Cobalt', pct: 4.1 },
                        { name: 'Manganese', pct: 12.7 },
                        { name: 'Other', pct: 59.6 }
                      ].map((mineral, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyber-blue/70">{mineral.name}</span>
                            <span className="text-xs font-mono text-cyber-neon">{mineral.pct}%</span>
                          </div>
                          <div className="w-full h-2 bg-cyber-dark/50 rounded-full overflow-hidden border border-cyber-blue/20">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${mineral.pct}%` }}
                              transition={{ delay: 0.3 + idx * 0.08, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-cyber-neon to-cyber-blue"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div className="grid grid-cols-2 gap-3 pt-6 border-t border-cyber-neon/30">
                    <ComplianceCheck label="EPR Mandate" status="compliant" />
                    <ComplianceCheck label="Carbon Footprint" status="compliant" />
                    <ComplianceCheck label="Traceability" status="compliant" />
                    <ComplianceCheck label="Recovery Rate" status="compliant" />
                  </div>

                  {/* Verification */}
                  <div className="pt-6 border-t border-cyber-neon/30 text-center">
                    <motion.div
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs font-mono text-cyber-neon"
                    >
                      VERIFIED &amp; CERTIFIED
                    </motion.div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <  motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-4 text-xs font-mono uppercase tracking-wider border border-cyber-blue/40 text-cyber-blue/70 rounded-lg hover:border-cyber-blue hover:text-cyber-blue transition-all"
                  >
                    DOWNLOAD PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-4 text-xs font-mono uppercase tracking-wider border border-cyber-neon text-cyber-neon bg-cyber-neon/10 rounded-lg hover:bg-cyber-neon/20 transition-all"
                  >
                    SHARE CERTIFICATE
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Information Grid */}
        {isScanned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-6 pt-12"
          >
            <InfoSection
              title="Circular Economy Impact"
              items={[
                'Reduces virgin lithium mining by 40%',
                'Prevents 2.4 tons CO2 per battery pack',
                'Enables secondary market for grade B cells',
                'Supports 2030 Net-Zero commitments'
              ]}
            />
            <InfoSection
              title="Compliance Standards"
              items={[
                'EU Battery Regulation 2023/1542',
                'Global Battery Innovation Alliance Certified',
                'ISO 14001:2015 Environmental Management',
                '2026-27 90% Recovery Mandate Ready'
              ]}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ComplianceCheck({ label }: { label: string; status?: 'compliant' | 'warning' }) {
  return (
    <div className="bg-cyber-dark/50 rounded-lg p-3 border border-cyber-neon/20">
      <p className="text-xs text-cyber-blue/60 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyber-neon" />
        <p className="text-xs font-mono text-cyber-neon">COMPLIANT</p>
      </div>
    </div>
  )
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-cyber-dark/50 to-cyber-darker border border-cyber-blue/30 rounded-lg p-6 space-y-4"
    >
      <h4 className="text-lg font-mono font-bold text-cyber-neon">{title}</h4>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-3 text-sm"
          >
            <span className="text-cyber-neon flex-shrink-0">▸</span>
            <span className="text-cyber-blue/70">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
