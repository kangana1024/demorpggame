#!/usr/bin/env node
/**
 * ============================================================================
 * Parallax Image Generator for Border Village
 * พจนภัยในดินแดนอันตราย (Peril in the Dangerous Lands)
 * ============================================================================
 * Generates parallax background layers for the Border Village map.
 *
 * Usage:
 *   cd rpg-demo-game/scripts
 *   npm install
 *   node generate-parallax-images.js
 *
 * Output: img/parallaxes/village_*.png files (1280x720)
 *
 * Color Palette (Border Village):
 *   Primary: #8B7355 (Warm brown)
 *   Secondary: #6B8E23 (Healthy green)
 *   Accent: #FFD700 (Gold)
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const WIDTH = 1280;
const HEIGHT = 720;
const OUTPUT_DIR = path.join(__dirname, '..', 'img', 'parallaxes');

// Border Village Color Palette
const COLORS = {
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

/**
 * Generate Layer 1: Sky with gradient and clouds
 * Far background - sky with subtle clouds
 */
function generateSkyLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Sky gradient (top to bottom: lighter to slightly darker blue)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    skyGradient.addColorStop(0, COLORS.skyLight);
    skyGradient.addColorStop(0.4, COLORS.skyBlue);
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
        ctx.fillStyle = COLORS.cloudWhite;
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
function generateMountainLayer() {
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
    ctx.fillStyle = COLORS.mountainBlue;
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
    ctx.fillStyle = COLORS.mountainDark;
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
function generateGroundLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Transparent upper portion (sky area)
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Ground starts at about 60% down the image
    const groundStart = HEIGHT * 0.55;

    // Base ground gradient
    const groundGradient = ctx.createLinearGradient(0, groundStart, 0, HEIGHT);
    groundGradient.addColorStop(0, COLORS.healthyGreen);
    groundGradient.addColorStop(0.3, '#5A7A30');
    groundGradient.addColorStop(1, COLORS.groundDark);
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, groundStart, WIDTH, HEIGHT - groundStart);

    // Add grass texture with vertical strokes
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * WIDTH;
        const y = groundStart + Math.random() * (HEIGHT - groundStart) * 0.5;
        const height = 5 + Math.random() * 15;

        ctx.strokeStyle = Math.random() > 0.5 ? COLORS.treeLight : COLORS.healthyGreen;
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
    pathGradient.addColorStop(0, COLORS.warmBrown);
    pathGradient.addColorStop(1, COLORS.groundLight);
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

        ctx.fillStyle = COLORS.gold;
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
function generateForegroundLayer() {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    // Fully transparent background
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw foreground trees on left and right edges
    const drawTree = (x, y, scale) => {
        // Tree trunk
        ctx.fillStyle = COLORS.warmBrown;
        ctx.fillRect(x - 8 * scale, y, 16 * scale, 80 * scale);

        // Foliage layers (darker at bottom, lighter at top)
        const foliageLayers = [
            { offsetY: -20, size: 70, color: COLORS.treeDark },
            { offsetY: -50, size: 60, color: COLORS.healthyGreen },
            { offsetY: -75, size: 50, color: COLORS.treeLight },
            { offsetY: -95, size: 35, color: COLORS.leafGreen }
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
        ctx.fillStyle = COLORS.treeDark;
        ctx.beginPath();
        ctx.ellipse(x, y, 40 * scale, 25 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLORS.healthyGreen;
        ctx.beginPath();
        ctx.ellipse(x - 15 * scale, y - 5, 25 * scale, 18 * scale, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = COLORS.treeLight;
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

        ctx.fillStyle = Math.random() > 0.5 ? COLORS.healthyGreen : COLORS.treeLight;
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

/**
 * Main execution
 */
async function main() {
    console.log('============================================');
    console.log('Border Village Parallax Image Generator');
    console.log('พจนภัยในดินแดนอันตราย');
    console.log('============================================');
    console.log('');

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Created directory: ${OUTPUT_DIR}`);
    }

    const layers = [
        { name: 'village_01_sky', generator: generateSkyLayer, description: 'Sky with clouds and sun glow' },
        { name: 'village_02_distant_mountains', generator: generateMountainLayer, description: 'Layered mountain silhouettes with temple' },
        { name: 'village_03_ground', generator: generateGroundLayer, description: 'Ground terrain with grass and path' },
        { name: 'village_05_foreground', generator: generateForegroundLayer, description: 'Foreground trees and bushes' }
    ];

    console.log(`Generating ${layers.length} parallax layers (${WIDTH}x${HEIGHT})...`);
    console.log('');

    for (const layer of layers) {
        const filename = `${layer.name}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);

        console.log(`🎨 Generating: ${filename}`);
        console.log(`   ${layer.description}`);

        const canvas = layer.generator();
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(filepath, buffer);

        const sizeKB = (buffer.length / 1024).toFixed(1);
        console.log(`   ✅ Saved (${sizeKB} KB)`);
        console.log('');
    }

    console.log('============================================');
    console.log('✅ All parallax images generated successfully!');
    console.log('');
    console.log('Output location:');
    console.log(`  ${OUTPUT_DIR}/`);
    console.log('');
    console.log('Files created:');
    layers.forEach(layer => {
        console.log(`  • ${layer.name}.png`);
    });
    console.log('');
    console.log('Color palette used (Border Village):');
    console.log('  Primary:   #8B7355 (Warm brown)');
    console.log('  Secondary: #6B8E23 (Healthy green)');
    console.log('  Accent:    #FFD700 (Gold)');
    console.log('============================================');
}

main().catch(err => {
    console.error('Error generating images:', err);
    process.exit(1);
});
