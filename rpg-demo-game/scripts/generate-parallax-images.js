#!/usr/bin/env node
/**
 * ============================================================================
 * Parallax Image Generator
 * พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
 * ============================================================================
 * Generates parallax background layers for game maps.
 *
 * Usage:
 *   cd rpg-demo-game/scripts
 *   npm install
 *   node generate-parallax-images.js [--village] [--forest] [--all]
 *
 * Options:
 *   --village  Generate Border Village parallax layers only
 *   --forest   Generate Great Forest Mountains parallax layers only
 *   --all      Generate all parallax layers (default)
 *
 * Output: img/parallaxes/*.png files (1280x720)
 *
 * Color Palettes:
 *   Border Village:
 *     Primary: #8B7355 (Warm brown)
 *     Secondary: #6B8E23 (Healthy green)
 *     Accent: #FFD700 (Gold)
 *
 *   Great Forest Mountains:
 *     Primary: #2F4F2F (Dark forest green)
 *     Secondary: #4A4A4A (Shadow grey)
 *     Accent: #9932CC (Poison purple)
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const WIDTH = 1280;
const HEIGHT = 720;
const OUTPUT_DIR = path.join(__dirname, '..', 'img', 'parallaxes');

// Border Village Color Palette
const VILLAGE_COLORS = {
    warmBrown: '#8B7355',
    healthyGreen: '#6B8E23',
    gold: '#FFD700',
    skyBlue: '#87CEEB',
    skyLight: '#E0F0FF',
    mountainBlue: '#6B8BA4',
    mountainDark: '#4A6B7C',
    cloudWhite: '#FFFFFF',
    groundDark: '#5A4A3A',
    groundLight: '#A89070',
    treeDark: '#2E5A1E',
    treeLight: '#4A8E2A',
    leafGreen: '#7CB342'
};

// Great Forest Mountains Color Palette (Dark, ominous atmosphere)
const FOREST_COLORS = {
    primary: '#2F4F2F',        // Dark forest green
    secondary: '#4A4A4A',      // Shadow grey
    accent: '#9932CC',         // Poison purple
    skyDark: '#1A2A2A',        // Dark overcast sky
    skyMid: '#2A3A3A',         // Mid-tone grey-green sky
    skyLight: '#3A4A4A',       // Lighter grey-green
    treeDarkest: '#1A2F1A',    // Darkest tree silhouette
    treeDark: '#2F4F2F',       // Dark tree
    treeMid: '#3A5A3A',        // Mid-tone tree
    treeLight: '#4A6A4A',      // Lighter tree accent
    groundDark: '#1A1A1A',     // Very dark ground
    groundMid: '#2A2A2A',      // Mid-tone ground
    groundMoss: '#2F3F2F',     // Mossy ground
    fogLight: '#4A5A5A',       // Light fog
    fogDark: '#3A4A4A',        // Dark fog
    poisonGlow: '#7B2E9B',     // Poison glow (darker purple)
    mistPurple: '#5A3A6A'      // Purple-tinged mist
};

/**
 * Helper: Convert hex color to RGB
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

/**
 * Helper: Interpolate between two colors
 */
function lerpColor(color1, color2, t) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    return `rgb(${Math.round(c1.r + (c2.r - c1.r) * t)}, ${Math.round(c1.g + (c2.g - c1.g) * t)}, ${Math.round(c1.b + (c2.b - c1.b) * t)})`;
}

// ============================================================================
// BORDER VILLAGE PARALLAX GENERATORS
// ============================================================================

/**
 * Generate Layer 1: Sky with gradient and clouds
 * Far background - sky with subtle clouds
 */
function generateVillageSkyLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Sky gradient (top to bottom: lighter to slightly darker blue)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    skyGradient.addColorStop(0, VILLAGE_COLORS.skyLight);
    skyGradient.addColorStop(0.4, VILLAGE_COLORS.skyBlue);
    skyGradient.addColorStop(1, '#B0D4E8');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Add subtle clouds
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 8; i++) {
        const x = (i * 180 + Math.sin(i * 2.5) * 50) % WIDTH;
        const y = 50 + Math.sin(i * 1.7) * 80;
        const size = 60 + Math.sin(i * 3.2) * 30;

        // Cloud shape using multiple ellipses
        ctx.fillStyle = VILLAGE_COLORS.cloudWhite;
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.5, size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x - size * 0.7, y + size * 0.1, size * 0.8, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + size * 0.8, y + size * 0.15, size * 0.7, size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Add warm sun glow effect (upper right)
    const sunGradient = ctx.createRadialGradient(WIDTH - 150, 100, 20, WIDTH - 150, 100, 200);
    sunGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    sunGradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.1)');
    sunGradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
    ctx.fillStyle = sunGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    return canvas;
}

/**
 * Generate Layer 2: Distant Mountains
 * Mid-background with layered mountain silhouettes
 */
function generateVillageMountainLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Transparent background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Farthest mountain range (lightest, most desaturated)
    ctx.fillStyle = '#9BADB8';
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT);
    for (let x = 0; x <= WIDTH; x += 20) {
        const y = HEIGHT - 150 - Math.sin(x * 0.008) * 80 - Math.sin(x * 0.003) * 50;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();

    // Middle mountain range
    ctx.fillStyle = VILLAGE_COLORS.mountainBlue;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT);
    for (let x = 0; x <= WIDTH; x += 15) {
        const y = HEIGHT - 100 - Math.sin(x * 0.012 + 1) * 100 - Math.sin(x * 0.005 + 2) * 40;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();

    // Nearest distant mountain range (darker)
    ctx.fillStyle = VILLAGE_COLORS.mountainDark;
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT);
    for (let x = 0; x <= WIDTH; x += 10) {
        const y = HEIGHT - 50 - Math.sin(x * 0.015 + 3) * 70 - Math.sin(x * 0.007) * 30;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();

    // Add subtle temple silhouette on one mountain
    ctx.fillStyle = '#3A5A6C';
    const templeX = WIDTH * 0.7;
    const templeY = HEIGHT - 180;

    // Temple base
    ctx.fillRect(templeX - 25, templeY, 50, 40);

    // Temple roof (tiered)
    ctx.beginPath();
    ctx.moveTo(templeX - 35, templeY);
    ctx.lineTo(templeX, templeY - 30);
    ctx.lineTo(templeX + 35, templeY);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(templeX - 25, templeY - 25);
    ctx.lineTo(templeX, templeY - 50);
    ctx.lineTo(templeX + 25, templeY - 25);
    ctx.closePath();
    ctx.fill();

    // Spire
    ctx.fillRect(templeX - 3, templeY - 70, 6, 25);

    return canvas;
}

/**
 * Generate Layer 3: Ground/Terrain Base
 * Main walking layer with grass and path hints
 */
function generateVillageGroundLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Transparent upper portion (sky area)
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Ground starts at about 60% down the image
    const groundStart = HEIGHT * 0.55;

    // Base ground gradient
    const groundGradient = ctx.createLinearGradient(0, groundStart, 0, HEIGHT);
    groundGradient.addColorStop(0, VILLAGE_COLORS.healthyGreen);
    groundGradient.addColorStop(0.3, '#5A7A30');
    groundGradient.addColorStop(1, VILLAGE_COLORS.groundDark);
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, groundStart, WIDTH, HEIGHT - groundStart);

    // Add grass texture with vertical strokes
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * WIDTH;
        const y = groundStart + Math.random() * (HEIGHT - groundStart) * 0.5;
        const height = 5 + Math.random() * 15;

        ctx.strokeStyle = Math.random() > 0.5 ? VILLAGE_COLORS.treeLight : VILLAGE_COLORS.healthyGreen;
        ctx.lineWidth = 1 + Math.random();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 4, y - height);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    // Add dirt path indication (center area)
    ctx.globalAlpha = 0.6;
    const pathGradient = ctx.createLinearGradient(0, groundStart + 100, 0, HEIGHT);
    pathGradient.addColorStop(0, VILLAGE_COLORS.warmBrown);
    pathGradient.addColorStop(1, VILLAGE_COLORS.groundLight);
    ctx.fillStyle = pathGradient;

    // Winding path shape
    ctx.beginPath();
    ctx.moveTo(WIDTH * 0.35, HEIGHT);
    ctx.quadraticCurveTo(WIDTH * 0.4, HEIGHT - 150, WIDTH * 0.45, groundStart + 150);
    ctx.lineTo(WIDTH * 0.55, groundStart + 150);
    ctx.quadraticCurveTo(WIDTH * 0.6, HEIGHT - 150, WIDTH * 0.65, HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Add scattered flowers (gold accent)
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * WIDTH;
        const y = groundStart + 50 + Math.random() * 150;

        ctx.fillStyle = VILLAGE_COLORS.gold;
        ctx.globalAlpha = 0.7 + Math.random() * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 2 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    return canvas;
}

