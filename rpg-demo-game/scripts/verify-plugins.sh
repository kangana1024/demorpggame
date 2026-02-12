#!/bin/bash
# ============================================================================
# VisuStella Plugin Verification Script
# พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
# ============================================================================
# Run this script to verify if required plugins have been installed.
# Usage: bash scripts/verify-plugins.sh

PLUGINS_DIR="js/plugins"
PLUGINS_JS="js/plugins.js"
CORE_ENGINE="VisuMZ_0_CoreEngine.js"
VISUAL_PARALLAXES="VisuMZ_1_VisualParallaxes.js"

echo "============================================"
echo "VisuStella Plugin Verification"
echo "============================================"
echo ""

# ============================================
# SECTION 1: Check Plugin Files
# ============================================
echo "📁 Plugin Files:"
echo "--------------------------------------------"

# Check for CoreEngine (FREE)
if [ -f "$PLUGINS_DIR/$CORE_ENGINE" ]; then
    echo "✅ $CORE_ENGINE - INSTALLED"
    CORE_OK=true
else
    echo "❌ $CORE_ENGINE - NOT FOUND"
    echo "   Download FREE from: https://visustella.itch.io/visumz-sample"
    CORE_OK=false
fi

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

# ============================================
# SECTION 2: Verify Load Order Configuration
# ============================================
echo "📋 Load Order Configuration (plugins.js):"
echo "--------------------------------------------"

if [ -f "$PLUGINS_JS" ]; then
    # Check if plugins.js has both plugin entries (commented or not)
    HAS_CORE=$(grep -c "VisuMZ_0_CoreEngine" "$PLUGINS_JS")
    HAS_PARALLAX=$(grep -c "VisuMZ_1_VisualParallaxes" "$PLUGINS_JS")

    if [ "$HAS_CORE" -gt 0 ] && [ "$HAS_PARALLAX" -gt 0 ]; then
        # Find line numbers
        CORE_LINE=$(grep -n "VisuMZ_0_CoreEngine" "$PLUGINS_JS" | head -1 | cut -d: -f1)
        PARALLAX_LINE=$(grep -n "VisuMZ_1_VisualParallaxes" "$PLUGINS_JS" | head -1 | cut -d: -f1)

        if [ "$CORE_LINE" -lt "$PARALLAX_LINE" ]; then
            echo "✅ Load order CORRECT:"
            echo "   Position 1 (line $CORE_LINE): VisuMZ_0_CoreEngine"
            echo "   Position 2 (line $PARALLAX_LINE): VisuMZ_1_VisualParallaxes"
            ORDER_OK=true
        else
            echo "❌ Load order INCORRECT!"
            echo "   CoreEngine must come BEFORE Visual Parallaxes"
            ORDER_OK=false
        fi
    else
        echo "⚠️  Plugin entries not found in plugins.js"
        ORDER_OK=false
    fi

    # Simple check for commented status
    if grep -q '/\*' "$PLUGINS_JS" && grep -q 'VisuMZ_0_CoreEngine' "$PLUGINS_JS"; then
        echo ""
        echo "⚠️  Plugin entries appear to be COMMENTED OUT"
        echo "   After installing plugins, uncomment the entries in plugins.js"
    fi
else
    echo "❌ plugins.js not found!"
    ORDER_OK=false
fi

echo ""

# ============================================
# SECTION 3: Summary
# ============================================
echo "============================================"
echo "📊 Summary:"
echo "--------------------------------------------"

if [ "$CORE_OK" = true ] && [ "$PARALLAX_OK" = true ]; then
    echo "✅ All plugin files installed!"
    if [ "$ORDER_OK" = true ]; then
        echo "✅ Load order configured correctly!"
        echo ""
        echo "Next steps:"
        echo "1. Uncomment plugin entries in js/plugins.js (if not already)"
        echo "2. Open project in RPG Maker MZ"
        echo "3. Verify in Tools → Plugin Manager"
        echo "4. Press F5 to playtest - check F8 console for errors"
        exit 0
    else
        echo "⚠️  Check load order configuration"
        exit 1
    fi
else
    echo "⚠️  Some plugins are missing!"
    echo ""
    echo "Please download the missing plugins and copy them to:"
    echo "  $PLUGINS_DIR/"
    echo ""
    echo "See VISUSTELLA_SETUP.md for detailed instructions."
    exit 1
fi
