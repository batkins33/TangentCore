# Tangent Forge Brand Guidelines
## For Tangent Forge Utilities Add-on

This document outlines the official Tangent Forge v1.2 brand standards applied to the Utilities add-on.

---

## 🎨 Color System

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Forge Orange** | `#D96704` | Primary accent, highlights, CTAs, selection states |
| **Ember Glow** | `#FF6C37` | Secondary accent (optional) |
| **Forge Charcoal** | `#2B2D31` | Primary dark background |
| **Deep Charcoal** | `#1F1F23` | Secondary/darker background |
| **Smoked Gray** | `#A8A8A8` | Secondary labels, muted text |
| **White** | `#FFFFFF` | Primary text on dark backgrounds |
| **Monogram Background** | `#282828` | Logo/icon background (slightly lighter than Forge Charcoal for contrast) |

### Semantic Usage

- **Accents carry meaning** - Don't use orange for decoration; use it for:
  - Interactive elements (buttons, links)
  - Selection/active states
  - Success indicators
  - Important metrics

- **High contrast hierarchy** - Maintain clear visual hierarchy:
  - White for primary text
  - Smoked Gray for secondary/supporting text
  - Forge Orange for emphasis

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

---

## 📐 Layout Principles

### Grid System
- **12-column grid** for layout structure
- **24px baseline grid** for vertical rhythm
- **16px card rhythm** for internal spacing

### Card Design
- **Border radius**: 16px for cards
- **Padding**: Multiples of 8px (8px, 16px, 24px, 32px)
- **Spacing**: Use 24px as the base unit for vertical spacing

### Spacing Scale

```text
8px  - Tight spacing (within components)
16px - Card internal rhythm
24px - Baseline vertical rhythm
32px - Section spacing
48px - Major section breaks
```

---

## 🔤 Typography

### Font Families

**Primary (Premium tier):**
- **ABC Favorit**
  - Regular (400) - Body text
  - Bold (700) - Headings, emphasis

**Fallback (Mid-tier):**
- **Inter**
  - Regular (400)
  - Medium (500)
  - Semibold (600)
  - Bold (700)

### Type Scale

```text
Hero Metric:   48px / Bold / Monospace
H1:            32px / Bold
H2:            24px / Bold
H3:            20px / Semibold
Body:          16px / Regular
Small:         14px / Regular
Label:         12px / Medium / Uppercase
```

---

## 🎯 Brand Pillars

### Clarity + Utility
- **Minimal visual noise** - Remove unnecessary decoration
- **Focused layouts** - Single clear purpose per view
- **High contrast** - Ensure readability

### Form Follows Clarity
- **Distill complexity** - Simplify decision-making
- **Remove friction** - Make actions obvious
- **Systematic approach** - Consistent patterns

### Intentionality
- **Every element has purpose** - No decoration for decoration's sake
- **Meaningful hierarchy** - Guide user attention deliberately
- **Confidence through restraint** - Premium feel through simplicity

---

## 🔧 UI Components

### Buttons

**Primary Button:**

```css
background: #D96704 (Forge Orange)
color: #FFFFFF
padding: 16px 32px
border-radius: 8px
font-weight: 600
transition: all 0.2s ease

hover:
  background: #E87805
  transform: translateY(-2px)
  box-shadow: 0 4px 12px rgba(217, 103, 4, 0.3)
```

**Secondary Button:**

```css
background: transparent
border: 2px solid #D96704
color: #D96704
padding: 14px 30px
border-radius: 8px
font-weight: 600
```

### Cards

```css
background: #2B2D31
border: 1px solid #3a3a3a
border-radius: 16px
padding: 24px
```

### Selection States
- Use **solid Forge Orange** for selected items
- Avoid gradients or glows
- Use subtle border or background change

---

## 🚫 What to Avoid

❌ **Purple accents** - Not part of Tangent Forge palette  
❌ **Pure black backgrounds** (#000000) - Use Forge Charcoal instead  
❌ **System fonts** - Use ABC Favorit or Inter  
❌ **Arbitrary spacing** - Follow 24px baseline grid  
❌ **Decorative gradients** - Keep it clean and engineered  
❌ **Generic UI themes** - This should feel premium and purposeful

---

## ✅ Brand Checklist

Before shipping any UI, verify:

- [ ] Using Forge Orange (#D96704) for primary accents
- [ ] Using Forge Charcoal (#2B2D31) for backgrounds
- [ ] Using ABC Favorit or Inter (not system fonts)
- [ ] Following 24px vertical rhythm
- [ ] Cards use 16px border radius
- [ ] High contrast maintained (white text on dark)
- [ ] Smoked Gray (#A8A8A8) for secondary text
- [ ] No purple, no pure black
- [ ] Minimal, focused, intentional design

---

## 🎨 Visual Identity

### Voice & Tone
- **Professional** - Not casual or playful
- **Purpose-driven** - Emphasize utility and clarity
- **Empowering** - Give users agency
- **Engineered** - Feels systematic and precise

### Design Philosophy

> "Quieter, more engineered, more premium — signaling clarity instead of commercial UI flair."

The Tangent Forge aesthetic is about **confident restraint**. It should feel like a professional tool built by engineers who care about craft, not a consumer app trying to grab attention.

---

**Reference Source:** Tangent Forge Brand Comparison v1.2  
**Last Updated:** 2025-11-22