/**
 * Generate Layer 5: Foreground Objects
 * Trees and bushes that appear in front of the player
 * Must have transparency
 */
function generateVillageForegroundLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Fully transparent background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw foreground trees on left and right edges
    const drawTree = (x, y, scale) => {
        // Tree trunk
        ctx.fillStyle = VILLAGE_COLORS.warmBrown;
        ctx.fillRect(x - 8 * scale, y, 16 * scale, 80 * scale);

        // Foliage layers (darker at bottom, lighter at top)
        const foliageLayers = [
            { offsetY: -20, size: 70, color: VILLAGE_COLORS.treeDark },
            { offsetY: -50, size: 60, color: VILLAGE_COLORS.healthyGreen },
            { offsetY: -75, size: 50, color: VILLAGE_COLORS.treeLight },
            { offsetY: -95, size: 35, color: VILLAGE_COLORS.leafGreen }
        ];

        foliageLayers.forEach(layer => {
            ctx.fillStyle = layer.color;
            ctx.beginPath();
            ctx.ellipse(
                x,
                y + layer.offsetY * scale,
                layer.size * scale,
                layer.size * 0.7 * scale,
                0, 0, Math.PI * 2
            );
            ctx.fill();
        });
    };

    const drawBush = (x, y, scale) => {
        ctx.fillStyle = VILLAGE_COLORS.treeDark;
        ctx.beginPath();
        ctx.ellipse(x, y, 40 * scale, 25 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = VILLAGE_COLORS.healthyGreen;
        ctx.beginPath();
        ctx.ellipse(x - 15 * scale, y - 5, 25 * scale, 18 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = VILLAGE_COLORS.treeLight;
        ctx.beginPath();
        ctx.ellipse(x + 10 * scale, y - 8, 20 * scale, 15 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
    };

    // Left side trees
    drawTree(60, HEIGHT - 50, 1.4);
    drawTree(-20, HEIGHT - 30, 1.2);
    drawBush(120, HEIGHT - 20, 1.3);

    // Right side trees
    drawTree(WIDTH - 80, HEIGHT - 60, 1.5);
    drawTree(WIDTH + 10, HEIGHT - 40, 1.3);
    drawBush(WIDTH - 150, HEIGHT - 15, 1.2);

    // Add some foreground grass blades at the very bottom
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * WIDTH;
        const y = HEIGHT;
        const height = 15 + Math.random() * 25;
        const width = 2 + Math.random() * 3;

        ctx.fillStyle = Math.random() > 0.5 ? VILLAGE_COLORS.healthyGreen : VILLAGE_COLORS.treeLight;
        ctx.beginPath();
        ctx.moveTo(x - width, y);
        ctx.lineTo(x, y - height);
        ctx.lineTo(x + width, y);
        ctx.closePath();
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    return canvas;
}

// ============================================================================
// GREAT FOREST MOUNTAINS PARALLAX GENERATORS
// ============================================================================

/**
 * Generate Forest Layer 1: Dark Overcast Sky
 * Ominous, dark atmosphere with storm clouds
 */
function generateForestSkyLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Dark, ominous sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    skyGradient.addColorStop(0, FOREST_COLORS.skyDark);
    skyGradient.addColorStop(0.3, FOREST_COLORS.skyMid);
    skyGradient.addColorStop(0.7, FOREST_COLORS.skyLight);
    skyGradient.addColorStop(1, '#4A5A5A');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Add dark, ominous clouds
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 12; i++) {
        const x = (i * 120 + Math.sin(i * 3.1) * 80) % WIDTH;
        const y = 30 + Math.sin(i * 2.3) * 60;
        const size = 80 + Math.sin(i * 1.7) * 40;

        // Dark cloud layers
        ctx.fillStyle = '#2A3A3A';
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.8, size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#3A4A4A';
        ctx.beginPath();
        ctx.ellipse(x - size * 0.5, y + size * 0.1, size * 1.2, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2A3A3A';
        ctx.beginPath();
        ctx.ellipse(x + size * 0.6, y + size * 0.05, size, size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Add subtle purple/poison glow in distance (hint of danger)
    const glowGradient = ctx.createRadialGradient(WIDTH * 0.3, HEIGHT * 0.7, 50, WIDTH * 0.3, HEIGHT * 0.7, 400);
    glowGradient.addColorStop(0, 'rgba(153, 50, 204, 0.15)');
    glowGradient.addColorStop(0.5, 'rgba(153, 50, 204, 0.05)');
    glowGradient.addColorStop(1, 'rgba(153, 50, 204, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    return canvas;
}

/**
 * Generate Forest Layer 2: Distant Tree Silhouettes
 * Layered dark forest trees in the background
 */
function generateForestDistantTreesLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Transparent background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw layered tree silhouettes (farthest to nearest)
    const drawTreeLine = (baseY, treeHeight, color, variation) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, HEIGHT);

        for (let x = 0; x <= WIDTH; x += 8) {
            // Create jagged treeline with varying heights
            const noise = Math.sin(x * 0.02 + variation) * 20 +
                         Math.sin(x * 0.05 + variation * 2) * 15 +
                         Math.sin(x * 0.1 + variation * 0.5) * 10;
            const y = baseY - treeHeight - noise;

            // Add individual tree peaks
            if (x % 24 === 0) {
                ctx.lineTo(x, y - 30 - Math.random() * 20);
            }
            ctx.lineTo(x, y);
        }

        ctx.lineTo(WIDTH, HEIGHT);
        ctx.closePath();
        ctx.fill();
    };

    // Farthest layer (lightest, most atmospheric)
    drawTreeLine(HEIGHT - 50, 250, '#3A4A4A', 0);

    // Middle layer
    drawTreeLine(HEIGHT - 30, 200, '#2A3A3A', 1.5);

    // Nearest distant layer (darkest)
    drawTreeLine(HEIGHT, 150, FOREST_COLORS.treeDarkest, 3);

    // Add some individual large trees as silhouettes
    const drawDistantTree = (x, y, height, width) => {
        ctx.fillStyle = FOREST_COLORS.treeDarkest;

        // Triangle/conifer shape
        ctx.beginPath();
        ctx.moveTo(x, y - height);
        ctx.lineTo(x - width, y);
        ctx.lineTo(x + width, y);
        ctx.closePath();
        ctx.fill();

        // Trunk
        ctx.fillRect(x - width * 0.15, y, width * 0.3, 30);
    };

    drawDistantTree(WIDTH * 0.15, HEIGHT - 100, 180, 50);
    drawDistantTree(WIDTH * 0.4, HEIGHT - 80, 150, 40);
    drawDistantTree(WIDTH * 0.65, HEIGHT - 90, 200, 55);
    drawDistantTree(WIDTH * 0.85, HEIGHT - 85, 170, 45);

    return canvas;
}

/**
 * Generate Forest Layer 3: Ground with hazardous terrain
 * Dark ground with hints of poison swamp and dangerous areas
 */
function generateForestGroundLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Transparent upper portion
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const groundStart = HEIGHT * 0.5;

    // Dark, mossy ground gradient
    const groundGradient = ctx.createLinearGradient(0, groundStart, 0, HEIGHT);
    groundGradient.addColorStop(0, FOREST_COLORS.groundMoss);
    groundGradient.addColorStop(0.4, FOREST_COLORS.groundMid);
    groundGradient.addColorStop(1, FOREST_COLORS.groundDark);
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, groundStart, WIDTH, HEIGHT - groundStart);

    // Add swampy/dangerous patches with purple glow
    const drawSwampPatch = (x, y, width, height) => {
        // Dark base
        ctx.fillStyle = '#1A1A2A';
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        ctx.fill();

        // Purple poison glow
        ctx.globalAlpha = 0.4;
        const poisonGradient = ctx.createRadialGradient(x, y, 0, x, y, width);
        poisonGradient.addColorStop(0, FOREST_COLORS.accent);
        poisonGradient.addColorStop(0.5, FOREST_COLORS.poisonGlow);
        poisonGradient.addColorStop(1, 'rgba(153, 50, 204, 0)');
        ctx.fillStyle = poisonGradient;
        ctx.beginPath();
        ctx.ellipse(x, y, width * 1.2, height * 1.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    };

    // Scattered poison swamp patches
    drawSwampPatch(WIDTH * 0.2, HEIGHT - 80, 60, 25);
    drawSwampPatch(WIDTH * 0.55, HEIGHT - 60, 80, 30);
    drawSwampPatch(WIDTH * 0.8, HEIGHT - 90, 50, 20);

    // Add dead vegetation/roots
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * WIDTH;
        const y = groundStart + 50 + Math.random() * (HEIGHT - groundStart - 50);

        ctx.strokeStyle = FOREST_COLORS.secondary;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        const length = 10 + Math.random() * 30;
        const angle = Math.random() * Math.PI - Math.PI / 2;
        ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;

    // Add moss/fungus spots
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * WIDTH;
        const y = groundStart + 30 + Math.random() * (HEIGHT - groundStart - 30);

        ctx.fillStyle = Math.random() > 0.7 ? FOREST_COLORS.poisonGlow : FOREST_COLORS.groundMoss;
        ctx.globalAlpha = 0.3 + Math.random() * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 2 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    return canvas;
}

