#!/bin/bash
# Audio Setup Script for พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
# This script helps set up background music for the demo game.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BGM_DIR="$PROJECT_ROOT/audio/bgm"

echo "============================================"
echo "  Audio Setup for พจนภัยในดินแดนอันตราย"
echo "  (Peril in the Dangerous Lands)"
echo "============================================"
echo ""

# Check if FFmpeg is available (needed for audio conversion)
check_ffmpeg() {
    if command -v ffmpeg &> /dev/null; then
        echo "✓ FFmpeg found - audio conversion available"
        return 0
    else
        echo "⚠ FFmpeg not found - manual conversion required"
        echo "  Install: brew install ffmpeg (macOS) or apt install ffmpeg (Linux)"
        return 1
    fi
}

# Function to check for required audio files
check_audio_files() {
    echo ""
    echo "Checking BGM files..."
    echo "-------------------------------------------"

    local missing=0

    if [ -f "$BGM_DIR/village_theme.ogg" ]; then
        echo "✓ village_theme.ogg found"
    else
        echo "✗ village_theme.ogg MISSING"
        echo "  → Required for: Border Village map (Map001)"
        echo "  → Style: Warm, peaceful, Thai-inspired"
        missing=$((missing + 1))
    fi

    if [ -f "$BGM_DIR/forest_theme.ogg" ]; then
        echo "✓ forest_theme.ogg found"
    else
        echo "✗ forest_theme.ogg MISSING"
        echo "  → Required for: Great Forest Mountains map (Map002)"
        echo "  → Style: Mysterious, tense"
        missing=$((missing + 1))
    fi

    return $missing
}

# Function to convert audio file to OGG
convert_to_ogg() {
    local input_file="$1"
    local output_name="$2"

    if ! command -v ffmpeg &> /dev/null; then
        echo "Error: FFmpeg not found. Please install FFmpeg first."
        return 1
    fi

    local output_file="$BGM_DIR/${output_name}.ogg"

    echo "Converting $input_file to $output_file..."
    ffmpeg -i "$input_file" -c:a libvorbis -q:a 5 "$output_file" -y

    if [ -f "$output_file" ]; then
        echo "✓ Successfully created $output_file"
        return 0
    else
        echo "✗ Failed to create $output_file"
        return 1
    fi
}

# Function to use RPG Maker MZ default tracks as fallback
use_default_tracks() {
    echo ""
    echo "Reverting to default RPG Maker MZ tracks..."

    # Update Map001.json
    if [ -f "$PROJECT_ROOT/data/Map001.json" ]; then
        sed -i.bak 's/"name": "village_theme"/"name": "Town1"/g' "$PROJECT_ROOT/data/Map001.json"
        rm -f "$PROJECT_ROOT/data/Map001.json.bak"
        echo "✓ Map001 now uses 'Town1' (default village BGM)"
    fi

    # Update Map002.json
    if [ -f "$PROJECT_ROOT/data/Map002.json" ]; then
        sed -i.bak 's/"name": "forest_theme"/"name": "Field2"/g' "$PROJECT_ROOT/data/Map002.json"
        rm -f "$PROJECT_ROOT/data/Map002.json.bak"
        echo "✓ Map002 now uses 'Field2' (default field BGM)"
    fi

    echo ""
    echo "Done! Maps will now use default RPG Maker MZ music."
}

# Main menu
show_menu() {
    echo ""
    echo "What would you like to do?"
    echo "-------------------------------------------"
    echo "1) Check audio file status"
    echo "2) Convert audio file to OGG format"
    echo "3) Use default RPG Maker MZ tracks (fallback)"
    echo "4) Show recommended audio sources"
    echo "5) Exit"
    echo ""
    read -p "Enter choice [1-5]: " choice

    case $choice in
        1)
            check_audio_files
            ;;
        2)
            echo ""
            read -p "Enter path to input audio file: " input_path
            read -p "Output name (village_theme or forest_theme): " output_name
            convert_to_ogg "$input_path" "$output_name"
            ;;
        3)
            use_default_tracks
            ;;
        4)
            show_sources
            ;;
        5)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
}

# Show recommended audio sources
show_sources() {
    echo ""
    echo "============================================"
    echo "  Recommended Audio Sources"
    echo "============================================"
    echo ""
    echo "FREE OPTIONS (Attribution Required):"
    echo "-------------------------------------------"
    echo "1. Soundimage.org Fantasy/Wonder"
    echo "   URL: https://soundimage.org/fantasywonder/"
    echo "   License: Free with attribution to Eric Matyas"
    echo ""
    echo "2. OpenGameArt.org"
    echo "   URL: https://opengameart.org/art-search?keys=rpg+music"
    echo "   License: Various CC licenses"
    echo ""
    echo "3. itch.io Free RPG Music"
    echo "   URL: https://itch.io/game-assets/free/genre-rpg/tag-music"
    echo "   License: Varies by creator"
    echo ""
    echo "PAID OPTIONS (Commercial License):"
    echo "-------------------------------------------"
    echo "1. Shanghai Fantasy Story DLC (Steam)"
    echo "   URL: https://store.steampowered.com/app/1378440"
    echo "   Price: \$9.99 (often 60% off during sales)"
    echo ""
    echo "2. FSM - Asian World Music (Steam)"
    echo "   URL: https://store.steampowered.com/app/1119630"
    echo "   Price: \$14.99"
    echo ""
}

# Run checks on start
check_ffmpeg
check_audio_files
missing=$?

if [ $missing -gt 0 ]; then
    echo ""
    echo "⚠ $missing audio file(s) missing!"
    echo "The game will run without music until files are provided."
fi

# Show menu
while true; do
    show_menu
done
