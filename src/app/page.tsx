'use client'

import { useState, useEffect } from 'react'
import LifecycleCinema from '@/components/modules/LifecycleCinema'
import ReflowPackExplodedView from '@/components/modules/ReflowPackExplodedView'
import CommandCenterDashboard from '@/components/modules/CommandCenterDashboard'
import DigitalBatteryPassport from '@/components/modules/DigitalBatteryPassport'
import TitleBar from '@/components/ui/TitleBar'
import { motion } from 'framer-motion'

export default function Home() {
  const [activeModule, setActiveModule] = useState<'lifecycle' | 'hardware' | 'dashboard' | 'passport'>('lifecycle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-cyber-darker text-cyber-neon overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/20 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#1a4d66_1px,transparent_1px),linear-gradient(90deg,#1a4d66_1px,transparent_1px)] bg-[50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <TitleBar />

        {/* Navigation */}
        <nav className="border-b border-cyber-blue/20 bg-cyber-dark/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex gap-8">
            {[
              { id: 'lifecycle', label: '⚙️ LIFECYCLE CINEMA' },
              { id: 'hardware', label: '🔧 HARDWARE ARCH' },
              { id: 'dashboard', label: '📊 COMMAND CENTER' },
              { id: 'passport', label: '📋 BATTERY PASSPORT' },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveModule(item.id as 'lifecycle' | 'hardware' | 'dashboard' | 'passport')}
                className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 pb-2 border-b-2 ${
                  activeModule === item.id
                    ? 'border-cyber-blue text-cyber-blue'
                    : 'border-transparent text-cyber-blue/50 hover:text-cyber-blue'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Module Container */}
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="min-h-[calc(100vh-160px)] mx-auto"
        >
          {activeModule === 'lifecycle' && <LifecycleCinema />}
          {activeModule === 'hardware' && <ReflowPackExplodedView />}
          {activeModule === 'dashboard' && <CommandCenterDashboard />}
          {activeModule === 'passport' && <DigitalBatteryPassport />}
        </motion.div>
      </div>
    </main>
  )
}