/**
 * Generate Forest Layer 5: Foreground Bushes and Dead Trees
 * Dark, menacing foreground vegetation with transparency
 */
function generateForestForegroundBushesLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Fully transparent background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw dark, twisted trees
    const drawDarkTree = (x, y, scale) => {
        // Gnarled trunk
        ctx.fillStyle = '#1A1A1A';

        // Main trunk (slightly curved)
        ctx.beginPath();
        ctx.moveTo(x - 15 * scale, y);
        ctx.quadraticCurveTo(x - 20 * scale, y - 50 * scale, x - 10 * scale, y - 100 * scale);
        ctx.lineTo(x + 10 * scale, y - 100 * scale);
        ctx.quadraticCurveTo(x + 5 * scale, y - 50 * scale, x + 15 * scale, y);
        ctx.closePath();
        ctx.fill();

        // Sparse, dark foliage
        const foliagePositions = [
            { ox: -30, oy: -90, size: 45 },
            { ox: 25, oy: -100, size: 40 },
            { ox: -5, oy: -120, size: 35 },
            { ox: 15, oy: -80, size: 30 }
        ];

        foliagePositions.forEach(pos => {
            ctx.fillStyle = FOREST_COLORS.treeDarkest;
            ctx.beginPath();
            ctx.ellipse(
                x + pos.ox * scale,
                y + pos.oy * scale,
                pos.size * scale,
                pos.size * 0.6 * scale,
                0, 0, Math.PI * 2
            );
            ctx.fill();
        });

        // Add some bare branches
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 3 * scale;
        for (let i = 0; i < 4; i++) {
            const startY = y - 60 * scale - i * 20 * scale;
            const dir = i % 2 === 0 ? -1 : 1;
            ctx.beginPath();
            ctx.moveTo(x + dir * 5 * scale, startY);
            ctx.lineTo(x + dir * (40 + i * 10) * scale, startY - 30 * scale);
            ctx.stroke();
        }
    };

    // Draw thorny bush
    const drawThornBush = (x, y, scale) => {
        // Main bush shape
        ctx.fillStyle = FOREST_COLORS.treeDarkest;
        ctx.beginPath();
        ctx.ellipse(x, y - 20 * scale, 50 * scale, 30 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2A2A2A';
        ctx.beginPath();
        ctx.ellipse(x - 20 * scale, y - 15 * scale, 30 * scale, 20 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // Thorns
        ctx.strokeStyle = '#1A1A1A';
        ctx.lineWidth = 2 * scale;
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const startX = x + Math.cos(angle) * 40 * scale;
            const startY = y - 20 * scale + Math.sin(angle) * 25 * scale;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(
                startX + Math.cos(angle) * 15 * scale,
                startY + Math.sin(angle) * 10 * scale
            );
            ctx.stroke();
        }
    };

    // Left side
    drawDarkTree(80, HEIGHT - 20, 1.5);
    drawDarkTree(-30, HEIGHT, 1.3);
    drawThornBush(150, HEIGHT - 10, 1.4);

    // Right side
    drawDarkTree(WIDTH - 60, HEIGHT - 30, 1.6);
    drawDarkTree(WIDTH + 20, HEIGHT - 10, 1.2);
    drawThornBush(WIDTH - 140, HEIGHT - 5, 1.3);

    // Add some foreground dead grass
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * WIDTH;
        const y = HEIGHT;
        const height = 20 + Math.random() * 35;
        const width = 2 + Math.random() * 2;

        ctx.fillStyle = Math.random() > 0.5 ? '#2A2A2A' : FOREST_COLORS.secondary;
        ctx.beginPath();
        ctx.moveTo(x - width, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 5, y - height);
        ctx.lineTo(x + width, y);
        ctx.closePath();
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    return canvas;
}

