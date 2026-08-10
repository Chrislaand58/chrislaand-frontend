'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { WalletState } from './types'
import { WALLET_MESSAGES } from './constants'

interface WalletContextType {
  wallet: WalletState
  connect: (type: 'freighter' | 'passkey') => Promise<void>
  disconnect: () => void
  isReady: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    network: 'testnet',
    balance: null,
    loading: false,
    error: null,
  })

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check for existing wallet connection on mount
    const checkWallet = async () => {
      try {
        if (typeof window !== 'undefined' && (window as any).stellar) {
          const publicKey = await (window as any).stellar.getPublicKey?.()
          if (publicKey) {
            setWallet((prev) => ({
              ...prev,
              isConnected: true,
              publicKey,
            }))
          }
        }
      } catch (error) {
        console.debug('No wallet found:', error)
      } finally {
        setIsReady(true)
      }
    }

    checkWallet()
  }, [])

  const connect = async (type: 'freighter' | 'passkey') => {
    setWallet((prev) => ({ ...prev, loading: true, error: null }))

    try {
      if (type === 'freighter') {
        if (typeof window === 'undefined' || !(window as any).freighter) {
          throw new Error('Freighter wallet not found. Please install it.')
        }

        const publicKey = await (window as any).freighter.getPublicKey?.()
        if (!publicKey) {
          throw new Error('Failed to get public key from Freighter')
        }

        setWallet((prev) => ({
          ...prev,
          isConnected: true,
          publicKey,
          loading: false,
          error: null,
        }))
      } else if (type === 'passkey') {
        // Import WebAuthn utilities
        const { isWebAuthnSupported, authenticateWithWebAuthn } = await import('./webauthn')

        if (!isWebAuthnSupported()) {
          throw new Error('WebAuthn not supported on this browser')
        }

        const { publicKey } = await authenticateWithWebAuthn()

        if (!publicKey) {
          throw new Error('Failed to authenticate with passkey')
        }

        setWallet((prev) => ({
          ...prev,
          isConnected: true,
          publicKey,
          loading: false,
          error: null,
        }))
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : WALLET_MESSAGES.error
      setWallet((prev) => ({
        ...prev,
        loading: false,
        error: message,
      }))
    }
  }

  const disconnect = () => {
    setWallet({
      isConnected: false,
      publicKey: null,
      network: 'testnet',
      balance: null,
      loading: false,
      error: null,
    })
  }

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, isReady }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}
