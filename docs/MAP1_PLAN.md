# MAP 1 — Coastal Cliff Ruins
## Level Design Plan

---

## 🎯 Vision
Stage-based action platformer inspired by Contra NES Stage 1. 16:1 scrolling map (11200×700 at S=3). Player runs right through coastal cliff ruins with layered parallax backgrounds.

---

## 📐 Layer Order (Z-back to front)

```
01. Sky & Sun
02. Far Clouds (behind sun)
03. Near Clouds (in front of sun)
04. Far Mountains   (lightest, most blue — atmospheric)
05. Mid Mountains    (medium tone)
06. Near Mountains   (darkest, warmest tone)
07. Giant Ancient Trees  (silhouette trees, mid-background)
08. Cliff Face (procedural rock columns) — for Map 2
09. Playable Terrain  (ground segments, gaps)
10. Platforms / Ladders
11. Props (ruins, rocks, flowers, vines, barrels, etc.)
12. Foreground Ocean (waves, foam)
13. Foreground Dark Rocks (blurred, fast parallax)
```

---

## 🧩 Phase Plan

### Phase 1: Sky & Clouds (🌤️)
- Sky gradient: bright tropical blue `rgb(60,150,240)` → warm horizon `rgb(155,205,170)`
- Sun: warm glow, layered circles with alpha
- Far Clouds: large, slow, behind sun, low opacity `rgba(220,235,255,0.12)`
- Near Clouds: smaller, faster, in front of sun, higher opacity `rgba(240,248,255,0.2)`

### Phase 2: Mountains — 4 Layers (🏔️)
Atmospheric perspective gradient:

| Layer   | Name     | Color            | yBase | Amp | Parallax | Description |
|---------|----------|------------------|-------|-----|----------|-------------|
| L4 (far) | Far     | `rgb(160,175,210)` | 270   | 130 | 0.02     | Lightest, most blue |
| L3      | Mid-far  | `rgb(130,140,175)` | 290   | 110 | 0.04     | Medium-light |
| L2      | Mid-near | `rgb(100,105,135)` | 310   | 90  | 0.06     | Medium-dark |
| L1 (near)| Near    | `rgb(75,80,95)`    | 330   | 70  | 0.08     | Darkest, warmest grey |

- Mountain bottom: stop at y=430 with 20px fade into ocean below

### Phase 3: Giant Ancient Trees (🌳)
- Single row of massive trees between mountains and terrain
- yBase = 510 + GY (terrain bottom level)
- Tree types:
  - **Baobab-style** (wide trunk, sparse canopy)
  - **Palm-style** (tall trunk, frond top)
  - **Banyan-style** (roots hanging from branches)
- Trunk: `rgb(40,55,35)`
- Canopy: layered circles `rgb(18,50,22)` to `rgb(30,75,35)`
- Count: ~10-12 trees spaced across map
- Parallax: 0.1x (between mountains 0.02-0.08 and terrain 1x)

### Phase 4: Terrain & Gaps (🟫)
- Ground segments from `BASE_GROUND` at GY=-100
- Grass: `rgb(65,155,40)` top, `rgb(95,195,55)` highlight, `rgb(40,110,28)` shadow
- Soil: `rgb(140,95,35)` → `rgb(95,65,25)`
- Rock face: gradient `rgb(120,92,52)` → `rgb(50,36,16)` over 50px
- Strata lines every 12px: `rgba(160,125,70,0.35)` + `rgba(50,35,18,0.35)`
- Left highlight: `rgba(165,135,80,0.35)`
- Right shadow: `rgba(30,18,10,0.45)`
- Top edge: small grass tufts every 18px
- **Hanging grass**: 3-5 blades per segment at the right/bottom edge, created via overlay

### Phase 5: Platforms (📦)
- `BASE_PLATFORMS` tiled ×4
- Colors match terrain grass/soil palette
- Add small grass tufts on top
- **Rounded top corners**: 2px fill on sides to break hard rectangle

### Phase 6: Ladders (🪜)
- `BASE_LADDERS` tiled ×4
- Rungs: `rgb(160,130,70)` every 8px
- Rails: `rgb(120,95,50)` on both sides

### Phase 7: Environment Props (🏛️)
- **Ruins/Pillars**: `BASE_PILLARS` — ancient stone columns with worn tops
  - Color: `rgb(110,90,60)` with moss highlights
  - Crack lines and weathered edges
- **Flowers**: `BASE_FLOWERS` — small red/yellow/blue clusters
  - Colors: `rgb(200,50,50)`, `rgb(220,200,30)`, `rgb(60,100,220)`
  - 3-petal circles + center dot
