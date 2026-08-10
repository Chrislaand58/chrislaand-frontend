'use client'

import React, { useState } from 'react'
import { StreamFormData } from '@/lib/types'
import { isValidStellarAddress, ratePerSecToMonth, ratePerMonthToSec } from '@/lib/utils'
import { DRIPS_CONFIG } from '@/lib/constants'

interface StreamFormProps {
  onSubmit: (data: StreamFormData) => Promise<void>
  loading?: boolean
  error?: string | null
}

export function StreamForm({ onSubmit, loading = false, error = null }: StreamFormProps) {
  const [formData, setFormData] = useState({
    recipientAddress: '',
    ratePerMonth: 100,
    initialDeposit: 1000,
    duration: 86400 * 30, // 30 days
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const ratePerSec = ratePerMonthToSec(formData.ratePerMonth)
  const estimatedTotal = formData.initialDeposit + ratePerSec * formData.duration

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.recipientAddress.trim()) {
      newErrors.recipientAddress = 'Recipient address is required'
    } else if (!isValidStellarAddress(formData.recipientAddress)) {
      newErrors.recipientAddress = 'Invalid Stellar address'
    }

    if (formData.ratePerMonth < DRIPS_CONFIG.minRatePerSec * 2592000) {
      newErrors.ratePerMonth = `Minimum rate: ${DRIPS_CONFIG.minRatePerSec * 2592000} XLM/month`
    } else if (formData.ratePerMonth > DRIPS_CONFIG.maxRatePerSec * 2592000) {
      newErrors.ratePerMonth = `Maximum rate: ${DRIPS_CONFIG.maxRatePerSec * 2592000} XLM/month`
    }

    if (formData.initialDeposit < DRIPS_CONFIG.minDeposit) {
      newErrors.initialDeposit = `Minimum deposit: ${DRIPS_CONFIG.minDeposit} XLM`
    } else if (formData.initialDeposit > DRIPS_CONFIG.maxDeposit) {
      newErrors.initialDeposit = `Maximum deposit: ${DRIPS_CONFIG.maxDeposit} XLM`
    }

    if (estimatedTotal > DRIPS_CONFIG.maxDeposit) {
      newErrors.duration = 'Total amount exceeds maximum'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await onSubmit({
        recipientAddress: formData.recipientAddress,
        ratePerSec,
        ratePerMonth: formData.ratePerMonth,
        initialDeposit: formData.initialDeposit,
        duration: formData.duration,
      })
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-100">Create New Stream</h3>

      {/* Recipient Address */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Recipient Address
        </label>
        <input
          type="text"
          value={formData.recipientAddress}
          onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
          placeholder="GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          className="w-full px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-600 focus:border-cyan-500/50 focus:outline-none text-sm font-mono transition-colors"
        />
        {errors.recipientAddress && (
          <p className="text-xs text-red-400 mt-1">{errors.recipientAddress}</p>
        )}
      </div>

      {/* Rate Per Month */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Monthly Flow Rate (XLM/month)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={formData.ratePerMonth}
            onChange={(e) => setFormData({ ...formData, ratePerMonth: parseFloat(e.target.value) || 0 })}
            min="0"
            step="0.1"
            className="flex-1 px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-100 focus:border-cyan-500/50 focus:outline-none text-sm transition-colors"
          />
          <span className="text-xs text-slate-400 whitespace-nowrap">
            ({formatRate(ratePerSec)}/sec)
          </span>
        </div>
        {errors.ratePerMonth && (
          <p className="text-xs text-red-400 mt-1">{errors.ratePerMonth}</p>
        )}
      </div>

      {/* Initial Deposit */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Initial Deposit (XLM)
        </label>
        <input
          type="number"
          value={formData.initialDeposit}
          onChange={(e) => setFormData({ ...formData, initialDeposit: parseFloat(e.target.value) || 0 })}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-100 focus:border-cyan-500/50 focus:outline-none text-sm transition-colors"
        />
        {errors.initialDeposit && (
          <p className="text-xs text-red-400 mt-1">{errors.initialDeposit}</p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Stream Duration (days)
        </label>
        <input
          type="number"
          value={formData.duration / 86400}
          onChange={(e) => setFormData({ ...formData, duration: (parseFloat(e.target.value) || 0) * 86400 })}
          min="1"
          step="1"
          className="w-full px-3 py-2 bg-slate-950/50 border border-slate-700/50 rounded-lg text-slate-100 focus:border-cyan-500/50 focus:outline-none text-sm transition-colors"
        />
      </div>

      {/* Summary */}
      <div className="bg-slate-950/50 p-3 rounded-lg space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Initial Deposit:</span>
          <span className="text-slate-300 font-mono">{formData.initialDeposit.toFixed(7)} XLM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Stream Rate:</span>
          <span className="text-slate-300 font-mono">{formatRate(ratePerSec)}/sec</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Duration:</span>
          <span className="text-slate-300 font-mono">{(formData.duration / 86400).toFixed(1)} days</span>
        </div>
        <div className="border-t border-slate-700 pt-2 flex justify-between font-semibold">
          <span className="text-slate-300">Total Stream Value:</span>
          <span className="text-cyan-400 font-mono">{estimatedTotal.toFixed(7)} XLM</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:text-slate-400 active:scale-95"
      >
        {loading ? 'Creating Stream...' : 'Create Stream'}
      </button>
    </form>
  )
}

function formatRate(rate: number): string {
  return rate.toFixed(7)
}
