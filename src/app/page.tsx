'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from '@/lib/wallet-context'
import { useStreamStore, useUIStore } from '@/lib/store'
import { StreamData, StreamFormData } from '@/lib/types'
import {
  StreamCard,
  NetworkStatus,
  WalletButton,
  StreamForm,
  Modal,
  Notification,
  LoadingSpinner,
} from '@/components'
import { formatBalance } from '@/lib/utils'
import { STREAM_DEFAULTS } from '@/lib/constants'

export default function DripsDashboard() {
  const { wallet, isReady } = useWallet()
  const streams = useStreamStore((state) => state.streams)
  const addStream = useStreamStore((state) => state.addStream)
  const removeStream = useStreamStore((state) => state.removeStream)
  const { isModalOpen, modalType, openModal, closeModal, notification, showNotification } =
    useUIStore()

  const [incomingStreams, setIncomingStreams] = useState<StreamData[]>([])
  const [outgoingStreams, setOutgoingStreams] = useState<StreamData[]>([])
  const [selectedStream, setSelectedStream] = useState<StreamData | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [totalIncoming, setTotalIncoming] = useState(0)
  const [totalOutgoing, setTotalOutgoing] = useState(0)

  // Initialize with sample data
  useEffect(() => {
    if (wallet.isConnected && streams.length === 0) {
      const sampleIncoming: StreamData = {
        id: 1,
        sender: 'GBVEOOY3I2IYKELSQVQ2XJJLQYHZ3XEOJEXVAH5GBPP4V4ZM4YKTJZO',
        recipient: wallet.publicKey || '',
        ratePerSec: 0.0005,
        lastUpdate: Math.floor(Date.now() / 1000),
        baseBalance: 120.5,
        totalDeposited: 500,
        startTime: Math.floor(Date.now() / 1000) - 86400,
      }

      const sampleOutgoing: StreamData = {
        id: 2,
        sender: wallet.publicKey || '',
        recipient: 'GBKZKNMQH3GQVG7IXZZGBZXCMMDGM4P2QKSAYTQNXTQ4DQKWQ4I37ND',
        ratePerSec: 0.0003,
        lastUpdate: Math.floor(Date.now() / 1000),
        baseBalance: 200,
        totalDeposited: 1000,
        startTime: Math.floor(Date.now() / 1000) - 86400 * 7,
      }

      addStream(sampleIncoming)
      addStream(sampleOutgoing)
    }
  }, [wallet.isConnected, wallet.publicKey])

  // Update incoming/outgoing streams
  useEffect(() => {
    if (!wallet.isConnected) return

    const incoming = streams.filter(
      (s) => s.recipient === wallet.publicKey && s.sender !== wallet.publicKey
    )
    const outgoing = streams.filter((s) => s.sender === wallet.publicKey)

    setIncomingStreams(incoming)
    setOutgoingStreams(outgoing)

    // Calculate totals
    const incomingTotal = incoming.reduce((sum, s) => sum + s.ratePerSec, 0)
    const outgoingTotal = outgoing.reduce((sum, s) => sum + s.ratePerSec, 0)

    setTotalIncoming(incomingTotal)
    setTotalOutgoing(outgoingTotal)
  }, [streams, wallet.isConnected, wallet.publicKey])

  const handleCreateStream = async (formData: StreamFormData) => {
    setFormLoading(true)
    setFormError(null)

    try {
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newStream: StreamData = {
        id: Math.max(0, ...streams.map((s) => s.id)) + 1,
        sender: wallet.publicKey || '',
        recipient: formData.recipientAddress,
        ratePerSec: formData.ratePerSec,
        lastUpdate: Math.floor(Date.now() / 1000),
        baseBalance: formData.initialDeposit,
        totalDeposited: formData.initialDeposit,
        startTime: Math.floor(Date.now() / 1000),
        endTime: Math.floor(Date.now() / 1000) + formData.duration,
      }

      addStream(newStream)
      showNotification(`Stream created successfully! Streaming ${formData.ratePerSec} XLM/sec`, 'success')
      closeModal()
      setFormError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create stream'
      setFormError(message)
      showNotification(message, 'error')
    } finally {
      setFormLoading(false)
    }
  }

  const handleWithdraw = async (stream: StreamData) => {
    try {
      showNotification(`Withdrew from stream #${stream.id}`, 'success')
      removeStream(stream.id)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to withdraw'
      showNotification(message, 'error')
    }
  }

  if (!isReady) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6">
        <LoadingSpinner size="lg" message="Initializing Drips Wave..." />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌊</div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">Drips Wave Protocol</h1>
              <p className="text-xs text-slate-400">Real-time streaming on Stellar Soroban</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <NetworkStatus network="testnet" compact />
            </div>
            <WalletButton variant="compact" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {!wallet.isConnected ? (
          // Not Connected State
          <div className="card-border rounded-2xl p-12 text-center space-y-4">
            <div className="text-5xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-slate-100">Connect Your Wallet</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Connect your Stellar wallet to start streaming tokens in real-time with millisecond precision.
            </p>
            <div className="pt-4">
              <WalletButton />
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Incoming */}
              <div className="card-border rounded-xl p-4 space-y-2">
                <p className="text-xs text-slate-500 font-medium">Incoming Streams</p>
                <p className="text-2xl font-bold text-green-400">
                  {formatBalance(totalIncoming * 2592000, 7)}
                </p>
                <p className="text-xs text-slate-400">XLM/month</p>
              </div>

              {/* Outgoing */}
              <div className="card-border rounded-xl p-4 space-y-2">
                <p className="text-xs text-slate-500 font-medium">Outgoing Streams</p>
                <p className="text-2xl font-bold text-red-400">
                  {formatBalance(totalOutgoing * 2592000, 7)}
                </p>
                <p className="text-xs text-slate-400">XLM/month</p>
              </div>

              {/* Network */}
              <div className="md:hidden lg:block">
                <NetworkStatus network="testnet" />
              </div>
            </div>

            {/* Incoming Streams */}
            {incomingStreams.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-100">📥 Incoming Streams</h2>
                  <span className="text-xs bg-cyan-950/50 text-cyan-400 px-2 py-1 rounded-full">
                    {incomingStreams.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {incomingStreams.map((stream) => (
                    <StreamCard
                      key={stream.id}
                      stream={stream}
                      isOutgoing={false}
                      onWithdraw={() => handleWithdraw(stream)}
                      onDetails={() => setSelectedStream(stream)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Outgoing Streams */}
            {outgoingStreams.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-100">📤 Outgoing Streams</h2>
                  <span className="text-xs bg-cyan-950/50 text-cyan-400 px-2 py-1 rounded-full">
                    {outgoingStreams.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {outgoingStreams.map((stream) => (
                    <StreamCard
                      key={stream.id}
                      stream={stream}
                      isOutgoing
                      onDetails={() => setSelectedStream(stream)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {incomingStreams.length === 0 && outgoingStreams.length === 0 && (
              <div className="card-border rounded-2xl p-12 text-center space-y-4">
                <div className="text-5xl">💧</div>
                <h3 className="text-xl font-bold text-slate-100">No Streams Yet</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Create your first stream or wait to receive one from others.
                </p>
              </div>
            )}

            {/* Create Stream Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => openModal('create')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-cyan-500/25"
              >
                ✨ Create New Stream
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen && modalType === 'create'}
        onClose={closeModal}
        title="Create New Stream"
        size="lg"
      >
        <StreamForm
          onSubmit={handleCreateStream}
          loading={formLoading}
          error={formError}
        />
      </Modal>

      {/* Notifications */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => {
            // Notification will auto-close
          }}
        />
      )}
    </main>
  )
}
