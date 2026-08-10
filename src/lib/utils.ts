/**
 * Utility functions for formatting and calculations
 */

import { XLM_DECIMALS } from './constants'

/**
 * Format a number to fixed decimal places
 */
export function formatBalance(balance: number, decimals: number = XLM_DECIMALS): string {
  return balance.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Format a short address display (first 8 + last 8 chars)
 */
export function formatAddress(address: string, chars: number = 8): string {
  if (!address || address.length < chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

/**
 * Convert rate per second to rate per month
 */
export function ratePerSecToMonth(ratePerSec: number): number {
  const secondsPerMonth = 30 * 24 * 60 * 60 // approximately 30 days
  return ratePerSec * secondsPerMonth
}

/**
 * Convert rate per month to rate per second
 */
export function ratePerMonthToSec(ratePerMonth: number): number {
  const secondsPerMonth = 30 * 24 * 60 * 60
  return ratePerMonth / secondsPerMonth
}

/**
 * Calculate claimable balance based on stream data
 */
export function calculateClaimable(
  baseBalance: number,
  ratePerSec: number,
  lastUpdate: number,
  currentTime?: number
): number {
  const now = (currentTime || Date.now()) / 1000
  const elapsed = Math.max(0, now - lastUpdate)
  const accrued = elapsed * ratePerSec
  return baseBalance + accrued
}

/**
 * Validate Stellar address
 */
export function isValidStellarAddress(address: string): boolean {
  // Stellar addresses start with G and are 56 characters
  return /^G[A-Z2-7]{55}$/.test(address)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Convert milliseconds to readable time format
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Get color based on value trend
 */
export function getTrendColor(current: number, previous: number): string {
  if (current > previous) return 'text-green-400'
  if (current < previous) return 'text-red-400'
  return 'text-slate-400'
}
