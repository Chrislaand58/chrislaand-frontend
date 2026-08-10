# Contributing to Drips Wave Frontend

Thank you for your interest in contributing to Drips Wave Protocol! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on the code, not the person
- Help others learn and grow
- Report serious issues privately

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- Git
- GitHub account

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/chrislaand58/drips-wave-frontend.git
cd drips-wave-frontend

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Start development
npm run dev
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/descriptive-name
# or
git checkout -b fix/issue-number
```

Branch naming:
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation
- `refactor/*` - Code refactoring
- `perf/*` - Performance improvements

### 2. Make Changes

```bash
# Check for errors
npm run type-check
npm run lint

# Fix issues
npm run lint -- --fix

# Build to verify
npm run build
```

### 3. Commit Changes

```bash
git add .
git commit -m "type: description"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `perf:` - Performance
- `test:` - Tests
- `chore:` - Maintenance

Example:
```bash
git commit -m "feat: Add stream analytics dashboard"
git commit -m "fix: Resolve balance ticker sync issue"
```

### 4. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:
- Clear title
- Description of changes
- Related issues (if any)
- Screenshots (for UI changes)
- Testing done

## Code Style

### TypeScript
- Use strict mode (enabled by default)
- Always add types to functions
- Avoid `any` type
- Use interfaces for objects

### React Components
- Functional components only
- Use hooks for state
- Name components with PascalCase
- Add JSDoc comments

```tsx
/**
 * StreamCard displays a single stream with real-time balance
 */
interface StreamCardProps {
  stream: StreamData
  onWithdraw?: () => void
}

export function StreamCard({ stream, onWithdraw }: StreamCardProps) {
  // Component code
}
```

### Styling
- Use Tailwind CSS classes
- No inline styles
- Follow existing patterns
- Mobile-first responsive

```tsx
// ✅ Good
<div className="flex items-center gap-2 text-sm md:text-base">

// ❌ Avoid
<div style={{ display: 'flex', gap: '8px' }}>
```

## Testing

### Run Checks
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Manual Testing
- Test in development mode
- Test responsive design (mobile, tablet, desktop)
- Test wallet connections
- Test error states

## Pull Request Process

1. **Before creating PR:**
   - Run `npm run type-check`
   - Run `npm run lint`
   - Run `npm run build`
   - Test your changes thoroughly

2. **Create PR with:**
   - Descriptive title
   - Clear description
   - Related issue numbers (#123)
   - Screenshots for UI changes

3. **PR Review:**
   - Address feedback promptly
   - Keep commits clean
   - Discuss design decisions

4. **Merge:**
   - Squash commits (GitHub will do this)
   - Delete branch after merge
   - Close related issues

## Documentation

### Update these files when needed:
- `README.md` - User-facing documentation
- `DEVELOPMENT.md` - Developer guide
- `DEPLOYMENT.md` - Deployment instructions
- JSDoc comments in code

### Documentation standards:
- Clear and concise
- Include code examples
- Update related docs
- Check for typos

## Reporting Issues

### Bug Report
Include:
- Clear title
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, browser, Node version)
- Screenshots/videos if applicable

### Feature Request
Include:
- Clear title
- Description of feature
- Use case
- Proposed solution (if any)
- Acceptance criteria

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Questions?

- Check existing issues/PRs
- See [DEVELOPMENT.md](./DEVELOPMENT.md)
- Create a discussion

---

Thank you for contributing to Drips Wave! 🌊
