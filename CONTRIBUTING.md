# Contributing to TangentCore

Thank you for your interest in contributing to TangentCore! This document provides guidelines and instructions for contributing.

---

## 🤝 How to Contribute

### Ways to Contribute

- 🐛 **Report bugs** - Found an issue? Let us know!
- 💡 **Suggest features** - Have an idea? We'd love to hear it!
- 📝 **Improve documentation** - Help make docs clearer
- 🔧 **Submit code** - Fix bugs or add features
- 🎨 **Design improvements** - UI/UX enhancements

---

## 🐛 Reporting Bugs

### Before Submitting

1. **Check existing issues** - Has it been reported?
2. **Test in latest version** - Is it still happening?
3. **Gather information** - Steps to reproduce, screenshots

### Bug Report Template

```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- Google Workspace: Business
- TangentCore Version: 1.0.0-alpha

**Screenshots:**
If applicable

**Additional Context:**
Any other relevant information
```

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Feature Description:**
What feature would you like to see?

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should it work?

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Mockups, examples, references
```

---

## 🔧 Code Contributions

### Development Setup

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/tangentcore.git
cd tangentcore
```

2. **Create a branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
- Follow code standards (see below)
- Test thoroughly
- Update documentation

4. **Commit your changes**
```bash
git add .
git commit -m "feat: add new feature"
```

5. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

6. **Create Pull Request**
- Go to GitHub
- Click "New Pull Request"
- Fill out the template

---

## 📋 Code Standards

### JavaScript (Google Apps Script)

**Style Guide:**
- Use ES5 syntax (Apps Script compatibility)
- 2-space indentation
- Single quotes for strings
- Semicolons required
- CamelCase for functions
- UPPER_CASE for constants

**Example:**
```javascript
/**
 * Scans shared files
 * @param {number} limit - Maximum files to scan
 * @returns {Object} Scan results
 */
function scanFiles(limit) {
  var MAX_FILES = 500;
  var results = [];
  
  for (var i = 0; i < limit; i++) {
    // Process file
  }
  
  return {
    success: true,
    data: results
  };
}
```

### HTML/CSS

**Style Guide:**
- 2-space indentation
- Use Tailwind CSS classes when possible
- Custom CSS in `<style>` block
- Semantic HTML5 elements
- Accessible markup (ARIA labels)

**Example:**
```html
<div class="card">
  <h2 class="card-title">Title</h2>
  <p class="secondary-text">Description</p>
  <button class="btn-primary" onclick="action()">
    Action
  </button>
</div>
```

### Documentation

**JSDoc Comments:**
```javascript
/**
 * Brief description
 * 
 * Detailed description if needed
 * 
 * @param {string} param1 - Description
 * @param {number} param2 - Description
 * @returns {Object} Description
 * @throws {Error} When something goes wrong
 * 
 * @example
 * var result = myFunction('test', 123);
 */
function myFunction(param1, param2) {
  // Implementation
}
```

---

## 🎨 Design Guidelines

### Follow Tangent Forge Brand

**Required Reading:**
- [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md)
- [DESIGN_ACTION_PLAN.md](DESIGN_ACTION_PLAN.md)
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

**Key Principles:**
- 60/30/10 color distribution
- Anvil Blue for interactions
- Orange only for actions/sparks
- 24px baseline grid
- 16px card radius

**Before Submitting UI Changes:**
- [ ] Follows color distribution
- [ ] Uses correct typography (Inter)
- [ ] Maintains spacing rhythm
- [ ] Orange used sparingly
- [ ] Accessible (WCAG AA)

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Test in Google Sheets
- [ ] Test with 0 shared files
- [ ] Test with 500+ shared files
- [ ] Test error conditions
- [ ] Test on different screen sizes
- [ ] Test in Chrome, Firefox, Safari

### Test Scenarios

**Shared Drive Cleaner:**
1. First-time user (no files)
2. User with <100 files
3. User with 500+ files
4. Network error during scan
5. Permission denied

---

## 📝 Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Examples

```bash
feat(cleaner): add file type filtering

Added ability to filter scan results by file type.
Users can now focus on specific types like PDFs or Images.

Closes #123
```

```bash
fix(ui): correct button sizing on mobile

Button was too wide on small screens.
Changed max-width from 240px to 220px.

Fixes #456
```

---

## 🔍 Pull Request Process

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Design improvement

## Testing
- [ ] Tested manually
- [ ] Added test scenarios
- [ ] Verified no regressions

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Brand guidelines followed
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Automated checks** - Linting, formatting
2. **Code review** - Maintainer review
3. **Testing** - Manual verification
4. **Approval** - Merge when ready

---

## 📚 Documentation Updates

### When to Update Docs

- Adding new functions → Update API.md
- Changing UI → Update USER_GUIDE.md
- Architecture changes → Update TECHNICAL.md
- New features → Update README.md

### Documentation Checklist

- [ ] API reference updated
- [ ] User guide updated
- [ ] Technical docs updated
- [ ] README updated
- [ ] Examples added/updated
- [ ] Changelog updated

---

## 🏷️ Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible)
- **PATCH** - Bug fixes

**Examples:**
- `1.0.0` → `1.0.1` - Bug fix
- `1.0.0` → `1.1.0` - New feature
- `1.0.0` → `2.0.0` - Breaking change

---

## 🎯 Priority Labels

Issues and PRs are labeled by priority:

- `P0` - Critical (security, data loss)
- `P1` - High (major bugs, important features)
- `P2` - Medium (minor bugs, nice-to-have)
- `P3` - Low (polish, future enhancements)

---

## 💬 Communication

### Where to Ask Questions

- **GitHub Discussions** - General questions
- **GitHub Issues** - Bug reports, feature requests
- **Email** - dev@tangentforge.com

### Response Times

- **P0 issues** - Within 24 hours
- **P1 issues** - Within 3 days
- **P2/P3 issues** - Within 1 week
- **Pull requests** - Within 1 week

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ❓ Questions?

Don't hesitate to ask! We're here to help.

- **Email**: dev@tangentforge.com
- **Discussions**: [GitHub Discussions](https://github.com/tangentforge/tangentcore/discussions)

---

**Thank you for contributing to TangentCore!** 🎉
