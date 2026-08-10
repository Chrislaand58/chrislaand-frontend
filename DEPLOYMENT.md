# Drips Wave - Deployment Guide

Complete guide for deploying the Drips Wave frontend application to production.

## Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build passes without errors (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Environment variables configured
- [ ] Stellar network configured (testnet or mainnet)
- [ ] Freighter wallet extension tested
- [ ] WebAuthn passkey tested in target browsers

## Local Build Verification

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build

# Start production server (local testing)
npm run start
```

## Environment Variables

Create `.env.local` in project root:

```env
# Optional: Override default Stellar RPC endpoint
NEXT_PUBLIC_STELLAR_RPC=https://soroban-testnet.stellar.org

# Optional: Soroban contract address for Drips Wave
NEXT_PUBLIC_DRIPS_CONTRACT=CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4

# Optional: Analytics or monitoring
NEXT_PUBLIC_ANALYTICS_ID=
```

**Note**: All `NEXT_PUBLIC_*` variables are exposed to the browser. Never store secrets here.

## Vercel Deployment

### Setup

1. **Create Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Link your GitHub account

2. **Import Project**
   ```bash
   # Push code to GitHub
   git remote add origin https://github.com/your-org/drips-wave-frontend
   git push -u origin main
   ```

3. **Deploy via Vercel Dashboard**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repo
   - Vercel auto-detects Next.js
   - Configure environment variables in settings
   - Deploy

### Automated Deploys

Vercel automatically deploys on push to main:

```bash
# This triggers a production build
git push origin main
```

### Preview Deployments

Each PR automatically gets a preview deployment:

```bash
# Push to feature branch
git push origin feature/my-feature

# PR on GitHub triggers preview deployment
# Vercel comments with preview URL
```

## Docker Deployment

Build a Docker image for custom hosting:

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build Next.js
COPY . .
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

Build and run:

```bash
# Build image
docker build -t drips-wave:latest .

# Run container
docker run -p 3000:3000 drips-wave:latest

# With environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_STELLAR_RPC=https://soroban-testnet.stellar.org \
  drips-wave:latest
```

## AWS S3 + CloudFront (Static Export)

For static hosting (requires `next export`):

```bash
# Add to next.config.js
// output: 'export'

# Build static export
npm run build

# Deploy to S3
aws s3 sync out/ s3://your-bucket-name/

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

## Netlify Deployment

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repo

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

3. **Environment Variables**
   - Set in Site settings → Build & deploy → Environment

4. **Deploy**
   - Push to main branch
   - Netlify auto-builds and deploys

## Self-Hosted (Linux)

### Prerequisites
- Node.js 20+
- npm or yarn
- PM2 or systemd for process management

### Setup

```bash
# Clone repository
git clone https://github.com/your-org/drips-wave-frontend
cd drips-wave-frontend

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "drips-wave" -- start
pm2 save

# Or with systemd
# Create /etc/systemd/system/drips-wave.service
```

### Systemd Service

```ini
[Unit]
Description=Drips Wave Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/drips-wave
EnvironmentFile=/var/www/drips-wave/.env.local
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable drips-wave
sudo systemctl start drips-wave
```

## Performance Optimization

### Build Size

Analyze bundle:

```bash
npm install -g next-bundle-analyzer

# Add to next.config.js:
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

# Run analysis
ANALYZE=true npm run build
```

### Caching Headers

Configure in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600'
        }
      ]
    }
  ]
}
```

### Image Optimization

Images are automatically optimized by Next.js. Serve via `next/image`:

```tsx
import Image from 'next/image'

<Image src="/logo.png" width={200} height={200} />
```

## Security Checklist

- [ ] Disable debug logging in production
- [ ] Set secure CSP headers
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Rotate secrets regularly
- [ ] Monitor for vulnerable dependencies: `npm audit`
- [ ] Test with Content Security Policy
- [ ] Validate all user inputs client-side
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting on APIs

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update to latest safe versions
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Monitoring & Logging

### Application Monitoring

Use services like:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Built-in (Vercel only)

### Setup Sentry

```bash
npm install @sentry/nextjs

# Initialize in next.config.js
withSentry(nextConfig)
```

## Rollback Procedure

### Vercel

1. Go to Deployments
2. Click the deployment to rollback to
3. Click "Promote to Production"

### Git-based

```bash
# Rollback to previous commit
git revert HEAD
git push origin main
```

## Health Checks

Verify deployment is healthy:

```bash
# Check server response
curl https://your-app.vercel.app/

# Check API routes
curl https://your-app.vercel.app/api/health

# Check network status
curl https://your-app.vercel.app/api/network-status
```

## Support & Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Slow Performance

- Check bundle size: `npm run analyze`
- Enable Vercel Analytics
- Check database/API latency
- Enable caching headers

### Wallet Connection Issues

- Verify Freighter extension is installed
- Check browser console for errors
- Verify Stellar RPC endpoint
- Test in different browser

## Documentation

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Deployment](https://vercel.com/docs)
- [Stellar Documentation](https://developers.stellar.org)
- [Freighter Docs](https://docs.freighter.app)

---

For questions or issues, see [main README](./README.md) or create an issue on GitHub.
