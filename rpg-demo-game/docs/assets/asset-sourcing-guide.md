# Asset Sourcing Guide for พจนภัยในดินแดนอันตราย

This comprehensive guide documents all asset sources for the "Peril in the Dangerous Lands" (พจนภัยในดินแดนอันตราย) RPG Maker MZ demo game. Each section includes download URLs, licensing information, and integration instructions.

---

## Table of Contents

1. [VisuStella Sample Project (Recommended Starting Point)](#1-visustella-sample-project)
2. [itch.io Game Assets](#2-itchio-game-assets)
3. [OpenGameArt.org](#3-opengameart-org)
4. [Google Fonts (Thai Typography)](#4-google-fonts-thai-typography)
5. [Audio Resources](#5-audio-resources)
6. [Steam Workshop & DLC](#6-steam-workshop--dlc)
7. [Plugin Sources](#7-plugin-sources)
8. [Asset Preparation Guidelines](#8-asset-preparation-guidelines)

---

## 1. VisuStella Sample Project

**Priority**: ⭐⭐⭐ ESSENTIAL - Download First

### Download URL
**https://visustella.itch.io/visumz-sample**

### What it Provides
- Pre-configured VisuStella plugins with correct load order
- Sample parallax maps (towns, forests, interiors)
- Working plugin configuration examples
- Quick-start project template for RPG Maker MZ
- Documentation for 2.5D visual setup

### License
- **Type**: Free for use with VisuStella plugins
- **Commercial Use**: Yes
- **Attribution**: Follow VisuStella terms of service

### Installation Instructions
1. Navigate to https://visustella.itch.io/visumz-sample
2. Click "Download" (free, no account required)
3. Extract ZIP contents to your project directory
4. Open `Game.rpgproject` in RPG Maker MZ
5. Verify plugins load without errors in Plugin Manager

### Use Case for This Project
- Base template for 2.5D parallax system
- Reference for plugin configuration
- Starting point for Border Village and Great Forest Mountains maps

---

## 2. itch.io Game Assets

**Priority**: ⭐⭐⭐ HIGH - Primary tileset and sprite source

### Primary Browse URLs

| Category | URL |
|----------|-----|
| Free RPG Maker MZ Assets | https://itch.io/game-assets/free/tag-rpg-maker-mz |
| Asian-Themed RPG Assets | https://itch.io/game-assets/tag-asian/tag-rpgmaker |
| Parallax Backgrounds | https://itch.io/game-assets/tag-parallax |
| Pixel Art Characters | https://itch.io/game-assets/tag-pixel-art/tag-characters |

### Recommended Asset Packs

#### Tilesets

| Asset Pack | URL | Use Case | License |
|------------|-----|----------|---------|
| **KR Spirit of Asia Tileset v2** | https://itch.io/search?q=KR+Spirit+of+Asia | Thai-inspired architecture, temple elements | Check creator terms |
| **PIXEL FANTASY TILES** | https://itch.io/game-assets/free/tag-fantasy/tag-tileset | Village wooden structures | Usually CC-BY or free commercial |
| **Damp Dungeons Tileset** | https://itch.io/search?q=Damp+Dungeons+tileset | Swamp areas, poison terrain | Check creator terms |
| **Warm Pixel Forest Tileset** | https://itch.io/search?q=Warm+Pixel+Forest | Forest vegetation, trees | Check creator terms |
| **Medieval Death Asset Pack** | https://itch.io/search?q=Medieval+Death+Asset | Ruins elements | Check creator terms |

#### Character Sprites

| Asset Pack | URL | Use Case | License |
|------------|-----|----------|---------|
| **East Asian Characters Vol.5** | https://itch.io/search?q=East+Asian+Characters | Thai-style NPCs and protagonists | Check creator terms |
| **RPG Maker MZ Character Sprites** | https://itch.io/game-assets/tag-rpg-maker-mz/tag-characters | Villager NPCs | Varies by creator |
| **Free RPG Characters** | https://itch.io/game-assets/free/tag-characters | Generic NPCs | Usually free commercial |

#### Parallax Backgrounds

| Asset Pack | URL | Use Case | License |
|------------|-----|----------|---------|
| **Pixel Art Sky Backgrounds** | https://itch.io/game-assets/tag-sky | Layer 1 - Far background | Varies |
| **Forest Parallax Pack** | https://itch.io/game-assets/tag-forest/tag-parallax | Layers 2, 5, 6 - Forest depth | Varies |
| **Fog & Atmosphere Effects** | https://itch.io/game-assets/tag-effects | Layer 6 - Foreground atmosphere | Varies |

### Search Tips for itch.io
- Search for "RPG Maker MZ" + asset type (e.g., "RPG Maker MZ forest tileset")
- Filter by "Free" for budget development
- Check "License info" in each asset pack description
- Look for packs with 48x48 tile size or resizable assets

---

## 3. OpenGameArt.org

**Priority**: ⭐⭐ MEDIUM - Free alternatives and supplementary assets

### Main URL
**https://opengameart.org**

### Recommended Assets

| Asset | Direct URL | Notes | License |
|-------|------------|-------|---------|
| **Temple and Ruins Assets** | https://opengameart.org/content/temple-and-ruins-assets | Japanese buildings adaptable to Thai temples | Check individual license |
| **Minimalist Chinese Temple** | https://opengameart.org/art-search?keys=chinese+temple | Temple tileset elements | CC0 / CC-BY variants |
| **Roguelike/RPG Pack** | https://opengameart.org/content/roguelike-tiles-large-collection | 1,700+ tiles (16x16) | CC0 |
| **Outdoor Tiles** | https://opengameart.org/content/lpc-outdoor-tiles | Forest, grass, water | CC-BY-SA 3.0 |
| **Medieval Building Pack** | https://opengameart.org/content/lpc-medieval-building-pack | Village structures | CC-BY-SA 3.0 |

### Search URLs by Category

| Category | Search URL |
|----------|------------|
| Forest/Nature | https://opengameart.org/art-search?keys=forest+tileset |
| Asian/Temple | https://opengameart.org/art-search?keys=asian+temple |
| Village/Town | https://opengameart.org/art-search?keys=village+rpg |
| Swamp/Water | https://opengameart.org/art-search?keys=swamp+tileset |
| Characters | https://opengameart.org/art-search?keys=rpg+character+sprite |

### ⚠️ Critical Note: Tile Size Conversion
OpenGameArt assets are typically **16x16** or **32x32** pixels. RPG Maker MZ requires **48x48** pixels.

**Upscaling Procedure:**
1. Open image in GIMP, Aseprite, or Photoshop
2. Image → Scale Image
3. Set interpolation to **"None" (Nearest Neighbor)**
4. Scale: 16x16 → 48x48 (3x) or 32x32 → 48x48 (1.5x)
5. Export as PNG with transparency preserved

---

## 4. Google Fonts (Thai Typography)

**Priority**: ⭐⭐⭐ ESSENTIAL - Required for Thai language support

### Primary Font: Sarabun

| Property | Value |
|----------|-------|
| **Name** | Sarabun |
| **URL** | https://fonts.google.com/specimen/Sarabun |
| **License** | SIL Open Font License (OFL) - Free for commercial use |
| **Weights Available** | Thin (100) to ExtraBold (800) + Italic variants |
| **Recommended Weight** | Regular (400) for game text |

### Download Instructions
1. Navigate to https://fonts.google.com/specimen/Sarabun
2. Click "Download family" button (top right)
3. Extract ZIP file
4. Copy `Sarabun-Regular.ttf` to `fonts/` directory in your project

### Alternative Thai Fonts

| Font | URL | Best For |
|------|-----|----------|
| **Noto Sans Thai** | https://fonts.google.com/specimen/Noto+Sans+Thai | Modern UI, clean readability |
| **Prompt** | https://fonts.google.com/specimen/Prompt | Stylized headings |
| **Kanit** | https://fonts.google.com/specimen/Kanit | Bold titles |
| **Mitr** | https://fonts.google.com/specimen/Mitr | Rounded, friendly |
| **Chakra Petch** | https://fonts.google.com/specimen/Chakra+Petch | Tech/modern aesthetic |

### Thai Font Features to Verify
- Thai consonants: ก ข ค ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ
- Vowels: ะ า ิ ี ึ ื ุ ู เ แ โ ใ ไ
- Tone marks: ่ ้ ๊ ๋
- Special characters: ์ ๆ ฯ

### Integration Code
```css
/* fonts/gamefont.css */
@font-face {
    font-family: GameFont;
    src: url("Sarabun-Regular.ttf");
}
```

---

## 5. Audio Resources

**Priority**: ⭐⭐ HIGH - Essential for game atmosphere

### Free Audio Sources

| Source | URL | Content Type | License |
|--------|-----|--------------|---------|
| **Soundimage.org** | https://soundimage.org/fantasywonder/ | Fantasy RPG BGM | Free with attribution |
| **itch.io Free RPG Music** | https://itch.io/game-assets/free/genre-rpg/tag-music | Various BGM tracks | Varies (check each) |
| **OpenGameArt Audio** | https://opengameart.org/art-search-advanced?keys=&field_art_type_tid[]=12 | BGM and SE | CC licenses |
| **Freesound.org** | https://freesound.org | Sound effects | CC0, CC-BY |
| **Incompetech** | https://incompetech.com/music/royalty-free/ | Kevin MacLeod royalty-free | CC-BY 3.0 |

### Asian-Themed Audio

| Source | URL | Content | License |
|--------|-----|---------|---------|
| **itch.io Asian Music** | https://itch.io/game-assets/tag-asian/tag-music | Traditional Asian BGM | Varies |
| **Soundimage Asian Fantasy** | https://soundimage.org/fantasy-6/ | East Asian inspired tracks | Attribution required |
| **OpenGameArt Asian** | https://opengameart.org/art-search?keys=asian+music | Traditional instruments | CC licenses |

### Premium Audio (Paid)

| Source | URL | Content | Price |
|--------|-----|---------|-------|
| **WOW Sound Oriental RPG** | https://www.wowsound.com | Professional Asian BGM | Paid |
| **Shanghai Fantasy Story DLC** | https://store.steampowered.com/app/1378440 | Asian-themed game BGM | $9.99 (sales: ~$4) |
| **Humble Bundle Audio** | https://www.humblebundle.com | Occasional RPG audio bundles | Varies |

### Required Audio Tracks for Demo

| Track Purpose | Type | Mood | Format |
|---------------|------|------|--------|
| Village Theme | BGM | Warm, peaceful, Thai-inspired | .ogg |
| Forest Theme | BGM | Mysterious, tense | .ogg |
| Danger Warning | SE | Alert, urgent | .ogg |
| Terrain Damage | SE | Sizzle (poison), splash (swamp) | .ogg |
| Quicksand | SE | Sinking, suction sounds | .ogg |
| UI Confirm | SE | Pleasant click | .ogg |
| UI Cancel | SE | Soft decline | .ogg |

### Audio Technical Requirements
- **Format**: .ogg (required for RPG Maker MZ web deployment)
- **BGM Bitrate**: 128-192 kbps
- **SE Bitrate**: 96-128 kbps
- **BGM Loop**: Use seamless loops where possible

### Conversion Tools
- **Audacity** (Free): https://www.audacityteam.org - Convert MP3/WAV to OGG
- **FFmpeg** (Free CLI): `ffmpeg -i input.mp3 -c:a libvorbis -q:a 5 output.ogg`

---

## 6. Steam Workshop & DLC

**Priority**: ⭐ LOW - Optional enhancements

### Steam Workshop
**URL**: https://steamcommunity.com/workshop/browse/?appid=1096900

Browse user-created content for RPG Maker MZ including:
- Custom plugins
- Tilesets
- Character generators
- Sample projects

### Recommended DLC

| DLC Name | URL | Price | Content |
|----------|-----|-------|---------|
| **Medieval Asian Fantasy Weapons** | https://store.steampowered.com/app/1715410 | $4.99 | Sideview weapon sprites |
| **Shanghai Fantasy Story** | https://store.steampowered.com/app/1378440 | $9.99 (60% off sales) | Asian-themed BGM |
| **Samurai Japan: Castle Tiles** | https://store.steampowered.com/app/1167760 | $9.99 | Japanese castle architecture |
| **FSM - Asian World Music** | https://store.steampowered.com/app/1119630 | $14.99 | Traditional Asian instruments |

### Note on DLC
- All official DLC includes commercial use rights
- Watch for Steam sales (up to 60% off)
- Cross-compatible with RPG Maker MZ projects

---

## 7. Plugin Sources

**Priority**: ⭐⭐⭐ ESSENTIAL - Core functionality

### Required Plugins

| Plugin | Source URL | Cost | Load Order |
|--------|------------|------|------------|
| **VisuMZ_0_CoreEngine** | https://visustellamz.itch.io/core-engine | Free | 1 (FIRST) |
| **VisuMZ_1_VisualParallaxes** | https://visustellamz.itch.io/visual-parallaxes | $8+ | 2 |
| **GALV_LayerGraphics** | https://galvs-scripts.com/category/rmmz-plugins/ | Free | 3 |

### Plugin Installation
1. Download `.js` plugin files from source URLs
2. Place in `js/plugins/` directory
3. Open RPG Maker MZ Plugin Manager
4. Add plugins in the **exact order listed above**
5. Configure settings per documentation

### ⚠️ Critical: Plugin Load Order
CoreEngine **MUST** load before all other VisuStella plugins. Incorrect order causes game-breaking errors.

### Additional Useful Plugins

| Plugin | Source | Purpose | Cost |
|--------|--------|---------|------|
| VisuMZ Options Core | VisuStella | Settings menu | Free |
| VisuMZ Message Core | VisuStella | Text formatting | Free |
| CGMZ Encyclopedia | CGMZ | Item/creature database | Free |

---

## 8. Asset Preparation Guidelines

### Folder Structure
```
rpg-demo-game/
├── img/
│   ├── characters/     # 48x48 character sprites (144x192 sheets)
│   ├── tilesets/       # 48x48 tiles (A1-E format)
│   ├── parallaxes/     # 1280x720 background layers
│   └── pictures/       # UI elements
├── audio/
│   ├── bgm/            # Background music (.ogg)
│   ├── bgs/            # Ambient sounds (.ogg)
│   └── se/             # Sound effects (.ogg)
└── fonts/
    └── Sarabun-Regular.ttf
```

### Image Format Requirements
| Type | Format | Size | Notes |
|------|--------|------|-------|
| Tilesets | PNG | 48x48 per tile | A1-E tileset organization |
| Characters | PNG | 144x192 (3x4 frames) | 48x48 per frame |
| Parallaxes | PNG | 1280x720 | Transparency for layers 5, 6 |
| Pictures | PNG | Various | With alpha channel |

### Audio Format Requirements
| Type | Format | Bitrate | Notes |
|------|--------|---------|-------|
| BGM | .ogg | 128-192 kbps | Seamless loop points |
| BGS | .ogg | 96-128 kbps | Ambient loops |
| SE | .ogg | 96 kbps | Short, single-play |

### License Compliance Checklist
Before using any asset, verify:
- [ ] Commercial use is permitted
- [ ] Attribution requirements are documented
- [ ] License file is saved with asset
- [ ] No conflicting licenses in the project

---

## Quick Reference: Essential Downloads

| Priority | Asset | URL | Action |
|----------|-------|-----|--------|
| 1 | VisuStella Sample Project | https://visustella.itch.io/visumz-sample | Download base template |
| 2 | Sarabun Font | https://fonts.google.com/specimen/Sarabun | Download, install in fonts/ |
| 3 | Visual Parallaxes Plugin | https://visustellamz.itch.io/visual-parallaxes | Purchase, install in js/plugins/ |
| 4 | Asian Tilesets | https://itch.io/game-assets/tag-asian/tag-rpgmaker | Browse, download suitable packs |
| 5 | Audio | https://soundimage.org/fantasywonder/ | Download BGM with attribution |

---

## Document Metadata
- **Version**: 1.0
- **Last Updated**: 2025-02-11
- **Project**: พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
- **Purpose**: Asset acquisition guide for demo development
