'use client'

import React from 'react'
import { StreamData } from '@/lib/types'
import { useStreamBalance } from '@/lib/hooks'
import { formatBalance, formatAddress, ratePerSecToMonth } from '@/lib/utils'

interface StreamCardProps {
  stream: StreamData
  isOutgoing?: boolean
  onWithdraw?: () => void
  onDetails?: () => void
}

export function StreamCard({
  stream,
  isOutgoing = false,
  onWithdraw,
  onDetails,
}: StreamCardProps) {
  const currentClaimable = useStreamBalance(stream)

  return (
    <div className="card-border rounded-xl p-4 space-y-3 hover:border-cyan-500/50 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-slate-500 mb-1">
            {isOutgoing ? 'Streaming to' : 'Receiving from'}
          </p>
          <p className="text-sm font-mono text-cyan-400">
            {isOutgoing ? formatAddress(stream.recipient) : formatAddress(stream.sender)}
          </p>
        </div>
        <span className="text-xs bg-cyan-950/50 text-cyan-400 px-2 py-1 rounded-full border border-cyan-800/50">
          Stream #{stream.id}
        </span>
      </div>

      {/* Balance Display */}
      <div className="bg-slate-950/50 p-3 rounded-lg">
        <p className="text-xs text-slate-400 mb-1">Claimable Balance</p>
        <div className="text-2xl font-extrabold text-cyan-400 font-mono">
          {formatBalance(currentClaimable, 7)}
        </div>
        <p className="text-xs text-slate-500 mt-1">
          +{formatBalance(ratePerSecToMonth(stream.ratePerSec), 7)} XLM/month
        </p>
      </div>

      {/* Stream Info Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-950/30 p-2 rounded">
          <p className="text-slate-500 mb-1">Rate</p>
          <p className="font-mono text-slate-300">
            {formatBalance(stream.ratePerSec, 7)} XLM/sec
          </p>
        </div>
        <div className="bg-slate-950/30 p-2 rounded">
          <p className="text-slate-500 mb-1">Initial Deposit</p>
          <p className="font-mono text-slate-300">
            {formatBalance(stream.baseBalance, 7)} XLM
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        {onWithdraw && (
          <button
            onClick={onWithdraw}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors active:scale-95"
          >
            Withdraw
          </button>
        )}
        {onDetails && (
          <button
            onClick={onDetails}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
          >
            Details
          </button>
        )}
      </div>
    </div>
  )
}
