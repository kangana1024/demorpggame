#!/bin/bash
# ============================================================================
# VisuStella Plugin Verification Script
# พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
# ============================================================================
# Run this script to verify if required plugins have been installed.
# Usage: bash scripts/verify-plugins.sh

PLUGINS_DIR="js/plugins"
CORE_ENGINE="VisuMZ_0_CoreEngine.js"
VISUAL_PARALLAXES="VisuMZ_1_VisualParallaxes.js"

echo "============================================"
echo "VisuStella Plugin Installation Verification"
echo "============================================"
echo ""

# Check for CoreEngine (FREE)
if [ -f "$PLUGINS_DIR/$CORE_ENGINE" ]; then
    echo "✅ $CORE_ENGINE - INSTALLED"
    CORE_OK=true
else
    echo "❌ $CORE_ENGINE - NOT FOUND"
    echo "   Download FREE from: https://visustella.itch.io/visumz-sample"
    CORE_OK=false
fi

echo ""

# Check for Visual Parallaxes (PAID)
if [ -f "$PLUGINS_DIR/$VISUAL_PARALLAXES" ]; then
    echo "✅ $VISUAL_PARALLAXES - INSTALLED"
    PARALLAX_OK=true
else
    echo "❌ $VISUAL_PARALLAXES - NOT FOUND"
    echo "   Purchase (\$8+) from: https://visustellamz.itch.io/visual-parallaxes"
    PARALLAX_OK=false
fi

echo ""
echo "============================================"

if [ "$CORE_OK" = true ] && [ "$PARALLAX_OK" = true ]; then
    echo "✅ All plugins installed!"
    echo ""
    echo "Next steps:"
    echo "1. Edit js/plugins.js and uncomment the plugin entries"
    echo "2. Open project in RPG Maker MZ"
    echo "3. Verify load order in Tools → Plugin Manager"
    echo "4. Press F5 to playtest"
    exit 0
else
    echo "⚠️  Some plugins are missing!"
    echo ""
    echo "Please download the missing plugins and copy them to:"
    echo "  $PLUGINS_DIR/"
    echo ""
    echo "See VISUSTELLA_SETUP.md for detailed instructions."
    exit 1
fi
