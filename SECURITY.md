# Security Policy

## 🔒 Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x-alpha | ✅ Active development (Current) |
| 1.0.x-alpha | ❌ Deprecated |

**Note:** TangentCore is currently in alpha. Security updates are applied to the latest alpha version only.

---

## 🛡️ Security Measures

### Data Privacy

TangentCore is designed with privacy-first principles:

- **Scan-Only Operations** - v2 alpha performs scans only (deletion features planned for future release)
- **No Data Storage** - All processing happens in-memory; no user data is stored
- **No File Content Access** - Only metadata is accessed (file names, sizes, types)
- **Full Transparency** - All API calls are logged for auditability
- **Enterprise Features** - Includes Shared Drive (Team Drive) access for organizational use

### OAuth Scopes (v2)

**⚠️ Permission Changes in v2.0.0-alpha:**

TangentCore now requests the following scopes:

1. **`https://www.googleapis.com/auth/drive`**
   - Purpose: Full Drive access (read, write, delete)
   - Access: File metadata and future deletion capabilities
   - **Why upgraded:** Required for planned cleanup/deletion features
   - **Current use:** File metadata scanning only (scan-only in v2 alpha)
   - Does NOT currently: Modify or delete files (planned for future)
   - Includes: Shared Drive (Team Drive) support

2. **`https://www.googleapis.com/auth/userinfo.email`**
   - Purpose: User identity verification
   - Access: User's email address only
   - **Why needed:** License validation and activity logging

3. **`https://www.googleapis.com/auth/script.container.ui`**
   - Purpose: Display sidebar interface
   - Scope: UI rendering only

### Security Rationale

**Why Full Drive Access?**

We understand this is a significant permission. Here's our reasoning:

- **Future-Proofing:** Deletion features are the core value proposition of a "Cleanup" tool
- **User Experience:** Avoids requiring re-authorization when cleanup features launch
- **Transparency:** Current alpha version only scans; deletion coming in future update
- **Google Best Practice:** Request permissions upfront rather than surprising users later

**Migration from v1:**
- v1 users must re-authorize to grant new permissions
- No automatic upgrade; explicit user consent required

### Transparency

- All API calls are logged for transparency
- Activity logging: `TangentCore.logActivity(user, tool, action)`
- Users can view logs in Apps Script console

---

## 🚨 Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

**🔒 For security vulnerabilities, DO NOT open a public issue.**

Instead, please use one of these methods:

#### Option 1: GitHub Security Advisories (Preferred)

