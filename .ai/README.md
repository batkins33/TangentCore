# AI Agent Instructions

**Purpose:** This directory contains instructions and context for AI coding assistants (GitHub Copilot, Cursor, Claude Code, ChatGPT, etc.) to work effectively with this codebase.

---

## 📁 What's in This Directory

### 1. [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)
**Comprehensive project context for AI agents**

Contains:
- Project overview and purpose
- Technology stack and constraints
- Architecture patterns and design decisions
- Coding standards and conventions
- Security and performance guidelines
- Common patterns and anti-patterns
- What AI should and shouldn't do

**When to use:** Always read this before generating code or making suggestions.

---

### 2. [AUDIT_PROMPT.md](AUDIT_PROMPT.md)
**Universal codebase audit template**

Contains:
- Comprehensive analysis framework
- 10 analysis scope areas
- Structured report format
- Prioritized recommendations template
- Metrics and benchmarks

**When to use:** Copy-paste this prompt into any LLM to get a comprehensive codebase audit.

---

### 3. [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md)
**Documentation best practices and standards**

Contains:
- Documentation philosophy
- Required documentation files
- README standards and templates
- Code documentation guidelines (JSDoc, comments)
- API documentation format
- Architecture documentation
- User documentation
- Repository hygiene best practices

**When to use:** Reference this when creating or updating documentation.

---

### 4. [REPO_HYGIENE_CHECKLIST.md](REPO_HYGIENE_CHECKLIST.md)
**Comprehensive repository maintenance checklist**

Contains:
- Essential files checklist
- Configuration files guide
- Git hygiene best practices
- Code quality standards
- Security checklist
- Performance optimization
- Maintenance schedules
- Health metrics

**When to use:** Use this for repository cleanup, code reviews, or pre-release checks.

---

## 🤖 For AI Agents

### Before Generating Code

1. **Read [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** to understand:
   - What this project is
   - How code should be written (ES5, revealing module pattern)
   - Critical design decisions (driveIterator pattern)
   - Alpha constraints (500 files, read-only)

2. **Follow the standards:**
   - Use revealing module pattern
   - Return `{ success, data/error }` format
   - Add JSDoc comments
   - Include error handling
   - Respect safety limits

3. **Don't assume:**
   - Ask before major architectural changes
   - Confirm before adding new dependencies
   - Check before removing safety constraints

### When Reviewing Code

Check against:
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) - Coding standards
- [REPO_HYGIENE_CHECKLIST.md](REPO_HYGIENE_CHECKLIST.md) - Code quality

### When Documenting

Follow:
- [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md) - Doc formats and templates

### When Auditing

Use:
- [AUDIT_PROMPT.md](AUDIT_PROMPT.md) - Comprehensive audit framework

---

## 👨‍💻 For Developers

### Using These Files with AI Tools

#### GitHub Copilot
Create a symlink or copy to the expected location:
```bash
cp .ai/PROJECT_CONTEXT.md .github/copilot-instructions.md
```

#### Cursor
Cursor automatically reads:
- `.cursorrules` (create symlink to PROJECT_CONTEXT.md)
- Files in `.ai/` directory

```bash
ln -s .ai/PROJECT_CONTEXT.md .cursorrules
```

#### ChatGPT / Claude
Copy the relevant prompt from:
- `.ai/AUDIT_PROMPT.md` for full audits
- `.ai/PROJECT_CONTEXT.md` for project understanding

#### Aider
Create `.aider.conf.yml`:
```yaml
read:
  - .ai/PROJECT_CONTEXT.md
```

---

## 📋 Quick Reference

### Essential Commands for AI

**"Read the project context"**
→ Open `.ai/PROJECT_CONTEXT.md`

**"Audit this codebase"**
→ Use prompt from `.ai/AUDIT_PROMPT.md`

**"What are the documentation standards?"**
→ Read `.ai/DOCUMENTATION_STANDARDS.md`

**"Check repository health"**
→ Use checklist from `.ai/REPO_HYGIENE_CHECKLIST.md`

---

## 🔄 Keeping These Updated

### When to Update

Update these files when:
- **Architecture changes** → Update PROJECT_CONTEXT.md
- **New patterns adopted** → Update PROJECT_CONTEXT.md
- **Standards evolve** → Update DOCUMENTATION_STANDARDS.md
- **New tools added** → Update relevant files

### Who Updates

- **Project maintainers** are responsible for keeping these current
- **Contributors** should suggest updates via PR
- **AI agents** should flag outdated information

---

## 📚 Related Documentation

These AI instructions complement:
- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - How to contribute
- [docs/TECHNICAL.md](../docs/TECHNICAL.md) - Technical architecture
- [docs/API.md](../docs/API.md) - API reference

---

## 🎯 Goals of This Directory

1. **Consistency** - All AI agents follow same standards
2. **Quality** - AI-generated code meets project standards
3. **Speed** - AI understands context without explanation
4. **Safety** - AI respects constraints and security
5. **Learning** - New developers understand patterns quickly

---

## 💡 Tips for Best Results

### For AI Agents

✅ **DO:**
- Read PROJECT_CONTEXT.md completely
- Ask when uncertain
- Follow established patterns
- Respect safety constraints
- Include tests and documentation

❌ **DON'T:**
- Skip reading context
- Assume modern JS features work (ES5 only)
- Remove safety limits without approval
- Ignore architecture patterns
- Generate code without understanding purpose

### For Developers

✅ **DO:**
- Keep these files updated
- Reference them in code reviews
- Share with new team members
- Use audit prompt periodically
- Follow documentation standards

❌ **DON'T:**
- Let them get outdated
- Ignore AI suggestions (they follow these rules)
- Skip documentation updates
- Forget to version these files
- Make them too long (keep focused)

---

## 📞 Questions?

If AI agents or developers have questions about these instructions:
- **Open an issue** with label `documentation`
- **Submit a PR** to improve clarity
- **Ask in discussions** for clarification

---

## 📝 Version History

- **1.0** (2025-11-22) - Initial AI instruction set for TangentCore
  - PROJECT_CONTEXT.md created
  - AUDIT_PROMPT.md created
  - DOCUMENTATION_STANDARDS.md created
  - REPO_HYGIENE_CHECKLIST.md created

---

**Maintained by:** TangentCore Team
**Last Updated:** 2025-11-22
