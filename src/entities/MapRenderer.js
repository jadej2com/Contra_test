// ─── Map Renderer v3 — Coastal Cliff Ruins ──
// 5-layer parallax: foreground ocean, playable cliffs, colossal trees, mountains, sky
// All elements at S=3 scale

// ═══════════ LEVEL DATA ═══════════

const MAP_W = 11200;        // total map width: 700×16 (16:1 ratio, matches Contra NES)
const BASE_W = 3200;        // base pattern unit width for tiling

// ── Base pattern arrays (1 unit = 3200px) ──

const BASE_GROUND = [
  { x:0, y:470, w:3200 },  // continuous ground, full unit
];

const BASE_PLATFORMS = [
  { x:100, y:400, w:60, k:'wood'  },
  { x:420, y:380, w:50, k:'wood'  },
  { x:700, y:360, w:60, k:'stone' },
  { x:1100,y:360, w:60, k:'stone' },
  { x:1520,y:370, w:50, k:'stone' },
  { x:1900,y:360, w:60, k:'wood'  },
  { x:2220,y:340, w:50, k:'stone' },
  { x:2520,y:350, w:60, k:'wood'  },
  { x:2820,y:340, w:50, k:'stone' },
  { x:2980,y:430, w:60, k:'stone' },
];

const BASE_LADDERS = [
  { x:340, y1:480, y2:430 },
  { x:780, y1:470, y2:430 },
  { x:1250,y1:460, y2:420 },
  { x:2190,y1:460, y2:410 },
  { x:2580,y1:440, y2:400 },
];

// ── Props: grounded at exact terrain Y ──
const BASE_PILLARS = [
  { x:1050,y:440,h:50 },
  { x:1270,y:420,h:50 },
  { x:1830,y:420,h:45 },
  { x:2210,y:410,h:50 },
];
const BASE_CHESTS  = [{ x:1150,y:420 }];
const BASE_BARRELS = [{ x:2480,y:430 },{ x:2900,y:440 }];
const BASE_CRATES  = [{ x:2460,y:430 },{ x:2475,y:415 },{ x:2920,y:440 }];
const BASE_FLOWERS = [
  { x:300,y:450 },{ x:650,y:470 },{ x:980,y:470 },
  { x:1600,y:430 },{ x:2100,y:440 },{ x:2700,y:440 },
  { x:2950,y:440 },
];
const BASE_JEEPS   = [{ x:3050,y:440 }];
const BASE_BAGS    = [{ x:2850,y:440,rows:2 }];
const BASE_FLAGS   = [{ x:3100,y:440 }];
const BASE_VINES   = [280,580,760,1060,1400,1660,1880,2140,2380,2620,2960];

// ── Colossal ancient trees (background, behind terrain) ──
const BASE_COLOSSAL_TREES = [
  // Medium trees
  { x:700,  w:90,  h:340, size:'M' },
  { x:1700, w:95,  h:350, size:'M' },
  { x:2700, w:85,  h:330, size:'M' },
  // Small trees
  { x:100,  w:60,  h:250, size:'S' },
  { x:1000, w:65,  h:260, size:'S' },
  { x:2000, w:55,  h:230, size:'S' },
  { x:2900, w:70,  h:270, size:'S' },
];

// ── Cloud data (2 layers: far behind sun, near in front of sun) ──
const FAR_CLOUDS = [
  { x:50, y:40, r:30, sp:0.02 },
  { x:220, y:80, r:40, sp:0.025 },
  { x:400, y:30, r:35, sp:0.018 },
  { x:600, y:70, r:45, sp:0.022 },
  { x:800, y:45, r:30, sp:0.028 },
  { x:100, y:110, r:25, sp:0.02 },
  { x:350, y:100, r:35, sp:0.024 },
  { x:550, y:25, r:40, sp:0.016 },
  { x:720, y:90, r:28, sp:0.026 },
  { x:900, y:60, r:35, sp:0.021 },
];
const NEAR_CLOUDS = [
  { x:80, y:55, r:20, sp:0.08 },
  { x:280, y:35, r:16, sp:0.1 },
  { x:480, y:70, r:22, sp:0.09 },
  { x:680, y:30, r:18, sp:0.11 },
  { x:150, y:85, r:14, sp:0.12 },
  { x:400, y:50, r:20, sp:0.09 },
  { x:580, y:65, r:16, sp:0.1 },
  { x:780, y:40, r:18, sp:0.11 },
  { x:920, y:55, r:14, sp:0.13 },
  { x:350, y:20, r:12, sp:0.14 },
];

const LMOUNTAINS = [
  { yBase:280, color: [105, 150, 85],  amp:110, freq:0.014, off:1,    sp:0.03  },
  { yBase:300, color: [60, 100, 45],   amp:90,  freq:0.018, off:2.5,  sp:0.05  },
  { yBase:320, color: [30, 60, 20],    amp:70,  freq:0.022, off:4,    sp:0.07  },
];

// ── Ground cover / foreground bushes ──
const BASE_BUSHES = [
  { x:50, y:465, w:30, h:20 },
  { x:220, y:445, w:25, h:18 },
  { x:520, y:425, w:35, h:22 },
  { x:820, y:425, w:28, h:18 },
  { x:1060,y:435, w:32, h:20 },
  { x:1270,y:415, w:26, h:18 },
  { x:1590,y:425, w:30, h:20 },
  { x:1850,y:415, w:28, h:18 },
  { x:2060,y:435, w:32, h:20 },
  { x:2330,y:455, w:30, h:18 },
  { x:2600,y:395, w:28, h:18 },
  { x:2820,y:435, w:35, h:22 },
];

// ── Military structures (Red Army camp) ──
const BASE_WATCHTOWERS = [
  { x:210, y:450, w:40, h:140 },  // coastal approach
  { x:510, y:430, w:40, h:150 },
  { x:810, y:430, w:40, h:150 },
  { x:1050,y:440, w:40, h:140 },  // temple ruins
  { x:1580,y:430, w:40, h:150 },  // after chasm
  { x:2210,y:410, w:40, h:160 },  // cave approach
];

const BASE_TENTS = [
  { x:80,  y:470, w:55, h:30 },   // beach camp
  { x:270, y:450, w:60, h:32 },
  { x:1820,y:420, w:50, h:28 },
  { x:2690,y:440, w:60, h:32 },   // cave plateau
];

const BASE_SANDBAGS = [
  { x:336, y:480, len:20 },
  { x:460, y:430, len:25 },
  { x:620, y:470, len:22 },
  { x:920, y:470, len:20 },
  { x:1150,y:440, len:25 },
  { x:1360,y:460, len:20 },
];

const BASE_BARBED_WIRE = [
  { x:355, y:480, len:20 },
  { x:655, y:470, len:20 },
];

const BASE_RADIO_TOWERS = [
  { x:2920, y:440, h:180 },
];

const BASE_FUEL_DRUMS = [
  { x:160, y:470, n:2 },
  { x:2450,y:430, n:3 },
  { x:2840,y:440, n:2 },
];

// ── Generate extended level data ──
var LGROUND, LPLATFORMS, LLADDERS, LPILLARS, LCHESTS, LBARRELS, LCRATES,
    LFLOWERS, LJEEPS, LBAGS, LFLAGS, LVINES, LCOLOSSAL_TREES, LBUSHES,
    LWATCHTOWERS, LTENTS, LSANDBAGS, LBARBED_WIRE, LRADIO_TOWERS, LFUEL_DRUMS;

(function() {
  var mult = Math.ceil(MAP_W / BASE_W);
  function extend(arr) {
    var r = [];
    for (var u = 0; u < mult; u++) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (typeof item === 'number') {
          r.push(item + BASE_W * u);
        } else {
          var c = {};
          for (var k in item) c[k] = item[k];
          c.x = item.x + BASE_W * u;
          r.push(c);
        }
      }
    }
    return r;
  }
  LGROUND = extend(BASE_GROUND);
  LPLATFORMS = extend(BASE_PLATFORMS);
  LLADDERS = extend(BASE_LADDERS);
  LPILLARS = extend(BASE_PILLARS);
  LCHESTS = extend(BASE_CHESTS);
  LBARRELS = extend(BASE_BARRELS);
  LCRATES = extend(BASE_CRATES);
  LFLOWERS = extend(BASE_FLOWERS);
  LJEEPS = extend(BASE_JEEPS);
  LBAGS = extend(BASE_BAGS);
  LFLAGS = extend(BASE_FLAGS);
  LVINES = extend(BASE_VINES);
  LCOLOSSAL_TREES = extend(BASE_COLOSSAL_TREES);
  LBUSHES = extend(BASE_BUSHES);
  LWATCHTOWERS = extend(BASE_WATCHTOWERS);
  LTENTS = extend(BASE_TENTS);
  LSANDBAGS = extend(BASE_SANDBAGS);
  LBARBED_WIRE = extend(BASE_BARBED_WIRE);
  LRADIO_TOWERS = extend(BASE_RADIO_TOWERS);
  LFUEL_DRUMS = extend(BASE_FUEL_DRUMS);
})();

