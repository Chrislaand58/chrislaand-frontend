# Content Replacement Template

Use this as a reference for updating all repositories to remove project-specific references.

## Search & Replace Patterns

### Pattern 1: Project Names

```
SEARCH:    Drips Wave
REPLACE:   Web3 [Purpose]
           (e.g., Web3 Backend, Web3 Frontend, etc.)

SEARCH:    Drips Wave Protocol
REPLACE:   Web3 Application

SEARCH:    DripWave
REPLACE:   [AppName]

SEARCH:    drips-wave
REPLACE:   chrislaand-[type]

SEARCH:    Montero
REPLACE:   [Remove or replace with generic]
```

### Pattern 2: Feature Names

```
SEARCH:    Streaming
REPLACE:   Transactions (or remove context)

SEARCH:    Withdraw
REPLACE:   Execute (if applicable)

SEARCH:    Claims
REPLACE:   Operations

SEARCH:    Drips Protocol
REPLACE:   Protocol (or remove)
```

### Pattern 3: UI/Display Text

```
SEARCH:    Drips Wave Protocol
REPLACE:   Web3 Interface

SEARCH:    🌊 Drips Wave Protocol
REPLACE:   ⚡ Web3 Interface

SEARCH:    Create New Stream
REPLACE:   Create New Transaction

SEARCH:    Incoming Streams
REPLACE:   Incoming

SEARCH:    Outgoing Streams
REPLACE:   Outgoing
```

## File-by-File Updates

### README.md

**BEFORE:**
```markdown
# Drips Wave Protocol - Frontend

A real-time streaming Web3 interface for continuous token transfers on Stellar Soroban using Next.js 14, Tailwind CSS, and Stellar SDK.
```

**AFTER:**
```markdown
# Web3 Frontend

A professional Web3 interface for real-time transactions and on-chain interactions using Next.js 14, Tailwind CSS, and blockchain integration.
```

---

**BEFORE:**
```markdown
## Features

### 🌊 Real-Time Streaming
- **20 FPS client-side ticker**: Smooth, sub-second balance updates
- **7 decimal precision**: Display token balances down to millionths
- **Live network status**: Ledger sequence monitoring
```

**AFTER:**
```markdown
## Features

### ⚡ Real-Time Updates
- **20 FPS client-side ticker**: Smooth, sub-second updates
- **Configurable precision**: Flexible decimal places
- **Network monitoring**: Live status tracking
```

---

**BEFORE:**
```markdown
## Wallet Integration

Integrate @creabt/stellar-wallet-kit supporting Freighter wallet connection and Passkey (Secp256r1) WebAuthn logins.
```

**AFTER:**
```markdown
## Wallet Integration

Multiple wallet authentication methods for secure sign-in and transaction approval.
```

### Code Files (*.ts, *.tsx)

**BEFORE:**
```typescript
export default function DripsDashboard() {
  // Component code
}
```

**AFTER:**
```typescript
export default function Dashboard() {
  // Component code
}
```

---

**BEFORE:**
```typescript
<h1 className="text-2xl font-bold text-gradient">🌊 Drips Wave Protocol</h1>
```

**AFTER:**
```typescript
<h1 className="text-2xl font-bold text-gradient">⚡ Web3 Interface</h1>
```

---

**BEFORE:**
```typescript
const DRIPS_CONFIG = {
  defaultNetwork: 'testnet',
  minRatePerSec: 0.00001,
  // ...
}
```

**AFTER:**
```typescript
const APP_CONFIG = {
  // Customizable per project
  defaultNetwork: 'testnet',
  // ...
}
```

### Documentation Files

**CONTRIBUTING.md** - Already generic ✅
**SECURITY.md** - Already generic ✅
**CODE_OF_CONDUCT.md** - Already generic ✅
**LICENSE** - Already generic ✅

### Constants File

**src/lib/constants.ts**

**BEFORE:**
```typescript
export const DRIPS_WAVE_CONTRACT = {
  testnet: {
    dripsWave: 'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4',
  },
}
```

