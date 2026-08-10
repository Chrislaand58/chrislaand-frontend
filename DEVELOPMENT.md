# Drips Wave - Development Guide

Quick reference for developing the Drips Wave frontend application.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000
```

## Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Type checking
npm run type-check

# Linting and format checking
npm run lint

# Build for production
npm run build

# Run production build locally
npm start
```

## Project Architecture

### App Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main dashboard (root route)
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
│
├── components/            # Reusable React components
│   ├── StreamCard.tsx     # Stream display with 20 FPS ticker
│   ├── WalletButton.tsx   # Freighter + Passkey auth
│   ├── StreamForm.tsx     # Create new stream form
│   ├── NetworkStatus.tsx  # Network health indicator
│   ├── Modal.tsx          # Generic modal wrapper
│   ├── Notification.tsx   # Toast notification
│   ├── LoadingSpinner.tsx # Loading UI
│   ├── PasskeyAuth.tsx    # WebAuthn flow
│   └── index.ts           # Component exports
│
└── lib/                   # Utilities & business logic
    ├── wallet-context.tsx # Wallet provider (React Context)
    ├── stellar.ts         # Stellar SDK utilities
    ├── webauthn.ts        # WebAuthn/Passkey helpers
    ├── hooks.ts           # Custom React hooks
    ├── store.ts           # Zustand state stores
    ├── types.ts           # TypeScript interfaces
    ├── constants.ts       # App configuration
    └── utils.ts           # Helper functions
```

## Key Technologies

### Frontend Framework
- **Next.js 14**: React framework with built-in optimization, App Router (server/client components)
- **React 18**: Latest React with concurrent features
- **TypeScript 5.3**: Full type safety

### Styling
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **PostCSS + Autoprefixer**: CSS processing

### Blockchain
- **@stellar/stellar-sdk 12.0**: Stellar network integration
- **Freighter Wallet**: Native Stellar wallet extension
- **WebAuthn API**: Browser-native passkey authentication

### State Management
- **Zustand 4.4**: Lightweight state management
- **React Context**: Wallet provider pattern

## Development Workflow

### Creating a New Component

1. Create file in `src/components/`
2. Add TypeScript types
3. Export from `src/components/index.ts`
4. Use in app

Example:

```tsx
// src/components/MyComponent.tsx
'use client'

import React from 'react'

interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>
}
```

```tsx
// src/components/index.ts
export { MyComponent } from './MyComponent'
```

### Creating a Custom Hook

```tsx
// src/lib/hooks.ts
import { useState, useEffect } from 'react'

export function useMyHook() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    // Hook logic
  }, [])

  return value
}
```

### Adding Stellar Integration

1. Add function to `src/lib/stellar.ts`
2. Import in component
3. Use in event handler or effect

Example:

```tsx
import { getBalance } from '@/lib/stellar'

const handleCheckBalance = async () => {
  const balance = await getBalance(publicKey, 'testnet')
  console.log('Balance:', balance)
}
```

## Real-Time Balance Updates

The app uses a 20 FPS (50ms interval) ticker for smooth balance animations:

```tsx
// useStreamBalance hook
const currentClaimable = useStreamBalance(stream)
// Updates every 50ms: baseBalance + elapsed * ratePerSec
```

This provides millisecond-precision updates while respecting browser render performance.

## State Management with Zustand

### Streams Store

```tsx
import { useStreamStore } from '@/lib/store'

const streams = useStreamStore((state) => state.streams)
const addStream = useStreamStore((state) => state.addStream)
const removeStream = useStreamStore((state) => state.removeStream)
```

### UI Store

```tsx
import { useUIStore } from '@/lib/store'

const isModalOpen = useUIStore((state) => state.isModalOpen)
const openModal = useUIStore((state) => state.openModal)
const showNotification = useUIStore((state) => state.showNotification)
```

## Wallet Integration

### Connect with Freighter

```tsx
import { useWallet } from '@/lib/wallet-context'

function MyComponent() {
  const { wallet, connect } = useWallet()

  return (
    <button onClick={() => connect('freighter')}>
      Connect Freighter
    </button>
  )
}
```

### Check Connection Status

```tsx
const { wallet } = useWallet()

if (wallet.isConnected) {
  console.log('Connected:', wallet.publicKey)
}
```

## TypeScript Best Practices

### Define Interfaces

```tsx
// src/lib/types.ts
export interface MyData {
  id: number
  name: string
  amount: number
}
```

### Use Strict Types

```tsx
// ✅ Good
function process(data: MyData): void {
  // ...
}

// ❌ Avoid
function process(data: any): any {
  // ...
}
```

### Type Props

```tsx
interface MyComponentProps {
  title: string
  onClick: (id: number) => void
  optional?: boolean
}

export function MyComponent({ title, onClick, optional }: MyComponentProps) {
  // ...
}
```

## Testing

### Manual Testing Checklist

- [ ] Wallet connection (Freighter)
- [ ] Passkey authentication
- [ ] Stream creation form validation
- [ ] Balance ticker updates smoothly
- [ ] Network status updates
- [ ] Withdraw functionality
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] No TypeScript errors

### Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

### Code Splitting
Next.js automatically code-splits at route level. For dynamic imports:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
})
```

### Image Optimization
Always use Next.js Image:

```tsx
import Image from 'next/image'

<Image src="/logo.png" width={200} height={200} alt="Logo" />
```

### Memoization
Use React.memo for expensive components:

```tsx
const MyComponent = React.memo(function MyComponent({ prop }) {
  return <div>{prop}</div>
})
```

## Debugging

### Browser DevTools

1. Open DevTools (F12)
2. Check Console for errors
3. Use Network tab to check API calls
4. Use React DevTools extension

### TypeScript Debugging

```bash
# Check types without compiling
npm run type-check

# Build and check errors
npm run build
```

### React Debugging

Add debugging statements:

```tsx
import { useEffect } from 'react'

function MyComponent() {
  useEffect(() => {
    console.log('Component mounted')
    return () => console.log('Component unmounted')
  }, [])

  return <div>My Component</div>
}
```

## Common Issues

### Wallet Connection Fails
- Freighter extension not installed
- Freighter extension not unlocked
- Wrong network selected in Freighter
- Try refreshing page

### Build Errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Type Errors
```bash
npm run type-check
# Fix reported type issues
```

### Performance Issues
- Check bundle size: `npm run build`
- Check network tab in DevTools
- Monitor CPU usage
- Check for memory leaks

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add my feature"

# Push and create PR
git push origin feature/my-feature

# Merge when ready
git checkout main
git merge feature/my-feature
git push origin main
```

## Deployment

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick summary:
```bash
npm run build      # Build locally
npm start          # Test build
git push           # Deploy to Vercel (if configured)
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Stellar Docs](https://developers.stellar.org)
- [Zustand Docs](https://github.com/pmndrs/zustand)

## Getting Help

1. Check browser console for errors
2. Read error messages carefully
3. Check if similar issue exists
4. Create detailed bug report with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/videos
   - Environment info

---

Happy coding! 🌊
