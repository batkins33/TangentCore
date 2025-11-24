# Brand Doc Update Instructions

## Target Repository
`tangent-forge-utilities` (or wherever brand docs live)

---

## 1. BRAND_GUIDELINES.md

### Task: Add "Approved Gradients" section after the Color System table

**Insert after line containing "Semantic Usage" section, before "Layout Principles":**

```markdown
### Approved Gradients

For logo and monogram treatments where gradient adds depth:

| Name | Stops | Usage |
|------|-------|-------|
| **Ember Core** | `#d96704 → #7c3a0a → #4a2206` | Primary logo gradient (vertical or diagonal) |
| **Copper Sheen** | `#d96704 → #A67C52 → #5a3a1a` | Alternative metallic finish |
| **Steel Anchor** | `#d96704 → #5a3a1a → #3a3a3a` | When hard edge contrast needed |

**Gradient Rules:**
- Never fade to `#1F1F23` or `#2B2D31` — creates "smudge" against backgrounds
- Terminus must contrast with primary background by ≥15% luminance
- Solid `#d96704` preferred for icons ≤96px
- Gradients reserved for hero/large brand moments (256px+)
```

### Task: Add monogram background to Color System table

**Add row to Primary Colors table:**

```markdown
| **Monogram Background** | `#282828` | Logo/icon background (slightly lighter than Forge Charcoal for contrast) |
```

---

## 2. DESIGN_ACTION_PLAN.md

### Task: Add logo treatment rules to Layer 4 section

**Insert after the "Size Limits" list in Layer 4:**

```markdown
### Logo & Monogram Treatment

**Solid (default):**
- Use `#d96704` for toolbar icons, favicons, small contexts
- Max effectiveness at ≤96px

**Gradient (large formats):**
- Use Ember Core gradient: `#d96704 → #7c3a0a → #4a2206`
- Apply for sidebar headers, hero sections, print materials
- Direction: vertical (top→bottom) or diagonal (TL→BR)

**Background:**
- Monogram uses `#282828` (not `#2B2D31`) for subtle lift from page bg
- Ensures gradient terminus `#4a2206` remains visible
```

---

## 3. BRAND_INTEGRATION_SUMMARY.md

### Task: Confirm canonical orange value

**Find and replace any instance of `#F47C26` with `#d96704`**

**Add clarification note under "Brand Colors Applied" section:**

```markdown
> **Note:** `#d96704` is the canonical Forge Orange. Legacy references to `#F47C26` should be updated.
```

---

## 4. README.md (UI Design section)

### Task: Update accent color reference

**Find:**
```markdown
- Accent: `#D96704` (Forge Orange)
```

**Replace with:**
```markdown
- Accent: `#d96704` (Forge Orange)
- Monogram Background: `#282828` (lifted from primary bg for contrast)
```

---

---

## 5. Asset Hosting (New Section or README addendum)

### Task: Add CDN hosting guidance for logo assets

**Add to README.md under "Setup Instructions" or create new `ASSET_HOSTING.md`:**

```markdown
## Logo Asset Hosting

For Google Workspace Add-ons and other integrations requiring hosted image URLs:

### Option A: jsDelivr CDN (Recommended)
Zero config — works immediately once assets are committed to repo.

```
https://cdn.jsdelivr.net/gh/tangent-forge/[repo-name]/assets/icon-toolbar.png
https://cdn.jsdelivr.net/gh/tangent-forge/[repo-name]/assets/logo-full.svg
```

**Benefits:**
- No GitHub Pages setup required
- Proper `Content-Type` headers (unlike raw.githubusercontent.com)
- Global CDN with caching
- Version pinning available: `@main`, `@v1.0.0`, or `@[commit-sha]`

### Option B: GitHub Pages
If you need custom domain or more control:

1. Enable Pages in repo Settings → Pages → Branch: `main` / `root`
2. Assets available at: `https://[org].github.io/[repo]/assets/icon.png`
3. Allow 1-5 min propagation after enabling

### Why Not Raw GitHub?
`raw.githubusercontent.com` sends `X-Content-Type-Options: nosniff` headers that block image rendering in Google Workspace manifests and some browsers.

### Asset Naming Convention
```
assets/
├── icon-toolbar.png      # 96x96 PNG (required for Workspace Add-ons)
├── icon-toolbar-48.png   # 48x48 PNG (standard density)
├── logo-full.svg         # Full wordmark for sidebars/headers
└── monogram.svg          # TF mark only (scalable)
```
```

---

## Validation Checklist

After updates, grep for these values to confirm consistency:

```bash
# Should return 0 results (deprecated)
grep -r "F47C26" --include="*.md"
grep -r "1f1f23.*gradient\|gradient.*1f1f23" --include="*.md"

# Should return multiple results (canonical)
grep -r "d96704" --include="*.md"
grep -r "282828" --include="*.md"
```

---

## Commit Message

```
docs(brand): add gradient specs, asset hosting, clarify colors

- Add Approved Gradients section to BRAND_GUIDELINES.md
- Document Ember Core, Copper Sheen, Steel Anchor variants
- Add #282828 as official monogram background
- Clarify #d96704 as canonical Forge Orange
- Add logo treatment rules to DESIGN_ACTION_PLAN.md
- Remove legacy #F47C26 references
- Add jsDelivr CDN hosting guidance for Workspace Add-on assets
- Document asset naming convention
```