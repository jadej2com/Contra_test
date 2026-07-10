// ─── Bullet / Projectile Renderers ────────────
// All bullets at S=3 scale unless noted

var BulletRenderer = {

  // ── Default bullet (basic gun) ──
  // White 2x2 dot
  defaultBullet(g, x, y, frame = 0) {
    g.fillStyle(0xffffff);
    g.fillRect(x, y, 2*S, 2*S);
    g.fillStyle(0xeeeeee);
    g.fillRect(x + S, y, S, 2*S);
    // Glow
    g.fillStyle(0xffffff, 0.15);
    g.fillCircle(x + S, y + S, 3*S);
  },

  // ── Spread Gun bullet ──
  // Yellow 4x4, 3 in fan
  spreadBullet(g, x, y, frame = 0, fanIndex = 0) {
    const gap = fanIndex - 1;
    const yy = y + gap * S;
    g.fillStyle(0xffdd00);
    g.fillRect(x, yy, 4*S, 4*S);
    // Highlight
    g.fillStyle(0xffee44);
    g.fillRect(x, yy, 4*S, S);
    g.fillRect(x, yy, S, 4*S);
    // Core glow
    g.fillStyle(0xffff88, 0.3);
    g.fillCircle(x + 2*S, yy + 2*S, 4*S);
    // Particles trailing
    g.fillStyle(0xffcc00, 0.3);
    g.fillRect(x - S, yy + S, S, 2*S);
    g.fillRect(x - 2*S, yy + 2*S, S, S);
  },

  // ── Machine Gun bullet ──
  // White 2x4 streak
  machineGunBullet(g, x, y, frame = 0) {
    g.fillStyle(0xffffff);
    g.fillRect(x, y, 2*S, 4*S);
    // Bright tip
    g.fillStyle(0xffffff);
    g.fillRect(x + S, y, S, S);
    // Trail
    g.fillStyle(0xcccccc, 0.6);
    g.fillRect(x - S, y + S, S, 2*S);
    g.fillStyle(0xaaaaaa, 0.3);
    g.fillRect(x - 2*S, y + 2*S, S, S);
    // Speed glow
    g.fillStyle(0xffffff, 0.1);
    g.fillCircle(x, y + 2*S, 4*S);
  },

  // ── Laser beam ──
  // Red line 2px tall, variable length
  laserBeam(g, x, y, length = 16*S, frame = 0) {
    const len = length;
    const pulse = Math.sin(frame * 0.15) * 0.3 + 0.7;
    // Outer glow
    g.fillStyle(0xff2222, 0.08 * pulse);
    g.fillRect(x, y - S, len, 4*S);
    // Main beam
    g.fillStyle(0xff4444, 0.5 * pulse);
    g.fillRect(x, y, len, 2*S);
    // Bright core
    g.fillStyle(0xff8888, 0.7 * pulse);
    g.fillRect(x, y + Math.floor(S/2), len, S);
    // White center line
    g.fillStyle(0xffffff, 0.6 * pulse);
    g.fillRect(x, y + S, len, S);
    // Origin flash
    g.fillStyle(0xffffff, 0.4 * pulse);
    g.fillCircle(x, y + S, 2*S);
    g.fillStyle(0xff8844, 0.3 * pulse);
    g.fillCircle(x, y + S, 4*S);
    // End cap
    g.fillStyle(0xffffff, 0.3 * pulse);
    g.fillCircle(x + len, y + S, S);
  },

  // ── Marksman bullet (enemy) ──
  // Red 3x3
  marksmanBullet(g, x, y, frame = 0) {
    g.fillStyle(0xff4444);
    g.fillRect(x, y, 3*S, 3*S);
    g.fillStyle(0xff8888);
    g.fillRect(x, y, 3*S, S);
    g.fillRect(x, y, S, 3*S);
    g.fillStyle(0xffcc44, 0.2);
    g.fillCircle(x + S, y + S, 3*S);
  },

  // ── Turret bullet ──
  // Orange 3x3 with trail
  turretBullet(g, x, y, frame = 0) {
    g.fillStyle(0xff8800);
    g.fillRect(x, y, 3*S, 3*S);
    g.fillStyle(0xffaa44);
    g.fillRect(x, y, 3*S, S);
    g.fillRect(x, y, S, 3*S);
    // Trail
    g.fillStyle(0xff6600, 0.3);
    g.fillRect(x - S, y + S, S, S);
    g.fillStyle(0xffffff, 0.15);
    g.fillCircle(x + S, y + S, 2*S);
  },

  // ── Walker cannon ball ──
  // Dark gray 6x6
  walkerCannonBall(g, x, y, frame = 0) {
    g.fillStyle(0x666666);
    g.fillRect(x, y, 6*S, 6*S);
    g.fillStyle(0x888888);
    g.fillRect(x, y, 6*S, S);
    g.fillRect(x, y, S, 6*S);
    g.fillStyle(0x444444);
    g.fillRect(x + S, y + S, 4*S, 4*S);
    // Glow
    g.fillStyle(0xff8844, 0.15);
    g.fillCircle(x + 3*S, y + 3*S, 5*S);
    // Muzzle trail
    g.fillStyle(0x888888, 0.2);
    g.fillRect(x - S, y + S, S, 4*S);
    g.fillRect(x - 2*S, y + 2*S, S, 2*S);
  },

  // ── Walker spread shot ──
  // Small orange 2x2
  walkerSpreadShot(g, x, y, frame = 0) {
    g.fillStyle(0xff6633);
    g.fillRect(x, y, 2*S, 2*S);
    g.fillStyle(0xffaa66);
    g.fillRect(x, y, 2*S, S);
    g.fillStyle(0xffffff, 0.2);
    g.fillCircle(x + S, y + S, 2*S);
  },

  // ── Bomb projectile (in flight) ──
  // Dark round bomb with lit fuse, moving in arc
  bombThrow(g, x, y, frame) {
    // Bomb body
    g.fillStyle(0x333333);
    g.fillRect(x, y, 4*S, 4*S);
    g.fillStyle(0x555555);
    g.fillRect(x, y, 4*S, S);
    g.fillRect(x, y, S, 4*S);
    // Fuse
    g.fillStyle(0x886644);
    g.fillRect(x + S, y - 2*S, S, 2*S);
    // Spark
    const spark = Math.floor(frame / 3) % 2;
    g.fillStyle(spark ? 0xffaa00 : 0xffff44);
    g.fillRect(x + S, y - 3*S, S, S);
    // Spark trail
    g.fillStyle(0xff6600, 0.3);
    g.fillCircle(x + S, y - 3*S, S);
  },

  // ── Bomb explosion (expanding circles) ──
  bombExplosion(g, x, y, frame) {
    const ef = frame;
    const r = 2 + ef * 2;
    g.fillStyle(0xffff88, 0.6 - ef * 0.05);
    g.fillCircle(x, y, r * S);
    g.fillStyle(0xff8800, 0.45 - ef * 0.04);
    g.fillCircle(x, y, (r - 1) * S);
    g.fillStyle(0xffffff, 0.3 - ef * 0.025);
    g.fillCircle(x, y, (r - 2) * S);
    // Debris
    if (ef < 6) {
      g.fillStyle(0xff6600);
      g.fillRect(x - ef * S, y - ef * S, S, S);
      g.fillRect(x + ef * S, y + ef * S, S, S);
      g.fillRect(x + ef * S, y - ef * S, S, S);
      g.fillRect(x - ef * S, y + ef * S, S, S);
    }
  },

  // ── Shield bubble effect ──
  shieldBubble(g, x, y, frame, radius = 6*S) {
    const pulse = Math.sin(frame * 0.08) * 0.2 + 0.8;
    const r = radius * pulse;
    // Outer glow
    g.fillStyle(0x4488ff, 0.06 * pulse);
    g.fillCircle(x, y, r + 2*S);
    // Main bubble
    g.fillStyle(0x4488ff, 0.12 * pulse);
    g.fillCircle(x, y, r);
    // Inner glow
    g.fillStyle(0x88ccff, 0.08 * pulse);
    g.fillCircle(x, y, r * 0.6);
    // Shimmer lines
    const sh = Math.floor(frame / 10) % 4;
    g.fillStyle(0xaaddff, 0.1 * pulse);
    g.fillRect(x - r + sh * S, y - S, S, 2*S);
    g.fillRect(x - S, y - r + sh * S, 2*S, S);
  },
};

console.log('[BulletRenderer] v2 — bomb throw/explosion + shield bubble');