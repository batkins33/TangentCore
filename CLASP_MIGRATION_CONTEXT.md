# Clasp Identity Migration Context & Plan

**Date:** 2025-11-23
**Objective:** Transition Google Apps Script deployment identity from `batkins33` (Personal) to `brian@tangentforge.com` (Business) while retaining `batkins33` for GitHub commits.

---

## 🛑 Current State Snapshot

**Repository:** `u:\TANGENT_FORGE\utilities\Workspace_Apps\TangentCore`
**Current Version:** v2.0.0-alpha (Codebase updated, Docs updated)
**Pending Changes:**
- `CleanerModule.gs` needs renaming to `CleanupModule.gs`
- `Code.gs` needs reference update to `CleanupModule`
- `Sidebar.html` IDs updated to `cleanup` (Done)

**Critical Files:**
- `appsscript.json` (Manifest with new scopes)
- `Code.gs` (Router logic)
- `Sidebar.html` (UI)

---

## 🗺️ Migration Plan

### 1. The Conflict
- **GitHub Identity:** `batkins33` (Personal) - *Keep for commits*
- **Clasp Identity:** `brian@tangentforge.com` (Business) - *Switch for deployment*

### 2. Migration Steps

#### Step A: GitHub Organization Setup (Manual)
1. Log into GitHub as `batkins33`.
2. Create Organization: **Tangent Forge** (Free Plan).
3. Create Repository: `tangent-workspace-utilities`.

#### Step B: Clasp Identity Switch (Terminal)
1. **Logout of Personal Account:**
   ```bash
   clasp logout
   ```
2. **Login as Business Account:**
   ```bash
   clasp login
   ```
   > **CRITICAL:** Select `brian@tangentforge.com` in the browser popup.

#### Step C: Link Local Project
1. Go to Google Script Editor (Business Account).
2. Create/Open "Tangent Forge Utilities" script.
3. Get **Script ID** from Project Settings.
4. **Update `.clasp.json`:**
   - Instead of cloning to a new folder, we will update the existing `.clasp.json` file with the NEW Script ID.
   - *Alternative:* `clasp clone "SCRIPT_ID"` if starting fresh.

### 3. Workflow Separation

| Action | Identity | Location | Purpose |
| :--- | :--- | :--- | :--- |
| **Code Gen** | AI Agent | Local | Writing code |
| **Commit** | `batkins33` | GitHub Org | Source Control |
| **Deploy** | `brian@tangentforge.com` | Google Workspace | Production Deployment |

---

## ⚠️ Recovery Plan

If the migration fails or code is lost:
1. **Source of Truth:** The local files in `u:\TANGENT_FORGE\utilities\Workspace_Apps\TangentCore` are the master copy.
2. **Backup:** Ensure all local changes are committed to git *before* switching clasp accounts.
3. **Restoration:** If `.clasp.json` gets corrupted, simply create a new one with the correct Script ID.

---

**Next Immediate Action:** User to perform `clasp logout` and `clasp login`.
