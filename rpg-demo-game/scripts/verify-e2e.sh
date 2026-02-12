#!/bin/bash
# =============================================================================
# End-to-End Verification Script for Thai RPG Demo
# Subtask 6-4: Comprehensive gameplay verification
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="$PROJECT_DIR/data"

echo "========================================"
echo " Thai RPG Demo - E2E Verification"
echo " พจนภัยในดินแดนอันตราย"
echo "========================================"
echo ""

PASS=0
FAIL=0
WARN=0

pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((PASS++))
}

fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((FAIL++))
}

warn() {
    echo -e "${YELLOW}⚠ WARN${NC}: $1"
    ((WARN++))
}

info() {
    echo -e "${BLUE}ℹ INFO${NC}: $1"
}

# =============================================================================
# Step 1: Start new game - player appears in Border Village
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Start new game - Border Village"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check System.json for start position
if [ -f "$DATA_DIR/System.json" ]; then
    START_MAP=$(grep -o '"startMapId":[0-9]*' "$DATA_DIR/System.json" | head -1 | grep -o '[0-9]*')
    START_X=$(grep -o '"startX":[0-9]*' "$DATA_DIR/System.json" | head -1 | grep -o '[0-9]*')
    START_Y=$(grep -o '"startY":[0-9]*' "$DATA_DIR/System.json" | head -1 | grep -o '[0-9]*')

    if [ "$START_MAP" = "1" ]; then
        pass "Player starts on Map 1 (Border Village)"
    else
        fail "Player starts on Map $START_MAP, expected Map 1"
    fi

    info "Start position: ($START_X, $START_Y)"

    # Check game title in Thai
    if grep -q '"gameTitle":"พจนภัยในดินแดนอันตราย"' "$DATA_DIR/System.json"; then
        pass "Thai game title configured"
    else
        fail "Thai game title not found"
    fi

    # Check Thai locale
    if grep -q '"locale":"th_TH"' "$DATA_DIR/System.json"; then
        pass "Thai locale (th_TH) configured"
    else
        fail "Thai locale not found"
    fi
else
    fail "System.json not found"
fi

# Check Map001.json (Border Village)
if [ -f "$DATA_DIR/Map001.json" ]; then
    if grep -q '"displayName":"หมู่บ้านชายแดน"' "$DATA_DIR/Map001.json"; then
        pass "Border Village map has Thai display name"
    else
        fail "Border Village Thai display name not found"
    fi

    # Check map dimensions (30x30)
    WIDTH=$(grep -o '"width":[0-9]*' "$DATA_DIR/Map001.json" | head -1 | grep -o '[0-9]*')
    HEIGHT=$(grep -o '"height":[0-9]*' "$DATA_DIR/Map001.json" | head -1 | grep -o '[0-9]*')
    if [ "$WIDTH" -ge 30 ] && [ "$HEIGHT" -ge 30 ]; then
        pass "Border Village map dimensions: ${WIDTH}x${HEIGHT}"
    else
        fail "Border Village map too small: ${WIDTH}x${HEIGHT} (need 30x30)"
    fi
else
    fail "Map001.json not found"
fi

# =============================================================================
# Step 2: Talk to 3+ NPCs - Thai text renders correctly
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: NPC interactions with Thai text"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$DATA_DIR/Map001.json" ]; then
    # Count NPCs (events with Thai names)
    NPC_COUNT=$(grep -c '"name":"ผู้อาวุโส"\|"name":"พ่อค้า"\|"name":"เด็กน้อย"' "$DATA_DIR/Map001.json" 2>/dev/null || echo "0")

    if [ "$NPC_COUNT" -ge 3 ]; then
        pass "Found $NPC_COUNT NPCs with Thai names"
    else
        fail "Found only $NPC_COUNT NPCs, need at least 3"
    fi

    # Check for Thai dialogue (code 401 with Thai text)
    if grep -q '"ยินดีต้อนรับ' "$DATA_DIR/Map001.json" && \
       grep -q '"สวัสดี' "$DATA_DIR/Map001.json" && \
       grep -q '"พี่' "$DATA_DIR/Map001.json"; then
        pass "NPCs have Thai dialogue text"
    else
        warn "Some NPC dialogue may be missing"
    fi
fi

# Check Thai font configuration
if [ -f "$PROJECT_DIR/fonts/gamefont.css" ]; then
    if grep -q 'Sarabun-Regular.ttf' "$PROJECT_DIR/fonts/gamefont.css"; then
        pass "Thai font (Sarabun) configured in gamefont.css"
    else
        fail "Sarabun font not configured"
    fi
else
    fail "gamefont.css not found"
fi

if [ -f "$PROJECT_DIR/fonts/Sarabun-Regular.ttf" ]; then
    FONT_SIZE=$(stat -f%z "$PROJECT_DIR/fonts/Sarabun-Regular.ttf" 2>/dev/null || stat -c%s "$PROJECT_DIR/fonts/Sarabun-Regular.ttf" 2>/dev/null || echo "0")
    if [ "$FONT_SIZE" -gt 10000 ]; then
        pass "Thai font file present (${FONT_SIZE} bytes)"
    else
        warn "Thai font file may be placeholder (${FONT_SIZE} bytes)"
    fi
