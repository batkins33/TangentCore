# Component Examples - Implementation Guide

This directory contains **working HTML examples** demonstrating the Tangent Forge design principles in action.

---

## 📁 Examples Included

### 1. [pathfinder-selection-example.html](file:///C:/Users/brian.atkins/.gemini/antigravity/scratch/tangent-forge-utilities/examples/pathfinder-selection-example.html)

**Context:** Educational/Career Discovery Tool (PathFinder)

**Demonstrates:**
- ✅ **Anvil Blue gradient** for selection states (`#0A4D5C` → `#1098AD`)
- ✅ **Orange checkmarks** as micro-accents (not full backgrounds)
- ✅ **60/30/10 color distribution** (Charcoal foundation, White content, Blue interaction, Orange spark)
- ✅ **Contained orange button** (< 200px wide)
- ✅ **Progress indicators** using blue (not orange)
- ✅ **Thoughtful, aspirational feel** appropriate for life-changing decisions

**Key Techniques:**
```css
/* Selection state - Blue gradient, NOT orange background */
.option.selected {
  background: linear-gradient(135deg, #0A4D5C 0%, #1098AD 100%);
  border: 2px solid #1098AD;
}

/* Checkmark - ONLY orange element in selection */
.option.selected .checkmark {
  background: #D96704;
  color: #FFFFFF;
}

/* Button - Small and contained */
.btn-primary {
  background: #D96704;
  max-width: 200px; /* Not full-width! */
}
```

---

### 2. [utilities-dashboard-example.html](file:///C:/Users/brian.atkins/.gemini/antigravity/scratch/tangent-forge-utilities/examples/utilities-dashboard-example.html)

**Context:** Productivity/Utility Tool (TF Utilities)

**Demonstrates:**
- ✅ **Dark Copper accents** for active states (`#8B5A3C`)
- ✅ **Thin orange border** on active cards (not full backgrounds)
- ✅ **Orange hero metrics** (appropriate for data display)
- ✅ **Orange checkboxes** in file lists (micro-accents)
- ✅ **Contained action buttons** (< 180px wide)
- ✅ **Industrial, engineered feel** with copper metallic hints

**Key Techniques:**
```css
/* Active card - Thin orange accent, copper borders */
.tool-card.active {
  border-left: 4px solid #D96704; /* Thin orange accent */
  border-top: 1px solid #8B5A3C; /* Copper */
  box-shadow: inset 0 0 20px rgba(139, 90, 60, 0.1); /* Copper glow */
}

/* Hero metric - Orange is appropriate here */
.metric-value {
  font-size: 32px;
  color: #D96704; /* Orange for data emphasis */
}

/* File selection - Copper background, orange checkbox */
.file-item.selected {
  background: rgba(139, 90, 60, 0.1); /* Copper tint */
  border: 1px solid #8B5A3C;
}

.file-item.selected .file-checkbox {
  background: #D96704; /* Orange checkmark */
}
```

---

## 🎨 Design Principles Demonstrated

### 1. Orange Restraint

**Both examples show:**
- ❌ NO large orange backgrounds
- ❌ NO full-width orange selections
- ✅ Orange only for: buttons (< 240px), checkmarks, icons, hero metrics
- ✅ Orange feels like a "spark" not a "flood"

### 2. Context-Appropriate Interaction Colors

**PathFinder (Educational):**
- Blue = thoughtfulness, intelligence, growth
- Perfect for career/college decisions
- Emotional resonance

**TF Utilities (Productivity):**
- Copper = industrial, forged, engineered
- Maintains "forge" narrative
- Professional and purposeful

### 3. 60/30/10 Rule

**Both examples follow:**
- 60% Foundation (Forge Charcoal `#2B2D31`)
- 30% Content (White `#FFFFFF` + Smoked Gray `#A8A8A8`)
- 10% Interaction (Blue `#1098AD` or Copper `#8B5A3C`)
- 5% Spark (Orange `#D96704`)

---

## 🚀 How to Use These Examples

### Option 1: Open in Browser
Simply double-click the HTML files to open them in your browser and see the design in action.

### Option 2: Extract Components
Copy the CSS and HTML for specific components:
- Selection cards
- Action buttons
- File lists
- Tool cards
- Progress indicators

### Option 3: Use as Reference
Keep these open while building to ensure you're following the design principles.

---

## 📊 Visual Comparison

### Selection States

| Context | Background | Border | Accent |
|---------|------------|--------|--------|
| **PathFinder** | Blue gradient | Blue | Orange checkmark |
| **TF Utilities** | Copper tint | Copper | Orange checkbox |

### Action Buttons

| Context | Size | Color | Usage |
|---------|------|-------|-------|
| **PathFinder** | < 200px | Orange | "Continue", "Submit" |
| **TF Utilities** | < 180px | Orange | "Scan", "Execute" |

### Hero Metrics

| Context | Color | When to Use |
|---------|-------|-------------|
| **Both** | Orange | Large data displays (GB, counts, scores) |

---

## 🎯 Key Takeaways

1. **Orange is for decisive moments** - buttons, checkmarks, data
2. **Blue/Copper for thoughtful interactions** - selections, focus states
3. **Charcoal is the foundation** - quiet, engineered, premium
4. **Buttons stay small** - contained, not full-width
5. **Context matters** - educational vs utility tools use different interaction colors

---

## 🔄 Next Steps

1. **Review both examples** in a browser
2. **Compare the differences** between educational and utility contexts
3. **Extract components** you need for your project
4. **Apply the principles** to your own designs
5. **Test the visual weight** - does orange feel like a spark or a flood?

---

**Last Updated:** 2025-11-22  
**Status:** Ready for Implementation
