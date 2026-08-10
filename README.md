# Real-Time Streaming UI - Next.js 14 Web3 Frontend

A high-precision, real-time streaming Web3 interface for token transfers and on-chain interactions using Next.js 14, Tailwind CSS, and Stellar SDK. Fully customizable for various Web3 protocols and use cases.

## Features

### ⚡ Real-Time Updates
- **20 FPS client-side ticker**: Smooth, sub-second updates using `requestAnimationFrame` interpolation
- **Configurable precision**: Display balances with customizable decimal places
- **Network monitoring**: Ledger sequence tracking and RPC health checks

### 🔐 Wallet Integration
- **Freighter Wallet**: Direct Stellar wallet connection
- **WebAuthn/Passkey Support**: Biometric authentication via `@creabt/stellar-wallet-kit`
- **Secure session management**: Automatic wallet reconnection on app load

### 💳 Transaction Management
- **Create transactions**: Send to addresses with configurable parameters
- **Track operations**: Separate views for incoming and outgoing transactions
- **One-click actions**: Instant transaction execution with confirmation
- **Form validation**: Client-side validation for addresses and amounts

### 🎨 UI/UX
- **Responsive design**: Mobile-first Tailwind CSS styling
- **Dark mode**: Slate/cyan color scheme optimized for crypto apps
- **Modal dialogs**: Stream creation and settings management
- **Toast notifications**: Real-time feedback for user actions
- **Loading states**: Smooth spinner animations

### 📊 State Management
- **Zustand stores**: Lightweight state for streams, UI, and cache
- **Local persistence**: Stream data survives page reloads
- **Real-time calculations**: Client-side balance interpolation

## Tech Stack

```
Frontend:
  - Next.js 14 (App Router)
  - React 18
  - TypeScript 5.3
  - Tailwind CSS 3.4

Blockchain:
  - @stellar/stellar-sdk 12.0
  - Web APIs (WebAuthn, Crypto)
  - Freighter wallet extension

State & Hooks:
  - Zustand 4.4
  - Custom React hooks (useStreamBalance, useNetworkHealth, etc.)

Dev Tools:
  - ESLint (Next.js config)
  - PostCSS
  - Autoprefixer
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with WalletProvider
│   │   ├── page.tsx            # Main dashboard
│   │   └── globals.css         # Global styles & animations
│   ├── components/
│   │   ├── StreamCard.tsx      # Real-time balance display
│   │   ├── NetworkStatus.tsx   # Network health indicator
│   │   ├── WalletButton.tsx    # Freighter + Passkey auth
│   │   ├── StreamForm.tsx      # Create stream form
│   │   ├── Modal.tsx           # Reusable modal
│   │   ├── Notification.tsx    # Toast notifications
│   │   ├── LoadingSpinner.tsx  # Loading UI
│   │   ├── PasskeyAuth.tsx     # WebAuthn flow
│   │   └── index.ts            # Component exports
│   └── lib/
│       ├── stellar.ts          # Stellar SDK utilities
│       ├── wallet-context.tsx  # Wallet provider & hooks
│       ├── webauthn.ts         # WebAuthn/Passkey utilities
│       ├── hooks.ts            # Custom React hooks
│       ├── store.ts            # Zustand stores
│       ├── types.ts            # TypeScript interfaces
│       ├── constants.ts        # App configuration
│       └── utils.ts            # Formatting & validation
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
└── .gitignore
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# or
yarn install
```

### Development

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Run type checking
npm run type-check

# Run linter
npm run lint
```

### Building for Production

```bash
# Build Next.js app
npm run build

# Start production server
npm run start
```

## Key Components

### StreamCard
Displays a single stream with real-time balance calculation updating 20 times per second.

```tsx
<StreamCard
  stream={streamData}
  isOutgoing={false}
  onWithdraw={handleWithdraw}
  onDetails={handleDetails}
