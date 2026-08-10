# Multi-Repository Cleanup & Generification Guide

## Overview

This guide will help you update all repositories in your `chrislaand58` organization to:
1. ✅ Use consistent `chrislaand-` naming convention
2. ✅ Remove "Drips Wave" and "Montero" specific references
3. ✅ Make them generic for multiple projects
4. ✅ Use professional documentation

## Repositories to Update

Based on your organization, you likely have:

1. **drips-wave-frontend** → **chrislaand-frontend** ✅ (Already updated)
2. **[backend/api repo]** → **chrislaand-backend**
3. **[other repo]** → **chrislaand-[purpose]**

## Step 1: Identify All Repositories

### Your org: chrislaand58
Go to: https://github.com/chrislaand58?tab=repositories

List all repos and note:
- Current names
- What they contain
- What to rename them to
- What specific content mentions Drips Wave/Montero

## Step 2: Rename Pattern

**Naming Convention:**
```
OLD:  [project-name]-[type]
      Example: drips-wave-frontend

NEW:  chrislaand-[type]
      Example: chrislaand-frontend, chrislaand-backend, chrislaand-contracts
```

## Step 3: Update Repository Settings

For each repository:

### Rename Repository
1. Go to: `https://github.com/chrislaand58/[old-name]/settings`
2. Find: "Repository name" field
3. Change: Old name → New name pattern
4. Click: Rename

### Update Description
- Remove project-specific references
- Make it generic

### Update Topics
Use consistent topics across all repos:
- `web3`
- `blockchain`
- `stellar`
- `open-source`
- Add language-specific topics

## Step 4: Remove Project-Specific References

### Search & Replace Patterns

**Search for these patterns and remove/generify:**

1. **"Drips Wave"**
   - UI titles
   - Documentation
   - Comments
   - Descriptions

2. **"Montero"**
   - All references

3. **Project-specific terminology**
   - "Streams" → "Transactions" (or keep generic)
   - "Withdraw" → "Execute" (if applicable)
   - Protocol-specific names → Generic alternatives

### Example Changes

```typescript
// BEFORE
const DRIPS_CONFIG = {
  contract: '0x...',
  network: 'Stellar Soroban'
}

// AFTER
const APP_CONFIG = {
  // Customizable per project
}
```

```markdown
// BEFORE
# Drips Wave Protocol

// AFTER
# Web3 Application
```

## Step 5: Standardize Documentation

Each repository should have:

- ✅ `LICENSE` (MIT)
- ✅ `README.md` (Generic)
- ✅ `CONTRIBUTING.md` (Generic)
- ✅ `SECURITY.md` (Generic)
- ✅ `CODE_OF_CONDUCT.md` (Generic)
- ✅ `.gitignore` (Proper)
- ✅ `.github/workflows/` (CI/CD)

All documentation should be:
- Generic (not project-specific)
- Professional
- Consistent across repos
- Reusable

## Step 6: Update Local Repositories

After renaming on GitHub:

```powershell
# For each repository
cd path/to/repo

# Update remote URL
git remote set-url origin https://github.com/chrislaand58/[new-name].git

# Verify
git remote -v

# Test push
git push origin main
```

## Content to Update in Each Repo

### README.md
- ❌ Remove: Project-specific branding
- ❌ Remove: "Drips Wave" mentions
- ✅ Keep: Generic functionality description
- ✅ Add: Clear customization points

### Code Files
- ❌ Remove: Hardcoded project names
- ❌ Remove: Project-specific comments
- ✅ Keep: Generic logic
- ✅ Add: Configuration examples

### Constants/Config
- ❌ Remove: Project-specific values
- ✅ Add: Template/example values
- ✅ Add: Documentation for customization

### Comments
- ❌ Remove: "Drips Wave" references
- ✅ Keep: Technical explanations
- ✅ Make: Generic and reusable

## Example: Complete Update for One Repo

