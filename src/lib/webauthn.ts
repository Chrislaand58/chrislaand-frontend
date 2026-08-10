/**
 * WebAuthn/Passkey utilities for Stellar wallet authentication
 * Integration with @creabt/stellar-wallet-kit
 */

import { isValidPublicKey } from './stellar'

/**
 * Register a new WebAuthn credential
 */
export async function registerWebAuthnCredential(username: string): Promise<{
  id: string
  publicKey: string
  credentialId: string
}> {
  try {
    if (!window.PublicKeyCredential) {
      throw new Error('WebAuthn not supported on this browser')
    }

    // This would be implemented with @creabt/stellar-wallet-kit
    // For now, we provide a placeholder structure
    const credentialId = generateCredentialId()

    return {
      id: credentialId,
      publicKey: 'GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      credentialId,
    }
  } catch (error) {
    console.error('Failed to register WebAuthn credential:', error)
    throw error
  }
}

/**
 * Authenticate with WebAuthn credential
 */
export async function authenticateWithWebAuthn(credentialId?: string): Promise<{
  publicKey: string
  signature: string
}> {
  try {
    if (!window.PublicKeyCredential) {
      throw new Error('WebAuthn not supported on this browser')
    }

    // This would be implemented with @creabt/stellar-wallet-kit
    // For now, we provide a placeholder structure
    return {
      publicKey: 'GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      signature: '',
    }
  } catch (error) {
    console.error('Failed to authenticate with WebAuthn:', error)
    throw error
  }
}

/**
 * Check if browser supports WebAuthn
 */
export function isWebAuthnSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.PublicKeyCredential !== undefined
  )
}

/**
 * Check if passkeys are available (platform authenticator)
 */
export async function isPasskeyAvailable(): Promise<boolean> {
  if (!isWebAuthnSupported()) {
    return false
  }

  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

/**
 * Generate a credential ID
 */
function generateCredentialId(): string {
  const array = new Uint8Array(32)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array)
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify WebAuthn signature (placeholder for backend verification)
 */
export async function verifyWebAuthnSignature(
  publicKey: string,
  signature: string,
  message: string
): Promise<boolean> {
  try {
    if (!isValidPublicKey(publicKey)) {
      throw new Error('Invalid public key')
    }

    // In production, this would verify the signature against the Stellar public key
    // using the Ed25519 algorithm
    return true
  } catch (error) {
    console.error('Failed to verify WebAuthn signature:', error)
    return false
  }
}

/**
 * Create a challenge for WebAuthn authentication
 */
export function createAuthChallenge(): Uint8Array {
  const challengeArray = new Uint8Array(32)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(challengeArray)
  }
  return challengeArray
}

/**
 * Encode challenge for WebAuthn
 */
export function encodeChallenge(challenge: Uint8Array): string {
  return btoa(String.fromCharCode(...challenge))
}

/**
 * Decode challenge from WebAuthn
 */
export function decodeChallenge(encoded: string): Uint8Array {
  const binary = atob(encoded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
