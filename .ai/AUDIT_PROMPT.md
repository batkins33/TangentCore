# Universal Codebase Audit Prompt

**Version:** 1.0
**Last Updated:** 2025-11-22
**Purpose:** Comprehensive analysis template for any codebase with any LLM agent

---

## Audit Prompt Template

```
# Comprehensive Codebase Analysis & Audit Request

Please perform a thorough analysis and audit of this codebase. Provide a detailed, structured report covering all aspects listed below.

## Analysis Scope

### 1. PROJECT OVERVIEW
- **What is this project?** (type, purpose, current status)
- **Technology stack** (languages, frameworks, runtime)
- **Target users/audience**
- **Current version and maturity** (alpha, beta, production)
- **Core functionality and features**

### 2. CODEBASE STRUCTURE
- **File organization and directory structure**
- **Total lines of code and file count** (by language)
- **Core modules/components and their purposes**
- **Entry points and main execution flow**
- **Dependencies and third-party libraries**
- **Build system and tooling**

### 3. ARCHITECTURE & DESIGN PATTERNS
- **Overall architecture** (monolith, microservices, serverless, etc.)
- **Design patterns used** (MVC, Observer, Factory, Module, etc.)
- **Separation of concerns** (UI, business logic, data layer)
- **State management approach**
- **Error handling strategy**
- **Data flow and communication patterns**
- **Scalability considerations**

### 4. CODE QUALITY ASSESSMENT
- **Code consistency** (style, naming conventions, formatting)
- **Documentation quality** (comments, docstrings, README)
- **Error handling and logging**
- **Code duplication and DRY principle**
- **Function complexity** (single responsibility, size)
- **Type safety** (typing, validation, runtime checks)
- **Performance considerations** (optimization, bottlenecks)

### 5. SECURITY ANALYSIS
- **Authentication and authorization**
- **Input validation and sanitization**
- **Common vulnerabilities** (SQL injection, XSS, CSRF, etc.)
- **Secrets management** (API keys, credentials)
- **Dependency security** (outdated packages, known CVEs)
- **Data privacy and protection**
- **Security best practices compliance**

### 6. TESTING & QUALITY ASSURANCE
- **Test coverage** (unit, integration, e2e)
- **Testing frameworks and tools**
- **Test quality and effectiveness**
- **CI/CD pipeline** (automated testing, deployment)
- **Code quality gates** (linting, type checking)
- **Manual testing procedures**

### 7. DOCUMENTATION EVALUATION
- **README quality and completeness**
- **API documentation** (endpoints, parameters, examples)
- **Architecture documentation**
- **User guides and tutorials**
- **Code comments** (clarity, coverage, usefulness)
- **Contributing guidelines**
- **Changelog and version history**

### 8. REPOSITORY HYGIENE
- **Git practices** (commit messages, branching strategy)
- **Configuration files** (.gitignore, .editorconfig, etc.)
- **Dependency management** (lock files, version pinning)
- **Build artifacts and generated files**
- **Unused code and dead files**
- **TODO comments and technical debt markers**

### 9. PERFORMANCE & OPTIMIZATION
- **Performance bottlenecks**
- **Resource usage** (memory, CPU, network)
- **Caching strategies**
- **Database query optimization** (if applicable)
- **Asset optimization** (bundling, minification)
- **Load time and responsiveness**

### 10. MAINTAINABILITY & SUSTAINABILITY
- **Code readability and clarity**
- **Ease of onboarding new developers**
- **Technical debt assessment**
- **Refactoring opportunities**
- **Modularity and extensibility**
- **Breaking changes and backward compatibility**

---

## Report Structure

Please structure your analysis as follows:

### EXECUTIVE SUMMARY
- Overall grade (A+ to F scale)
- Project description (2-3 sentences)
- Key strengths (top 3)
- Critical issues (top 3)
- Recommendation (ready for production, needs work, etc.)

### DETAILED FINDINGS

For each analysis scope section above, provide:
1. **Assessment** - What you found
2. **Grade** - Letter grade for this area
3. **Strengths** - What's done well
4. **Weaknesses** - What needs improvement
5. **Code Examples** - Specific file references (path:line)
6. **Impact** - How this affects the project

### PRIORITIZED RECOMMENDATIONS

Organize recommendations into:

#### 🔴 CRITICAL (Fix Immediately)
- Security vulnerabilities
- Data loss risks
- Blocking issues

#### 🟡 HIGH PRIORITY (Next Sprint/Release)
- Performance issues
- Major technical debt
- Missing core features

#### 🟢 MEDIUM PRIORITY (Backlog)
- Code quality improvements
- Documentation gaps
- Minor refactoring

#### ⚪ LOW PRIORITY (Nice to Have)
- Optimization opportunities
- Enhanced tooling
- Future considerations

### IMPLEMENTATION ROADMAP

Provide a suggested roadmap:
1. **Immediate Actions** (1-2 weeks)
2. **Short Term** (1-3 months)
3. **Medium Term** (3-6 months)
4. **Long Term** (6+ months)

### BEST PRACTICES COMPARISON

Compare against industry standards:
- **SOLID principles** compliance
- **12-Factor App** methodology (if applicable)
- **OWASP Top 10** security (if applicable)
- **Language-specific idioms** and conventions
- **Framework best practices**

### METRICS & BENCHMARKS

Provide measurable metrics:
- Code complexity (cyclomatic complexity)
- Test coverage percentage
- Documentation coverage
- Dependency freshness
- Build time
- Bundle size (if applicable)

### ANTI-PATTERNS & CODE SMELLS

Identify specific anti-patterns:
- Tight coupling
- God objects/functions
- Magic numbers
- Premature optimization
- Copy-paste programming
- Unclear naming

### COMPARISON TO SIMILAR PROJECTS

If applicable, compare to:
- Industry-standard implementations
- Similar open-source projects
- Framework conventions
- Community best practices

---

## Output Format

Please provide:

1. **Markdown-formatted report** with clear headings
2. **Specific file references** (path:line) for all examples
3. **Code snippets** showing issues and proposed fixes
4. **Actionable recommendations** (not vague suggestions)
5. **Priority ratings** for all recommendations
6. **Estimated effort** (hours/days) for major improvements

---

## Additional Context

[Include any specific context here:]
- Project goals and constraints
- Team size and experience
- Timeline and deadlines
- Specific areas of concern
- Compliance requirements
- Performance targets
- Budget constraints

---

## Follow-Up Questions

After your analysis, be prepared to:
- Deep dive into specific areas
- Provide implementation examples
- Explain trade-offs and alternatives
- Help prioritize recommendations
- Create implementation plans
```

