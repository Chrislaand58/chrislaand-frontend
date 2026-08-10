'use client'

import React, { useEffect, useState } from 'react'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose?: () => void
}

export function Notification({
  message,
  type,
  duration = 3000,
  onClose,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const typeStyles = {
    success: {
      bg: 'bg-green-900/20',
      border: 'border-green-700/50',
      icon: '✓',
      text: 'text-green-400',
    },
    error: {
      bg: 'bg-red-900/20',
      border: 'border-red-700/50',
      icon: '✕',
      text: 'text-red-400',
    },
    info: {
      bg: 'bg-blue-900/20',
      border: 'border-blue-700/50',
      icon: 'ℹ',
      text: 'text-blue-400',
    },
    warning: {
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-700/50',
      icon: '⚠',
      text: 'text-yellow-400',
    },
  }

  const style = typeStyles[type]

  return (
    <div className={`fixed bottom-4 right-4 z-40 ${style.bg} ${style.border} border rounded-lg p-4 flex items-start gap-3 animate-slide max-w-sm`}>
      <span className={`text-lg font-bold ${style.text} flex-shrink-0`}>
        {style.icon}
      </span>
      <div className="flex-1">
        <p className="text-sm text-slate-100">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        className="text-slate-400 hover:text-slate-300 flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
