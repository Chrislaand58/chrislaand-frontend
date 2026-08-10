/**
 * Zustand store for application state management
 */

import { create } from 'zustand'
import { StreamData, WalletState } from './types'

interface StreamStore {
  streams: StreamData[]
  selectedStreamId: number | null
  addStream: (stream: StreamData) => void
  removeStream: (id: number) => void
  updateStream: (id: number, updates: Partial<StreamData>) => void
  selectStream: (id: number) => void
  clearStreams: () => void
}

export const useStreamStore = create<StreamStore>((set) => ({
  streams: [],
  selectedStreamId: null,

  addStream: (stream: StreamData) =>
    set((state) => ({
      streams: [...state.streams, stream],
    })),

  removeStream: (id: number) =>
    set((state) => ({
      streams: state.streams.filter((s) => s.id !== id),
      selectedStreamId: state.selectedStreamId === id ? null : state.selectedStreamId,
    })),

  updateStream: (id: number, updates: Partial<StreamData>) =>
    set((state) => ({
      streams: state.streams.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),

  selectStream: (id: number) =>
    set(() => ({
      selectedStreamId: id,
    })),

  clearStreams: () =>
    set(() => ({
      streams: [],
      selectedStreamId: null,
    })),
}))

interface UIStore {
  isModalOpen: boolean
  modalType: 'create' | 'withdraw' | 'settings' | null
  notification: {
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  } | null
  openModal: (type: 'create' | 'withdraw' | 'settings') => void
  closeModal: () => void
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration?: number
  ) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isModalOpen: false,
  modalType: null,
  notification: null,

  openModal: (type: 'create' | 'withdraw' | 'settings') =>
    set(() => ({
      isModalOpen: true,
      modalType: type,
    })),

  closeModal: () =>
    set(() => ({
      isModalOpen: false,
      modalType: null,
    })),

  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration = 3000) => {
    set(() => ({
      notification: { message, type },
    }))

    setTimeout(() => {
      set(() => ({
        notification: null,
      }))
    }, duration)
  },
}))

interface CacheStore {
  balances: Record<string, number>
  lastUpdate: Record<string, number>
  setBalance: (address: string, balance: number) => void
  getBalance: (address: string) => number | undefined
  clearCache: () => void
}

export const useCacheStore = create<CacheStore>((set, get) => ({
  balances: {},
  lastUpdate: {},

  setBalance: (address: string, balance: number) =>
    set((state) => ({
      balances: { ...state.balances, [address]: balance },
      lastUpdate: { ...state.lastUpdate, [address]: Date.now() },
    })),

  getBalance: (address: string) => get().balances[address],

  clearCache: () =>
    set(() => ({
      balances: {},
      lastUpdate: {},
    })),
}))
