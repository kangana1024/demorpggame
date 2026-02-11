# Border Village Parallax Images

This directory contains parallax background layers for the Border Village (หมู่บ้านชายแดน) map.

## Current Status

**⚠️ Placeholder Images**: The current PNG files are 1x1 pixel placeholders. To generate the full 1280x720 parallax images, follow the instructions below.

## Image Specifications

| File | Layer | Purpose | Dimensions |
|------|-------|---------|------------|
| `village_01_sky.png` | 1 | Far background - sky with clouds | 1280x720 |
| `village_02_distant_mountains.png` | 2 | Mid-background - mountain silhouettes | 1280x720 |
| `village_03_ground.png` | 3 | Ground terrain with grass and paths | 1280x720 |
| `village_05_foreground.png` | 5 | Foreground trees and bushes (transparent) | 1280x720 |

## Color Palette (Border Village)

- **Primary**: `#8B7355` (Warm brown)
- **Secondary**: `#6B8E23` (Healthy green)
- **Accent**: `#FFD700` (Gold)

## Generating Full-Size Images

### Option 1: Using the Generation Script (Recommended)

A Node.js script is provided to generate proper parallax images:

```bash
# Navigate to scripts directory
cd rpg-demo-game/scripts

# Install dependencies
npm install

# Generate parallax images
npm run generate-parallax
# OR
node generate-parallax-images.js
```

The script will:
1. Create 1280x720 PNG images with proper parallax content
2. Use the Border Village color palette
3. Generate sky gradients, mountain silhouettes, terrain, and foliage
4. Save files to `img/parallaxes/`

### Option 2: Manual Creation

If you prefer to create custom parallax images:

1. Use an image editor (Photoshop, GIMP, Aseprite, etc.)
2. Create images at **1280x720** pixels
3. Follow the color palette above
4. Export as PNG with transparency for layers 5 and 6
5. Name files as specified in the table above

### Option 3: Asset Packs

Download pre-made parallax backgrounds from:
- https://itch.io/game-assets/tag-parallax
- Search for "forest parallax" or "village parallax"
- Ensure dimensions are 1280x720 or larger

## Layer Structure (VisuStella Visual Parallaxes)

```
Layer 7: UI/HUD Overlay           (z-index: highest, fixed)
Layer 6: Foreground Atmosphere    (fog, particles, 1.2x scroll)
Layer 5: Foreground Objects       (trees in front of player, 1.1x scroll)
Layer 4: Character Layer          (player, NPCs, 1.0x scroll)
Layer 3: Ground Objects           (terrain features, 1.0x scroll)
Layer 2: Mid-Background           (distant buildings, 0.5x scroll)
Layer 1: Far Background           (sky, mountains, 0.2x scroll)
```

## Verification

After generating/creating images, verify:
- [ ] All files exist in `img/parallaxes/`
- [ ] Dimensions are 1280x720 or larger
- [ ] Colors match the Border Village palette
- [ ] Layers 5+ have transparency where needed

---

*Part of พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands) demo project*
