/**
 * Stellar SDK utilities for Drips Wave Protocol
 */

import * as StellarSDK from '@stellar/stellar-sdk'
import { StreamData, TransactionResult, NetworkStatus } from './types'
import { STELLAR_NETWORKS, XLM_DECIMALS, SOROBAN_CONTRACTS } from './constants'

// Initialize Stellar server
let server: StellarSDK.Horizon.Server | null = null

export function getStellarServer(network: 'testnet' | 'public' = 'testnet'): StellarSDK.Horizon.Server {
  if (!server) {
    const url = STELLAR_NETWORKS[network].url
    server = new StellarSDK.Horizon.Server(url)
  }
  return server
}

/**
 * Get Soroban RPC client
 */
export function getSorobanRpc(network: 'testnet' | 'public' = 'testnet'): string {
  return STELLAR_NETWORKS[network].rpc
}

/**
 * Get network passphrase for transaction signing
 */
export function getNetworkPassphrase(network: 'testnet' | 'public' = 'testnet'): string {
  return STELLAR_NETWORKS[network].passphrase
}

/**
 * Fetch account information
 */
export async function getAccountInfo(publicKey: string, network: 'testnet' | 'public' = 'testnet') {
  try {
    const horizonServer = getStellarServer(network)
    const account = await horizonServer.loadAccount(publicKey)
    return {
      sequence: account.sequenceNumber(),
      balances: account.balances,
      signers: account.signers,
    }
  } catch (error) {
    console.error('Failed to fetch account info:', error)
    throw error
  }
}

/**
 * Get XLM balance for an account
 */
export async function getBalance(publicKey: string, network: 'testnet' | 'public' = 'testnet'): Promise<number> {
  try {
    const accountInfo = await getAccountInfo(publicKey, network)
    const xlmBalance = accountInfo.balances.find((b) => b.asset_type === 'native')
    return xlmBalance ? parseFloat(xlmBalance.balance) : 0
  } catch (error) {
    console.error('Failed to get balance:', error)
    return 0
  }
}

/**
 * Build a payment transaction
 */
export async function buildPaymentTransaction(
  fromPublicKey: string,
  toPublicKey: string,
  amount: string,
  memo?: string,
  network: 'testnet' | 'public' = 'testnet'
): Promise<StellarSDK.Transaction> {
  try {
    const horizonServer = getStellarServer(network)
    const account = await horizonServer.loadAccount(fromPublicKey)
    const passphrase = getNetworkPassphrase(network)

    const builder = new StellarSDK.TransactionBuilder(account, {
      fee: StellarSDK.BASE_FEE,
      networkPassphrase: passphrase,
    })

    builder.addOperation(
      StellarSDK.Operation.payment({
        destination: toPublicKey,
        asset: StellarSDK.Asset.native(),
        amount,
      })
    )

    if (memo) {
      builder.addMemo(StellarSDK.Memo.text(memo.slice(0, 28)))
    }

    builder.setTimeout(300)
    return builder.build()
  } catch (error) {
    console.error('Failed to build payment transaction:', error)
    throw error
  }
}

/**
 * Build a create account transaction
 */
export async function buildCreateAccountTransaction(
  fromPublicKey: string,
  newAccountPublicKey: string,
  startingBalance: string,
  network: 'testnet' | 'public' = 'testnet'
): Promise<StellarSDK.Transaction> {
  try {
    const horizonServer = getStellarServer(network)
    const account = await horizonServer.loadAccount(fromPublicKey)
    const passphrase = getNetworkPassphrase(network)

    const builder = new StellarSDK.TransactionBuilder(account, {
      fee: StellarSDK.BASE_FEE,
      networkPassphrase: passphrase,
    })

    builder.addOperation(
      StellarSDK.Operation.createAccount({
        destination: newAccountPublicKey,
        startingBalance,
      })
    )

    builder.setTimeout(300)
    return builder.build()
  } catch (error) {
    console.error('Failed to build create account transaction:', error)
    throw error
  }
}

/**
 * Submit a transaction to the network
 */
export async function submitTransaction(
  transaction: StellarSDK.Transaction,
  network: 'testnet' | 'public' = 'testnet'
): Promise<TransactionResult> {
  try {
    const horizonServer = getStellarServer(network)
    const result = await horizonServer.submitTransaction(transaction)

    return {
      success: true,
      hash: result.id,
      ledger: result.ledger,
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Transaction submission failed:', error)

    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Get network health status
 */
export async function getNetworkStatus(network: 'testnet' | 'public' = 'testnet'): Promise<NetworkStatus> {
  try {
    const horizonServer = getStellarServer(network)
    const startTime = Date.now()
    const ledgers = await horizonServer.ledgers().limit(1).order('desc').call()
    const latency = Date.now() - startTime

    const latestLedger = ledgers.records[0]

    return {
      isHealthy: true,
      ledgerSequence: latestLedger.sequence,
      latency,
      lastUpdate: Date.now(),
    }
  } catch (error) {
    console.error('Failed to get network status:', error)

    return {
      isHealthy: false,
      ledgerSequence: 0,
      latency: 0,
      lastUpdate: Date.now(),
    }
  }
}

/**
 * Stream a Soroban contract call (for future Drips Wave contract integration)
 */
export async function invokeStreamContract(
  contractId: string,
  methodName: string,
  params: unknown[],
  fromPublicKey: string,
  network: 'testnet' | 'public' = 'testnet'
): Promise<TransactionResult> {
  try {
    // This is a placeholder for Soroban contract invocation
    // Full implementation would use @stellar/stellar-sdk's SorobanServer
    console.info(`Invoking Soroban contract: ${contractId}.${methodName}`, params)

    return {
      success: true,
      hash: '0x' + Math.random().toString(16).slice(2),
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Contract invocation failed'
    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Validate if an address is a valid Stellar public key
 */
export function isValidPublicKey(publicKey: string): boolean {
  try {
    StellarSDK.Keypair.fromPublicKey(publicKey)
    return true
  } catch {
    return false
  }
}

/**
 * Parse streaming transaction and extract stream data
 */
export function parseStreamTransaction(txn: any): StreamData | null {
  try {
    // This would parse transaction memo and operations
    // to extract stream configuration
    return null
  } catch (error) {
    console.error('Failed to parse stream transaction:', error)
    return null
  }
}

/**
 * Format amount with proper decimals
 */
export function formatAmount(amount: number, decimals: number = XLM_DECIMALS): string {
  return amount.toFixed(decimals)
}

/**
 * Parse amount string to number, handling decimals
 */
export function parseAmount(amount: string): number {
  const parsed = parseFloat(amount)
  return isNaN(parsed) ? 0 : parsed
}
