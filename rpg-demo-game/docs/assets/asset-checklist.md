# Asset Checklist for พจนภัยในดินแดนอันตราย Demo

This document tracks all required assets for the "Peril in the Dangerous Lands" (พจนภัยในดินแดนอันตราย) RPG Maker MZ demo and their acquisition status. Use this checklist to ensure all assets are sourced before beginning map construction.

---

## Table of Contents

1. [Tilesets](#1-tilesets)
2. [Parallax Layers](#2-parallax-layers)
3. [Character Sprites](#3-character-sprites)
4. [Audio Assets](#4-audio-assets)
5. [Typography](#5-typography)
6. [Plugins](#6-plugins)
7. [Acquisition Summary](#7-acquisition-summary)

---

## Status Legend

| Symbol | Status |
|--------|--------|
| ⬜ | Not Started |
| 🔄 | In Progress |
| ✅ | Acquired |
| ⚠️ | Blocked/Issue |

---

## 1. Tilesets

### 1.1 Village Tilesets

**Purpose**: Border Village (หมู่บ้านชายแดน) - Tutorial/starting area with Thai-inspired architecture

| Asset | Type | Size | Source | License | Status | Notes |
|-------|------|------|--------|---------|--------|-------|
| Thai-style wooden houses | A2 Tileset | 48x48 | KR Spirit of Asia Tileset v2 | Check creator | ⬜ | เรือนไทย (Thai houses) |
| Village ground tiles | A1/A5 Tileset | 48x48 | PIXEL FANTASY TILES | CC-BY or free | ⬜ | Dirt paths, stone |
| Market stalls/objects | B-E Tilesets | 48x48 | itch.io RPG Maker MZ assets | Varies | ⬜ | Merchant props |
| Temple elements | B-E Tilesets | 48x48 | Temple and Ruins Assets | CC variant | ⬜ | Background architecture |
| Village decorations | B-E Tilesets | 48x48 | VisuStella Sample Project | VisuStella terms | ⬜ | Flowers, fences |

### 1.2 Forest Tilesets

**Purpose**: Great Forest Mountains (ป่าเขาใหญ่) - First dangerous terrain zone

| Asset | Type | Size | Source | License | Status | Notes |
|-------|------|------|--------|---------|--------|-------|
| Dense forest trees | A5/B Tileset | 48x48 | Warm Pixel Forest Tileset | Check creator | ⬜ | Canopy, trunks |
| Forest floor | A1/A2 Tileset | 48x48 | Warm Pixel Forest Tileset | Check creator | ⬜ | Grass, roots, dirt |
| Fallen logs/debris | B-E Tilesets | 48x48 | Damp Dungeons | Check creator | ⬜ | Obstacles |
| Rocks/boulders | B-E Tilesets | 48x48 | PIXEL FANTASY TILES | CC-BY or free | ⬜ | Terrain features |

### 1.3 Swamp Tilesets

**Purpose**: Poison swamp and quicksand hazard areas within Great Forest Mountains

| Asset | Type | Size | Source | License | Status | Notes |
|-------|------|------|--------|---------|--------|-------|
| Murky swamp water | A1 Tileset | 48x48 | Damp Dungeons | Check creator | ⬜ | Animated water |
| Poison pools | A1 Tileset | 48x48 | Damp Dungeons | Check creator | ⬜ | Purple/green tint |
| Dead trees | B Tileset | 48x48 | Damp Dungeons | Check creator | ⬜ | Swamp vegetation |
| Quicksand patches | A2/A5 Tileset | 48x48 | Custom or edit | N/A | ⬜ | Requires Region 3 |
| Swamp grass/reeds | B-E Tilesets | 48x48 | Damp Dungeons | Check creator | ⬜ | Foreground details |

---

## 2. Parallax Layers

### 2.1 Border Village Map Layers

**Map Size**: 1280x720 per layer (minimum)

| Layer | Content | Source | License | Status | Notes |
|-------|---------|--------|---------|--------|-------|
| Layer 1 | Far Background - Sky/clouds | Pixel Art Sky Backgrounds | Varies | ⬜ | Static or animated |
| Layer 2 | Mid-Background - Distant mountains/temples | Custom or itch.io | Varies | ⬜ | 0.5x scroll rate |
| Layer 3 | Ground Objects - Main tilemap | RPG Maker MZ built | N/A | ⬜ | 1.0x scroll rate |
| Layer 4 | Character Layer | N/A (system) | N/A | ✅ | Auto-handled |
| Layer 5 | Foreground Objects - Trees in front of player | Forest Parallax Pack | Varies | ⬜ | 1.1x scroll rate, transparency required |
| Layer 6 | Foreground Atmosphere - Light rays/mist | Fog & Atmosphere Effects | Varies | ⬜ | 1.2x scroll rate, transparency required |
| Layer 7 | UI/HUD Overlay | Custom | N/A | ⬜ | Fixed position |

### 2.2 Great Forest Mountains Map Layers

**Map Size**: 1280x720 per layer (minimum)

| Layer | Content | Source | License | Status | Notes |
|-------|---------|--------|---------|--------|-------|
| Layer 1 | Far Background - Misty forest depths | Forest Parallax Pack | Varies | ⬜ | Dark green (#2F4F2F) |
| Layer 2 | Mid-Background - Distant trees | Forest Parallax Pack | Varies | ⬜ | 0.5x scroll rate |
| Layer 3 | Ground Objects - Main tilemap with hazard regions | RPG Maker MZ built | N/A | ⬜ | Include Region 2, 3, 7 |
| Layer 4 | Character Layer | N/A (system) | N/A | ✅ | Auto-handled |
| Layer 5 | Foreground Objects - Dense foliage | Forest Parallax Pack | Varies | ⬜ | 1.1x scroll rate, transparency required |
| Layer 6 | Foreground Atmosphere - Fog/poison mist | Fog & Atmosphere Effects | Varies | ⬜ | Animated, purple tint for poison areas |
| Layer 7 | UI/HUD Overlay | Custom | N/A | ⬜ | Fixed position |

---

## 3. Character Sprites

**Format**: 144x192 PNG (12 frames: 3 columns x 4 directions)
**Frame Size**: 48x48 per frame

### 3.1 Main Character

| Character | Description | Source | License | Status | Notes |
|-----------|-------------|--------|---------|--------|-------|
| Protagonist | Thai warrior/traveler, neutral design | East Asian Characters Vol.5 | Check creator | ⬜ | นักผจญภัย (Adventurer) |

### 3.2 NPC Sprites

| Character | Role | Source | License | Status | Notes |
|-----------|------|--------|---------|--------|-------|
| Village Elder | Tutorial guide NPC | East Asian Characters Vol.5 | Check creator | ⬜ | ผู้อาวุโส |
| Merchant | Shop/info NPC | RPG Maker MZ Character Sprites | Varies | ⬜ | พ่อค้า |
| Child | Environmental NPC | Free RPG Characters | Free commercial | ⬜ | เด็ก |

### 3.3 Optional NPCs (if time permits)

| Character | Role | Source | License | Status | Notes |
|-----------|------|--------|---------|--------|-------|
| Guard | Warning NPC | East Asian Characters Vol.5 | Check creator | ⬜ | ยาม |
| Traveler | Worldbuilding NPC | RPG Maker MZ Character Sprites | Varies | ⬜ | นักเดินทาง |

---

## 4. Audio Assets

**Format**: .ogg (required for RPG Maker MZ)
**BGM Bitrate**: 128-192 kbps
**SE Bitrate**: 96-128 kbps

### 4.1 Background Music (BGM)

| Track | Mood | Duration | Source | License | Status | Notes |
|-------|------|----------|--------|---------|--------|-------|
| Village Theme | Warm, peaceful, Thai-inspired | 2-4 min loop | Soundimage.org Fantasy or itch.io Asian Music | Attribution or varies | ⬜ | หมู่บ้าน BGM |
| Forest Theme | Mysterious, tense | 2-4 min loop | Soundimage.org Fantasy | Attribution | ⬜ | ป่า BGM |

### 4.2 Sound Effects (SE)

| Effect | Purpose | Source | License | Status | Notes |
|--------|---------|--------|---------|--------|-------|
| Danger Warning | Alert for hazard entry | itch.io RPG SE or Freesound | Varies | ⬜ | Region boundary |
| Poison Damage | Sizzle/bubble sound | Freesound | CC0/CC-BY | ⬜ | Region 2 feedback |
| Quicksand | Sinking/suction sound | Freesound | CC0/CC-BY | ⬜ | Region 3 feedback |
| Footsteps (grass) | Walking on safe terrain | RPG Maker MZ default or custom | Included | ⬜ | Optional |
| UI Confirm | Menu selection | RPG Maker MZ default | Included | ✅ | System default |
| UI Cancel | Menu back | RPG Maker MZ default | Included | ✅ | System default |

### 4.3 Background Sounds (BGS) - Optional

| Sound | Purpose | Source | License | Status | Notes |
|-------|---------|--------|---------|--------|-------|
| Village Ambience | Background chatter, birds | Freesound | CC0/CC-BY | ⬜ | Optional |
| Forest Ambience | Wind, distant animals | Freesound | CC0/CC-BY | ⬜ | Optional |
| Swamp Ambience | Bubbling, insects | Freesound | CC0/CC-BY | ⬜ | Optional |

---

## 5. Typography

### 5.1 Thai Font

| Font | Variant | Source | License | Status | Notes |
|------|---------|--------|---------|--------|-------|
| Sarabun | Regular (400) | Google Fonts | SIL OFL (Free commercial) | ⬜ | Primary game font |
| Sarabun | Bold (700) | Google Fonts | SIL OFL | ⬜ | Optional for titles |

### 5.2 Font Configuration

| File | Purpose | Status | Notes |
|------|---------|--------|-------|
| fonts/Sarabun-Regular.ttf | Thai font file | ⬜ | Download from Google Fonts |
| fonts/gamefont.css | Font-face configuration | ⬜ | @font-face { font-family: GameFont; src: url("Sarabun-Regular.ttf"); } |

### 5.3 Thai Character Support Verification

| Category | Characters | Verified |
|----------|------------|----------|
| Consonants | ก ข ค ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ | ⬜ |
| Vowels | ะ า ิ ี ึ ื ุ ู เ แ โ ใ ไ | ⬜ |
| Tone Marks | ่ ้ ๊ ๋ | ⬜ |
| Special | ์ ๆ ฯ | ⬜ |

---

## 6. Plugins

### 6.1 Required Plugins

| Plugin | Version | Source | Cost | License | Status | Load Order |
|--------|---------|--------|------|---------|--------|------------|
| VisuMZ_0_CoreEngine | Latest | VisuStella itch.io | Free | VisuStella TOS | ⬜ | 1 (FIRST) |
| VisuMZ_1_VisualParallaxes | Latest | VisuStella itch.io | $8+ | VisuStella TOS | ⬜ | 2 |
| GALV_LayerGraphics | Latest | galvs-scripts.com | Free | Free for commercial | ⬜ | 3 |

### 6.2 Optional Plugins

| Plugin | Purpose | Source | Cost | Status | Notes |
|--------|---------|--------|------|--------|-------|
| VisuMZ Options Core | Settings menu | VisuStella | Free | ⬜ | Enhanced options |
| VisuMZ Message Core | Text formatting | VisuStella | Free | ⬜ | Thai text support |

### 6.3 Base Project

| Item | Source | Status | Notes |
|------|--------|--------|-------|
| VisuStella Sample Project | https://visustella.itch.io/visumz-sample | ⬜ | Download first as base template |

---

## 7. Acquisition Summary

### 7.1 Overall Progress

| Category | Total Items | Acquired | In Progress | Not Started | Blocked |
|----------|-------------|----------|-------------|-------------|---------|
| Village Tilesets | 5 | 0 | 0 | 5 | 0 |
| Forest Tilesets | 4 | 0 | 0 | 4 | 0 |
| Swamp Tilesets | 5 | 0 | 0 | 5 | 0 |
| Village Parallax Layers | 7 | 1 | 0 | 6 | 0 |
| Forest Parallax Layers | 7 | 1 | 0 | 6 | 0 |
| Character Sprites (Main) | 1 | 0 | 0 | 1 | 0 |
| Character Sprites (NPCs) | 3 | 0 | 0 | 3 | 0 |
| BGM Tracks | 2 | 0 | 0 | 2 | 0 |
| Sound Effects | 6 | 2 | 0 | 4 | 0 |
| Thai Font | 2 | 0 | 0 | 2 | 0 |
| Plugins | 3 | 0 | 0 | 3 | 0 |
| **TOTAL** | **45** | **4** | **0** | **41** | **0** |

### 7.2 Cost Estimate

| Category | Free Assets | Paid Assets | Estimated Cost |
|----------|-------------|-------------|----------------|
| Tilesets | Most | None required | $0 |
| Parallax Layers | All | None | $0 |
| Character Sprites | Most | None required | $0 |
| Audio | Most | Optional DLC | $0-$9.99 |
| Typography | All (Google Fonts) | None | $0 |
| Plugins | 2 free | Visual Parallaxes | $8.00 |
| **TOTAL** | - | - | **$8.00 - $17.99** |

### 7.3 Priority Order for Acquisition

1. **VisuStella Sample Project** (Free) - Base template with plugins
2. **Visual Parallaxes Plugin** ($8) - Core 2.5D functionality
3. **Sarabun Font** (Free) - Thai language support
4. **Village Tilesets** - Starting area assets
5. **Character Sprites** - Player and NPCs
6. **Forest/Swamp Tilesets** - Danger zone assets
7. **BGM Tracks** - Audio atmosphere
8. **Sound Effects** - Feedback sounds
9. **Parallax Layers** - Depth enhancement

---

## 8. License Compliance Notes

**Before using any asset:**

- [ ] Verify commercial use is permitted
- [ ] Document attribution requirements
- [ ] Save license file with asset
- [ ] Check for conflicting licenses

**License Quick Reference:**

| License Type | Commercial Use | Attribution | Share-Alike |
|--------------|----------------|-------------|-------------|
| CC0 | ✅ | ❌ | ❌ |
| CC-BY | ✅ | ✅ Required | ❌ |
| CC-BY-SA | ✅ | ✅ Required | ✅ Required |
| SIL OFL | ✅ | ✅ In credits | ❌ |
| VisuStella TOS | ✅ | ✅ Per TOS | ❌ |

---

## Document Metadata

- **Version**: 1.0
- **Created**: 2025-02-11
- **Last Updated**: 2025-02-11
- **Project**: พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
- **Purpose**: Asset acquisition tracking for demo development
- **Related Document**: [Asset Sourcing Guide](./asset-sourcing-guide.md)
