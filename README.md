# PROJECT CONTRA

Side-scrolling action platformer prototype inspired by Contra NES Stage 1.

## Tech Stack

- **Phaser 3** (Canvas mode, pixel-art)
- **Pure procedural graphics** — zero image assets, everything drawn with `fillRect`/`fillCircle`
- **Scale**: S=3 (16x16 → 48x48 rendered pixels)
- **No build step** — static HTML + JS files

## Pages

| Page | File | Description |
|------|------|-------------|
| 🎮 **Game** | `game.html` | Playable prototype with physics, player, enemies |
| 🗺️ **Map Viewer** | `map-viewer.html` | Auto-scroll through full 11200px map |
| 🎬 **Character Showcase** | `index.html` | All entities cycling through animations |

## Controls (Game)

| Key | Action |
|-----|--------|
| ← → | Walk |
| Z / ↑ / Space | Jump |
| X | Shoot |

## Map

- **Size**: 11200 × 700 (16:1 ratio)
- **Scroll range**: 0 → 10176
- **Base pattern**: 3200px tile × 4 = 12800px
- **Parallax layers**: Sky → Clouds → Sun → Mountains → Cliff Base → Ocean → Terrain

## Running Locally

```bash
python3 -m http.server 7777
# → http://localhost:7777/game.html
```

## Structure

```
├── game.html              # Playable game entry
├── index.html             # Character showcase
├── map-viewer.html        # Map explorer
├── cliff-demo.html        # Cliff face demo
├── server.py              # Dev server
├── README.md
└── src/
    ├── config.js           # Global palette & scale
    ├── entities/
    │   ├── MapRenderer.js  # Full map rendering (all layers)
    │   ├── PlayerRenderer.js
    │   ├── EnemyRenderer.js
    │   ├── BossRenderer.js
    │   ├── BulletRenderer.js
    │   └── StageRenderer.js
    └── scenes/
        ├── GameScene.js      # Game loop, physics, input
        ├── MapViewerScene.js # Auto-scrolling viewer
        └── CharacterShowcase.js
```
