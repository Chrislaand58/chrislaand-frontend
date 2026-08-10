import React, { useState } from 'react'
import { useWallet } from '@/lib/wallet-context'
import { formatAddress } from '@/lib/utils'
import { WALLET_MESSAGES } from '@/lib/constants'
import { PasskeyAuth } from './PasskeyAuth'

interface WalletButtonProps {
  variant?: 'default' | 'compact'
}

export function WalletButton({ variant = 'default' }: WalletButtonProps) {
  const { wallet, connect, disconnect, isReady } = useWallet()
  const [showMenu, setShowMenu] = useState(false)
  const [passkeyError, setPasskeyError] = useState<string | null>(null)

  const handlePasskeyAuth = async () => {
    try {
      setPasskeyError(null)
      await connect('passkey')
      setShowMenu(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Passkey authentication failed'
      setPasskeyError(message)
    }
  }

  if (!isReady) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg text-sm font-semibold cursor-not-allowed"
      >
        Loading...
      </button>
    )
  }

  if (!wallet.isConnected) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => connect('freighter')}
          disabled={wallet.loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:text-slate-400"
        >
          {wallet.loading ? 'Connecting...' : WALLET_MESSAGES.connectFreighter}
        </button>
        <button
          onClick={() => connect('passkey')}
          disabled={wallet.loading}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:text-slate-400"
        >
          {wallet.loading ? 'Connecting...' : WALLET_MESSAGES.connectPasskey}
        </button>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-600/50 text-cyan-400 rounded-lg text-sm font-mono transition-colors"
        >
          {formatAddress(wallet.publicKey || '', 6)}
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
            <button
              onClick={() => {
                disconnect()
                setShowMenu(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-red-400 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="card-border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Connected Wallet</span>
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>

      <div className="font-mono text-sm text-cyan-400 break-all">
        {wallet.publicKey}
      </div>

      <button
        onClick={disconnect}
        className="w-full mt-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm font-semibold rounded-lg transition-colors"
      >
        Disconnect
      </button>

      {wallet.error && (
        <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">
          {wallet.error}
        </div>
      )}
    </div>
  )
}
