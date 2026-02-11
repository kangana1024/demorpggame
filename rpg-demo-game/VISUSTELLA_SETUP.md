# VisuStella Plugin Setup Guide

This guide explains how to install the required VisuStella plugins for the พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands) demo.

## Required Plugins

### 1. VisuMZ_0_CoreEngine.js (FREE)

**Source:** VisuStella Sample Project
**URL:** https://visustella.itch.io/visumz-sample
**Cost:** FREE

**Installation Steps:**
1. Go to https://visustella.itch.io/visumz-sample
2. Click "Download Now" (pay what you want, $0 minimum)
3. Extract the downloaded ZIP file
4. Navigate to the `js/plugins/` folder in the extracted project
5. Copy `VisuMZ_0_CoreEngine.js` to this project's `js/plugins/` folder

---

### 2. VisuMZ_1_VisualParallaxes.js (PAID - $8+)

**Source:** VisuStella itch.io Store
**URL:** https://visustellamz.itch.io/visual-parallaxes
**Cost:** $8.00 USD (minimum)

**Installation Steps:**
1. Go to https://visustellamz.itch.io/visual-parallaxes
2. Purchase the plugin ($8 minimum)
3. Download the plugin ZIP file
4. Extract the ZIP file
5. Copy `VisuMZ_1_VisualParallaxes.js` to this project's `js/plugins/` folder

---

## After Installing Both Plugins

### Step 1: Verify Files Exist

Check that both files exist:
```
rpg-demo-game/js/plugins/VisuMZ_0_CoreEngine.js
rpg-demo-game/js/plugins/VisuMZ_1_VisualParallaxes.js
```

### Step 2: Enable Plugins in plugins.js

Open `rpg-demo-game/js/plugins.js` and uncomment the plugin entries:

```javascript
var $plugins = [
    {
        "name": "VisuMZ_0_CoreEngine",
        "status": true,
        "description": "VisuStella MZ - Core Engine",
        "parameters": {}
    },
    {
        "name": "VisuMZ_1_VisualParallaxes",
        "status": true,
        "description": "VisuStella MZ - Visual Parallaxes",
        "parameters": {}
    }
];
```

### Step 3: Configure in RPG Maker MZ

1. Open the project in RPG Maker MZ: `File → Open Project → Select Game.rpgproject`
2. Go to `Tools → Plugin Manager`
3. Verify the load order:
   - Position 1: VisuMZ_0_CoreEngine
   - Position 2: VisuMZ_1_VisualParallaxes
4. Press OK to save

### Step 4: Test the Setup

1. Press F5 in RPG Maker MZ to playtest
2. Open the developer console (F8 or F12)
3. Verify no plugin errors appear in the console

---

## Plugin Load Order (CRITICAL!)

The load order is **critically important**. CoreEngine MUST be loaded before Visual Parallaxes:

| Position | Plugin Name | Status |
|----------|-------------|--------|
| 1 | VisuMZ_0_CoreEngine | Must be FIRST |
| 2 | VisuMZ_1_VisualParallaxes | Must be AFTER CoreEngine |

**Wrong load order causes silent failures!**

---

## Troubleshooting

### "Plugin not found" Error
- Verify the .js file exists in `js/plugins/`
- Check that the filename matches exactly (case-sensitive)
- Ensure the file extension is `.js` not `.js.txt`

### "Dependency not met" Error
- Ensure VisuMZ_0_CoreEngine is loaded BEFORE VisuMZ_1_VisualParallaxes
- Check the plugin order in Plugin Manager

### Parallax Not Displaying
- Verify Visual Parallaxes plugin is enabled (status: true)
- Check map note tags for parallax configuration
- Ensure parallax images exist in `img/parallaxes/`

---

## Visual Parallaxes Basic Configuration

Once installed, you can add parallax layers to maps using note tags.

**Map Note Box Example:**
```
<Parallax id:1 name:village_01_sky>
<Parallax id:1 scrollX:0>
<Parallax id:1 scrollY:0>

<Parallax id:2 name:village_02_mountains>
<Parallax id:2 scrollX:0.5>
<Parallax id:2 scrollY:0>
```

Refer to the Visual Parallaxes plugin documentation (included with purchase) for full configuration options.

---

## License Notes

- VisuMZ_0_CoreEngine: Free for commercial and non-commercial use
- VisuMZ_1_VisualParallaxes: Commercial license included with purchase

Both plugins are subject to VisuStella's Terms of Service:
https://www.visustellamz.com/terms-of-service

---

## Verification Scripts

After downloading the plugins, run the verification scripts to check installation:

### Plugin Verification
```bash
cd rpg-demo-game
bash scripts/verify-plugins.sh
```

This verifies:
- Plugin files are installed in `js/plugins/`
- Load order is configured correctly in `plugins.js`

### Full Project Verification
```bash
cd rpg-demo-game
bash scripts/verify-project.sh
```

This performs a comprehensive check of:
- Project structure (all required folders)
- Data files (maps, actors, system, etc.)
- Font configuration
- Plugin load order

---

## Quick Reference

| Item | URL |
|------|-----|
| CoreEngine (FREE) | https://visustella.itch.io/visumz-sample |
| Visual Parallaxes ($8+) | https://visustellamz.itch.io/visual-parallaxes |
| VisuStella Documentation | https://www.visustellamz.com/documentation |
| VisuStella Discord | https://discord.gg/visustellamz |
