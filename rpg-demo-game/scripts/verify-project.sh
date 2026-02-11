#!/bin/bash
# ============================================================================
# RPG Maker MZ Project Verification Script
# พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
# ============================================================================
# Run this script to verify the project structure is valid and ready to run.
# Usage: bash scripts/verify-project.sh

echo "============================================"
echo "RPG Maker MZ Project Verification"
echo "พจนภัยในดินแดนอันตราย"
echo "============================================"
echo ""

ERRORS=0
WARNINGS=0

# ============================================
# SECTION 1: Project File Structure
# ============================================
echo "📁 Project Structure:"
echo "--------------------------------------------"

# Check for required project file
if [ -f "Game.rpgproject" ]; then
    echo "✅ Game.rpgproject exists"
else
    echo "❌ Game.rpgproject missing!"
    ((ERRORS++))
fi

# Check for required directories
REQUIRED_DIRS=("audio" "data" "fonts" "img" "js" "js/plugins")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/ directory exists"
    else
        echo "❌ $dir/ directory missing!"
        ((ERRORS++))
    fi
done

echo ""

# ============================================
# SECTION 2: Required Data Files
# ============================================
echo "📄 Required Data Files:"
echo "--------------------------------------------"

DATA_FILES=("Actors.json" "Classes.json" "CommonEvents.json" "Items.json" "MapInfos.json" "Skills.json" "States.json" "System.json" "Tilesets.json")
for file in "${DATA_FILES[@]}"; do
    if [ -f "data/$file" ]; then
        echo "✅ data/$file"
    else
        echo "❌ data/$file missing!"
        ((ERRORS++))
    fi
done

# Check for at least one map
MAP_COUNT=$(ls -1 data/Map*.json 2>/dev/null | wc -l | tr -d ' ')
if [ "$MAP_COUNT" -gt 0 ]; then
    echo "✅ Maps found: $MAP_COUNT"
else
    echo "❌ No map files found!"
    ((ERRORS++))
fi

echo ""

# ============================================
# SECTION 3: System.json Validation
# ============================================
echo "⚙️  System Configuration:"
echo "--------------------------------------------"

if [ -f "data/System.json" ]; then
    # Check game title
    GAME_TITLE=$(grep -o '"gameTitle":\s*"[^"]*"' data/System.json | cut -d'"' -f4)
    if [ -n "$GAME_TITLE" ]; then
        echo "✅ Game title: $GAME_TITLE"
    else
        echo "⚠️  Game title not set"
        ((WARNINGS++))
    fi

    # Check start map (get the root-level startMapId, not vehicle ones)
    # The root level one is on an unindented line
    START_MAP=$(grep '^  "startMapId":' data/System.json | grep -o '[0-9]*')
    if [ -n "$START_MAP" ] && [ "$START_MAP" -gt 0 ]; then
        echo "✅ Start map ID: $START_MAP"
        # Verify the start map exists
        START_MAP_FILE="data/Map$(printf '%03d' $START_MAP).json"
        if [ -f "$START_MAP_FILE" ]; then
            echo "✅ Start map file exists: $START_MAP_FILE"
        else
            echo "❌ Start map file missing: $START_MAP_FILE"
            ((ERRORS++))
        fi
    else
        echo "❌ Start map not configured!"
        ((ERRORS++))
    fi

    # Check locale
    LOCALE=$(grep -o '"locale":\s*"[^"]*"' data/System.json | cut -d'"' -f4)
    if [ -n "$LOCALE" ]; then
        echo "✅ Locale: $LOCALE"
    fi
fi

echo ""

# ============================================
# SECTION 4: Font Configuration
# ============================================
echo "🔤 Font Configuration:"
echo "--------------------------------------------"

if [ -f "fonts/gamefont.css" ]; then
    echo "✅ fonts/gamefont.css exists"
    # Check for Thai font
    if grep -q "Sarabun" "fonts/gamefont.css"; then
        echo "✅ Thai font (Sarabun) configured"
    fi
