/**
 * Core types for Drips Wave Protocol
 */

export interface StreamData {
  id: number
  sender: string
  recipient: string
  ratePerSec: number // Tokens per second
  lastUpdate: number // Unix timestamp (seconds)
  baseBalance: number // Initial balance
  totalDeposited: number
  startTime: number
  endTime?: number
}

export interface WalletState {
  isConnected: boolean
  publicKey: string | null
  network: 'testnet' | 'public'
  balance: number | null
  loading: boolean
  error: string | null
}

export interface TransactionResult {
  success: boolean
  hash?: string
  error?: string
  ledger?: number
}

export interface StreamFormData {
  recipientAddress: string
  ratePerSec: number
  ratePerMonth: number
  initialDeposit: number
  duration: number // in seconds
}

export interface NetworkStatus {
  isHealthy: boolean
  ledgerSequence: number
  latency: number // in ms
  lastUpdate: number
}