### 1. Rename
```
FROM: drips-wave-backend
TO:   chrislaand-backend
```

### 2. Update README
```markdown
FROM:
# Drips Wave Backend API

TO:
# Web3 Backend Services

Provides APIs for Web3 applications.
Customizable for multiple protocols and use cases.
```

### 3. Update Code
```typescript
FROM:
const DRIPS_WAVE_CONFIG = { ... }

TO:
const APP_CONFIG = { ... }
```

### 4. Update Description
```
FROM:
Backend API for Drips Wave Protocol

TO:
Customizable backend services for Web3 applications
```

### 5. Commit & Push
```bash
git add -A
git commit -m "refactor: Make project generic and rename

- Rename repository to chrislaand-backend
- Remove project-specific references
- Make code reusable for multiple projects
- Update documentation to be generic"

git push origin main
```

## Checklist for Each Repository

### [ ] Rename
- [ ] Repository renamed on GitHub
- [ ] Local git remote updated
- [ ] Push successful

### [ ] Content Updates
- [ ] README.md - Generified
- [ ] Remove "Drips Wave" mentions
- [ ] Remove "Montero" mentions
- [ ] Update descriptions

### [ ] Code Changes
- [ ] Config files generified
- [ ] No hardcoded project names
- [ ] Comments updated
- [ ] Examples are generic

### [ ] Documentation
- [ ] LICENSE present
- [ ] CONTRIBUTING.md present
- [ ] SECURITY.md present
- [ ] CODE_OF_CONDUCT.md present

### [ ] Commit & Push
- [ ] All changes committed
- [ ] Pushed to main branch
- [ ] Verified on GitHub

## Consistency Across Organization

After updates, your repos should have:

### Naming
- ✅ All start with `chrislaand-`
- ✅ Clear purpose in name
- ✅ Consistent format

### Documentation
- ✅ Same LICENSE (MIT)
- ✅ Same CODE_OF_CONDUCT
- ✅ Similar CONTRIBUTING guide
- ✅ Similar structure

### Content
- ✅ No project-specific branding
- ✅ Generic descriptions
- ✅ Clear customization points
- ✅ Professional quality

## Tools & Resources

### GitHub Web Interface
- Rename: `Settings → Repository name`
- Edit: `README.md` inline editor
- Check: Issues, PRs, Actions tabs

### Local Git Commands
```bash
# Update remote
git remote set-url origin [new-url]

# Verify
git remote -v

# Commit changes
git add -A
git commit -m "..."

# Push
git push origin main
```

### Search & Replace
- Use your code editor's find/replace
- Or use command line: `grep -r "Drips Wave" .`

## Timeline

Suggested order of updates:

1. ✅ **chrislaand-frontend** - Already done!
2. [ ] **[Backend/API repo]** - Next priority
3. [ ] **[Other repo]** - Continue
4. [ ] **[Additional repos]** - Complete sweep

## Post-Update

After all repos are updated:

### Verify
- [ ] Visit each repo on GitHub
- [ ] Check no "Drips Wave" visible
- [ ] Check no "Montero" visible
- [ ] Check consistent naming
- [ ] Check professional docs

### Share
- [ ] Update any documentation pointing to repos
- [ ] Share new URLs with team
- [ ] Update README/docs in each repo with cross-links

### Documentation
- Create: Top-level `chrislaand/` documentation
- Link: All repos from central location
- Explain: How each repo can be customized

## Support

If you need help with:
- **Renaming**: Use GitHub Settings UI
- **Content update**: Find/replace in editor
- **Git push**: Check git remote with `git remote -v`
- **Documentation**: Copy from chrislaand-frontend

## Next Steps

1. List all repos in your org
2. Plan renames following `chrislaand-` pattern
3. Execute renames one by one
4. Update content for each
5. Verify all changes on GitHub
6. Update documentation

---

**Remember**: This makes your repos professional, reusable, and ready for multiple projects while maintaining consistency across your organization.
