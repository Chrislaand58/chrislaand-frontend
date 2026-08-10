'use client'

import React, { useEffect, useState } from 'react'
import { isWebAuthnSupported, isPasskeyAvailable } from '@/lib/webauthn'
import { LoadingSpinner } from './LoadingSpinner'

interface PasskeyAuthProps {
  onAuthenticate: () => Promise<void>
  loading?: boolean
  error?: string | null
}

export function PasskeyAuth({ onAuthenticate, loading = false, error = null }: PasskeyAuthProps) {
  const [supported, setSupported] = useState(false)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const checkSupport = async () => {
      setSupported(isWebAuthnSupported())
      const isAvailable = await isPasskeyAvailable()
      setAvailable(isAvailable)
    }

    checkSupport()
  }, [])

  if (!supported) {
    return (
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-xs text-yellow-400">
        ⚠ WebAuthn is not supported on this browser. Please use Freighter wallet instead.
      </div>
    )
  }

  if (!available) {
    return (
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 text-xs text-yellow-400">
        ⚠ Passkeys are not available on this device. Please enable biometric or PIN authentication.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <button
        onClick={onAuthenticate}
        disabled={loading}
        className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white rounded-lg font-semibold transition-colors disabled:text-slate-400 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <span>🔐</span>
            <span>Sign in with Passkey</span>
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 text-xs text-red-400">
          {error}
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        Securely sign in with your biometric or device PIN
      </p>
    </div>
  )
}