---

## Usage Instructions

### For Any LLM Agent

1. **Copy the entire prompt** from the "Audit Prompt Template" section
2. **Add project-specific context** in the "Additional Context" section
3. **Paste into your LLM tool** (ChatGPT, Claude, Cursor, etc.)
4. **Wait for comprehensive analysis**

### Customization Options

**For Specific Focus Areas:**
```
Focus your analysis specifically on:
- [Security] - Deep dive into security vulnerabilities
- [Performance] - Performance bottlenecks and optimization
- [Testing] - Test coverage and quality
- [Documentation] - Documentation completeness
```

**For Project Types:**
```
This is a [Web App / API / Library / CLI Tool / Mobile App].
Tailor your analysis for this specific project type.
```

**For Technology-Specific Analysis:**
```
Pay special attention to [React / Node.js / Python / Go / etc.] best practices.
```

---

## Expected Output Quality

A comprehensive audit should:
- ✅ Be 5,000-15,000 words (thorough but focused)
- ✅ Include specific file references with line numbers
- ✅ Provide code examples for issues and solutions
- ✅ Grade each area objectively
- ✅ Prioritize recommendations by impact
- ✅ Be actionable (not theoretical)
- ✅ Compare to industry standards
- ✅ Identify both strengths and weaknesses

---

## Tips for Best Results

1. **Be specific about project type** - "React SPA" vs "Full-stack app"
2. **Mention constraints** - "Limited to Google Apps Script" vs "Any tech"
3. **State maturity level** - "Alpha prototype" vs "Production system"
4. **Include deadlines** - "Need to ship in 2 weeks" vs "Long-term project"
5. **Highlight concerns** - "Worried about security" vs "Need performance"
6. **Request depth** - "High-level overview" vs "Deep technical audit"

---

## Version History

- **1.0** (2025-11-22) - Initial comprehensive audit template
