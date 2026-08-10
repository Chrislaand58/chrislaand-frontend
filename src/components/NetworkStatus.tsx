'use client'

import React, { useState, useEffect } from 'react'
import { useNetworkHealth } from '@/lib/hooks'

interface NetworkStatusProps {
  network?: 'testnet' | 'public'
  compact?: boolean
}

export function NetworkStatus({ network = 'testnet', compact = false }: NetworkStatusProps) {
  const { ledgerSequence, latency, isHealthy } = useNetworkHealth(network)
  const [displayLatency, setDisplayLatency] = useState(0)

  useEffect(() => {
    setDisplayLatency(Math.round(latency))
  }, [latency])

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        <span className="text-slate-400">
          {isHealthy ? 'Healthy' : 'Offline'} • {displayLatency}ms
        </span>
      </div>
    )
  }

  return (
    <div className="card-border rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <div>
            <p className="text-sm font-semibold text-slate-100">
              {network === 'testnet' ? 'Stellar Testnet' : 'Stellar Public Network'}
            </p>
            <p className="text-xs text-slate-400">
              {isHealthy ? 'Connected and healthy' : 'Connection issues detected'}
            </p>
          </div>
        </div>
        <span className={`text-xs font-mono ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
          {isHealthy ? '✓' : '✗'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950/30 p-2 rounded">
          <p className="text-xs text-slate-500 mb-1">Ledger Sequence</p>
          <p className="font-mono text-sm text-slate-300">{ledgerSequence}</p>
        </div>
        <div className="bg-slate-950/30 p-2 rounded">
          <p className="text-xs text-slate-500 mb-1">Network Latency</p>
          <p className={`font-mono text-sm ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
            {displayLatency}ms
          </p>
        </div>
      </div>
    </div>
  )
}
