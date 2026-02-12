#!/bin/bash
# Performance Verification Script for Thai RPG Demo
# This script validates performance-related configurations in the project files

echo "=========================================="
echo "Thai RPG Demo - Performance Verification"
echo "=========================================="
echo ""

PROJECT_ROOT="$(dirname "$0")/.."
cd "$PROJECT_ROOT"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PASS_COUNT=0
WARN_COUNT=0
FAIL_COUNT=0

pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((PASS_COUNT++))
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
    ((WARN_COUNT++))
}

fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((FAIL_COUNT++))
}

echo "1. Checking Parallax Layer Count..."
echo "-----------------------------------"

# Count parallax layers in Map001
VILLAGE_LAYERS=$(grep -c "Visual Parallax" data/Map001.json 2>/dev/null || echo "0")
if [ "$VILLAGE_LAYERS" -le 5 ]; then
    pass "Border Village: $VILLAGE_LAYERS parallax layers (optimal: <= 5)"
elif [ "$VILLAGE_LAYERS" -le 7 ]; then
    warn "Border Village: $VILLAGE_LAYERS parallax layers (may impact performance)"
else
    fail "Border Village: $VILLAGE_LAYERS parallax layers (too many - will impact FPS)"
fi

# Count parallax layers in Map002
FOREST_LAYERS=$(grep -c "Visual Parallax" data/Map002.json 2>/dev/null || echo "0")
if [ "$FOREST_LAYERS" -le 5 ]; then
    pass "Great Forest: $FOREST_LAYERS parallax layers (optimal: <= 5)"
elif [ "$FOREST_LAYERS" -le 7 ]; then
    warn "Great Forest: $FOREST_LAYERS parallax layers (may impact performance)"
else
    fail "Great Forest: $FOREST_LAYERS parallax layers (too many - will impact FPS)"
fi

echo ""
echo "2. Checking Terrain Check Frequency..."
echo "--------------------------------------"

# Check for frame delay in terrain system
FRAME_DELAY=$(grep -o '"parameters": \[\([0-9]*\)\]' data/CommonEvents.json | grep -o '[0-9]*' | tail -1)
if [ -n "$FRAME_DELAY" ] && [ "$FRAME_DELAY" -ge 30 ]; then
    pass "Terrain check delay: $FRAME_DELAY frames (~$(echo "scale=1; $FRAME_DELAY/60" | bc)s at 60fps)"
elif [ -n "$FRAME_DELAY" ] && [ "$FRAME_DELAY" -ge 15 ]; then
    warn "Terrain check delay: $FRAME_DELAY frames (consider increasing to 30+)"
else
    fail "Terrain check delay too low or not found - may cause performance issues"
fi

echo ""
echo "3. Checking State Flag Optimization..."
echo "--------------------------------------"

# Check for state tracking flags
if grep -q "_inPoisonSwamp" data/CommonEvents.json 2>/dev/null; then
    pass "Poison swamp state tracking: Present"
else
    warn "Poison swamp state tracking: Not found (may cause tint flickering)"
fi

if grep -q "_inQuicksand" data/CommonEvents.json 2>/dev/null; then
    pass "Quicksand state tracking: Present"
else
    warn "Quicksand state tracking: Not found (may cause tint flickering)"
fi

if grep -q "_inSafeZone" data/CommonEvents.json 2>/dev/null; then
    pass "Safe zone state tracking: Present"
else
    warn "Safe zone state tracking: Not found"
fi

echo ""
echo "4. Checking Map Dimensions..."
echo "-----------------------------"

# Check Map001 dimensions
MAP1_WIDTH=$(grep -o '"width": [0-9]*' data/Map001.json | grep -o '[0-9]*')
MAP1_HEIGHT=$(grep -o '"height": [0-9]*' data/Map001.json | grep -o '[0-9]*')
MAP1_TILES=$((MAP1_WIDTH * MAP1_HEIGHT))
if [ "$MAP1_TILES" -le 2500 ]; then
    pass "Border Village: ${MAP1_WIDTH}x${MAP1_HEIGHT} = $MAP1_TILES tiles (optimal)"
elif [ "$MAP1_TILES" -le 5000 ]; then
    warn "Border Village: ${MAP1_WIDTH}x${MAP1_HEIGHT} = $MAP1_TILES tiles (moderate)"
else
    fail "Border Village: ${MAP1_WIDTH}x${MAP1_HEIGHT} = $MAP1_TILES tiles (large - may impact FPS)"
fi

# Check Map002 dimensions
MAP2_WIDTH=$(grep -o '"width": [0-9]*' data/Map002.json | grep -o '[0-9]*')
MAP2_HEIGHT=$(grep -o '"height": [0-9]*' data/Map002.json | grep -o '[0-9]*')
MAP2_TILES=$((MAP2_WIDTH * MAP2_HEIGHT))
if [ "$MAP2_TILES" -le 2500 ]; then
    pass "Great Forest: ${MAP2_WIDTH}x${MAP2_HEIGHT} = $MAP2_TILES tiles (optimal)"
elif [ "$MAP2_TILES" -le 5000 ]; then
    warn "Great Forest: ${MAP2_WIDTH}x${MAP2_HEIGHT} = $MAP2_TILES tiles (moderate)"
else
    fail "Great Forest: ${MAP2_WIDTH}x${MAP2_HEIGHT} = $MAP2_TILES tiles (large - may impact FPS)"
fi

echo ""
echo "5. Checking Sound Effect Optimization..."
echo "----------------------------------------"

if grep -q "_quicksandSoundTimer" data/CommonEvents.json 2>/dev/null; then
    pass "Sound effect cooldown: Present (prevents audio spam)"
else
    warn "Sound effect cooldown: Not found (may cause audio spam)"
fi

echo ""
echo "6. Checking Fog Layer Settings..."
echo "----------------------------------"

# Check fog opacity - the note field contains escaped \n characters
# Extract the section after forest_06_fog and before the next Visual Parallax tag
if grep -q "forest_06_fog" data/Map002.json 2>/dev/null; then
    # Use sed to convert \n to actual newlines, then extract fog section
    FOG_OPACITY=$(sed 's/\\n/\n/g' data/Map002.json | grep -A10 "forest_06_fog" | grep "opacity:" | head -1 | grep -o '[0-9]*')
    if [ -n "$FOG_OPACITY" ] && [ "$FOG_OPACITY" -le 150 ]; then
        pass "Fog layer opacity: $FOG_OPACITY (optimal for performance)"
    elif [ -n "$FOG_OPACITY" ]; then
        warn "Fog layer opacity: $FOG_OPACITY (consider reducing for better FPS)"
    else
        pass "Fog layer present, using default opacity"
    fi
else
    pass "No fog layer detected"
fi

echo ""
echo "=========================================="
echo "Performance Verification Summary"
echo "=========================================="
echo -e "${GREEN}Passed:${NC}   $PASS_COUNT"
echo -e "${YELLOW}Warnings:${NC} $WARN_COUNT"
echo -e "${RED}Failed:${NC}   $FAIL_COUNT"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}Performance configuration looks good!${NC}"
    echo ""
    echo "NEXT STEP: Manual FPS Testing Required"
    echo "======================================="
    echo "1. Open Game.rpgproject in RPG Maker MZ"
    echo "2. Press F5 to start playtest"
    echo "3. Press F8 to open developer console"
    echo "4. Play for 10+ minutes across both maps"
    echo "5. Monitor FPS - target: 30+ FPS consistently"
    echo ""
    echo "See docs/e2e-test-report.md for detailed testing checklist."
else
    echo -e "${RED}Performance issues detected - review warnings above${NC}"
    exit 1
fi