// Ground Y offset — moves all terrain/props down so ground sits at ~83% height like Contra
var GY = -100;

function C(r,g,b) { return Phaser.Display.Color.GetColor(r,g,b); }

var MapRenderer = {

  // ── Sky gradient only ──
  _drawSky(g) {
    const H = 700, W = 1024;
    for (let i = 0; i < 40; i++) {
      const t = i / 40;
      g.fillStyle(C(
        60 + Math.floor(t * 35),
        150 + Math.floor(t * 30),
        240 - Math.floor(t * 30)
      ));
      g.fillRect(0, i * 5, W, 6);
    }
    for (let i = 0; i < 14; i++) {
      const t = i / 14;
      g.fillStyle(C(
        95 + Math.floor(t * 60),
        185 + Math.floor(t * 20),
        210 - Math.floor(t * 40)
      ), 0.6);
      g.fillRect(0, 200 + i * 5, W, 6);
    }
  },

  // ── Sun ──
  _drawSun(g) {
    g.fillStyle(C(255, 230, 150), 0.12);
    g.fillCircle(980, 30, 110);
    g.fillStyle(C(255, 240, 190), 0.2);
    g.fillCircle(980, 30, 70);
    g.fillStyle(C(255, 248, 220), 0.35);
    g.fillCircle(980, 30, 38);
    g.fillStyle(C(255, 252, 240));
    g.fillCircle(980, 30, 16);
  },

  drawBackground(g) {
    this._drawSky(g);
  },

  // ── Unified draw — call every frame, draws all layers back-to-front ──
  draw(g, sx, f) {
    // L8: Sky gradient
    this._drawSky(g);
    // L7: Far clouds (behind sun)
    this._drawCloudLayer(g, f, FAR_CLOUDS, 0.12);
    // L6: Sun
    this._drawSun(g);
    // L5: Near clouds (in front of sun)
    this._drawCloudLayer(g, f, NEAR_CLOUDS, 0.18);
    // L4: Mountains (4 layers, atmospheric)
    this._drawMountains(g, sx, f);
    // L2: Cliff base (continuous rock face behind terrain)
    this._drawCliffBase(g, sx, f);
    // L1.5: Foreground ocean
    this._drawForegroundOcean(g, sx, f);
    // L1: Terrain (continuous ground)
    this._drawTerrain(g, sx);
    // Early military: watchtowers + sandbags (first unit only)
    this._drawMilitaryEarly(g, sx);
  },

  // ── Aliases for backward compat ──
  drawFrame(g, sx, f) { this.draw(g, sx, f); },

  // ── Cloud layer (fluffy circles) ──
  _drawCloudLayer(g, f, clouds, alpha) {
    clouds.forEach(function(c) {
      const cx = ((f * c.sp + c.x) % 1250) - 100;
      const cr = c.r;
      // Main body — 3 overlapping circles
      g.fillStyle(C(220, 235, 255), alpha);
      g.fillCircle(cx, c.y, cr);
      g.fillCircle(cx + cr * 0.7, c.y - cr * 0.15, cr * 0.75);
      g.fillCircle(cx - cr * 0.6, c.y + cr * 0.05, cr * 0.65);
      // Highlight (lighter top)
      g.fillStyle(C(240, 248, 255), alpha * 0.6);
      g.fillCircle(cx - cr * 0.2, c.y - cr * 0.3, cr * 0.5);
      g.fillCircle(cx + cr * 0.5, c.y - cr * 0.35, cr * 0.35);
    }, this);
  },

  // ── Layer 4: Mountains (full-height backdrop) ──
  _drawMountains(g, sx, f) {
    for (let i = 0; i < 45; i++) {
      const t = i / 45;
      g.fillStyle(C(
        95 + Math.floor(t * 50),
        185 + Math.floor(t * 5),
        210 - Math.floor(t * 50)
      ), 0.15 + t * 0.85);
      g.fillRect(-5, 240 + i * 4, 1034, 5);
    }
    LMOUNTAINS.forEach(function(m) {
      const mxOff = Math.floor(sx * m.sp);
      g.fillStyle(C(m.color[0], m.color[1], m.color[2]));
      for (let x = -20; x < 1044; x += 2) {
        const wx = x + mxOff;
        const mh = m.amp + Math.sin(wx * m.freq + m.off) * m.amp * 0.5
                  + Math.sin(wx * m.freq * 1.7 + m.off * 2) * m.amp * 0.25;
        const mBottom = 430;
        g.fillStyle(C(m.color[0], m.color[1], m.color[2]));
        g.fillRect(x, m.yBase - mh, 2, mBottom - (m.yBase - mh));
        if (mBottom - (m.yBase - mh) > 30) {
          const fadeY = mBottom - 20;
          const fadeH = 20 - (mBottom - (m.yBase - mh) < 20 ? mBottom - (m.yBase - mh) : 0);
          g.fillStyle(C(m.color[0], m.color[1], m.color[2]), 0.4);
          g.fillRect(x, fadeY, 2, fadeH);
          g.fillStyle(C(m.color[0], m.color[1], m.color[2]), 0.15);
          g.fillRect(x, fadeY + 8, 2, fadeH - 8 > 0 ? fadeH - 8 : 0);
        }
      }
    }, this);
  },

  // ── Layer 3: Colossal Ancient Trees (banyan-style) ──
  _drawColossalTrees(g, sx, f) {
    LCOLOSSAL_TREES.forEach(function(t) {
      const dx = t.x - Math.floor(sx * 0.1);
      if (dx > 1050 || dx < -t.w - 10) return;
      const treeBase = 510 + GY;
      const sway = Math.sin(f * 0.008 + t.x * 0.006) * 4;
      const h = t.h, w = t.w;
      // Seed-based variation per tree (deterministic from x position)
      var seed = t.x * 0.001;
      var hueShift = Math.sin(seed * 3.7) * 8;
      var brightShift = Math.sin(seed * 5.1) * 6;
      var twistR = 8 + Math.sin(seed * 2.3) * 6;

      // ── Roots (sprawling outward from base) ──
      g.fillStyle(C(45, 55, 38), 0.6);
      var rx, ry, rr;
      for (var r = 0; r < 10; r++) {
        var rAngle = -0.6 + r * 0.13;
        rr = 18 + Math.sin(r * 1.3 + t.x) * 8;
        rx = dx + w/2 + Math.sin(rAngle) * w * 0.7;
        ry = treeBase - 5 + Math.cos(rAngle) * 10;
        g.fillCircle(rx, ry, rr);
        g.fillCircle(rx - 5, ry + 5, rr * 0.7);
      }
      // Root ridge lines
      for (var ri = 0; ri < 6; ri++) {
        var rrAngle = -0.5 + ri * 0.17;
        var rlx = dx + w/2 + Math.sin(rrAngle) * w * 0.5;
        g.fillStyle(C(35, 42, 30), 0.4);
        g.fillRect(rlx - 2, treeBase - 3 + ri * 3, 4, 8 + Math.sin(ri * 0.5) * 4);
      }

      // ── Winding trunk (tapered, organic, random twist) ──
      for (var y = 0; y < h; y += 4) {
        var t_ = y / h;
        var tw = Math.floor(w * (1 - t_ * 0.55));
        var txOff = Math.sin(y * 0.015 + t.x * 0.01) * twistR
                  + Math.sin(y * 0.03 + t.x * 0.02) * twistR * 0.5
                  + Math.sin(y * 0.007 + seed * 4) * twistR * 0.7
                  + Math.sin(y * 0.05 + seed * 6) * twistR * 0.3;
        var tdOff = Math.sin(y * 0.02 + t.x * 0.008 + 1.5) * twistR * 0.6
                  + Math.sin(y * 0.04 + seed * 3) * twistR * 0.4;
        // Main trunk body (lighter top from sun, darker bottom, per-tree hue)
        g.fillStyle(C(
          55 + Math.floor(hueShift) - Math.floor(t_ * 20) + Math.floor(brightShift * (1 - t_)),
          68 + Math.floor(hueShift * 0.5) - Math.floor(t_ * 18) + Math.floor(brightShift * (1 - t_)),
          42 - Math.floor(t_ * 14) + Math.floor(brightShift * 0.5)
        ));
        g.fillRect(dx + w/2 - tw/2 + txOff, treeBase - h + y, tw, 4);
        // Trunk highlight (top-right, sunlit)
        var hlStr = (1 - t_) * 0.5 + 0.15;
        g.fillStyle(C(80, 95, 65), hlStr);
        g.fillRect(dx + w/2 + tw/4 + txOff + tdOff, treeBase - h + y, 4, 4);
        // Trunk shadow (bottom-left, dark)
        var shStr = t_ * 0.5 + 0.1;
        g.fillStyle(C(18, 24, 15), shStr);
        g.fillRect(dx + w/2 - tw/4 + txOff - tdOff, treeBase - h + y, 4, 4);
        // Bark texture lines (more random per tree)
        if (Math.sin(y * 0.08 + t.x * 0.01 + seed * 5) > 0.4) {
          g.fillStyle(C(25 + Math.floor(hueShift * 0.5), 35, 20), 0.25);
          g.fillRect(dx + w/2 + txOff + Math.sin(y * 0.04 + seed * 2) * 12, treeBase - h + y, 2, 4);
        }
      }

      // ── Main branches (vary per tree size + seed) ──
      var sizeScale = w / 110;
      var branches = [
        { ang: -0.4 + seed * 0.05, len: w * (1.0 + seed * 0.2), yOff: h * (0.55 + seed * 0.05), tw: 8 + Math.floor(6 * sizeScale) },
        { ang: -0.2 + seed * 0.04, len: w * (1.1 + seed * 0.2), yOff: h * (0.4 + seed * 0.04), tw: 10 + Math.floor(6 * sizeScale) },
        { ang: 0.05 + seed * 0.03, len: w * (1.2 + seed * 0.2), yOff: h * (0.25 + seed * 0.03), tw: 12 + Math.floor(6 * sizeScale) },
        { ang: 0.25 + seed * 0.04, len: w * (1.0 + seed * 0.2), yOff: h * (0.45 + seed * 0.04), tw: 8 + Math.floor(5 * sizeScale) },
        { ang: 0.45 + seed * 0.05, len: w * (0.8 + seed * 0.2), yOff: h * (0.6 + seed * 0.03), tw: 6 + Math.floor(4 * sizeScale) },
      ];
      branches.forEach(function(b) {
        var by = treeBase - h * 0.1 + b.yOff;
        var bx = dx + w/2 + Math.sin(b.ang) * sway;
        var bw = b.len;
        var bAng = b.ang + Math.sin(t.x * 0.03 + seed * 2) * 0.15;
        // Draw branch as series of rects (wobbly path)
        for (var bi = 0; bi < bw; bi += 4) {
          var bt = bi / bw;
          var bw2 = Math.max(2, b.tw * (1 - bt * 0.7));
          var wobble = Math.sin(bi * 0.03 + seed * 5) * 3;
          var bx2 = bx + Math.sin(bAng) * bi + wobble;
          var by2 = by + Math.cos(bAng) * bi * 0.15 + wobble * 0.3;
          g.fillStyle(C(
            42 + Math.floor(hueShift * 0.5),
            55 + Math.floor(hueShift * 0.3),
            36
          ));
          g.fillRect(bx2 - bw2/2, by2 - bw2/2, bw2, bw2);
        }
      });

      // ── Hanging aerial roots ──
      for (var ar = 0; ar < 6 + Math.floor(seed * 3); ar++) {
        var arx = dx + w/3 + ar * w * 0.12 + sway + Math.sin(ar * 0.7 + seed * 3) * 8;
        var arLen = 25 + Math.sin(ar * 1.1 + f * 0.01 + seed * 4) * 15 + Math.floor(seed * 8);
        g.fillStyle(C(38 + Math.floor(hueShift * 0.3), 48, 32), 0.4);
        g.fillRect(arx, treeBase - h * 0.5 - arLen, 3, arLen);
      }

      // ── Hanging vines from branches ──
      for (var vi = 0; vi < 6 + Math.floor(seed * 4); vi++) {
        var vAng = vi * 0.7 + t.x * 0.05 + seed;
        var vDist = w * 0.3 + Math.sin(vi * 0.5 + seed) * w * 0.25;
        var vx = dx + w/2 + Math.sin(vAng) * vDist + sway;
        var vy = treeBase - h * 0.5 + Math.cos(vAng) * vDist * 0.2
               + Math.sin(vi * 0.3) * 15;
        var vLen = 35 + Math.sin(vi * 0.8 + f * 0.02 + seed * 3) * 15;
        var vSway = Math.sin(f * 0.015 + vi * 0.4 + seed * 2) * 3;
        g.fillStyle(C(30 + Math.floor(hueShift * 0.3), 55, 25), 0.45);
        g.fillRect(vx + vSway, vy, 2, vLen);
        g.fillStyle(C(40 + Math.floor(hueShift * 0.3), 70, 32), 0.3);
        g.fillRect(vx + vSway + 3, vy + 5, 2, vLen - 8);
        // Small leaf at tip
        g.fillStyle(C(35, 75, 30), 0.3);
        g.fillCircle(vx + vSway, vy + vLen, 3);
      }
      // Vines hanging directly from trunk
      for (var vt = 0; vt < 4; vt++) {
        var vtx = dx + w * 0.2 + vt * w * 0.2 + sway;
        var vty = treeBase - h * 0.6 + Math.sin(vt * 0.7) * 25;
        var vtLen = 25 + Math.sin(vt * 0.5 + f * 0.01) * 10;
        g.fillStyle(C(30, 55, 25), 0.4);
        g.fillRect(vtx, vty, 2, vtLen);
        g.fillStyle(C(35, 75, 30), 0.3);
        g.fillCircle(vtx, vty + vtLen, 3);
      }

      // ── FOLLIAGE (4 layers for depth) ──

      // Layer 1: Dark background foliage (deep shadows)
      for (var ci = 0; ci < 45; ci++) {
        var cAng = ci * 0.55 + t.x * 0.1;
        var cDist = w * 0.6 + Math.sin(ci * 0.4) * w * 0.5;
        var cCx = dx + w/2 + Math.sin(cAng) * cDist + sway;
        var cCy = treeBase - h * 0.82 + Math.cos(cAng) * cDist * 0.35
                + Math.sin(ci * 0.3) * 35;
        var cR = 24 + Math.sin(ci * 0.4) * 14 + Math.sin(ci * 1.1) * 8;
        g.fillStyle(C(
          15 + Math.floor(hueShift * 0.3),
          42 + Math.floor(brightShift * 0.5),
          20
        ), 0.5);
        g.fillCircle(cCx, cCy, cR);
      }

      // Layer 2: Mid-tone main foliage
      for (var ci = 0; ci < 50; ci++) {
        var cAng = ci * 0.5 + t.x * 0.08 + 0.5;
        var cDist = w * 0.5 + Math.sin(ci * 0.5) * w * 0.55;
        var cCx = dx + w/2 + Math.sin(cAng) * cDist + sway;
        var cCy = treeBase - h * 0.77 + Math.cos(cAng) * cDist * 0.38
                + Math.sin(ci * 0.25) * 30;
        var cR = 28 + Math.sin(ci * 0.35) * 16 + Math.sin(ci * 0.9) * 8;
        var cV = Math.sin(ci * 0.6 + t.x * 0.05 + seed * 2) * 0.15;
        g.fillStyle(C(
          25 + Math.floor(cV * 15) + Math.floor(hueShift * 0.3),
          70 + Math.floor(cV * 20) + Math.floor(brightShift * 0.5),
          30 + Math.floor(cV * 10)
        ), 0.75);
        g.fillCircle(cCx, cCy, cR);
      }

      // Layer 3: Bright foreground highlights (sunlit leaves)
      for (var ci = 0; ci < 30; ci++) {
        var cAng = ci * 0.65 + t.x * 0.06 + 1.0;
        var cDist = w * 0.4 + Math.sin(ci * 0.6) * w * 0.4;
        var cCx = dx + w/2 + Math.sin(cAng) * cDist + sway;
        var cCy = treeBase - h * 0.72 + Math.cos(cAng) * cDist * 0.33
                + Math.sin(ci * 0.2) * 25 - 10;
        var cR = 18 + Math.sin(ci * 0.5) * 10;
        g.fillStyle(C(50, 120, 40), 0.6);
        g.fillCircle(cCx, cCy, cR);
      }

      // Layer 4: Tiny bright specular highlights (top leaves)
      for (var ci = 0; ci < 18; ci++) {
        var cAng = ci * 0.55 + t.x * 0.04 + 2.0;
        var cDist = w * 0.3 + Math.sin(ci * 0.7) * w * 0.35;
        var cCx = dx + w/2 + Math.sin(cAng) * cDist + sway;
        var cCy = treeBase - h * 0.67 + Math.cos(cAng) * cDist * 0.28 - 18;
        var cR = 10 + Math.sin(ci * 0.8) * 6;
        g.fillStyle(C(80, 170, 55), 0.5);
        g.fillCircle(cCx, cCy, cR);
        g.fillStyle(C(120, 210, 75), 0.3);
        g.fillCircle(cCx - 3, cCy - 3, cR * 0.5);
      }

      // Ground moss/blend at base
      g.fillStyle(C(30 + Math.floor(hueShift * 0.3), 55, 25), 0.35);
      g.fillCircle(dx + w/2 + sway, treeBase + 2, w * 0.55);
      g.fillCircle(dx + w/3 + sway, treeBase + 5, w * 0.4);
      g.fillCircle(dx + w * 0.7 + sway, treeBase + 4, w * 0.35);

    }, this);
  },

  // ── Cliff base: continuous landmass behind terrain, blocks sea ──
  _drawCliffBase(g, sx, f) {
    var baseY = 300;
    var cliffBottom = 570;
    for (var x = -10; x < 1050; x += 2) {
      var wx = x + sx;
      var height = Math.sin(wx * 0.006) * 35
                 + Math.sin(wx * 0.012 + 1.2) * 25
                 + Math.sin(wx * 0.02 + 2.8) * 15
                 + Math.sin(wx * 0.035 + 0.5) * 8;
      var topY = baseY + height;
      for (var ri = 0; ri < 50; ri++) {
        var rt = ri / 50;
        g.fillStyle(C(
          55 + Math.floor(rt * 15),
          42 + Math.floor(rt * 12),
          25 + Math.floor(rt * 8)
        ));
        g.fillRect(x, topY + ri * 4, 2, 4);
      }
      g.fillStyle(C(70, 55, 30));
      g.fillRect(x, topY + 200, 2, Math.max(0, cliffBottom - (topY + 200)));
    }
    // Grass strip on top
    for (var x = -10; x < 1050; x += 2) {
      var wx = x + sx;
      var height = Math.sin(wx * 0.006) * 35
                 + Math.sin(wx * 0.012 + 1.2) * 25
                 + Math.sin(wx * 0.02 + 2.8) * 15
                 + Math.sin(wx * 0.035 + 0.5) * 8;
      var topY = baseY + height;
      g.fillStyle(C(55, 135, 35));
      g.fillRect(x, topY - 2, 2, 4);
      g.fillStyle(C(80, 170, 48));
      g.fillRect(x, topY - 3, 2, 2);
    }
    // Small grass tufts along top
    for (var gi = 0; gi < 80; gi++) {
      var gx = (gi * 14 + 3) % 1050;
      var wx = gx + sx;
      var height = Math.sin(wx * 0.006) * 35
                 + Math.sin(wx * 0.012 + 1.2) * 25
                 + Math.sin(wx * 0.02 + 2.8) * 15
                 + Math.sin(wx * 0.035 + 0.5) * 8;
      var topY = baseY + height;
      var gh = 5 + Math.sin(gi * 0.7) * 3;
      g.fillStyle(C(65, 145, 42), 0.6);
      g.fillRect(gx + Math.sin(gi * 0.4) * 2, topY - gh, 2, gh);
      g.fillStyle(C(85, 175, 52), 0.4);
      g.fillRect(gx + Math.sin(gi * 0.4) * 2, topY - gh, 1, gh - 1);
    }
    // Small trees scattered on cliff
    for (var ti = 0; ti < 12; ti++) {
      var worldTX = (ti * 85 + 20) % 11200;
      var tx = worldTX - sx;
      if (tx < -20 || tx > 1060) continue;
      var height2 = Math.sin(worldTX * 0.006) * 35
                  + Math.sin(worldTX * 0.012 + 1.2) * 25
                  + Math.sin(worldTX * 0.02 + 2.8) * 15
                  + Math.sin(worldTX * 0.035 + 0.5) * 8;
      var ty = baseY + height2;
      var th = 14 + Math.sin(ti * 1.1) * 6;
      var tw2 = 4 + Math.sin(ti * 0.5) * 2;
      g.fillStyle(C(40, 52, 35), 0.6);
      g.fillRect(tx, ty - th, tw2, th);
      g.fillStyle(C(18, 55, 22), 0.5);
      g.fillCircle(tx + tw2/2, ty - th - 4, 8);
      g.fillStyle(C(25, 70, 28), 0.4);
      g.fillCircle(tx + tw2/2 - 3, ty - th - 6, 6);
      g.fillCircle(tx + tw2/2 + 4, ty - th - 2, 5);
    }
  },

  // ── Terrain (extends down to ocean level) ──
  _drawTerrain(g, sx) {
    LGROUND.forEach(function(seg) {
      const dx = seg.x - sx;
      if (dx > 1050 || dx + seg.w < -200) return;
      const y = seg.y + GY;
      const w = seg.w;
      const bottom = 570;
      const rockStart = y + 4*S;
      const rockH = Math.max(0, bottom - rockStart);
      // Grass top
      g.fillStyle(C(65, 155, 40));
      g.fillRect(dx, y, w, S);
      g.fillStyle(C(95, 195, 55));
      g.fillRect(dx, y, w, S / 3);
      g.fillStyle(C(40, 110, 28));
      g.fillRect(dx, y + S, w, S);
      // Soil
      g.fillStyle(C(140, 95, 35));
      g.fillRect(dx, y + 2*S, w, S);
      g.fillStyle(C(95, 65, 25));
      g.fillRect(dx, y + 3*S, w, S);
      // Rock face gradient (top 50px)
      for (let i = 0; i < Math.min(50, rockH); i++) {
        const t = i / 50;
        g.fillStyle(C(
          120 - Math.floor(t * 35),
          92  - Math.floor(t * 28),
          52  - Math.floor(t * 18)
        ));
        g.fillRect(dx, rockStart + i, w, 1);
      }
      // Solid fill to bottom
      if (rockH > 50) {
        g.fillStyle(C(85, 64, 34));
        g.fillRect(dx, rockStart + 50, w, rockH - 50);
      }
      // Strata lines across full height
      for (let sy = 0; sy < rockH; sy += 12) {
        g.fillStyle(C(160, 125, 70), 0.3);
        g.fillRect(dx, rockStart + sy, w, 1);
        g.fillStyle(C(50, 35, 18), 0.3);
        g.fillRect(dx, rockStart + sy + 6, w, 1);
      }
      // Left highlight
      g.fillStyle(C(165, 135, 80), 0.25);
      g.fillRect(dx, rockStart, S, rockH);
      // Right shadow
      g.fillStyle(C(30, 18, 10), 0.35);
      g.fillRect(dx + w - S, rockStart, S, rockH);
      // Moss patches near top
      for (let m = 0; m < 4; m++) {
        const mx = dx + (m * w / 3) + Math.sin(m * 1.7) * 10;
        g.fillStyle(C(50, 110, 38), 0.4);
        g.fillRect(mx, rockStart + m * 8, 8, 4);
      }
      // Grass on surface
      for (let gx = dx; gx < dx + w - 6; gx += 18) {
        g.fillStyle(C(75, 155, 48));
        g.fillRect(gx, y - 2, S, 2);
        g.fillRect(gx - 2, y - S, 3, 5);
      }
      // Bottom fade into ocean
      g.fillStyle(C(5, 3, 10), 0.3);
      g.fillRect(dx, bottom - 8, w, 8);
      // Foam line where terrain meets ocean
      for (var fx = dx; fx < dx + w; fx += 3) {
        var fWave = Math.sin(fx * 0.08 + sx * 0.01) * 2;
        g.fillStyle(C(210, 240, 250), 0.35);
        g.fillRect(fx, bottom + fWave - 1, 3, 2);
        g.fillStyle(C(240, 250, 255), 0.25);
        g.fillRect(fx, bottom + fWave + 1, 3, 1);
      }
    }, this);
  },

  // ── Early military: watchtowers + sandbags (first unit only) ──
  _drawMilitaryEarly(g, sx) {
    // Watchtowers (early map, x<3200)
    var wt = [
      { x:210, y:470, w:40, h:140 },
      { x:510, y:470, w:40, h:150 },
      { x:810, y:470, w:40, h:150 },
    ];
    wt.forEach(function(w) {
      var dx = w.x - sx;
      if (dx > 1050 || dx + w.w < -20) return;
      var by = w.y + GY;
      g.fillStyle(C(80, 55, 30));
      g.fillRect(dx + 3, by - w.h + 6, 4, w.h - 6);
      g.fillRect(dx + w.w - 7, by - w.h + 6, 4, w.h - 6);
      g.fillRect(dx + 10, by - w.h + 6, 3, w.h - 6);
      g.fillRect(dx + w.w - 13, by - w.h + 6, 3, w.h - 6);
      g.fillStyle(C(60, 40, 20));
      for (var b = 0; b < 3; b++) {
        var by2 = by - w.h * (0.2 + b * 0.25);
        g.fillRect(dx + 3, by2, 4, 2);
        g.fillRect(dx + w.w - 7, by2, 4, 2);
        g.fillRect(dx + 6, by2 - 6, 2, 14);
        g.fillRect(dx + w.w - 8, by2 - 6, 2, 14);
      }
      g.fillStyle(C(110, 80, 40));
      g.fillRect(dx - 2, by - w.h, w.w + 4, 5);
      g.fillStyle(C(90, 65, 30));
      g.fillRect(dx - 2, by - w.h, w.w + 4, 2);
      g.fillStyle(C(70, 50, 25));
      g.fillRect(dx - 2, by - w.h - 12, 3, 12);
      g.fillRect(dx + w.w - 1, by - w.h - 12, 3, 12);
      g.fillRect(dx, by - w.h - 12, w.w, 3);
      g.fillStyle(C(120, 85, 40));
      g.fillRect(dx - 4, by - w.h - 14, w.w + 8, 3);
      g.fillStyle(C(100, 70, 30));
      for (var r = 0; r < 8; r++) {
        g.fillRect(dx - 4 + r * 2, by - w.h - 14 - r * 2, w.w + 8 - r * 4, 3);
      }
      g.fillStyle(C(80, 55, 25));
      g.fillRect(dx + w.w / 2 - 3, by - w.h - 30, 6, 4);
      g.fillStyle(C(5, 3, 8), 0.2);
      g.fillRect(dx, by - w.h + 5, w.w, 3);
    }, this);
    // Sandbags (early map, x<3200)
    var sb = [
      { x:460, y:470, len:30 },
      { x:620, y:470, len:25 },
    ];
    sb.forEach(function(s) {
      var dx = s.x - sx;
      if (dx > 1050 || dx + s.len < -20) return;
      var by = s.y + GY;
      g.fillStyle(C(140, 115, 75));
      g.fillRect(dx, by - 5, s.len, 5);
      g.fillStyle(C(120, 95, 60));
      g.fillRect(dx, by - 5, s.len, 2);
      g.fillStyle(C(130, 105, 68));
      g.fillRect(dx + 4, by - 10, s.len - 8, 5);
      g.fillStyle(C(110, 88, 55));
      g.fillRect(dx + 4, by - 10, s.len - 8, 2);
      g.fillStyle(C(90, 70, 45), 0.5);
      for (var se = 6; se < s.len; se += 7) {
        g.fillRect(dx + se, by - 10, 1, 5);
        g.fillRect(dx + se + 3, by - 5, 1, 5);
      }
    }, this);
  },

  // ── Gaps (mountains show through; cliff edges at terrain level) ──
  _drawGaps(g, sx, f) {
    for (let i = 0; i < LGROUND.length - 1; i++) {
      const a = LGROUND[i], b = LGROUND[i + 1];
      const gs = a.x + a.w, ge = b.x;
      if (ge > gs) {
        const gx = gs - sx, gw = ge - gs;
        if (gx + gw < -10 || gx > 1034) continue;
        const ly = a.y + GY, ry = b.y + GY;
        // Cliff edges at correct terrain height
        g.fillStyle(C(50, 35, 18));
        g.fillRect(gx, ly - 8, 6, 45);
        g.fillRect(gx + gw - 6, ry - 8, 6, 45);
        g.fillStyle(C(40, 85, 30), 0.35);
        g.fillRect(gx, ly - 8, 6, 10);
        g.fillRect(gx + gw - 6, ry - 8, 6, 10);
        // Gap shadow beneath each edge
        g.fillStyle(C(5, 3, 8), 0.5);
        g.fillRect(gx + 4, ly + 10, 3, 50);
        g.fillRect(gx + gw - 7, ry + 10, 3, 50);
        // Water surface shimmer at gap bottom (over mountains)
        const wOff = Math.floor(f * 0.03);
        for (let wy = 0; wy < 40; wy += 6) {
          const wAmp = Math.sin((wy + wOff) * 0.12) * 3;
          g.fillStyle(C(30, 180, 190), 0.08 + wy * 0.003);
          g.fillRect(gx + wAmp, 470 + wy, gw + wAmp, 3);
        }
      }
    }
  },

  // ── Waterfalls ──
  _drawWaterfalls(g, sx, f) {
    // Waterfall at the second chasm (x=1470-1570)
    const wx = 1480, ww = 40;
    const dx = wx - sx;
    if (dx > 1050 || dx < -60) return;
    for (let i = 0; i < 20; i++) {
      const a = 0.12 + Math.sin(i * 0.3 + f * 0.08) * 0.08;
      g.fillStyle(C(140, 210, 245), a);
      g.fillRect(dx + Math.sin(i * 0.2 + f * 0.1) * 5, 430 + GY + i * 6, ww, 4);
    }
    // Bright streaks
    for (let s = 0; s < 3; s++) {
      const sy = ((f * 2 + s * 30) % 120) + 430 + GY;
      g.fillStyle(C(180, 235, 255), 0.3);
      g.fillRect(dx + 8 + s * 10, sy, 6, 15);
    }
    // Mist at bottom
    for (let m = 0; m < 3; m++) {
      const mr = 8 + Math.sin(m * 0.7 + f * 0.05) * 4;
      g.fillStyle(C(200, 240, 255), 0.1);
      g.fillCircle(dx + 20 + Math.sin(m + f * 0.02) * 8, 430 + GY + 90 + m * 6, mr);
    }
    // Waterfall glow
    g.fillStyle(C(150, 220, 255), 0.06);
    g.fillRect(dx - 5, 430 + GY, ww + 10, 170);
  },

  // ── Rope Bridges ──
  _drawRopeBridges(g, sx, f) {
    const bridges = [
      { x1:1150, x2:1250, y:435, sway:1.5 },
      { x1:1470, x2:1570, y:445, sway:2.0 },
    ];
    bridges.forEach(function(b) {
      const dx1 = b.x1 - sx, dx2 = b.x2 - sx;
      if (dx2 < -20 || dx1 > 1044) return;
      const sway = Math.sin(f * 0.025) * b.sway;
      const by = b.y + GY;
      // Rope rails
      g.fillStyle(C(80, 60, 30));
      for (let x = dx1; x <= dx2; x += 4) {
        const t = (x - dx1) / (dx2 - dx1);
        const curve = Math.sin(t * Math.PI) * sway;
        g.fillRect(x, by - 4 + curve, 3, 2);
        g.fillRect(x, by + 6 + curve, 3, 2);
      }
      // Planks
      for (let x = dx1 + 4; x <= dx2 - 4; x += 12) {
        const t = (x - dx1) / (dx2 - dx1);
        const curve = Math.sin(t * Math.PI) * sway;
        g.fillStyle(C(120, 90, 50));
        g.fillRect(x, by + curve, 8, 5);
        g.fillStyle(C(100, 75, 40));
        g.fillRect(x, by + curve, 8, 2);
      }
      // Vertical rope ties
      for (let x = dx1 + 10; x <= dx2 - 10; x += 30) {
        const t = (x - dx1) / (dx2 - dx1);
        const curve = Math.sin(t * Math.PI) * sway;
        g.fillStyle(C(70, 50, 25));
        g.fillRect(x, by - 4 + curve, 2, 10);
      }
      // Posts at ends
      g.fillStyle(C(60, 40, 20));
      g.fillRect(dx1 - 3, by - 6, 4, 14);
      g.fillRect(dx2 - 1, by - 6, 4, 14);
    }, this);
  },

  // ── Platforms ──
  _drawPlatforms(g, sx, f) {
    LPLATFORMS.forEach(function(p) {
      const dx = p.x - sx;
      if (dx > 1050 || dx < -70) return;
      const cols = {
        wood:  [0xaa8a50, 0x8a6a3a, 0x6a4a2a],
        stone: [0x9a9aaa, 0x7a7a8a, 0x5a5a6a],
      };
      const c = cols[p.k] || cols.stone;
      g.fillStyle(c[0]);
      g.fillRect(dx, p.y + GY, p.w, S);
      g.fillStyle(c[1]);
      g.fillRect(dx, p.y + GY + S, p.w, 2*S);
      g.fillStyle(c[2]);
      g.fillRect(dx, p.y + GY + 3*S, p.w, S);
      g.fillStyle(0xffffff, 0.12);
      g.fillRect(dx, p.y + GY, S/2, 2*S);
      g.fillStyle(0x000000, 0.12);
      g.fillRect(dx + p.w - S/2, p.y + GY, S/2, 2*S);
      // Support pillar
      g.fillStyle(C(50, 38, 20), 0.5);
      g.fillRect(dx + 4, p.y + GY + 4*S, 4, 6*S);
      g.fillRect(dx + p.w - 8, p.y + GY + 4*S, 4, 6*S);
      // Detail
      if (p.k === 'wood') {
        g.fillStyle(C(60, 40, 20), 0.3);
        g.fillRect(dx + p.w * 0.25, p.y + GY + S, 2, 2*S);
        g.fillRect(dx + p.w * 0.5, p.y + GY + S, 2, 2*S);
      }
      if (p.k === 'stone') {
        g.fillStyle(C(50, 50, 60), 0.2);
        g.fillRect(dx + p.w * 0.3, p.y + GY + S, 2, 2*S);
      }
    }, this);
  },

  // ── Ladders ──
  _drawLadders(g, sx) {
    LLADDERS.forEach(function(l) {
      const dx = l.x - sx;
      if (dx > 1050 || dx < -20) return;
      const h = l.y2 - l.y1;
      g.fillStyle(C(15, 10, 15), 0.25);
      g.fillRect(dx - 3, l.y1 + GY + 3, 5*S + 6, h - 3);
      g.fillStyle(C(110, 80, 45));
      g.fillRect(dx, l.y1 + GY, S, h);
      g.fillRect(dx + 4*S, l.y1 + GY, S, h);
      for (let ry = l.y1 + GY + 6; ry < l.y2 + GY - 3; ry += 3*S) {
        g.fillStyle(C(130, 95, 55));
        g.fillRect(dx, ry, 5*S, S);
        g.fillStyle(C(90, 65, 35));
        g.fillRect(dx, ry, 5*S, S/2);
      }
    }, this);
  },

  // ── Props ──
  _drawProps(g, sx, f) {
    const vis = function(x) { const d = x - sx; return d > -60 && d < 1084; };

    // Ancient pillars
    LPILLARS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      g.fillStyle(C(90, 85, 95));
      g.fillRect(dx, py - p.h, 6*S, p.h);
      g.fillStyle(C(100, 95, 105));
      g.fillRect(dx, py - p.h, 6*S, S);
      g.fillStyle(C(80, 75, 85));
      for (let sy = 0; sy < p.h; sy += 10) {
        g.fillRect(dx, py - p.h + sy, 6*S, 1);
      }
      // Moss on pillar
      g.fillStyle(C(35, 80, 25), 0.4);
      g.fillRect(dx, py - p.h + 5, 3, 12);
      g.fillRect(dx + 4*S, py - p.h + 20, 3, 10);
    }, this);

    // Treasure chests
    LCHESTS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      g.fillStyle(C(100, 65, 20));
      g.fillRect(dx, py - 3*S, 4*S, 3*S);
      g.fillStyle(C(130, 85, 30));
      g.fillRect(dx, py - 3*S, 4*S, S);
      // Lid
      g.fillStyle(C(120, 75, 25));
      g.fillRect(dx, py - 4*S, 5*S, S);
      g.fillStyle(C(140, 95, 40));
      g.fillRect(dx, py - 4*S, 5*S, S/2);
      // Lock
      g.fillStyle(C(200, 170, 50));
      g.fillRect(dx + 2*S, py - 2*S, S, S);
    }, this);

    // Barrels
    LBARRELS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      g.fillStyle(C(80, 82, 95));
      g.fillRect(dx, py - 3*S, 6*S, 8*S);
      g.fillStyle(C(100, 102, 115));
      g.fillRect(dx, py - 3*S, 6*S, S);
      g.fillStyle(C(60, 62, 75));
      g.fillRect(dx - S, py - S, 8*S, S);
      g.fillRect(dx - S, py + 2*S, 8*S, S);
      g.fillStyle(C(90, 92, 105));
      g.fillRect(dx - S, py - 3*S, 8*S, S);
    }, this);

    // Crates
    LCRATES.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      g.fillStyle(C(110, 85, 45));
      g.fillRect(dx, py - 4*S, 6*S, 4*S);
      g.fillStyle(C(130, 105, 65));
      g.fillRect(dx, py - 4*S, 6*S, S);
      g.fillStyle(C(80, 60, 30));
      g.fillRect(dx + 2*S, py - 4*S, 2*S, 4*S);
      g.fillRect(dx, py - 2*S, 6*S, 2*S);
    }, this);

    // Tropical flowers
    LFLOWERS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      // Stem
      g.fillStyle(C(45, 100, 30));
      g.fillRect(dx, py - 3*S, 2, 2*S);
      // Petals
      const hue = Math.floor(p.x / 100) % 3;
      const colors = [0xff4488, 0xff8844, 0xffdd44];
      g.fillStyle(colors[hue]);
      g.fillCircle(dx, py - 4*S, 2*S);
      g.fillCircle(dx - S, py - 4*S, S);
      g.fillCircle(dx + S, py - 4*S, S);
      g.fillStyle(C(255, 240, 100));
      g.fillCircle(dx, py - 4*S, S/2);
    }, this);

    // Jeep wreck
    LJEEPS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      g.fillStyle(C(60, 75, 45));
      g.fillRect(dx + 2*S, py - 5*S, 12*S, 7*S);
      g.fillStyle(C(70, 85, 55));
      g.fillRect(dx + 2*S, py - 5*S, 12*S, S);
      g.fillStyle(C(40, 50, 30));
      g.fillRect(dx + S, py + S, 14*S, 3*S);
      g.fillStyle(0x222222);
      g.fillCircle(dx + 5*S, py + 4*S, 3*S);
      g.fillCircle(dx + 11*S, py + 4*S, 3*S);
      g.fillStyle(0x444444);
      g.fillCircle(dx + 5*S, py + 4*S, S);
      g.fillCircle(dx + 11*S, py + 4*S, S);
      // Fire
      const fk = Math.floor(f / 3) % 3;
      const fr = [0xff6600, 0xff4400, 0xff8800];
      g.fillStyle(fr[fk], 0.35);
      g.fillCircle(dx + 9*S, py - 6*S, 3*S);
      g.fillStyle(0x444444, 0.2);
      g.fillCircle(dx + 9*S, py - 8*S, 2*S);
    }, this);

    // Sandbags
    LBAGS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      const bw = 6*S, bh = 4*S;
      for (let r = 0; r < p.rows; r++) {
        const off = (r % 2) * bw / 2;
        const cnt = p.rows - r;
        for (let c = 0; c < cnt; c++) {
          const bx = dx + off + c * bw;
          const by = py - r * bh;
          g.fillStyle(0x9a8a6a);
          g.fillRect(bx, by, bw, bh);
          g.fillStyle(0xaa9a7a);
          g.fillRect(bx, by, bw, bh / 4);
          g.fillRect(bx, by, bw / 4, bh);
          g.fillStyle(0x8a7a5a);
          g.fillRect(bx + bw / 4, by + bh / 4, bw / 2, bh / 2);
        }
      }
    }, this);

    // Flag
    LFLAGS.forEach(function(p) {
      if (!vis(p.x)) return;
      const dx = p.x - sx, py = p.y + GY;
      g.fillStyle(0x999999);
      g.fillRect(dx + 7*S, py - 6*S, 2*S, 8*S);
      g.fillStyle(0xdd3333);
      g.fillRect(dx + 3*S, py - 7*S, 5*S, 3*S);
      g.fillStyle(0xffffff);
      g.fillRect(dx + 5*S, py - 6*S, S, S);
    }, this);
  },

  // ── Hanging Vines ──
  _drawVines(g, sx, f) {
    LVINES.forEach(function(vx) {
      const dx = vx - sx;
      if (dx > 1050 || dx < -30) return;
      const len = 60 + Math.sin(vx * 0.1 + f * 0.02) * 20;
      const sway = Math.sin(f * 0.015 + vx * 0.04) * 3;
      for (let i = 0; i < len; i += 3) {
        const sw = sway * Math.sin(i * 0.04);
        g.fillStyle(C(35 + i * 0.04, 65 - i * 0.02, 15), 0.5);
        g.fillRect(dx + sw, 45 + i, 2, 3);
      }
      for (let li = 0; li < len; li += 15) {
        const sw = sway * Math.sin(li * 0.04);
        g.fillStyle(C(45, 100, 25), 0.5);
        g.fillRect(dx - 2 + sw, 45 + li, 5, 3);
        g.fillRect(dx + 2 + sw, 45 + li + 3, 3, 4);
      }
    }, this);
  },

  // ── Bushes on cliffs ──
  _drawBushes(g, sx, f) {
    LBUSHES.forEach(function(b) {
      const dx = b.x - sx;
      if (dx > 1050 || dx < -40) return;
      const by = b.y + GY, bw = b.w, bh = b.h;
      const sway = Math.sin(f * 0.02 + b.x * 0.05) * 1.5;
      // Bush body
      g.fillStyle(C(20, 65, 25), 0.8);
      g.fillCircle(dx + bw/2 + sway, by - bh/2, bw/2);
      g.fillStyle(C(30, 85, 35), 0.7);
      g.fillCircle(dx + bw/3 + sway, by - bh/3, bw/3);
      g.fillCircle(dx + bw*0.6 + sway, by - bh*0.4, bw*0.35);
      // Highlight
      g.fillStyle(C(50, 120, 45), 0.4);
      g.fillCircle(dx + bw*0.4 + sway, by - bh*0.3, bw/4);
    }, this);
  },

  // ── Layer 1: Foreground Ocean ──
  _drawForegroundOcean(g, sx, f) {
    const OY = 0;
    g.fillStyle(C(18, 25, 38));
    g.fillRect(-5, 570 + OY, 1034, 700 - (570 + OY));
    for (let rx = 0; rx < 1034; rx += 40) {
      const rh = 8 + Math.sin(rx * 0.1) * 5;
      g.fillStyle(C(30, 40, 55), 0.5);
      g.fillRect(rx, 570 + OY, 25, rh);
    }
    for (let i = 0; i < 88; i++) {
      const t = i / 88;
      g.fillStyle(C(
        30 + Math.floor(t * 25),
        100 + Math.floor(t * 80),
        160 + Math.floor(t * 50)
      ));
      g.fillRect(-5, 570 + OY + i * 4, 1034, 5);
    }
    for (let wy = 0; wy < 350; wy += 5) {
      const wAmp = Math.sin((wy + f * 0.04) * 0.08) * 4;
      g.fillStyle(C(180, 235, 255), 0.15);
      g.fillRect(-5 + wAmp, 570 + OY + wy, 1034 + wAmp, 2);
    }
    for (let wc = 0; wc < 8; wc++) {
      const wx2 = ((f * 0.5 + wc * 130) % 1050) - 10;
      const wy2 = 570 + OY + Math.sin(wc * 0.7 + f * 0.03) * 15;
      g.fillStyle(C(200, 240, 255), 0.3);
      g.fillRect(wx2, wy2, 30 + Math.sin(wc * 1.1) * 12, 3);
    }
    for (let sp = 0; sp < 12; sp++) {
      const sx2 = ((f * 0.3 + sp * 100) % 1050) - 10;
      const sy2 = 580 + OY + Math.sin(sp * 0.6 + f * 0.05) * 8;
      const fs = Math.floor(f / 5 + sp) % 3;
      g.fillStyle(C(220, 245, 255), 0.1 + fs * 0.05);
      g.fillCircle(sx2, sy2, 8 + fs * 3);
      g.fillStyle(C(255, 255, 255), 0.15 + fs * 0.05);
      g.fillCircle(sx2, sy2, 4 + fs * 2);
    }
    g.fillStyle(C(200, 240, 255), 0.15);
    g.fillRect(-5, 585 + OY, 1034, 3);
    g.fillStyle(C(255, 255, 255), 0.1);
    g.fillRect(-5, 588 + OY, 1034, 2);
  },

  drawForeground(g, sx, f) {
    this._drawForegroundOcean(g, sx, f);
  },

  // ── Fortress multi-tier ground (mini-boss arena, first unit) ──
  _drawFortress(g, sx, f) {
    var fortress = [
      { x:270, y:540, w:720,  label:'upper' },
      { x:470, y:610, w:400,  label:'midR' },
      { x:120, y:590, w:280,  label:'midL' },
      { x:50,   y:650, w:800,  label:'bottom', thin:true },
    ];
    fortress.forEach(function(fs) {
      var dx = fs.x - sx;
      if (dx > 1050 || dx + fs.w < -10) return;
      var y = fs.y + GY;
      g.fillStyle(C(60, 148, 38));
      g.fillRect(dx, y, fs.w, S);
      g.fillStyle(C(88, 185, 52));
      g.fillRect(dx, y, fs.w, S / 3);
      g.fillStyle(C(38, 102, 25));
      g.fillRect(dx, y + S, fs.w, S);
      g.fillStyle(C(130, 88, 32));
      g.fillRect(dx, y + 2*S, fs.w, S);
      g.fillStyle(C(88, 60, 22));
      g.fillRect(dx, y + 3*S, fs.w, S);
      // Color indicator bar (debug labels)
      var col = fs.label === 'upper' ? C(68,136,221) : fs.label === 'midR' ? C(68,204,68) : fs.label === 'midL' ? C(221,204,68) : C(221,68,68);
      g.fillStyle(col, 0.7);
      g.fillRect(dx, y - 2, fs.w, 3);
      if (fs.thin) {
        for (var i = 0; i < 6; i++) {
          var t = i / 6;
          g.fillStyle(C(115 - t * 20, 86 - t * 16, 48 - t * 12));
          g.fillRect(dx, y + 4*S + i, fs.w, 1);
        }
        g.fillStyle(C(150, 115, 62), 0.3);
        g.fillRect(dx, y + 4*S + 2, fs.w, 1);
        g.fillStyle(C(45, 30, 15), 0.3);
        g.fillRect(dx, y + 4*S + 5, fs.w, 1);
        g.fillStyle(C(5, 3, 10), 0.2);
        g.fillRect(dx, y + 4*S + 6, fs.w, 6);
      } else {
        var rockStart = y + 4*S;
        var rockH = Math.max(0, 570 - rockStart);
        for (var i = 0; i < Math.min(50, rockH); i++) {
          var t = i / 50;
          g.fillStyle(C(115 - t * 32, 86 - t * 25, 48 - t * 16));
          g.fillRect(dx, rockStart + i, fs.w, 1);
        }
        if (rockH > 50) {
          g.fillStyle(C(83, 61, 32));
          g.fillRect(dx, rockStart + 50, fs.w, rockH - 50);
        }
        for (var sy = 0; sy < rockH; sy += 14) {
          g.fillStyle(C(150, 115, 62), 0.3);
          g.fillRect(dx, rockStart + sy, fs.w, 1);
          g.fillStyle(C(45, 30, 15), 0.3);
          g.fillRect(dx, rockStart + sy + 7, fs.w, 1);
        }
        g.fillStyle(C(158, 125, 72), 0.25);
        g.fillRect(dx, rockStart, S, rockH);
        g.fillStyle(C(25, 15, 8), 0.35);
        g.fillRect(dx + fs.w - S, rockStart, S, rockH);
        g.fillStyle(C(5, 3, 10), 0.25);
        g.fillRect(dx, 570 - 6, fs.w, 6);
      }
    }, this);
    // Bridge: MidL → MidR
    var ml = fortress[2], mr = fortress[1];
    var mlx = ml.x + ml.w, mrx = mr.x;
    var bdx1 = mlx - sx, bdx2 = mrx - sx;
    if (bdx1 > -20 && bdx2 < 1050) {
      var y1 = ml.y + GY, y2 = mr.y + GY;
      var steps = Math.abs(bdx2 - bdx1) + Math.abs(y2 - y1);
      g.fillStyle(C(80, 60, 30));
      for (var s = 0; s <= steps; s += 4) {
        var t = steps > 0 ? s / steps : 0;
        var bx = bdx1 + (bdx2 - bdx1) * t;
        var by = y1 + (y2 - y1) * t + Math.sin(t * 6.28 + f * 0.02) * 2;
        g.fillRect(bx, by - 4, 3, 2);
        g.fillRect(bx, by + 6, 3, 2);
      }
      for (var s = 0; s <= steps; s += 10) {
        var t = steps > 0 ? s / steps : 0;
        var bx = bdx1 + (bdx2 - bdx1) * t;
        var by = y1 + (y2 - y1) * t + Math.sin(t * 6.28 + f * 0.02) * 2;
        g.fillStyle(C(120, 90, 50));
        g.fillRect(bx - 3, by, 6, 5);
        g.fillStyle(C(100, 75, 40));
        g.fillRect(bx - 3, by, 6, 2);
      }
      g.fillStyle(C(60, 40, 20));
      g.fillRect(bdx1 - 3, y1 - 6, 4, 14);
      g.fillRect(bdx2 - 3, y2 - 6, 4, 14);
    }
  },

  // ── Watchtowers ──
  _drawWatchtowers(g, sx) {
    LWATCHTOWERS.forEach(function(w) {
      var dx = w.x - sx;
      if (dx > 1050 || dx + w.w < -20) return;
      var by = w.y + GY;
      // Legs (4 vertical posts)
      g.fillStyle(C(80, 55, 30));
      g.fillRect(dx + 3, by - w.h + 6, 4, w.h - 6);
      g.fillRect(dx + w.w - 7, by - w.h + 6, 4, w.h - 6);
      g.fillRect(dx + 10, by - w.h + 6, 3, w.h - 6);
      g.fillRect(dx + w.w - 13, by - w.h + 6, 3, w.h - 6);
      // Cross braces
      g.fillStyle(C(60, 40, 20));
      for (var b = 0; b < 3; b++) {
        var by2 = by - w.h * (0.2 + b * 0.25);
        g.fillRect(dx + 3, by2, 4, 2);
        g.fillRect(dx + w.w - 7, by2, 4, 2);
        g.fillRect(dx + 6, by2 - 6, 2, 14);
        g.fillRect(dx + w.w - 8, by2 - 6, 2, 14);
      }
      // Platform floor
      g.fillStyle(C(110, 80, 40));
      g.fillRect(dx - 2, by - w.h, w.w + 4, 5);
      g.fillStyle(C(90, 65, 30));
      g.fillRect(dx - 2, by - w.h, w.w + 4, 2);
      // Railings
      g.fillStyle(C(70, 50, 25));
      g.fillRect(dx - 2, by - w.h - 12, 3, 12);
      g.fillRect(dx + w.w - 1, by - w.h - 12, 3, 12);
      g.fillRect(dx, by - w.h - 12, w.w, 3);
      // Roof (triangle)
      g.fillStyle(C(120, 85, 40));
      g.fillRect(dx - 4, by - w.h - 14, w.w + 8, 3);
      g.fillStyle(C(100, 70, 30));
      for (var r = 0; r < 8; r++) {
        g.fillRect(dx - 4 + r * 2, by - w.h - 14 - r * 2, w.w + 8 - r * 4, 3);
      }
      // Roof peak
      g.fillStyle(C(80, 55, 25));
      g.fillRect(dx + w.w / 2 - 3, by - w.h - 30, 6, 4);
      // Shadow under platform
      g.fillStyle(C(5, 3, 8), 0.2);
      g.fillRect(dx, by - w.h + 5, w.w, 3);
    }, this);
  },

  // ── Tents ──
  _drawTents(g, sx) {
    LTENTS.forEach(function(t) {
      var dx = t.x - sx;
      if (dx > 1050 || dx + t.w < -20) return;
      var by = t.y + GY;
      var h = t.h;
      // Main body (triangle A-frame)
      g.fillStyle(C(55, 75, 40));
      for (var i = 0; i < h; i++) {
        var t2 = i / h;
        var halfW = t.w / 2 * (1 - t2);
        g.fillRect(dx + halfW, by - h + i, t.w - halfW * 2, 1);
      }
      // Ridge line
      g.fillStyle(C(45, 60, 30));
      g.fillRect(dx, by - h, t.w, 2);
      // Opening (dark center)
      g.fillStyle(C(20, 25, 15), 0.6);
      var openW = t.w * 0.35, openH = h * 0.6;
      g.fillRect(dx + t.w / 2 - openW / 2, by - openH, openW, openH);
      // Camo pattern
      g.fillStyle(C(45, 60, 35), 0.4);
      for (var c = 0; c < 3; c++) {
        var cx = dx + t.w * (0.2 + c * 0.3);
        var cy = by - h * (0.3 + c * 0.15);
        g.fillRect(cx, cy, 6, 5);
      }
    }, this);
  },

  // ── Sandbags ──
  _drawSandbags(g, sx) {
    LSANDBAGS.forEach(function(s) {
      var dx = s.x - sx;
      if (dx > 1050 || dx + s.len < -20) return;
      var by = s.y + GY;
      // Bottom row
      g.fillStyle(C(140, 115, 75));
      g.fillRect(dx, by - 5, s.len, 5);
      g.fillStyle(C(120, 95, 60));
      g.fillRect(dx, by - 5, s.len, 2);
      // Top row (offset)
      g.fillStyle(C(130, 105, 68));
      g.fillRect(dx + 4, by - 10, s.len - 8, 5);
      g.fillStyle(C(110, 88, 55));
      g.fillRect(dx + 4, by - 10, s.len - 8, 2);
      // Separator lines (bag divisions)
      g.fillStyle(C(90, 70, 45), 0.5);
      for (var se = 6; se < s.len; se += 7) {
        g.fillRect(dx + se, by - 10, 1, 5);
        g.fillRect(dx + se + 3, by - 5, 1, 5);
      }
    }, this);
  },

  // ── Barbed wire ──
  _drawBarbedWire(g, sx) {
    LBARBED_WIRE.forEach(function(b) {
      var dx = b.x - sx;
      if (dx > 1050 || dx + b.len < -20) return;
      var by = b.y + GY;
      // Posts
      g.fillStyle(C(60, 40, 20));
      g.fillRect(dx, by - 10, 3, 12);
      g.fillRect(dx + b.len - 3, by - 10, 3, 12);
      // Wire strands
      g.fillStyle(C(80, 70, 60));
      g.fillRect(dx + 3, by - 6, b.len - 6, 1);
      g.fillRect(dx + 3, by - 2, b.len - 6, 1);
      // Barbs (X shapes)
      g.fillStyle(C(100, 90, 80));
      for (var sp = 10; sp < b.len; sp += 15) {
        var bx = dx + sp;
        g.fillRect(bx - 4, by - 8, 2, 5);
        g.fillRect(bx, by - 8, 2, 5);
        g.fillRect(bx - 4, by - 4, 2, 5);
        g.fillRect(bx, by - 4, 2, 5);
      }
    }, this);
  },

  // ── Radio towers ──
  _drawRadioTowers(g, sx) {
    LRADIO_TOWERS.forEach(function(rt) {
      var dx = rt.x - sx;
      if (dx > 1050 || dx < -50) return;
      var by = rt.y + GY;
      var h = rt.h;
      // Main mast
      g.fillStyle(C(70, 60, 50));
      g.fillRect(dx + 5, by - h, 6, h);
      // Cross braces (lattice)
      g.fillStyle(C(55, 45, 35));
      for (var b = 0; b < 10; b++) {
        var by2 = by - h * (0.1 + b * 0.09);
        g.fillRect(dx + 2, by2, 12, 2);
        g.fillRect(dx + 4, by2 - 3, 2, 8);
      }
      // Diagonal braces
      for (var d = 0; d < 8; d++) {
        var dy = by - h * (0.15 + d * 0.1);
        g.fillStyle(C(60, 50, 40));
        g.fillRect(dx + 5, dy, 1, 5);
        g.fillRect(dx + 10, dy, 1, 5);
      }
      // Antenna at top
      g.fillStyle(C(100, 90, 80));
      g.fillRect(dx + 6, by - h - 20, 4, 20);
      g.fillStyle(C(120, 110, 100));
      g.fillRect(dx + 8, by - h - 25, 1, 6);
      // Guy wires
      g.fillStyle(C(50, 45, 40), 0.3);
      g.fillRect(dx + 4, by - h * 0.6, 2, 1);
      g.fillRect(dx + 10, by - h * 0.6, 2, 1);
    }, this);
  },

  // ── Fuel drums ──
  _drawFuelDrums(g, sx) {
    LFUEL_DRUMS.forEach(function(fd) {
      var dx = fd.x - sx;
      if (dx > 1050 || dx < -20) return;
      var by = fd.y + GY;
      var colors = [C(180, 40, 35), C(50, 120, 40), C(160, 150, 50)];
      for (var i = 0; i < fd.n; i++) {
        var cx = dx + i * 8;
        g.fillStyle(colors[i % 3]);
        g.fillRect(cx, by - 12, 7, 12);
        g.fillStyle(C(255, 255, 255), 0.3);
        g.fillRect(cx + 1, by - 8, 5, 2);
        g.fillRect(cx + 1, by - 4, 5, 2);
        g.fillStyle(C(40, 30, 20), 0.4);
        g.fillRect(cx, by - 1, 7, 1);
      }
    }, this);
  },

  // ── Prison cage (near end of map, on terrain) ──
  _drawPrisonCage(g, sx) {
    var cages = [
      { x:10650, y:440, w:60, h:45 },
    ];
    cages.forEach(function(c) {
      var dx = c.x - sx;
      if (dx > 1050 || dx + c.w < -20) return;
      var by = c.y + GY;
      // Floor
      g.fillStyle(C(60, 45, 30));
      g.fillRect(dx, by - 4, c.w, 4);
      // Roof
      g.fillStyle(C(80, 60, 40));
      g.fillRect(dx - 2, by - c.h - 2, c.w + 4, 4);
      // Vertical bars
      g.fillStyle(C(100, 90, 80));
      for (var b = 0; b < 6; b++) {
        var bx = dx + 2 + b * (c.w - 4) / 5;
        g.fillRect(bx, by - c.h, 2, c.h - 4);
      }
      // Horizontal bars
      g.fillStyle(C(90, 80, 70));
      g.fillRect(dx + 2, by - c.h + 8, c.w - 4, 2);
      g.fillRect(dx + 2, by - c.h * 0.55, c.w - 4, 2);
      // Door with lock
      g.fillStyle(C(70, 60, 50));
      g.fillRect(dx + c.w / 2 - 1, by - c.h + 6, 2, c.h - 10);
      g.fillStyle(C(180, 160, 50));
      g.fillRect(dx + c.w / 2 + 3, by - c.h + 10, 4, 4);
      // Hostage silhouette inside
      g.fillStyle(C(200, 180, 140), 0.4);
      g.fillRect(dx + c.w * 0.3, by - 16, 4, 12);
      g.fillCircle(dx + c.w * 0.35, by - 18, 4);
    }, this);
  },

  // ── Helipad (end of map, on terrain) ──
  _drawHelipad(g, sx) {
    var heli = { x:10910, y:420, w:80 };
    var dx = heli.x - sx;
    if (dx > 1050 || dx + heli.w < -20) return;
    var by = heli.y + GY;
    // Landing pad base
    g.fillStyle(C(50, 50, 50));
    g.fillRect(dx, by - 3, heli.w, 4);
    g.fillStyle(C(60, 60, 60));
    g.fillRect(dx + 4, by - 4, heli.w - 8, 2);
    // H marking
    g.fillStyle(C(200, 200, 200));
    var hx = dx + heli.w / 2 - 8, hy = by - 12;
    g.fillRect(hx + 4, hy, 8, 10);
    g.fillRect(hx, hy + 2, 16, 6);
    // Circle around H
    g.fillStyle(C(180, 180, 180), 0.3);
    g.fillRect(hx - 6, hy - 4, 28, 18);
    // Glow effect
    g.fillStyle(C(100, 200, 255), 0.15);
    g.fillCircle(dx + heli.w / 2, by - 2, 40);
  },

};

console.log('[MapRenderer] v11 — Clean start: sky + mountains + cliff + ocean + continuous ground');