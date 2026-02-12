# VisuStella MZ Plugin Setup Guide

This project requires the VisuStella MZ Sample Project as its base. Follow these steps to complete the setup.

## Required Downloads

### 1. VisuStella MZ Sample Project (FREE)

**URL**: https://visustella.itch.io/visumz-sample

**What to do**:
1. Visit the URL above
2. Click "Download Now" (Name your own price - can be $0)
3. Download `VisuMZ_Sample_Game_Project.zip` (127 MB)
4. Extract the contents

**Files to copy from the Sample Project**:
- Copy all files from `js/plugins/` to this project's `js/plugins/` folder
  - Most importantly: `VisuMZ_0_CoreEngine.js` (REQUIRED)
- Copy all files from `js/libs/` to this project's `js/libs/` folder
  - `pixi.js`, `pako.min.js`, `localforage.min.js`, `effekseer.min.js`, `vorbisdecoder.js`
- Copy all core JS files to `js/` folder:
  - `rmmz_core.js`
  - `rmmz_managers.js`
  - `rmmz_objects.js`
  - `rmmz_scenes.js`
  - `rmmz_sprites.js`
  - `rmmz_windows.js`

### 2. Visual Parallaxes Plugin ($8+)

**URL**: https://visustellamz.itch.io/visual-parallaxes

**What to do**:
1. Purchase the plugin (minimum $8)
2. Download `VisuMZ_1_VisualParallaxes.js`
3. Copy to `js/plugins/` folder

## Plugin Configuration

After copying the plugin files, update `js/plugins.js`:

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

## Verification

After completing the setup:

1. Open `Game.rpgproject` in RPG Maker MZ
2. Go to **Tools → Plugin Manager**
3. Verify plugins are listed in this order:
   - Position 1: VisuMZ_0_CoreEngine
   - Position 2: VisuMZ_1_VisualParallaxes
4. Press F5 to playtest - no errors should appear in the console

## Critical Notes

- **Plugin Load Order**: CoreEngine MUST load before all other VisuStella plugins
- **Do NOT encrypt**: Do not encrypt game files during development (breaks plugins)
- **License**: VisuStella plugins are licensed per-project; see their Terms of Service

## File Structure After Setup

```
rpg-demo-game/
├── Game.rpgproject
├── index.html
├── package.json
├── js/
│   ├── main.js
│   ├── plugins.js
│   ├── rmmz_core.js           ← from Sample Project
│   ├── rmmz_managers.js       ← from Sample Project
│   ├── rmmz_objects.js        ← from Sample Project
│   ├── rmmz_scenes.js         ← from Sample Project
│   ├── rmmz_sprites.js        ← from Sample Project
│   ├── rmmz_windows.js        ← from Sample Project
│   ├── libs/
│   │   ├── pixi.js            ← from Sample Project
│   │   ├── pako.min.js        ← from Sample Project
│   │   ├── localforage.min.js ← from Sample Project
│   │   ├── effekseer.min.js   ← from Sample Project
│   │   └── vorbisdecoder.js   ← from Sample Project
│   └── plugins/
│       ├── VisuMZ_0_CoreEngine.js        ← from Sample Project (FREE)
│       └── VisuMZ_1_VisualParallaxes.js  ← from itch.io ($8+)
├── data/
│   ├── System.json
│   ├── Actors.json
│   └── ... (other data files)
├── img/
│   ├── characters/
│   ├── parallaxes/
│   └── ...
├── audio/
│   ├── bgm/
│   ├── bgs/
│   ├── me/
│   └── se/
└── fonts/
    ├── Sarabun-Regular.ttf    ← download from Google Fonts
    └── gamefont.css
```

## Support

- VisuStella Discord: https://discord.gg/visustellamz
- VisuStella Wiki: https://wiki.visustellamz.com/