- **Small rocks**: scattered on terrain surface
  - `rgb(85,75,60)` oval shapes, 6-12px
- **Vines**: hanging from terrain/ruins
  - Green/brown `rgb(40,80,30)`, 2px wide, wavy
- **Barrels/Crates**: `BASE_BARRELS`, `BASE_CRATES`
  - Brown `rgb(130,90,40)` with metal bands `rgb(100,85,65)`
- **Jeeps/Military**: `BASE_JEEPS` — wrecked military vehicles
  - Green `rgb(60,100,40)` body, `rgb(40,40,35)` tires
- **Bushes**: `BASE_BUSHES` — green clusters
  - `rgb(20,65,25)` circles with `rgb(30,85,35)` highlights

### Phase 8: Waterfalls (💧)
- Vertical blue strips in terrain gaps with mist at bottom
- Water: `rgba(100,180,220,0.4)` narrow column
- Mist: `rgba(200,230,255,0.15)` circle at base
- Animated: wave offset with frame counter `f`

### Phase 9: Foreground Ocean (🌊)
- Behind terrain, in front of mountains
- `OY = -220`, starts at y≈350
- Water gradient: `rgb(30,100,160)` → `rgb(55,180,210)` over 80 bands
- Animated waves: `rgba(180,235,255,0.15)` moving lines
- Wave crests: `rgba(200,240,255,0.3)` white caps, 8 across screen
- Foam splash: 12 animated circles `rgba(220,245,255,0.1-0.2)`
- Foam edge line at rock boundary

### Phase 10: Foreground Layer (🎬) — NEW
- **Dark rocks at bottom** of screen (y=650-700)
  - `rgb(15,18,25)` irregular shapes
  - Fast parallax 2x (moves faster than terrain)
  - Slight blur: alpha 0.5-0.6
- **Grass blades** at bottom corners
  - Large dark silhouettes `rgb(10,30,15)`
  - 3-5 blades per side
- **Foam splash overlay** at water's edge
  - White `rgba(255,255,255,0.08)` animated circles
  - Extra-large: radius 12-20px
- Effect: when player runs, these foreground elements scroll faster, creating depth

### Phase 11: Integration & Polish (✨)
- Ensure all parallax speeds look correct
- Test scroll range (0 → 10176)
- Verify no gaps between layers
- Add rope bridges back (if terrain gaps are too wide)
- FPS check — optimize if below 30fps on target device

---

## 🎨 Color Philosophy

```
Sky (cool)  ──→  Mountains (neutral-cool)  ──→  Trees (dark warm)  ──→  Terrain (warm)  ──→  Foreground (dark)
   ↓                    ↓                          ↓                      ↓                    ↓
  bright               receding                   shadow                 earthy               blurry
  blue                 blue-grey                  green                  brown+green           near-black
```

- **Atmospheric perspective**: Background layers are blue-shifted, low contrast, light value
- **Foreground depth**: Front layers are warm, high contrast, dark value
- **Visual anchor**: Terrain (playable area) is warmest, most saturated — draws player eye

---

## 📏 Technical Specs

| Property        | Value     |
|----------------|-----------|
| Map Width      | 11200px   |
| Map Height     | 700px     |
| Scale (S)      | 3         |
| Aspect Ratio   | 16:1      |
| Scroll Range   | 0 → 10176 |
| Frame Target   | 60fps     |
| Base Pattern   | 3200px unit × 4 = 12800px (with 1600px overlap) |
| Terrain GY     | -100      |
| Ocean OY       | -220      |

---

## ✅ Phase Execution Order

```
Phase 1 — Sky & Clouds        ⬅️ NEXT
Phase 2 — Mountains 4 layers
Phase 3 — Giant Ancient Trees
Phase 4 — Terrain & Gaps
Phase 5 — Platforms
Phase 6 — Ladders
Phase 7 — Environment Props
Phase 8 — Waterfalls
Phase 9 — Foreground Ocean
Phase 10 — Foreground Layer
Phase 11 — Integration & Polish
```

---

## 🏁 Map Ending

- **Boss**: รถถัง (tank) — อยู่ที่ท้าย map ไม่มี arena พิเศษ
- **หลังจากชนะบอส**: ฉากวิดีโอ player ไปช่วย **ตับประกัน** แล้วมีเฮลิคอปเตอร์มารับ
- **แมปจบที่เกาะนี้** — ไม่มี content ต่อจากบอส