/**
 * Generate Forest Layer 6: Fog/Atmosphere Overlay
 * Translucent fog layer with purple-tinted mist for eerie atmosphere
 * MUST have transparency for overlay effect
 */
function generateForestFogLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Fully transparent background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Ground-level fog banks
    ctx.globalAlpha = 0.3;

    // Main fog layer (bottom third)
    const fogGradient = ctx.createLinearGradient(0, HEIGHT * 0.5, 0, HEIGHT);
    fogGradient.addColorStop(0, 'rgba(74, 90, 90, 0)');
    fogGradient.addColorStop(0.3, 'rgba(74, 90, 90, 0.2)');
    fogGradient.addColorStop(0.7, 'rgba(74, 90, 90, 0.4)');
    fogGradient.addColorStop(1, 'rgba(74, 90, 90, 0.5)');
    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Wispy fog patches
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 15; i++) {
        const x = (i * 100 + Math.sin(i * 2.7) * 60) % WIDTH;
        const y = HEIGHT - 50 - Math.sin(i * 1.3) * 100;
        const width = 150 + Math.sin(i * 0.8) * 80;
        const height = 40 + Math.sin(i * 1.5) * 20;

        ctx.fillStyle = FOREST_COLORS.fogLight;
        ctx.beginPath();
        ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Purple-tinted poison mist patches (accent color)
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 8; i++) {
        const x = (i * 180 + 50) % WIDTH;
        const y = HEIGHT - 100 + Math.sin(i * 2.1) * 60;
        const size = 100 + Math.sin(i * 1.2) * 50;

        const mistGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        mistGradient.addColorStop(0, 'rgba(153, 50, 204, 0.3)');
        mistGradient.addColorStop(0.5, 'rgba(90, 58, 106, 0.2)');
        mistGradient.addColorStop(1, 'rgba(90, 58, 106, 0)');
        ctx.fillStyle = mistGradient;
        ctx.beginPath();
        ctx.ellipse(x, y, size, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Top atmospheric haze
    ctx.globalAlpha = 0.2;
    const topHaze = ctx.createLinearGradient(0, 0, 0, HEIGHT * 0.4);
    topHaze.addColorStop(0, 'rgba(42, 58, 58, 0.4)');
    topHaze.addColorStop(1, 'rgba(42, 58, 58, 0)');
    ctx.fillStyle = topHaze;
    ctx.fillRect(0, 0, WIDTH, HEIGHT * 0.4);

    ctx.globalAlpha = 1.0;

    return canvas;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

/**
 * Generate layers for a specific map
 */
async function generateLayers(mapName, layers, colorPalette) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`${mapName} Parallax Layers`);
    console.log(`${'='.repeat(50)}\n`);

    for (const layer of layers) {
        const filename = `${layer.name}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        process.stdout.write(`  🎨 ${filename}... `);

        const canvas = layer.generator();
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(filepath, buffer);

        const sizeKB = (buffer.length / 1024).toFixed(1);
        console.log(`✅ (${sizeKB} KB)`);
    }

    console.log(`\n  Color palette (${mapName}):`);
    Object.entries(colorPalette).slice(0, 3).forEach(([key, value]) => {
        console.log(`    ${key}: ${value}`);
    });
}

/**
 * Main execution
 */
async function main() {
    const args = process.argv.slice(2);
    const generateAll = args.length === 0 || args.includes('--all');
    const generateVillage = generateAll || args.includes('--village');
    const generateForest = generateAll || args.includes('--forest');

    console.log('============================================================');
    console.log('Parallax Image Generator');
    console.log('พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)');
    console.log('============================================================');
    console.log(`\nOutput: ${WIDTH}x${HEIGHT} PNG images`);
    console.log(`Directory: ${OUTPUT_DIR}`);

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`\n📁 Created directory: ${OUTPUT_DIR}`);
    }

    // Border Village layers
    if (generateVillage) {
        const villageLayers = [
            { name: 'village_01_sky', generator: generateVillageSkyLayer },
            { name: 'village_02_distant_mountains', generator: generateVillageMountainLayer },
            { name: 'village_03_ground', generator: generateVillageGroundLayer },
            { name: 'village_05_foreground', generator: generateVillageForegroundLayer }
        ];

        await generateLayers('Border Village (หมู่บ้านชายแดน)', villageLayers, {
            primary: '#8B7355 (Warm brown)',
            secondary: '#6B8E23 (Healthy green)',
            accent: '#FFD700 (Gold)'
        });
    }

    // Great Forest Mountains layers
    if (generateForest) {
        const forestLayers = [
            { name: 'forest_01_sky', generator: generateForestSkyLayer },
            { name: 'forest_02_distant_trees', generator: generateForestDistantTreesLayer },
            { name: 'forest_03_ground', generator: generateForestGroundLayer },
            { name: 'forest_05_foreground_bushes', generator: generateForestForegroundBushesLayer },
            { name: 'forest_06_fog', generator: generateForestFogLayer }
        ];

        await generateLayers('Great Forest Mountains (ป่าเขาใหญ่)', forestLayers, {
            primary: '#2F4F2F (Dark forest green)',
            secondary: '#4A4A4A (Shadow grey)',
            accent: '#9932CC (Poison purple)'
        });
    }

    console.log('\n============================================================');
    console.log('✅ Generation complete!');
    console.log('============================================================');
    console.log('\nUsage tips:');
    console.log('  node generate-parallax-images.js --village  # Village only');
    console.log('  node generate-parallax-images.js --forest   # Forest only');
    console.log('  node generate-parallax-images.js --all      # Both maps');
    console.log('============================================================\n');
}

main().catch(err => {
    console.error('Error generating images:', err);
    process.exit(1);
});
