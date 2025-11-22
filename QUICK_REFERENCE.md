# Tangent Forge Quick Reference Card
## At-a-Glance Design Rules

---

## 🎨 The Golden Rule

> **Forge Orange is the SPARK, not the SCREEN**

Use orange **sparingly** — it's powerful when rare, loud when overused.

---

## 📏 60/30/10 Color Distribution

```
┌─────────────────────────────────────────┐
│                                         │
│  60% Foundation (Charcoal)              │  ← Quiet, engineered
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 30% Content (White/Gray)          │ │  ← Readable, clear
│  │                                   │ │
│  │ ┌─────────────────────────────┐   │ │
│  │ │ 10% Interaction (Blue/Copper)│  │ │  ← Thoughtful
│  │ │   5% Spark (Orange)          │  │ │  ← Decisive
│  │ └─────────────────────────────┘   │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## ✅ Orange DO's

- ✓ Primary action buttons (< 240px wide)
- ✓ Checkmarks and icons (16-32px)
- ✓ Hover states on interactive elements
- ✓ Success confirmations
- ✓ "Take action now" moments
- ✓ Small badges or indicators

---

## ❌ Orange DON'Ts

- ✗ Large background surfaces
- ✗ Full-width selection states
- ✗ Body text or headings
- ✗ Decorative elements
- ✗ Card backgrounds
- ✗ Navigation bars
- ✗ Anything bigger than your palm on screen

---

## 🎓 Context: Educational Tools (PathFinder)

**Use Anvil Blue for selections:**

```css
Selected State:
  Background: linear-gradient(135deg, #0A4D5C, #1098AD)
  Border: 2px solid #1098AD
  Checkmark: #D96704 (orange micro-accent)
```

**Why:** Blue = intelligence, growth, thoughtfulness

---

## 🔧 Context: Utility Tools (TF Utilities)

**Use Dark Copper for selections:**

```css
Selected State:
  Background: #1F1F23
  Border: 2px solid #8B5A3C
  Glow: inset 0 0 20px rgba(139, 90, 60, 0.2)
  Icon: #D96704 (orange accent)
```

**Why:** Copper = industrial, forged, engineered

---

## 🎯 Quick Decision Tree

```
Need to show selection?
  ├─ Educational context? → Use Anvil Blue gradient
  └─ Utility context? → Use Dark Copper

Need a call-to-action?
  ├─ Primary action? → Orange button (< 240px)
  └─ Secondary action? → Transparent with blue/copper border

Need to show success?
  ├─ Micro-moment? → Orange checkmark
  └─ Full message? → Success Green with orange icon

Large surface?
  └─ NEVER use orange → Use charcoal foundation
```

---

## 🎨 Core Palette (Memorize These)

| Color | Hex | When to Use |
|-------|-----|-------------|
| Forge Charcoal | `#2B2D31` | Backgrounds (60%) |
| White | `#FFFFFF` | Primary text (25%) |
| Smoked Gray | `#A8A8A8` | Secondary text (5%) |
| Anvil Blue | `#1098AD` | Educational selections (8%) |
| Dark Copper | `#8B5A3C` | Utility selections (8%) |
| Forge Orange | `#D96704` | Actions & sparks (2%) |

---

## 🚦 Visual Weight Test

**Before shipping, ask:**

1. **Can I see orange from across the room?**
   - Good for buttons ✅
   - Bad for backgrounds ❌

2. **Does orange feel like a "spark" or a "flood"?**
   - Spark = perfect ✅
   - Flood = too much ❌

3. **Would this work if orange was removed?**
   - Yes = good balance ✅
   - No = over-reliant ❌

---

## 💡 Remember

**Purple/Blue = Emotional journey, reflection**  
**Orange = Forge, action, spark**  
**Copper = Industrial, engineered**

For college/career tools → Blue is primary emotion  
For productivity tools → Copper maintains forge aesthetic  
For all tools → Orange is the decisive moment

---

## 📐 Component Sizes

```
Buttons:     Max 240px wide
Icons:       16-32px
Badges:      Small, contained
Cards:       16px border radius
Spacing:     Multiples of 8px (8, 16, 24, 32)
Grid:        24px baseline
```

---

## 🎯 One-Sentence Summary

**Use charcoal for foundation, blue/copper for thoughtfulness, and orange for the moment of action.**

---

**Print this. Keep it visible. Reference it often.**

Last Updated: 2025-11-22
