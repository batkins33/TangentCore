# Documentation Standards & Best Practices

**Version:** 1.0
**Last Updated:** 2025-11-22
**Purpose:** Enterprise-grade documentation standards for any project

---

## Table of Contents

1. [Documentation Philosophy](#documentation-philosophy)
2. [Required Documentation Files](#required-documentation-files)
3. [README Standards](#readme-standards)
4. [Code Documentation](#code-documentation)
5. [API Documentation](#api-documentation)
6. [Architecture Documentation](#architecture-documentation)
7. [User Documentation](#user-documentation)
8. [Repository Hygiene](#repository-hygiene)
9. [AI Agent Instructions](#ai-agent-instructions)
10. [Documentation Checklist](#documentation-checklist)

---

## Documentation Philosophy

### Core Principles

1. **Documentation is Code** - Version controlled, reviewed, tested
2. **Write for Humans First** - Clear, concise, helpful
3. **Keep it Updated** - Outdated docs are worse than no docs
4. **Progressive Disclosure** - Quick start → Deep dive
5. **Show, Don't Tell** - Examples over explanations

### Documentation Levels

```
Level 1: README.md           ← Quick start (5 min read)
Level 2: User Guides         ← How to use (15-30 min)
Level 3: API Reference       ← What's available (reference)
Level 4: Architecture Docs   ← How it works (deep dive)
Level 5: Contributing Guide  ← How to help (developers)
```

---

## Required Documentation Files

### Minimum Viable Documentation (MVD)

Every project MUST have:

```
project/
├── README.md              # Project overview (REQUIRED)
├── LICENSE                # License terms (REQUIRED)
├── CHANGELOG.md           # Version history (REQUIRED)
├── CONTRIBUTING.md        # How to contribute (RECOMMENDED)
├── CODE_OF_CONDUCT.md     # Community guidelines (RECOMMENDED)
└── .github/
    └── ISSUE_TEMPLATE/    # Issue templates (RECOMMENDED)
        ├── bug_report.md
        └── feature_request.md
```

### Comprehensive Documentation Structure

For production projects:

```
project/
├── README.md                      # Quick start
├── LICENSE                        # Legal terms
├── CHANGELOG.md                   # Release notes
├── CONTRIBUTING.md                # Contributor guide
├── CODE_OF_CONDUCT.md             # Community standards
├── SECURITY.md                    # Security policy
│
├── docs/                          # Documentation root
│   ├── README.md                  # Docs index
│   ├── getting-started/
│   │   ├── installation.md
│   │   ├── quick-start.md
│   │   └── configuration.md
│   ├── user-guide/
│   │   ├── features.md
│   │   ├── tutorials.md
│   │   └── examples.md
│   ├── api/
│   │   ├── README.md              # API overview
│   │   ├── authentication.md
│   │   └── endpoints.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── design-decisions.md
│   │   └── diagrams/
│   └── development/
│       ├── setup.md
│       ├── testing.md
│       └── deployment.md
│
├── .ai/                           # AI agent instructions
│   ├── README.md                  # AI docs overview
│   ├── PROJECT_CONTEXT.md         # Project context for AI
│   ├── CODING_STANDARDS.md        # Code style for AI
│   └── AUDIT_PROMPT.md            # Audit template
│
└── examples/                      # Code examples
    ├── README.md
    ├── basic-usage.js
    └── advanced-usage.js
```

---

## README Standards

### README.md Template

```markdown
# Project Name

> One-sentence description of what this project does

[![Build Status](https://img.shields.io/github/workflow/status/user/repo/CI)](https://github.com/user/repo/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](CHANGELOG.md)

## 📋 Overview

2-3 paragraph description:
- What is this project?
- What problem does it solve?
- Who is it for?

**Status:** [Alpha | Beta | Production | Deprecated]

## ✨ Features

- 🎯 Key feature 1 - Brief description
- 🚀 Key feature 2 - Brief description
- 🔒 Key feature 3 - Brief description

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Python 3.9+ (specific versions)
- Database XYZ
- API key from Service ABC

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/user/repo.git
cd repo

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Run setup
npm run setup
\`\`\`

### Basic Usage

\`\`\`javascript
// Minimal working example
const app = require('./app');

app.doSomething({
  option: 'value'
});
\`\`\`

## 📖 Documentation

- **[User Guide](docs/USER_GUIDE.md)** - Complete feature documentation
- **[API Reference](docs/API.md)** - API endpoints and methods
- **[Architecture](docs/TECHNICAL.md)** - Technical architecture
- **[Contributing](CONTRIBUTING.md)** - How to contribute
- **[Changelog](CHANGELOG.md)** - Version history

## 🛠️ Development

### Setup Development Environment

\`\`\`bash
npm run dev        # Start development server
npm run test       # Run tests
npm run lint       # Run linter
npm run build      # Build for production
\`\`\`

### Project Structure

\`\`\`
src/
├── core/          # Core functionality
├── modules/       # Feature modules
├── utils/         # Utilities
└── index.js       # Entry point
\`\`\`

## 🧪 Testing

\`\`\`bash
npm run test              # Run all tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests
npm run test:coverage     # Coverage report
\`\`\`

## 📦 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code of conduct
- Development process
- Coding standards
- Pull request process

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Thanks to [contributor/project] for [specific contribution]
- Inspired by [other project]

## 📞 Support

- **Documentation:** [docs/](docs/)
- **Issues:** [GitHub Issues](https://github.com/user/repo/issues)
- **Discussions:** [GitHub Discussions](https://github.com/user/repo/discussions)
- **Email:** support@example.com

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and improvements.

---

**Status:** Production-ready v1.0.0 | **Maintained by:** [Your Name/Team]
```

### README Best Practices

✅ **DO:**
- Keep it under 500 lines (link to detailed docs)
- Start with quick start (get user running fast)
- Use badges for build status, version, license
- Include screenshots/GIFs for UI projects
- Link to detailed documentation
- Update when features change
- Use emoji sparingly for visual scanning

❌ **DON'T:**
- Include entire API documentation
- Write tutorial-length guides
- Let it get outdated
- Use excessive emoji or styling
- Include implementation details
- Make assumptions about reader knowledge

---

## Code Documentation

### Inline Comments Standards

#### When to Comment

```javascript
// ✅ GOOD: Explain WHY, not WHAT
// Use binary search because dataset can be 1M+ items
function findItem(arr, target) {
  // Implementation...
}

// ❌ BAD: Obvious what the code does
// Loop through array
for (let i = 0; i < arr.length; i++) {
  // ...
}
```

#### Comment Types

**1. Function/Method Documentation (JSDoc, docstrings, etc.)**

```javascript
/**
 * Searches a sorted array for a target value using binary search.
 *
 * @param {Array<number>} arr - Sorted array of numbers to search
 * @param {number} target - Value to find
 * @returns {number} Index of target, or -1 if not found
 * @throws {TypeError} If arr is not an array
 *
 * @example
 * const index = binarySearch([1, 2, 3, 4, 5], 3);
 * console.log(index); // 2
 */
function binarySearch(arr, target) {
  // Implementation...
}
```

**2. Complex Logic Explanation**

```javascript
// Calculate tax using progressive brackets (10%, 20%, 30%)
// instead of flat rate to comply with 2024 tax code changes
function calculateTax(income) {
  // Implementation...
}
```

**3. TODO/FIXME/HACK/NOTE**

```javascript
// TODO: Replace with async/await when Node 18+ is minimum
// FIXME: Race condition when multiple users edit simultaneously
// HACK: Workaround for Safari bug (ticket #1234)
// NOTE: This must run before database initialization
```

**4. Architecture Decision Records (ADR)**

```javascript
/**
 * ADR: Why we use WebSockets instead of polling
 *
 * Context: Need real-time updates for collaborative editing
 * Decision: Use WebSockets for bidirectional communication
 * Consequences:
 *   - Better performance (no polling overhead)
 *   - More complex deployment (need WebSocket support)
 *   - Better user experience (instant updates)
 *
 * Date: 2025-01-15
 * Status: Accepted
 */
```

### Documentation Coverage Rules

**Required Documentation:**
- All public functions/methods
- All exported modules
- All API endpoints
- Complex algorithms
- Non-obvious business logic
- External integrations

**Optional Documentation:**
- Private helper functions (if complex)
- Getters/setters (if doing more than getting/setting)
- Self-documenting code (clear naming)

---

## API Documentation

### API Documentation Template

```markdown
# API Reference

## Authentication

All API requests require authentication using Bearer tokens.

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /api/users

Retrieve a list of users.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| filter | string | No | Filter by role (admin, user, guest) |

**Example Request:**

\`\`\`bash
curl -X GET "https://api.example.com/users?page=1&limit=20" \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

**Example Response:**

\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
\`\`\`

**Error Responses:**

| Status | Code | Description |
|--------|------|-------------|
| 401 | UNAUTHORIZED | Invalid or missing API key |
| 403 | FORBIDDEN | Insufficient permissions |
| 429 | RATE_LIMIT | Too many requests |

**Rate Limits:**
- 1000 requests per hour per API key
- Burst: 100 requests per minute
```

### OpenAPI/Swagger

For REST APIs, maintain OpenAPI 3.0 specification:

```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
  description: API for managing users

paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
```

---

## Architecture Documentation

### TECHNICAL.md Template

```markdown
# Technical Architecture

## System Overview

[High-level diagram showing major components]

## Technology Stack

### Backend
- **Runtime:** Node.js 18.x
- **Framework:** Express 4.18
- **Database:** PostgreSQL 14
- **Cache:** Redis 7.0
- **Queue:** Bull (Redis-backed)

### Frontend
- **Framework:** React 18
- **State:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Build:** Vite

## Architecture Patterns

### Monolith with Modular Architecture

We use a modular monolith pattern:
- Single deployment unit
- Logical module separation
- Shared database
- Future microservices path

**Why:** Simplicity for current scale (10K users), easy to split later

### Design Patterns Used

1. **Repository Pattern** - Data access abstraction
2. **Service Layer** - Business logic encapsulation
3. **Factory Pattern** - Object creation
4. **Observer Pattern** - Event system

## Data Flow

\`\`\`
User Request
  → Express Router
  → Validation Middleware
  → Authentication Middleware
  → Controller
  → Service Layer
  → Repository
  → Database
\`\`\`

## Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

[Include ER diagram]

## Security Architecture

- **Authentication:** JWT tokens (15min access, 7d refresh)
- **Authorization:** Role-based access control (RBAC)
- **Encryption:** AES-256 for sensitive data at rest
- **Transport:** TLS 1.3 required
- **Secrets:** AWS Secrets Manager

## Performance Considerations

- **Caching Strategy:** Redis for session data (TTL: 1hr)
- **Database Indexing:** B-tree on email, hash on id
- **Query Optimization:** N+1 queries prevented via DataLoader
- **CDN:** CloudFront for static assets

## Scalability Strategy

### Current Capacity
- 10K concurrent users
- 1M requests/day
- 100GB database

### Scaling Plan
- **Horizontal:** Load balancer + multiple app instances
- **Database:** Read replicas for scaling reads
- **Cache:** Redis cluster for distributed cache
- **Files:** S3 for static assets

## Design Decisions

### Why PostgreSQL instead of MongoDB?

**Context:** Need reliable transactions for payment processing

**Decision:** PostgreSQL with JSONB for flexibility

**Consequences:**
- ✅ ACID compliance for payments
- ✅ Strong schema validation
- ❌ More complex for hierarchical data
- ❌ Less flexible schema changes

**Date:** 2025-01-10 | **Status:** Accepted

## Deployment Architecture

[Deployment diagram showing prod/staging/dev environments]

## Monitoring & Observability

- **Logs:** Structured JSON to CloudWatch
- **Metrics:** Prometheus + Grafana
- **Tracing:** OpenTelemetry
- **Alerts:** PagerDuty for critical errors

## Disaster Recovery

- **Backups:** Daily automated snapshots (30d retention)
- **RTO:** 4 hours (time to recover)
- **RPO:** 1 hour (max data loss)
- **Failover:** Multi-AZ deployment
```

---

## User Documentation

### User Guide Template

```markdown
# User Guide

## Getting Started

### What is [Product Name]?

[Product] helps you [solve problem] by [key benefit].

**Perfect for:**
- Use case 1
- Use case 2
- Use case 3

### Installation

[Step-by-step installation with screenshots]

### Your First [Task]

Follow this tutorial to [achieve goal] in 5 minutes:

1. **Step 1:** [Action with screenshot]
2. **Step 2:** [Action with screenshot]
3. **Step 3:** [Action with screenshot]

## Core Features

### Feature 1: [Name]

**What it does:** [Brief description]

**When to use it:** [Use cases]

**How to use it:**

1. Navigate to [location]
2. Click [button]
3. Enter [information]
4. Click [submit]

**Tips & Tricks:**
- 💡 Tip 1
- 💡 Tip 2

**Common Issues:**
- ❓ Issue 1 → Solution
- ❓ Issue 2 → Solution

## Tutorials

### Tutorial 1: [Task]

**Time:** 10 minutes | **Difficulty:** Beginner

**You'll learn:**
- Skill 1
- Skill 2

**Prerequisites:**
- Requirement 1
- Requirement 2

[Step-by-step tutorial]

## FAQ

### General

**Q: How do I [common question]?**
A: [Clear answer with link to docs]

### Troubleshooting

**Q: Why isn't [feature] working?**
A: Check these:
1. [Common issue 1]
2. [Common issue 2]

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+S | Save |
| Ctrl+Z | Undo |

## Glossary

**Term 1:** Definition
**Term 2:** Definition
```

---

## Repository Hygiene

### Essential Configuration Files

#### .gitignore

```gitignore
# Dependencies
node_modules/
vendor/

# Environment
.env
.env.local
*.key
*.pem

# Build outputs
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Temp
tmp/
temp/
*.tmp
```

#### .editorconfig

```ini
# EditorConfig is awesome: https://EditorConfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,ts,jsx,tsx}]
indent_style = space
indent_size = 2

[*.{py}]
indent_style = space
indent_size = 4

[*.{md,markdown}]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

#### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### .eslintrc.json

```json
{
  "extends": ["eslint:recommended", "prettier"],
  "env": {
    "node": true,
    "es2021": true
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

### CONTRIBUTING.md Template

```markdown
# Contributing Guide

Thank you for considering contributing to [Project]!

## Code of Conduct

This project adheres to [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## How Can I Contribute?

### Reporting Bugs

1. Check [existing issues](https://github.com/user/repo/issues)
2. Use bug report template
3. Include reproduction steps
4. Provide environment details

### Suggesting Features

1. Check roadmap and existing issues
2. Use feature request template
3. Explain use case and benefits

### Pull Requests

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Development Setup

\`\`\`bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/repo.git

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
\`\`\`

## Coding Standards

### Style Guide

- **JavaScript:** Airbnb Style Guide
- **Python:** PEP 8
- **Formatting:** Prettier/Black (auto-format)
- **Linting:** ESLint/Pylint (must pass)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
test: add unit tests for auth module
refactor: simplify user model
\`\`\`

### Code Review Checklist

- [ ] Tests pass (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Descriptive variable names

## Testing Requirements

- **Unit tests** for all new functions
- **Integration tests** for API endpoints
- **Minimum 80% coverage** for new code
- **E2E tests** for critical user flows

## Documentation Requirements

- JSDoc comments for public functions
- README updated if adding features
- API docs updated if changing endpoints
- Examples provided for new features

## Pull Request Process

1. **Update documentation** relevant to changes
2. **Add tests** for new functionality
3. **Ensure CI passes** (tests, linting, build)
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** before merge (if requested)

## Release Process

Maintainers will:
1. Update CHANGELOG.md
2. Bump version (semantic versioning)
3. Create GitHub release
4. Publish to package registry

## Questions?

- **Discussions:** [GitHub Discussions](https://github.com/user/repo/discussions)
- **Chat:** [Discord/Slack]
- **Email:** maintainer@example.com
```

### CHANGELOG.md Template

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature in development

### Changed
- Improvements to existing features

### Deprecated
- Features being phased out

### Removed
- Deleted features

### Fixed
- Bug fixes

### Security
- Security updates

## [1.0.0] - 2025-01-15

### Added
- Initial release
- User authentication
- Dashboard UI
- API endpoints

### Security
- JWT token authentication
- Rate limiting

## [0.1.0] - 2025-01-01

### Added
- Project scaffolding
- Basic functionality
- Initial documentation

[Unreleased]: https://github.com/user/repo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/user/repo/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/user/repo/releases/tag/v0.1.0
```

---

## AI Agent Instructions

### Where to Put AI Instructions

Create a `.ai/` directory in your project root:

```
project/
└── .ai/
    ├── README.md                  # Overview of AI instructions
    ├── PROJECT_CONTEXT.md         # What this project is
    ├── CODING_STANDARDS.md        # How to write code
    ├── ARCHITECTURE.md            # System design
    ├── TESTING_GUIDE.md           # How to test
    └── AUDIT_PROMPT.md            # How to audit
```

**Alternative locations used by tools:**
- `.cursorrules` - Cursor IDE
- `.github/copilot-instructions.md` - GitHub Copilot
- `.aider.conf.yml` - Aider AI
- `CODE_CONTEXT.md` - General use

### PROJECT_CONTEXT.md Template

See next section for detailed template.

---

## Documentation Checklist

### Essential (MVP)

- [ ] README.md with quick start
- [ ] LICENSE file
- [ ] .gitignore appropriate for tech stack
- [ ] Basic inline code comments
- [ ] Installation instructions

### Recommended (Production)

- [ ] CHANGELOG.md
- [ ] CONTRIBUTING.md
- [ ] API documentation (if applicable)
- [ ] User guide
- [ ] Architecture documentation
- [ ] .editorconfig
- [ ] Linter configuration
- [ ] Formatter configuration
- [ ] Issue templates
- [ ] Pull request template
- [ ] Security policy (SECURITY.md)
- [ ] Code of conduct

### Advanced (Enterprise)

- [ ] Comprehensive user tutorials
- [ ] Video walkthroughs
- [ ] API playground/sandbox
- [ ] Architecture diagrams
- [ ] Database schema diagrams
- [ ] Deployment guides
- [ ] Disaster recovery procedures
- [ ] Runbooks for operations
- [ ] Performance benchmarks
- [ ] Compliance documentation
- [ ] AI agent instructions (.ai/ directory)

---

## Best Practices Summary

### Documentation DOs

✅ Write for your audience (users vs developers)
✅ Include working code examples
✅ Keep README concise, link to details
✅ Update docs with code changes
✅ Use diagrams for complex concepts
✅ Maintain changelog
✅ Version your docs
✅ Make docs searchable
✅ Test your examples
✅ Use consistent formatting

### Documentation DON'Ts

❌ Don't duplicate information
❌ Don't write obvious comments
❌ Don't let docs get stale
❌ Don't assume reader knowledge
❌ Don't use jargon without explanation
❌ Don't make docs hard to find
❌ Don't skip examples
❌ Don't forget to proofread
❌ Don't over-document internal code
❌ Don't write novels (be concise)

---

## Tools & Resources

### Documentation Generators

- **JSDoc** - JavaScript
- **Sphinx** - Python
- **Godoc** - Go
- **Rustdoc** - Rust
- **Javadoc** - Java
- **Doxygen** - C/C++

### Diagram Tools

- **Mermaid** - Markdown diagrams
- **PlantUML** - UML diagrams
- **Draw.io** - Visual diagrams
- **Excalidraw** - Sketchy diagrams

### Documentation Hosting

- **GitHub Pages** - Free static hosting
- **Read the Docs** - Python projects
- **GitBook** - Team documentation
- **Docusaurus** - Documentation sites
- **VitePress** - Fast static sites

### Linters & Validators

- **markdownlint** - Markdown style
- **alex** - Inclusive language
- **write-good** - Prose linting
- **proselint** - Writing style

---

**Version:** 1.0 | **Last Updated:** 2025-11-22 | **Maintained by:** [Your Team]