else
    echo "⚠️  fonts/gamefont.css missing (will use defaults)"
    ((WARNINGS++))
fi

# Check for font files
FONT_COUNT=$(ls -1 fonts/*.ttf fonts/*.woff fonts/*.woff2 2>/dev/null | wc -l | tr -d ' ')
if [ "$FONT_COUNT" -gt 0 ]; then
    echo "✅ Font files found: $FONT_COUNT"
else
    echo "⚠️  No font files found (will use system fonts)"
    ((WARNINGS++))
fi

echo ""

# ============================================
# SECTION 5: JavaScript Files
# ============================================
echo "📜 JavaScript Core:"
echo "--------------------------------------------"

CORE_JS_FILES=("main.js" "plugins.js")
for file in "${CORE_JS_FILES[@]}"; do
    if [ -f "js/$file" ]; then
        echo "✅ js/$file"
    else
        echo "❌ js/$file missing!"
        ((ERRORS++))
    fi
done

# Check for rpg_* core files
RPG_CORE_COUNT=$(ls -1 js/rpg_*.js 2>/dev/null | wc -l | tr -d ' ')
if [ "$RPG_CORE_COUNT" -gt 0 ]; then
    echo "✅ RPG Maker core scripts: $RPG_CORE_COUNT files"
else
    echo "⚠️  RPG Maker core scripts not found (may use libs/ folder)"
    ((WARNINGS++))
fi

echo ""

# ============================================
# SECTION 6: Plugin Load Order
# ============================================
echo "🔌 Plugin Configuration:"
echo "--------------------------------------------"

if [ -f "js/plugins.js" ]; then
    # Check plugin order
    HAS_CORE=$(grep -c "VisuMZ_0_CoreEngine" "js/plugins.js")
    HAS_PARALLAX=$(grep -c "VisuMZ_1_VisualParallaxes" "js/plugins.js")

    if [ "$HAS_CORE" -gt 0 ] && [ "$HAS_PARALLAX" -gt 0 ]; then
        CORE_LINE=$(grep -n "VisuMZ_0_CoreEngine" "js/plugins.js" | head -1 | cut -d: -f1)
        PARALLAX_LINE=$(grep -n "VisuMZ_1_VisualParallaxes" "js/plugins.js" | head -1 | cut -d: -f1)

        if [ "$CORE_LINE" -lt "$PARALLAX_LINE" ]; then
            echo "✅ Plugin load order is correct"
            echo "   1. VisuMZ_0_CoreEngine (line $CORE_LINE)"
            echo "   2. VisuMZ_1_VisualParallaxes (line $PARALLAX_LINE)"
        else
            echo "❌ Plugin load order INCORRECT!"
            echo "   CoreEngine must be loaded before Visual Parallaxes"
            ((ERRORS++))
        fi

        # Check if plugins are installed
        if [ -f "js/plugins/VisuMZ_0_CoreEngine.js" ]; then
            echo "✅ CoreEngine plugin file installed"
        else
            echo "⚠️  CoreEngine plugin not installed yet"
            ((WARNINGS++))
        fi

        if [ -f "js/plugins/VisuMZ_1_VisualParallaxes.js" ]; then
            echo "✅ Visual Parallaxes plugin file installed"
        else
            echo "⚠️  Visual Parallaxes plugin not installed yet"
            ((WARNINGS++))
        fi
    else
        echo "⚠️  Plugin entries not configured"
        ((WARNINGS++))
    fi
fi

echo ""

# ============================================
# SUMMARY
# ============================================
echo "============================================"
echo "📊 Verification Summary"
echo "============================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Project is ready for playtesting."
    echo "Open in RPG Maker MZ and press F5 to test."
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "✅ Core checks passed with $WARNINGS warning(s)"
    echo ""
    echo "Project should run but review warnings above."
    exit 0
else
    echo "❌ Found $ERRORS error(s) and $WARNINGS warning(s)"
    echo ""
    echo "Please fix the errors before running the project."
    exit 1
fi