else
    fail "Sarabun-Regular.ttf not found"
fi

# =============================================================================
# Step 3: Save game at save point
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Save game functionality"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$DATA_DIR/Map001.json" ]; then
    # Check for save point event (code 352 = Open Save Screen)
    if grep -q '"code":352' "$DATA_DIR/Map001.json"; then
        pass "Save point event exists (code 352 - Open Save Screen)"
    else
        fail "Save point event not found"
    fi

    # Check for save point Thai text
    if grep -q 'จุดบันทึก\|ศาลเจ้า\|บันทึกเกม' "$DATA_DIR/Map001.json"; then
        pass "Save point has Thai text"
    else
        warn "Save point Thai text not found"
    fi
fi

# =============================================================================
# Step 4: Walk to forest exit - transfer to Great Forest Mountains
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Map transfer to Great Forest"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$DATA_DIR/Map001.json" ]; then
    # Check for transfer event to Map002 (code 201)
    if grep -q '"code":201' "$DATA_DIR/Map001.json" && grep -q '\[0,2,' "$DATA_DIR/Map001.json"; then
        pass "Map transfer event to Map002 exists"
    else
        fail "Map transfer event not found"
    fi
fi

if [ -f "$DATA_DIR/Map002.json" ]; then
    # Check for return transfer to Map001
    if grep -q '"code":201' "$DATA_DIR/Map002.json" && grep -q '\[0,1,' "$DATA_DIR/Map002.json"; then
        pass "Return transfer event to Map001 exists"
    else
        fail "Return transfer event not found"
    fi

    if grep -q '"displayName":"ป่าเขาใหญ่"' "$DATA_DIR/Map002.json"; then
        pass "Great Forest Mountains map has Thai display name"
    else
        fail "Great Forest Thai display name not found"
    fi
fi

# =============================================================================
# Step 5: Experience 2.5D parallax depth effect
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 5: 2.5D parallax depth effect"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check for parallax image files
VILLAGE_PARALLAX=$(ls -1 "$PROJECT_DIR/img/parallaxes/village_"*.png 2>/dev/null | wc -l | tr -d ' ')
FOREST_PARALLAX=$(ls -1 "$PROJECT_DIR/img/parallaxes/forest_"*.png 2>/dev/null | wc -l | tr -d ' ')

if [ "$VILLAGE_PARALLAX" -ge 4 ]; then
    pass "Border Village has $VILLAGE_PARALLAX parallax layers"
else
    fail "Border Village has only $VILLAGE_PARALLAX parallax layers (need 4+)"
fi

if [ "$FOREST_PARALLAX" -ge 4 ]; then
    pass "Great Forest has $FOREST_PARALLAX parallax layers"
else
    fail "Great Forest has only $FOREST_PARALLAX parallax layers (need 4+)"
fi

# Check for Visual Parallax plugin tags in map notes
if [ -f "$DATA_DIR/Map002.json" ]; then
    PARALLAX_COUNT=$(grep -o '<Visual Parallax>' "$DATA_DIR/Map002.json" | wc -l | tr -d ' ')
    if [ "$PARALLAX_COUNT" -ge 4 ]; then
        pass "Great Forest map has $PARALLAX_COUNT Visual Parallax tags (depth layers)"
    else
        warn "Great Forest map has only $PARALLAX_COUNT Visual Parallax tags"
    fi

    # Check for varying scroll rates (depth effect)
    if grep -q 'scrollX:0.2\|scrollX:0.4\|scrollX:0.7\|scrollX:1.1\|scrollX:1.2' "$DATA_DIR/Map002.json"; then
        pass "Parallax layers have varying scroll rates for depth"
    else
        warn "Scroll rates not verified"
    fi
fi

# =============================================================================
# Step 6: Poison Swamp hazard
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 6: Poison Swamp hazard (Region 2)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$DATA_DIR/CommonEvents.json" ]; then
    # Check for Region 2 detection
    if grep -q 'regionId() === 2' "$DATA_DIR/CommonEvents.json"; then
        pass "Region 2 (Poison Swamp) detection implemented"
    else
        fail "Region 2 detection not found"
    fi

    # Check for HP damage
    if grep -q 'gainHp(-damage)' "$DATA_DIR/CommonEvents.json"; then
        pass "HP damage on poison swamp implemented"
    else
        fail "HP damage not implemented"
    fi

    # Check for Poison state (State ID 2)
    if grep -q 'addState(2)' "$DATA_DIR/CommonEvents.json"; then
        pass "Poison status effect application implemented"
    else
        fail "Poison status not applied"
    fi

    # Check for green screen tint (code 223)
    if grep -q '"code":223.*\[200,255,200' "$DATA_DIR/CommonEvents.json" 2>/dev/null || \
       grep -q '200, 255, 200' "$DATA_DIR/CommonEvents.json"; then
        pass "Green screen tint for poison swamp implemented"
    else
        warn "Screen tint may not match exact spec values"
    fi
