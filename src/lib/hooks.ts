/**
 * Custom React hooks for Drips Wave
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { StreamData } from './types'
import { calculateClaimable } from './utils'

/**
 * Hook for real-time streaming balance calculation
 * Updates every 50ms (20 FPS) for smooth UI animation
 */
export function useStreamBalance(stream: StreamData) {
  const [currentClaimable, setCurrentClaimable] = useState<number>(stream.baseBalance)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Set initial value
    setCurrentClaimable(calculateClaimable(stream.baseBalance, stream.ratePerSec, stream.lastUpdate))

    // Set up high-precision ticker
    intervalRef.current = setInterval(() => {
      setCurrentClaimable(calculateClaimable(stream.baseBalance, stream.ratePerSec, stream.lastUpdate))
    }, 50) // 50ms = 20 FPS

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [stream.baseBalance, stream.ratePerSec, stream.lastUpdate])

  return currentClaimable
}

/**
 * Hook for debounced values
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for network health monitoring
 */
export function useNetworkHealth(network: 'testnet' | 'public' = 'testnet') {
  const [ledgerSequence, setLedgerSequence] = useState<number>(0)
  const [latency, setLatency] = useState<number>(0)
  const [isHealthy, setIsHealthy] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const checkHealth = useCallback(async () => {
    try {
      // Placeholder for network status check
      // This would call getNetworkStatus from stellar.ts
      setIsHealthy(true)
      setLatency(Math.random() * 100) // Simulated latency
      setLedgerSequence((prev) => prev + 1)
    } catch (error) {
      console.error('Network health check failed:', error)
      setIsHealthy(false)
    } finally {
      setLoading(false)
    }
  }, [network])

  useEffect(() => {
    checkHealth()
    pollRef.current = setInterval(checkHealth, 10000) // Check every 10 seconds

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current)
      }
    }
  }, [checkHealth])

  return { ledgerSequence, latency, isHealthy, loading }
}

/**
 * Hook for async operations with loading/error states
 */
export function useAsync<T>(asyncFunction: () => Promise<T>, immediate = true) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setValue(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setValue(response)
      setStatus('success')
      return response
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      setStatus('error')
      throw error
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}

/**
 * Hook for local storage persistence
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue
      }

      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Failed to read from localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('Failed to write to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook for animations using requestAnimationFrame
 */
export function useAnimationFrame(callback: (deltaTime: number) => void) {
  const frameRef = useRef<number>()
  const lastTimeRef = useRef<number>(Date.now())

  const animate = useCallback(() => {
    const now = Date.now()
    const deltaTime = now - lastTimeRef.current
    lastTimeRef.current = now

    callback(deltaTime)
    frameRef.current = requestAnimationFrame(animate)
  }, [callback])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [animate])
}

/**
 * Hook to detect if component is mounted
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
