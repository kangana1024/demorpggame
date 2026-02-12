# Parallax Background Images

This directory contains parallax background layers for the maps in พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands).

## Current Status

**⚠️ Placeholder Images**: The current PNG files are 1x1 pixel placeholders. To generate the full 1280x720 parallax images, follow the instructions below.

---

## Border Village (หมู่บ้านชายแดน)

| File | Layer | Purpose | Dimensions |
|------|-------|---------|------------|
| `village_01_sky.png` | 1 | Far background - sky with clouds | 1280x720 |
| `village_02_distant_mountains.png` | 2 | Mid-background - mountain silhouettes | 1280x720 |
| `village_03_ground.png` | 3 | Ground terrain with grass and paths | 1280x720 |
| `village_05_foreground.png` | 5 | Foreground trees and bushes (transparent) | 1280x720 |

### Color Palette (Border Village)

- **Primary**: `#8B7355` (Warm brown)
- **Secondary**: `#6B8E23` (Healthy green)
- **Accent**: `#FFD700` (Gold)

---

## Great Forest Mountains (ป่าเขาใหญ่)

| File | Layer | Purpose | Dimensions |
|------|-------|---------|------------|
| `forest_01_sky.png` | 1 | Dark overcast sky with storm clouds | 1280x720 |
| `forest_02_distant_trees.png` | 2 | Layered dark forest tree silhouettes | 1280x720 |
| `forest_03_ground.png` | 3 | Dark ground with poison swamp patches | 1280x720 |
| `forest_05_foreground_bushes.png` | 5 | Dark twisted trees and thorn bushes (transparent) | 1280x720 |
| `forest_06_fog.png` | 6 | Purple-tinted fog overlay (transparent) | 1280x720 |

### Color Palette (Great Forest Mountains)

- **Primary**: `#2F4F2F` (Dark forest green)
- **Secondary**: `#4A4A4A` (Shadow grey)
- **Accent**: `#9932CC` (Poison purple)

---

## Generating Full-Size Images

### Option 1: Using the Generation Script (Recommended)

A Node.js script is provided to generate proper parallax images:

```bash
# Navigate to scripts directory
cd rpg-demo-game/scripts

# Install dependencies (first time only)
npm install

# Generate all parallax images
node generate-parallax-images.js --all

# Or generate specific maps:
node generate-parallax-images.js --village  # Border Village only
node generate-parallax-images.js --forest   # Great Forest only
```

The script will:
1. Create 1280x720 PNG images with proper parallax content
2. Use the appropriate color palette for each map
3. Generate atmospheric effects (clouds, fog, poison glow)
4. Save files to `img/parallaxes/`

### Option 2: Manual Creation

If you prefer to create custom parallax images:

1. Use an image editor (Photoshop, GIMP, Aseprite, etc.)
2. Create images at **1280x720** pixels
3. Follow the color palettes listed above
4. Export as PNG with transparency for layers 5 and 6
5. Name files exactly as specified in the tables above

### Option 3: Asset Packs

Download pre-made parallax backgrounds from:
- https://itch.io/game-assets/tag-parallax
- Search for "dark forest parallax" or "spooky forest parallax"
- Ensure dimensions are 1280x720 or larger

---

## Layer Structure (VisuStella Visual Parallaxes)

```
Layer 7: UI/HUD Overlay           (z-index: highest, fixed)
Layer 6: Foreground Atmosphere    (fog, particles, 1.2x scroll)
Layer 5: Foreground Objects       (trees in front of player, 1.1x scroll)
Layer 4: Character Layer          (player, NPCs, 1.0x scroll)
Layer 3: Ground Objects           (terrain features, 1.0x scroll)
Layer 2: Mid-Background           (distant trees/buildings, 0.5x scroll)
Layer 1: Far Background           (sky, 0.2x scroll)
```

### Scroll Rates

| Layer | Rate | Effect |
|-------|------|--------|
| 7 | Fixed (0x) | Stays in place |
| 6 | 1.2x | Slight foreground parallax |
| 5 | 1.1x | Foreground depth |
| 4 | 1.0x | Moves with camera |
| 3 | 1.0x | Ground level |
| 2 | 0.5x | Mid-distance depth |
| 1 | 0.2x | Far distance depth |

---

## Verification Checklist

After generating/creating images, verify:

### Border Village
- [ ] All 4 village_*.png files exist
- [ ] Dimensions are 1280x720 or larger
- [ ] Colors match the warm village palette
- [ ] village_05_foreground.png has transparency

### Great Forest Mountains
- [ ] All 5 forest_*.png files exist
- [ ] Dimensions are 1280x720 or larger
- [ ] Colors match the dark forest palette (#2F4F2F, #4A4A4A, #9932CC)
- [ ] forest_05_foreground_bushes.png has transparency
- [ ] forest_06_fog.png has transparency for overlay effect

---

## Technical Notes

- **File Format**: PNG (required for transparency support)
- **Color Mode**: RGBA for layers 5 and 6, RGB for other layers
- **Compression**: Standard PNG compression is fine
- **Naming**: Exact file names are required for plugin configuration

---

*Part of พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands) demo project*