1. Go to [Security Advisories](https://github.com/batkins33/TangentCore/security/advisories)
2. Click "Report a vulnerability"
3. Fill out the private disclosure form

#### Option 2: Email

Send details to: **security@tangentforge.com**

**Subject line:** `[SECURITY] TangentCore - [Brief Description]`

### What to Include

Please provide as much information as possible:

1. **Type of vulnerability** (e.g., XSS, data exposure, authentication bypass)
2. **Affected component** (file name, function name, line number)
3. **Steps to reproduce** (detailed instructions)
4. **Potential impact** (what could an attacker do?)
5. **Suggested fix** (if you have one)
6. **Your contact information** (for follow-up)

### High-Priority Security Concerns for v2

Given the elevated permissions in v2, we're especially interested in reports related to:

- Unauthorized file modifications or deletions
- OAuth scope abuse or misuse
- Shared Drive permission escalation
- User identity exposure beyond email
- Cross-organization data leakage

### Example Report

```markdown
**Type:** Cross-Site Scripting (XSS)

**Location:** Sidebar.html, line 145

**Description:**
User input from scan results is not properly sanitized before
being inserted into the DOM.

**Steps to Reproduce:**
1. Create a file named: <script>alert('XSS')</script>
2. Share the file with your account
3. Run the Shared Drive Cleaner
4. View results in sidebar

**Impact:**
An attacker could craft malicious file names that execute
arbitrary JavaScript in the user's context.

**Suggested Fix:**
Use textContent instead of innerHTML when displaying file names.

**Reporter:** John Doe (john@example.com)
```

---

## ⏱️ Response Timeline

We are committed to responding quickly to security reports:

| Severity | Response Time | Fix Timeline |
|----------|---------------|--------------|
| **Critical** | Within 24 hours | 1-3 days |
| **High** | Within 48 hours | 3-7 days |
| **Medium** | Within 5 days | 7-14 days |
| **Low** | Within 10 days | 14-30 days |

### Severity Definitions

**Critical:**
- Data breach or exposure
- Authentication bypass
- Remote code execution
- Privilege escalation

**High:**
- XSS vulnerabilities
- CSRF vulnerabilities
- Sensitive data in logs
- OAuth scope abuse

**Medium:**
- Input validation issues
- Information disclosure
- Denial of service (DoS)
- Insecure defaults

**Low:**
- Best practice violations
- Missing security headers
- Outdated dependencies (non-critical)

---

## 🔄 Security Update Process

When a security issue is confirmed:

1. **Acknowledgment** - We confirm receipt and severity
2. **Investigation** - We investigate and develop a fix
3. **Testing** - We test the fix thoroughly
4. **Release** - We release a patched version
5. **Disclosure** - We publicly disclose after fix is deployed
6. **Credit** - We credit the reporter (with permission)

### Disclosure Timeline

- **Immediate** - Critical vulnerabilities
- **7 days** - High severity issues
- **30 days** - Medium/Low severity issues

We will coordinate disclosure timing with the reporter.

---

## 🏆 Security Hall of Fame

We recognize and thank security researchers who help keep TangentCore secure:

<!-- Security researchers will be listed here after responsible disclosure -->

_No vulnerabilities reported yet. Be the first to help us stay secure!_

---

## 🔐 Security Best Practices for Users

### For Administrators

1. **Review OAuth Permissions** - Understand what TangentCore can access
2. **Monitor Usage** - Review activity logs regularly
3. **Limit Deployment** - Deploy only to necessary users
4. **Keep Updated** - Install security updates promptly

### For Developers

1. **Code Reviews** - All code changes reviewed for security
2. **Input Validation** - Always validate and sanitize user input
3. **Least Privilege** - Request minimal OAuth scopes
4. **Secure Defaults** - Default to most secure configuration
5. **Dependency Updates** - Keep dependencies updated
6. **Secrets Management** - Never commit secrets to git

### For Contributors

Before submitting code:

- [ ] No hardcoded API keys or secrets
- [ ] User input is validated and sanitized
- [ ] OAuth scopes are minimal
- [ ] No sensitive data in logs
- [ ] Error messages don't leak information
- [ ] Follows security checklist in PR template

---

## 🔍 Security Audits

### Self-Audits

We perform regular security self-audits:

- **Code reviews** - Every PR reviewed for security
- **Dependency scanning** - Check for vulnerable dependencies
- **Manual testing** - Test for common vulnerabilities
- **AI-assisted audits** - Use `.ai/AUDIT_PROMPT.md` for comprehensive analysis

### External Audits

We welcome external security audits:

- Security researchers are encouraged to test
- Responsible disclosure is appreciated
- Hall of Fame recognition for valid findings

---

## 📚 Resources

### Security Guidelines

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Google Apps Script Security](https://developers.google.com/apps-script/guides/security)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)

### Project Security Documentation

- [.ai/PROJECT_CONTEXT.md](.ai/PROJECT_CONTEXT.md) - Security guidelines
- [docs/TECHNICAL.md](docs/TECHNICAL.md) - Architecture security
- [CONTRIBUTING.md](CONTRIBUTING.md) - Security checklist

---

## 📞 Contact

- **Security Email:** security@tangentforge.com
- **General Support:** dev@tangentforge.com
- **GitHub Advisories:** [Security Tab](https://github.com/batkins33/TangentCore/security)

---

## 🙏 Thank You

Thank you for helping keep TangentCore and its users safe!

**Last Updated:** 2025-11-22
**Version:** 1.0
