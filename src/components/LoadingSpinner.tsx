'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const containerClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  }

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin`}
      />
      {message && (
        <p className="text-slate-400 text-sm mt-2">{message}</p>
      )}
    </div>
  )
}