fi

# Check States.json for Poison state
if [ -f "$DATA_DIR/States.json" ]; then
    if grep -q '"name":"พิษ"' "$DATA_DIR/States.json"; then
        pass "Poison state (พิษ) defined with Thai name"
    else
        fail "Poison state with Thai name not found"
    fi

    if grep -q '"code":22' "$DATA_DIR/States.json"; then
        pass "Poison state has HP drain trait (code 22)"
    else
        fail "HP drain trait not configured for Poison"
    fi
fi

# =============================================================================
# Step 7: Quicksand hazard
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 7: Quicksand hazard (Region 3)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$DATA_DIR/CommonEvents.json" ]; then
    # Check for Region 3 detection
    if grep -q 'regionId() === 3' "$DATA_DIR/CommonEvents.json"; then
        pass "Region 3 (Quicksand) detection implemented"
    else
        fail "Region 3 detection not found"
    fi

    # Check for movement speed reduction
    if grep -q 'setMoveSpeed(2)' "$DATA_DIR/CommonEvents.json"; then
        pass "Movement speed reduction (50%) implemented"
    else
        fail "Movement speed reduction not found"
    fi

    # Check for visual feedback (screen tint or shake)
    if grep -q '_inQuicksand' "$DATA_DIR/CommonEvents.json"; then
        pass "Quicksand state tracking implemented"
    else
        warn "Quicksand state tracking not found"
    fi
fi

# Check Map002 for Region 3 areas
if [ -f "$DATA_DIR/Map002.json" ]; then
    # Look for region 3 in map note
    if grep -q 'Region 3\|Quicksand' "$DATA_DIR/Map002.json"; then
        pass "Quicksand areas documented in map"
    else
        warn "Quicksand documentation not found in map note"
    fi
fi

# =============================================================================
# Step 8: Return to safe path - effects clear
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 8: Safe zone effect clearing"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "$DATA_DIR/CommonEvents.json" ]; then
    # Check for Region 7 safe zone
    if grep -q 'regionId() === 7' "$DATA_DIR/CommonEvents.json"; then
        pass "Region 7 (Safe Zone) detection implemented"
    else
        fail "Region 7 detection not found"
    fi

    # Check for tint restoration
    if grep -q '\[0,0,0,0\]' "$DATA_DIR/CommonEvents.json"; then
        pass "Screen tint restoration to normal implemented"
    else
        warn "Screen tint restoration may not be configured"
    fi

    # Check for speed restoration
    if grep -q 'setMoveSpeed(4)' "$DATA_DIR/CommonEvents.json"; then
        pass "Movement speed restoration implemented"
    else
        fail "Speed restoration not found"
    fi
fi

# =============================================================================
# Step 9: Performance check (30+ FPS)
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 9: Performance considerations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

info "Performance verification requires manual testing in RPG Maker MZ"
info "Press F8 during playtest to open developer console"
info "Target: Maintain 30+ FPS with all parallax layers active"

# Check for parallel process event (trigger: 2)
if [ -f "$DATA_DIR/CommonEvents.json" ]; then
    if grep -q '"trigger":2' "$DATA_DIR/CommonEvents.json"; then
        pass "Terrain Check System uses parallel process (trigger: 2)"
    else
        fail "Parallel process trigger not found"
    fi

    # Check for frame delay to prevent performance issues
    if grep -q '"code":230.*30' "$DATA_DIR/CommonEvents.json" 2>/dev/null || \
       grep -q '"code":230' "$DATA_DIR/CommonEvents.json"; then
        pass "Frame delay (Wait command) in terrain check system"
    else
        warn "Consider adding frame delay to terrain check for performance"
    fi
fi

# =============================================================================
# Summary
# =============================================================================
echo ""
echo "========================================"
echo "        VERIFICATION SUMMARY"
echo "========================================"
echo ""
TOTAL=$((PASS + FAIL + WARN))
echo -e "${GREEN}PASS${NC}: $PASS"
echo -e "${RED}FAIL${NC}: $FAIL"
echo -e "${YELLOW}WARN${NC}: $WARN"
echo "────────────────────────────────────────"
echo "TOTAL: $TOTAL checks"
echo ""

if [ "$FAIL" -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "MANUAL TESTING REQUIRED:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "1. Open Game.rpgproject in RPG Maker MZ"
    echo "2. Press F5 to start playtest"
    echo "3. Walk around Border Village"
    echo "4. Talk to all 3 NPCs (Elder, Merchant, Child)"
    echo "5. Use the save point crystal"
    echo "6. Exit east to Great Forest Mountains"
    echo "7. Walk into Poison Swamp (green water)"
    echo "8. Walk into Quicksand (tan sand)"
    echo "9. Return to path (brown tiles)"
    echo "10. Monitor FPS via F8 developer console"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some checks failed - review issues above${NC}"
    echo ""
    exit 1
fi