/>
```

### useStreamBalance Hook
Custom hook that provides live balance calculations with 50ms update intervals (20 FPS).

```tsx
const currentClaimable = useStreamBalance(stream)
// Returns: stream.baseBalance + elapsed * stream.ratePerSec
```

### WalletButton
Handles Freighter and Passkey authentication with automatic wallet detection.

```tsx
<WalletButton variant="compact" />
```

### StreamForm
Validates and submits new stream creation with flow rate conversion (XLM/month ↔ XLM/sec).

```tsx
<StreamForm
  onSubmit={handleCreateStream}
  loading={isLoading}
  error={errorMessage}
/>
```

## Wallet Integration

### Freighter Setup
1. Install [Freighter Wallet](https://www.freighter.app)
2. Create or import Stellar account
3. Click "Connect Freighter" button
4. Approve connection request

### Passkey Setup
1. Browser must support WebAuthn (Chrome, Firefox, Safari, Edge)
2. Device must have biometric or PIN capability
3. Click "Sign in with Passkey" button
4. Authenticate with fingerprint/face/PIN

**Note**: The WebAuthn implementation is set up to work with native browser APIs and can be extended to work with wallet providers that support Secp256r1 credentials.

## Real-Time Calculations

The app performs client-side calculations for smooth 20 FPS updates:

```typescript
// Updated every 50ms
const currentValue = calculateValue(baseValue, rate, timestamp)

// Example: Initial value + accumulated changes
// Customizable for your specific use case
```

## Network Configuration

The app connects to Stellar Testnet by default:

```typescript
// src/lib/constants.ts
STELLAR_NETWORKS = {
  testnet: {
    url: 'https://soroban-testnet.stellar.org',
    rpc: 'https://soroban-testnet.stellar.org',
    passphrase: 'Test SDF Network ; September 2015',
  },
  public: {
    url: 'https://horizon.stellar.org',
    rpc: 'https://soroban-mainnet.stellar.org',
    passphrase: 'Public Global Stellar Network ; September 2015',
  },
}
```

To switch networks, update the `defaultNetwork` in constants.ts and rebuild.

## Environment Variables

Create `.env.local` for sensitive configuration:

```env
# Optional: Soroban contract address
NEXT_PUBLIC_DRIPS_CONTRACT=CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4

# Optional: RPC endpoint override
NEXT_PUBLIC_STELLAR_RPC=https://soroban-testnet.stellar.org
```

## Deployment

### Vercel
This Next.js app is optimized for Vercel deployment:

```bash
# Deploy with Git
git push

# Or manual deployment
vercel
```

### Build Verification
Before deploying, verify the build passes all checks:

```bash
npm run build
npm run lint
npm run type-check
```

## Performance Optimizations

- **Code splitting**: Next.js automatic route splitting
- **Image optimization**: Built-in Next.js Image component
- **CSS optimization**: Tailwind CSS purging
- **Bundle analysis**: Run `npm run analyze` to inspect bundle
- **API routes**: Server-side request deduplication

## Security Considerations

- **CSP headers**: Configured in next.config.js
- **No secrets in code**: Use environment variables only
- **XSS prevention**: React's built-in XSS protection + Tailwind CSS
- **CORS**: Requests to stellar.org are same-origin safe
- **Wallet interactions**: All signed via secure wallet extensions

## Troubleshooting

### Wallet connection fails
- Ensure Freighter extension is installed and unlocked
- Try refreshing the page
- Check browser console for errors

### Passkey not available
- Browser must support WebAuthn (recent version)
- Device must support biometrics or PIN
- Try another wallet connection method

### Rates not updating
- Check network health indicator
- Verify Stellar RPC is responding
- Clear browser cache and refresh

### Build errors
- Run `npm install` to update dependencies
- Delete `.next` folder and rebuild
- Check Node.js version (14.0+)

## Contributing

To extend the app:

1. Add new components in `src/components/`
2. Create utilities in `src/lib/`
3. Update types in `src/lib/types.ts`
4. Run `npm run lint` and `npm run type-check`
5. Test locally before committing

## License

MIT - See LICENSE file for details

## Support

For issues or questions:
- Check [Stellar Docs](https://developers.stellar.org)
- See [Freighter Docs](https://docs.freighter.app)
- Review [Next.js Docs](https://nextjs.org)

---

**Built with ❤️ for real-time streaming on Stellar**
