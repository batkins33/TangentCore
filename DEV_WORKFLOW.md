# Repository Governance: Free vs. Pro Tier

## Branching Strategy
This repository uses a strict **Upstream/Downstream** model to manage the Free and Pro versions of the product.

### 1. Branches
* **`main` (The Source/Upstream):**
    * Contains the **Free Tier** code (Scanner, basic UI, Core Lib).
    * **RULE:** This branch *never* contains Pro features (Delete logic, Payment gates).
    * **Deploy:** `npm run deploy:free`

* **`feature/pro-tier` (The Downstream):**
    * Contains the **Pro Tier** code.
    * **RULE:** This branch is strictly downstream. It receives updates from `main`, but **never merges back into `main`**.
    * **Deploy:** `npm run deploy:pro`

### 2. The Merge Flow (The "River" Rule)
* **✅ CORRECT:** `git checkout feature/pro-tier` -> `git merge main`
    * (Flowing code from Free to Pro)
* **❌ FORBIDDEN:** `git checkout main` -> `git merge feature/pro-tier`
    * (Polluting the Free tier with Pro code)

### 3. Deployment Safety
* Never run `clasp push` directly. 
* Always use the npm scripts (`deploy:free` / `deploy:pro`) to ensure the correct `.clasp.json` configuration is active.
