# RPG Maker MZ Plugins Directory

This folder should contain the VisuStella plugins required for the 2.5D parallax effect.

## Required Files

Place these files in this folder:

| File | Source | Cost |
|------|--------|------|
| `VisuMZ_0_CoreEngine.js` | [VisuStella Sample Project](https://visustella.itch.io/visumz-sample) | FREE |
| `VisuMZ_1_VisualParallaxes.js` | [VisuStella Store](https://visustellamz.itch.io/visual-parallaxes) | $8+ |

## Installation

1. Download plugins from the URLs above
2. Copy the `.js` files to this folder
3. Update `js/plugins.js` to enable them
4. Verify in RPG Maker MZ Plugin Manager

See `VISUSTELLA_SETUP.md` in the project root for detailed instructions.

## Load Order

**CRITICAL:** CoreEngine must load FIRST!

```
1. VisuMZ_0_CoreEngine.js
2. VisuMZ_1_VisualParallaxes.js
```

Wrong order causes silent failures.