**AFTER:**
```typescript
// Move to config file or environment variables
// Leave as template for customization
export const PROTOCOL_CONFIG = {
  // Update per project
  // testnet: { contractAddress: '...' },
  // mainnet: { contractAddress: '...' },
}
```

### Types File

**src/lib/types.ts**

**BEFORE:**
```typescript
export interface StreamData {
  id: number
  sender: string
  recipient: string
  ratePerSec: number // Tokens per second
  lastUpdate: number // Unix Epoch
  baseBalance: number
}
```

**AFTER:**
```typescript
export interface TransactionData {
  id: number
  sender: string
  recipient: string
  amount: number // Customizable per project
  timestamp: number
  status: 'pending' | 'completed' | 'failed'
}

// Or keep StreamData for Drips Wave specific
// export interface StreamData extends TransactionData {
//   ratePerSec: number
//   baseBalance: number
// }
```

## Configuration Changes

### package.json

**BEFORE:**
```json
{
  "name": "drips-wave-frontend",
  "description": "Real-time streaming tokens UI for Drips Wave Protocol on Stellar Soroban"
}
```

**AFTER:**
```json
{
  "name": "chrislaand-frontend",
  "description": "Professional Web3 frontend for real-time transactions and on-chain interactions"
}
```

### Environment Variables

**.env.example**

**BEFORE:**
```env
NEXT_PUBLIC_DRIPS_CONTRACT=CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4
```

**AFTER:**
```env
# Customizable per project
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_RPC_ENDPOINT=
NEXT_PUBLIC_NETWORK=testnet
```

## Comments in Code

**Search for and update comments:**

```typescript
// BEFORE
// Drips Wave streaming logic
// Calculate claimable balance for Drips protocol

// AFTER
// Real-time calculation logic
// Calculate current value based on rate and time
```

## Git Commit Message

When committing all these changes:

```
refactor: Generify project - remove protocol-specific references

- Remove Drips Wave specific branding
- Remove Montero references
- Update terminology to generic (streams → transactions)
- Make code reusable for multiple projects
- Update documentation for flexibility
- Rename components and functions for clarity

BREAKING CHANGE: TypeScript interfaces and component names have changed
```

## Verification Checklist

After making replacements, verify:

- [ ] No "Drips Wave" mentions remain (search entire repo)
- [ ] No "Montero" mentions remain
- [ ] No project-specific contract addresses hardcoded
- [ ] UI titles are generic
- [ ] Documentation is neutral
- [ ] Code is still functional
- [ ] Types are updated or aliased properly
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Tests pass (if applicable)

## Search Commands

Use these to find remaining references:

```bash
# Find all Drips references
grep -r "Drips" . --include="*.ts" --include="*.tsx" --include="*.md"

# Find all Montero references
grep -r "Montero" . --include="*.ts" --include="*.tsx" --include="*.md"

# Find project-specific patterns
grep -r "drips-wave" . --include="*.ts" --include="*.tsx" --include="*.json"
grep -r "DripsDashboard" . --include="*.ts" --include="*.tsx"
```

## For Each Repository Type

### Frontend
- [ ] Update main dashboard component name
- [ ] Update UI titles and branding
- [ ] Generify feature names
- [ ] Update README with generic purpose
- [ ] Ensure flexible for customization

### Backend
- [ ] Update API documentation
- [ ] Generify endpoint descriptions
- [ ] Remove project-specific logic references
- [ ] Update README
- [ ] Make configuration flexible

### Smart Contracts
- [ ] Update contract names/titles
- [ ] Generify documentation
- [ ] Make extensible for other projects
- [ ] Update README
- [ ] Add customization points

### Shared Libraries
- [ ] Make completely generic
- [ ] Remove project references
- [ ] Clear documentation
- [ ] Reusable across projects

## Common Mistakes to Avoid

❌ **Don't remove functionality**, just make it generic
❌ **Don't break existing functionality**
❌ **Don't remove comments** entirely, just make them generic
❌ **Don't change interfaces** without versioning
✅ **Do maintain backward compatibility** where possible
✅ **Do make things configurable**
✅ **Do add examples** for customization
✅ **Do test thoroughly** after changes

---

Use this template for all repositories in your organization for consistent, professional results.
