# Tangent Forge Extended Color Palette
## Context-Aware Color System

This extends the base Tangent Forge palette with **context-specific colors** for different application types.

---

## 🎨 Base Palette (Universal)

### Foundation Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Forge Charcoal** | `#2B2D31` | `43, 45, 49` | Primary background |
| **Deep Charcoal** | `#1F1F23` | `31, 31, 35` | Elevated surfaces, cards |
| **Steel Gray** | `#3a3a3a` | `58, 58, 58` | Borders, dividers |

### Content Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **White** | `#FFFFFF` | `255, 255, 255` | Primary text |
| **Smoked Gray** | `#A8A8A8` | `168, 168, 168` | Secondary text |
| **Muted Steel** | `#6B6B6B` | `107, 107, 107` | Tertiary text |

### Action Colors (Use Sparingly!)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Forge Orange** | `#D96704` | `217, 103, 4` | CTAs, buttons, checkmarks |
| **Ember Glow** | `#FF6C37` | `255, 108, 55` | Hover states, success |

---

## 🎓 Educational/Career Context (PathFinder)

### Primary Interaction Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Anvil Blue** | `#1098AD` | `16, 152, 173` | Selected states, focus |
| **Deep Navy** | `#0A4D5C` | `10, 77, 92` | Gradient start |
| **Steel Blue** | `#1EADC1` | `30, 173, 193` | Gradient end, hover |

### Gradient Examples

```css
/* Selected state gradient */
background: linear-gradient(135deg, #0A4D5C 0%, #1098AD 100%);

/* Hover state */
background: linear-gradient(135deg, #0A4D5C 0%, #1EADC1 100%);

/* Focus ring */
box-shadow: 0 0 0 3px rgba(16, 152, 173, 0.3);
```

### Semantic Meaning
- **Blue = Intelligence, Growth, Clarity**
- Aspirational and emotional
- Perfect for life-changing decisions
- Communicates thoughtfulness

---

## 🔧 Utility/Productivity Context (TF Utilities)

### Primary Interaction Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Dark Copper** | `#8B5A3C` | `139, 90, 60` | Selected states |
| **Copper Sheen** | `#A67C52` | `166, 124, 82` | Hover, metallic accent |
| **Forged Bronze** | `#6B4423` | `107, 68, 35` | Gradient start |

### Gradient Examples

```css
/* Selected state with metallic sheen */
background: linear-gradient(135deg, #6B4423 0%, #8B5A3C 100%);
box-shadow: inset 0 0 20px rgba(139, 90, 60, 0.2);

/* Hover state */
background: linear-gradient(135deg, #8B5A3C 0%, #A67C52 100%);
```

### Semantic Meaning
- **Copper = Industrial, Forged, Engineered**
- Maintains "forge" narrative
- Warm but not aggressive
- Premium metallic feel

---

## 🚨 Semantic States (Universal)

### Success

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Success Green** | `#2D7A3E` | `45, 122, 62` | Success messages |
| **Success Glow** | `#3A9B50` | `58, 155, 80` | Hover, confirmation |

### Warning

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Warning Amber** | `#D97706` | `217, 119, 6` | Warnings, caution |
| **Warning Glow** | `#F59E0B` | `245, 158, 11` | Hover state |

### Error

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Error Red** | `#B91C1C` | `185, 28, 28` | Errors, destructive |
| **Error Glow** | `#DC2626` | `220, 38, 38` | Hover state |

### Info

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Info Blue** | `#1E40AF` | `30, 64, 175` | Information, tips |
| **Info Glow** | `#2563EB` | `37, 99, 235` | Hover state |

---

## 📊 Usage Distribution

### Educational Tools (PathFinder)

```
Foundation (Charcoal):     65%
Content (White/Gray):      25%
Interaction (Blue):        8%
Action Spark (Orange):     2%
```

### Utility Tools (TF Utilities)

```
Foundation (Charcoal):     60%
Content (White/Gray):      25%
Interaction (Copper):      10%
Action Spark (Orange):     5%
```

---

## 🎨 Color Combinations

### Educational Card (Selected)

```css
.card-selected {
  background: #1F1F23; /* Deep Charcoal */
  border: 2px solid #1098AD; /* Anvil Blue */
  box-shadow: 0 4px 12px rgba(16, 152, 173, 0.15);
}

.card-selected .title {
  color: #FFFFFF; /* White */
}

.card-selected .description {
  color: #A8A8A8; /* Smoked Gray */
}

.card-selected .checkmark {
  color: #D96704; /* Forge Orange - micro accent */
}
```

### Utility Card (Active)

```css
.tool-card-active {
  background: #1F1F23; /* Deep Charcoal */
  border-left: 4px solid #D96704; /* Forge Orange accent */
  border-top: 1px solid #8B5A3C; /* Dark Copper */
  border-right: 1px solid #8B5A3C;
  border-bottom: 1px solid #8B5A3C;
}

.tool-card-active .icon {
  color: #A67C52; /* Copper Sheen */
}
```

---

## 🔍 Accessibility Notes

### Contrast Ratios (WCAG AA)

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| White | Forge Charcoal | 14.2:1 | ✅ AAA |
| Smoked Gray | Forge Charcoal | 5.8:1 | ✅ AA |
| Anvil Blue | Deep Charcoal | 4.6:1 | ✅ AA |
| Forge Orange | Deep Charcoal | 5.2:1 | ✅ AA |

### Color Blindness Considerations

- **Blue/Orange combination** works well for most color blindness types
- **Copper/Orange** may be challenging for some users
- Always use **additional indicators** (icons, text) beyond color alone

---

## 💾 Export Formats

### CSS Variables

```css
:root {
  /* Foundation */
  --tf-charcoal: #2B2D31;
  --tf-deep-charcoal: #1F1F23;
  --tf-steel-gray: #3a3a3a;
  
  /* Content */
  --tf-white: #FFFFFF;
  --tf-smoked-gray: #A8A8A8;
  --tf-muted-steel: #6B6B6B;
  
  /* Action */
  --tf-forge-orange: #D96704;
  --tf-ember-glow: #FF6C37;
  
  /* Educational Context */
  --tf-anvil-blue: #1098AD;
  --tf-deep-navy: #0A4D5C;
  --tf-steel-blue: #1EADC1;
  
  /* Utility Context */
  --tf-dark-copper: #8B5A3C;
  --tf-copper-sheen: #A67C52;
  --tf-forged-bronze: #6B4423;
}
```

### Tailwind Config

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'tf-charcoal': '#2B2D31',
        'tf-deep-charcoal': '#1F1F23',
        'tf-steel-gray': '#3a3a3a',
        'tf-white': '#FFFFFF',
        'tf-smoked-gray': '#A8A8A8',
        'tf-forge-orange': '#D96704',
        'tf-ember-glow': '#FF6C37',
        'tf-anvil-blue': '#1098AD',
        'tf-deep-navy': '#0A4D5C',
        'tf-steel-blue': '#1EADC1',
        'tf-dark-copper': '#8B5A3C',
        'tf-copper-sheen': '#A67C52',
      }
    }
  }
}
```

---

**Last Updated:** 2025-11-22  
**Version:** 2.0 (Extended)
