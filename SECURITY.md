# Security Policy

## Reporting Security Issues

**Do not report security issues via GitHub issues.** 

If you discover a security vulnerability, please email `security@dripswaveprotocol.com` with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

Please allow 90 days for us to address the issue before public disclosure.

## Security Best Practices

### For Users
- Keep Node.js and npm updated
- Install dependencies regularly (`npm update`)
- Use environment variables for sensitive data
- Never commit `.env` files
- Review dependency security: `npm audit`

### For Developers
- Enable 2FA on GitHub
- Use strong, unique passwords
- Review code before committing
- Don't hardcode secrets
- Use environment variables
- Keep dependencies updated
- Follow TypeScript strict mode

## Dependencies

We use the following security practices:

- Automated dependency scanning
- Regular `npm audit` checks
- Dependabot alerts enabled
- TypeScript strict mode for type safety

### Current Dependencies
- Next.js 14 - Actively maintained
- React 18 - LTS support
- TypeScript 5.3 - Latest stable
- @stellar/stellar-sdk 12.0 - Official Stellar SDK

## Known Issues

None currently reported.

## Security Updates

We will:
- Release security patches as soon as possible
- Announce critical issues promptly
- Provide migration guidance
- Support multiple versions if needed

## Wallet Security

This application interacts with wallets:

- **Freighter Wallet**: Uses browser extension security model
- **WebAuthn/Passkey**: Uses browser native security (Secure Enclave, TPM)
- **No Private Keys**: Keys never stored locally
- **Transaction Review**: Users review/approve all transactions

## Frontend-Only

This is a frontend application with:

- No backend server
- No database with sensitive data
- No private key storage
- All interactions via browser APIs and extensions

## TLS/SSL

- Always use HTTPS in production
- Enable HSTS headers
- Validate certificates
- Use security headers (CSP, X-Frame-Options, etc.)

## Code Quality

- TypeScript strict mode prevents many vulnerabilities
- ESLint configuration enforces best practices
- Regular code reviews
- Automated testing

## Third-Party Services

We use:
- Stellar RPC endpoints (public)
- Freighter Wallet (third-party extension)
- npm registry (package manager)

All are industry-standard and security-reviewed.

## Incident Response

If a security issue is discovered:

1. Acknowledge receipt within 24 hours
2. Assess severity and impact
3. Develop fix and release patch
4. Notify users of security update
5. Publish security advisory
6. Post-incident review

## Compliance

This project follows:
- OWASP guidelines
- CWE/SANS Top 25
- Stellar security best practices
- Web3 security standards

## Questions?

For security questions: `security@dripswaveprotocol.com`
For general questions: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Last Updated:** August 2026
**Version:** 1.0
