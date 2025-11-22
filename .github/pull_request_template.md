## Description

<!-- Provide a brief description of the changes in this PR -->

## Type of Change

<!-- Check all that apply -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 UI/Design improvement
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test update
- [ ] 🔧 Configuration change
- [ ] 🏗️ Architecture change

## Related Issues

<!-- Link related issues using keywords: Fixes #123, Closes #456, Relates to #789 -->

Fixes #

## Changes Made

<!-- Describe the changes in detail -->

### Modified Files
- `file1.gs` - Description of changes
- `file2.html` - Description of changes

### New Files
- `NewModule.gs` - Description

### Removed Files
- `OldFile.gs` - Reason for removal

## Testing

### Manual Testing Performed

<!-- Describe how you tested these changes -->

- [ ] Tested in Google Apps Script editor
- [ ] Tested in Google Sheets
- [ ] Tested with 0 files
- [ ] Tested with < 100 files
- [ ] Tested with 500+ files
- [ ] Tested error conditions
- [ ] Tested on different screen sizes
- [ ] Tested in multiple browsers

### Test Scenarios

<!-- List specific scenarios tested -->

1. **Scenario 1**: Description → ✅ Passed / ❌ Failed
2. **Scenario 2**: Description → ✅ Passed / ❌ Failed

## Screenshots

<!-- If applicable, add screenshots to demonstrate changes -->

### Before
<!-- Screenshot of old behavior -->

### After
<!-- Screenshot of new behavior -->

## Code Quality Checklist

### Code Standards

- [ ] Follows ES5 syntax (no ES6+ features)
- [ ] Uses revealing module pattern (for new modules)
- [ ] Returns standardized response format: `{ success, data/error }`
- [ ] Includes try-catch error handling
- [ ] Uses 2-space indentation
- [ ] Follows naming conventions (camelCase, UPPER_CASE constants)
- [ ] No magic numbers (uses named constants)
- [ ] No commented-out code

### Documentation

- [ ] JSDoc comments added for public functions
- [ ] Inline comments explain WHY, not WHAT
- [ ] README.md updated (if needed)
- [ ] API.md updated (if API changes)
- [ ] USER_GUIDE.md updated (if UI changes)
- [ ] TECHNICAL.md updated (if architecture changes)
- [ ] CHANGELOG.md updated

### AI Context

- [ ] Follows patterns in `.ai/PROJECT_CONTEXT.md`
- [ ] Uses `driveIterator()` for Drive queries (if applicable)
- [ ] Respects alpha constraints (read-only, 500-file limit)
- [ ] Passes checklist in `.ai/REPO_HYGIENE_CHECKLIST.md`

### Design (if UI changes)

- [ ] Follows brand guidelines (BRAND_GUIDELINES.md)
- [ ] Uses correct color distribution (60/30/10 rule)
- [ ] Forge Orange used sparingly (< 10% of UI)
- [ ] Uses Inter font
- [ ] Follows 24px baseline grid
- [ ] Uses 16px card radius
- [ ] Accessible (WCAG AA compliant)
- [ ] Tested on mobile/tablet

### Security

- [ ] No API keys or secrets in code
- [ ] Input validation added (if handling user input)
- [ ] No XSS vulnerabilities
- [ ] OAuth scopes minimal (only what's needed)
- [ ] No sensitive data logged

### Performance

- [ ] No potential timeout issues
- [ ] Uses pagination for large datasets
- [ ] Minimal API calls (batched where possible)
- [ ] No N+1 query problems
- [ ] Efficient data structures used

## Breaking Changes

<!-- If this PR includes breaking changes, describe them and the migration path -->

### What breaks?

### Migration guide for users:

## Additional Notes

<!-- Any additional information, context, or concerns -->

## Checklist

- [ ] I have read the [CONTRIBUTING.md](../CONTRIBUTING.md) guide
- [ ] My code follows the project's code standards
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes thoroughly
- [ ] Any dependent changes have been merged and published
- [ ] This PR is ready for review

## Reviewer Notes

<!-- Notes specifically for code reviewers -->

### Areas needing special attention:

### Questions for reviewers:

---

**Thank you for your contribution to TangentCore!** 🚀
