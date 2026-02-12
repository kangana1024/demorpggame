# Audio Setup Guide for พจนภัยในดินแดนอันตราย

This guide explains how to set up background music (BGM) for the "Peril in the Dangerous Lands" demo game.

## Current Status

The maps are configured to use custom theme music:
- **Map001 (Border Village)**: `village_theme.ogg` - Warm, peaceful Thai-inspired music
- **Map002 (Great Forest Mountains)**: `forest_theme.ogg` - Mysterious, tense forest music

⚠️ **Audio files must be downloaded manually** - they are not included in the repository.

## Quick Setup Options

### Option 1: Use Default RPG Maker MZ Music (Easiest)
If you have RPG Maker MZ installed, you can revert to the default tracks:

```bash
bash scripts/setup-audio.sh
# Choose option 3: "Use default RPG Maker MZ tracks"
```

This changes the maps to use:
- `Town1.ogg` for Border Village
- `Field2.ogg` for Great Forest Mountains

### Option 2: Download Custom Audio
Download appropriate music from the sources below and save as:
- `audio/bgm/village_theme.ogg`
- `audio/bgm/forest_theme.ogg`

---

## Audio File Requirements

| Track | Filename | Style | Duration |
|-------|----------|-------|----------|
| Village Theme | `village_theme.ogg` | Warm, peaceful, Thai-inspired | 2-4 min (loopable) |
| Forest Theme | `forest_theme.ogg` | Mysterious, tense, slightly ominous | 2-4 min (loopable) |

**Technical Specifications:**
- **Format**: OGG Vorbis (.ogg)
- **Bitrate**: 128-192 kbps
- **Sample Rate**: 44100 Hz
- **Channels**: Stereo preferred

---

## Recommended Audio Sources

### Free Sources (Attribution Required)

#### 1. Soundimage.org
**URL**: https://soundimage.org/fantasywonder/
**License**: Free with attribution to Eric Matyas
**Best For**: Fantasy RPG music, atmospheric tracks

Recommended tracks for village theme:
- Search for "village", "town", "peaceful"

Recommended tracks for forest theme:
- Search for "forest", "mystery", "dark"

#### 2. OpenGameArt.org
**URL**: https://opengameart.org/art-search?keys=rpg+music
**License**: Various Creative Commons licenses

Search queries:
- "peaceful village rpg music"
- "dark forest music rpg"
- "asian inspired music"

#### 3. itch.io Free RPG Music
**URL**: https://itch.io/game-assets/free/genre-rpg/tag-music
**License**: Varies by creator (check each pack)

### Paid Sources (Commercial License)

#### 1. Shanghai Fantasy Story DLC
**URL**: https://store.steampowered.com/app/1378440
**Price**: $9.99 (often 60% off during sales)
**Content**: Asian-themed RPG BGM pack
**License**: Included commercial license

#### 2. FSM - Asian World Music
**URL**: https://store.steampowered.com/app/1119630
**Price**: $14.99
**Content**: Traditional Asian instrument tracks
**License**: Included commercial license

---

## Audio Conversion

If your source audio is not in OGG format, convert it using FFmpeg:

### Install FFmpeg
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

### Convert to OGG
```bash
# Convert MP3 to OGG
ffmpeg -i source_music.mp3 -c:a libvorbis -q:a 5 audio/bgm/village_theme.ogg

# Convert WAV to OGG
ffmpeg -i source_music.wav -c:a libvorbis -q:a 5 audio/bgm/forest_theme.ogg
```

**Quality Setting (`-q:a`):**
- `3` = ~112 kbps (smaller file)
- `5` = ~160 kbps (recommended)
- `7` = ~224 kbps (higher quality)

---

## Using the Setup Script

An interactive setup script is provided:

```bash
cd rpg-demo-game
bash scripts/setup-audio.sh
```

**Menu Options:**
1. Check audio file status
2. Convert audio file to OGG format
3. Use default RPG Maker MZ tracks (fallback)
4. Show recommended audio sources
5. Exit

---

## Verification

After setting up audio, verify it works:

1. Open the project in RPG Maker MZ
2. Playtest (F12 or Debug → Playtest)
3. When the game starts in Border Village, you should hear music
4. Walk to the east edge to transfer to Great Forest Mountains
5. The music should change to the forest theme

### Troubleshooting

**No music playing?**
- Check that `.ogg` files exist in `audio/bgm/`
- Verify file names match exactly (case-sensitive)
- Check browser console for audio loading errors (web version)

**Wrong music playing?**
- Ensure you edited the correct map files
- Verify `autoplayBgm` is `true` in map JSON files

**Audio crackling/stuttering?**
- Try reducing bitrate during conversion
- Close other audio applications

---

## Attribution

If using free music with attribution requirements, add credits to your game:

```
Music:
- "Village Theme" by [Artist Name] - [Source URL]
- "Forest Theme" by [Artist Name] - [Source URL]
Licensed under [License Type]
```

---

## Map BGM Configuration Reference

The BGM settings in map JSON files:

```json
{
  "autoplayBgm": true,
  "bgm": {
    "name": "village_theme",
    "pan": 0,
    "pitch": 100,
    "volume": 90
  }
}
```

**Parameters:**
- `name`: Filename without extension (e.g., "village_theme" for "village_theme.ogg")
- `pan`: Stereo pan (-100 to 100, 0 = center)
- `pitch`: Playback pitch (50-150, 100 = normal)
- `volume`: Volume level (0-100)

---

*Document Version: 1.0*
*Last Updated: 2025-02-12*
*Project: พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)*
