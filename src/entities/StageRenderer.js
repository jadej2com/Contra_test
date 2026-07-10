// ─── Stage / Environment Renderer — Beach Level ──
// All elements at S=3 scale

var StageRenderer = {

  // ── Sky gradient + stars ──
  sky(g, w, h, frame = 0) {
    const bands = 28;
    for (let i = 0; i < bands; i++) {
      const t = i / bands;
      g.fillStyle(Phaser.Display.Color.GetColor(
        Math.floor(8 + t * 18), Math.floor(6 + t * 14), Math.floor(22 + t * 16)
      ));
      g.fillRect(0, (h / bands) * i, w, h / bands + 1);
    }
    // Stars
    const starPhase = Math.floor(frame / 3) % 2;
    const stars = [
      [50,30],[120,55],[200,20],[310,45],[400,28],[520,60],[600,18],
      [720,48],[830,25],[940,52],[100,80],[320,70],[560,75],[780,68],
    ];
    if (starPhase) {
      stars.forEach(([sx, sy]) => {
        g.fillStyle(0xffffff, 0.5 + Math.sin(frame * 0.02 + sx) * 0.3);
        g.fillRect(sx, sy, 2, 2);
      });
    }
    // Moon
    g.fillStyle(0xddeeff, 0.5);
    g.fillCircle(w - 70, 50, 18);
    g.fillStyle(0xddeeff, 0.9);
    g.fillCircle(w - 70, 50, 14);
    g.fillStyle(0xffffff);
    g.fillCircle(w - 74, 46, 5);
    g.fillStyle(0x0a0a1a);
    g.fillCircle(w - 64, 54, 10);
  },

  // ── Ocean with waves ──
  ocean(g, x, y, w, h, frame = 0) {
    for (let i = 0; i < h; i++) {
      const t = i / h;
      g.fillStyle(Phaser.Display.Color.GetColor(
        Math.floor(8 + t * 12), Math.floor(14 + t * 18), Math.floor(30 + t * 24)
      ));
      g.fillRect(x, y + i, w, 1);
    }
    // Wave lines
    const waveOff = Math.floor(frame * 0.3);
    for (let wy = 0; wy < h; wy += 8) {
      const wxOff = Math.sin((wy + waveOff) * 0.15) * 6;
      g.fillStyle(0x88bbdd, 0.3 - (wy / h) * 0.2);
      g.fillRect(x + wxOff, y + wy, w + wxOff, 2);
    }
    // Foam line at shore
    g.fillStyle(0xffffff, 0.25 + Math.sin(frame * 0.05) * 0.1);
    g.fillRect(x, y + h - 4, w, 4);
    g.fillStyle(0xaaddff, 0.15);
    g.fillRect(x, y + h - 2, w, 2);
  },

  // ── Sand beach ──
  sand(g, x, y, w, h, frame = 0) {
    for (let i = 0; i < h; i++) {
      const t = i / h;
      g.fillStyle(Phaser.Display.Color.GetColor(
        Math.floor(80 + t * 30), Math.floor(60 + t * 18), Math.floor(24 + t * 8)
      ));
      g.fillRect(x, y + i, w, 1);
    }
    // Sand texture dots
    const grainSeed = Math.floor(frame / 60) % 3;
    const grains = [
      [30,5],[70,12],[120,3],[180,8],[240,14],[310,6],[400,10],[460,4],
      [530,11],[610,7],[680,13],[750,5],[820,9],[890,4],[960,12],
    ];
    grains.forEach(([gx, gy], i) => {
      if ((i + grainSeed) % 2 === 0) {
        g.fillStyle(0x664422, 0.2);
        g.fillRect(x + gx, y + gy, 2, 2);
      }
    });
    // Grass tufts near top of sand
    const grassX = [40, 150, 280, 390, 510, 630, 740, 850, 970];
    grassX.forEach((gx) => {
      g.fillStyle(0x3a6a2a);
      g.fillRect(x + gx, y + S, S, 2);
      g.fillRect(x + gx - 2, y + S, 2, S);
      g.fillRect(x + gx + 4, y + S, 2, S);
    });
  },

  // ── Clouds ──
  cloud(g, x, y, w, h) {
    g.fillStyle(0x445566, 0.25);
    g.fillRect(x + 2, y + 2, w, h);
    g.fillStyle(0x556677, 0.2);
    g.fillRect(x, y, w - 4, h);
    g.fillStyle(0x667788, 0.15);
    g.fillRect(x + 4, y - 2, w - 12, h + 2);
  },

  // ── Palm Tree ──
  palmTree(g, x, y) {
    // Trunk
    g.fillStyle(0x664422);
    g.fillRect(x + 6*S, y + 14*S, 4*S, 18*S);
    g.fillStyle(0x775533);
    g.fillRect(x + 6*S, y + 14*S, 4*S, S);
    // Trunk rings
    for (let ry = 0; ry < 18; ry += 4) {
      g.fillStyle(0x553311);
      g.fillRect(x + 6*S, y + 14*S + ry, 4*S, S);
    }
    // Fronds (fan shape)
    g.fillStyle(0x2a6a1a);
    g.fillRect(x + 2*S, y + 10*S, 12*S, 5*S);
    g.fillStyle(0x3a8a2a);
    g.fillRect(x + 2*S, y + 10*S, 12*S, S);
    g.fillRect(x + 2*S, y + 10*S, S, 5*S);
    // Frond tips
    g.fillStyle(0x2a6a1a);
    g.fillRect(x, y + 11*S, 2*S, 3*S);
    g.fillRect(x + 14*S, y + 11*S, 2*S, 3*S);
    g.fillStyle(0x1a5a0a);
    g.fillRect(x + 6*S, y + 8*S, 4*S, 2*S);
    // Coconuts
    g.fillStyle(0x553311);
    g.fillRect(x + 7*S, y + 14*S, 2*S, 2*S);
    g.fillRect(x + 8*S, y + 15*S, 2*S, 2*S);
  },

  // ── Sandbag stack ──
  sandbags(g, x, y, rows = 3) {
    const bagW = 6*S, bagH = 4*S;
    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * bagW / 2;
      const count = rows - r;
      for (let c = 0; c < count; c++) {
        const bx = x + offset + c * bagW;
        const by = y - r * bagH;
        g.fillStyle(0x8a7a5a);
        g.fillRect(bx, by, bagW, bagH);
        g.fillStyle(0x9a8a6a);
        g.fillRect(bx, by, bagW, bagH / 4);
        g.fillRect(bx, by, bagW / 4, bagH);
        g.fillStyle(0x7a6a4a);
        g.fillRect(bx + bagW / 4, by + bagH / 4, bagW / 2, bagH / 2);
      }
    }
  },

  // ── Watchtower ──
  watchtower(g, x, y) {
    const poleW = 2*S;
    // Legs
    g.fillStyle(0x664422);
    g.fillRect(x + 2*S, y + 16*S, poleW, 16*S);
    g.fillRect(x + 12*S, y + 16*S, poleW, 16*S);
    // Cross braces
    g.fillStyle(0x553311);
    g.fillRect(x + 2*S, y + 20*S, 12*S, S);
    g.fillRect(x + 2*S, y + 26*S, 12*S, S);
    // Platform
    g.fillStyle(0x886644);
    g.fillRect(x, y + 14*S, 16*S, 3*S);
    g.fillStyle(0x997755);
    g.fillRect(x, y + 14*S, 16*S, S);
    // Railing
    g.fillStyle(0x775533);
    g.fillRect(x, y + 10*S, 16*S, S);
    g.fillRect(x, y + 10*S, S, 4*S);
    g.fillRect(x + 15*S, y + 10*S, S, 4*S);
    // Roof
    g.fillStyle(0x555533);
    g.fillRect(x - 2*S, y + 3*S, 20*S, 3*S);
    g.fillStyle(0x666644);
    g.fillRect(x - 2*S, y + 3*S, 20*S, S);
    g.fillStyle(0x444422);
    g.fillRect(x, y + 5*S, 16*S, S);
    // Light on top
    g.fillStyle(0xffcc44, 0.4 + Math.sin(Date.now() * 0.003) * 0.2);
    g.fillCircle(x + 8*S, y + S, 2*S);
    g.fillStyle(0xffff88);
    g.fillRect(x + 7*S, y, 2*S, 2*S);
  },

  // ── Crate ──
  crate(g, x, y) {
    g.fillStyle(0x8a6a3a);
    g.fillRect(x, y, 8*S, 8*S);
    g.fillStyle(0x9a7a4a);
    g.fillRect(x, y, 8*S, S);
    g.fillRect(x, y, S, 8*S);
    g.fillStyle(0x7a5a2a);
    g.fillRect(x + S, y + S, 6*S, 6*S);
    // Cross pattern
    g.fillStyle(0x6a4a1a);
    g.fillRect(x + 3*S, y, 2*S, 8*S);
    g.fillRect(x, y + 3*S, 8*S, 2*S);
    // Highlight
    g.fillStyle(0xaa8a5a, 0.3);
    g.fillRect(x + S, y + S, 2*S, 2*S);
  },

  // ── Metal Barrel ──
  barrel(g, x, y) {
    g.fillStyle(0x666677);
    g.fillRect(x + S, y, 6*S, 8*S);
    g.fillStyle(0x888899);
    g.fillRect(x + S, y, 6*S, S);
    // Bands
    g.fillStyle(0x444455);
    g.fillRect(x, y + 2*S, 8*S, S);
    g.fillRect(x, y + 5*S, 8*S, S);
    // Top rim
    g.fillStyle(0x777788);
    g.fillRect(x, y, 8*S, S);
    g.fillStyle(0x9999aa);
    g.fillRect(x + S, y, S, S);
  },

  // ── Barbed Wire ──
  barbedWire(g, x, y, w = 8*S) {
    // Posts
    g.fillStyle(0x664422);
    g.fillRect(x, y - 4*S, 2*S, 6*S);
    g.fillRect(x + w - 2*S, y - 4*S, 2*S, 6*S);
    // Wire strands
    g.fillStyle(0x888888);
    g.fillRect(x, y - 2*S, w, S);
    g.fillRect(x, y, w, S);
    // Barbs
    for (let wx = x + 2*S; wx < x + w - 2*S; wx += 4*S) {
      g.fillStyle(0x999999);
      g.fillRect(wx - S, y - 2*S, S, S);
      g.fillRect(wx, y + S, S, S);
    }
  },

  // ── Metal Platform ──
  metalPlatform(g, x, y, w = 8*S) {
    g.fillStyle(0x777788);
    g.fillRect(x, y, w, 3*S);
    g.fillStyle(0x9999aa);
    g.fillRect(x, y, w, S);
    // Rivets
    for (let rx = x + S; rx < x + w - S; rx += 4*S) {
      g.fillStyle(0x555566);
      g.fillCircle(rx, y + 2*S, 2);
    }
    // Edge highlight
    g.fillStyle(0xaaaabb);
    g.fillRect(x, y, w, 1);
  },

  // ── Wood Platform ──
  woodPlatform(g, x, y, w = 8*S) {
    g.fillStyle(0x8a6a3a);
    g.fillRect(x, y, w, 3*S);
    g.fillStyle(0x9a7a4a);
    g.fillRect(x, y, w, S);
    g.fillStyle(0x7a5a2a);
    g.fillRect(x, y + S, w, S);
    // Plank lines
    for (let px = x + 4*S; px < x + w; px += 4*S) {
      g.fillStyle(0x6a4a1a);
      g.fillRect(px, y, S / 2, 3*S);
    }
  },

  // ── Ladder ──
  ladder(g, x, y, h = 12*S) {
    // Rails
    g.fillStyle(0x886644);
    g.fillRect(x, y, S, h);
    g.fillRect(x + 4*S, y, S, h);
    // Rungs
    for (let ry = y + S; ry < y + h; ry += 3*S) {
      g.fillStyle(0x997755);
      g.fillRect(x, ry, 5*S, S);
    }
  },

  // ── Military Flag ──
  flag(g, x, y) {
    // Pole
    g.fillStyle(0x888888);
    g.fillRect(x + 7*S, y + 6*S, 2*S, 10*S);
    // Flag cloth
    g.fillStyle(0xcc3333);
    g.fillRect(x + 2*S, y + 4*S, 6*S, 4*S);
    g.fillStyle(0xdd4444);
    g.fillRect(x + 2*S, y + 4*S, 6*S, S);
    // Star
    g.fillStyle(0xffffff);
    g.fillRect(x + 4*S, y + 5*S, 2*S, 2*S);
    g.fillRect(x + 5*S, y + 4*S, 2*S, 2*S);
  },

  // ── Signal Flare ──
  flare(g, x, y, frame = 0) {
    const flicker = Math.floor(frame / 2) % 3;
    const colors = [0xff4444, 0xff8844, 0xff2222];
    const brights = [0xff8888, 0xffaa66, 0xff6666];
    // Glow
    g.fillStyle(0xff4400, 0.2);
    g.fillCircle(x, y, 8*S);
    // Body
    g.fillStyle(colors[flicker]);
    g.fillRect(x - 2*S, y - 3*S, 4*S, 6*S);
    g.fillStyle(brights[flicker]);
    g.fillRect(x - S, y - 3*S, 2*S, 6*S);
    // Smoke trail
    g.fillStyle(0x444444, 0.2);
    g.fillCircle(x, y + 6*S, 2*S);
    g.fillCircle(x - S, y + 10*S, 2*S);
    g.fillCircle(x + S, y + 14*S, 3*S);
  },

  // ── Military Jeep (wreck) ──
  jeepWreck(g, x, y) {
    // Body
    g.fillStyle(0x445533);
    g.fillRect(x + 2*S, y + 6*S, 14*S, 8*S);
    g.fillStyle(0x556644);
    g.fillRect(x + 2*S, y + 6*S, 14*S, S);
    g.fillStyle(0x334422);
    g.fillRect(x + S, y + 12*S, 16*S, 3*S);
    // Wheels
    g.fillStyle(0x222222);
    g.fillCircle(x + 6*S, y + 16*S, 3*S);
    g.fillCircle(x + 12*S, y + 16*S, 3*S);
    g.fillStyle(0x444444);
    g.fillCircle(x + 6*S, y + 16*S, S);
    g.fillCircle(x + 12*S, y + 16*S, S);
    // Damage
    g.fillStyle(0x222222);
    g.fillRect(x + 6*S, y + 8*S, 6*S, 2*S);
    g.fillStyle(0x444444);
    g.fillRect(x + 8*S, y + 7*S, 2*S, 3*S);
    // Fire/smoke
    g.fillStyle(0xff6600, 0.3);
    g.fillCircle(x + 10*S, y + 4*S, 3*S);
    g.fillStyle(0x444444, 0.2);
    g.fillCircle(x + 10*S, y + 2*S, 2*S);
  },
};

console.log('[StageRenderer] v1 — beach level props & environment');