/**
 * Constants for Drips Wave Protocol
 */

export const STELLAR_NETWORKS = {
  testnet: {
    name: 'Stellar Testnet',
    url: 'https://soroban-testnet.stellar.org',
    rpc: 'https://soroban-testnet.stellar.org',
    passphrase: 'Test SDF Network ; September 2015',
  },
  public: {
    name: 'Stellar Public Network',
    url: 'https://horizon.stellar.org',
    rpc: 'https://soroban-mainnet.stellar.org',
    passphrase: 'Public Global Stellar Network ; September 2015',
  },
}

export const DRIPS_CONFIG = {
  defaultNetwork: 'testnet' as const,
  minRatePerSec: 0.00001,
  maxRatePerSec: 1000,
  minDeposit: 1,
  maxDeposit: 1000000,
  decimals: 7,
}

export const UI_CONFIG = {
  tickerInterval: 50, // milliseconds (20 FPS)
  animationDuration: 300,
  toastDuration: 3000,
  debounceDelay: 300,
}

export const SOROBAN_CONTRACTS = {
  testnet: {
    dripsWave: 'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4',
  },
}

export const XLM_DECIMALS = 7
export const STROOPS_PER_XLM = 10000000

export const WALLET_MESSAGES = {
  connectPrompt: 'Connect your Stellar wallet to continue',
  connectFreighter: 'Sign in with Freighter Wallet',
  connectPasskey: 'Sign in with Passkey',
  connecting: 'Connecting wallet...',
  connected: 'Wallet connected',
  error: 'Failed to connect wallet',
}

export const STREAM_DEFAULTS = {
  ratePerSec: 0.0005,
  initialBalance: 100,
  duration: 86400 * 30, // 30 days in seconds
}
