// ─── Player "Razor" — Smooth Animation System ────────────
// 16x16 base @ S=3 | 6-frame run | 8-frame jump | 8-dir aim

var PlayerRenderer = {

  // ─── Shared body parts ───────────────────────────

  _hair(g, x, y, dy = 0) {
    g.fillStyle(0x0a1a3a);
    g.fillRect(x + 4*S, y + dy, 8*S, 2*S);
  },

  _head(g, x, y, dy = 0) {
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 2*S + dy, 8*S, 6*S);
    g.fillStyle(PALETTE.eye);
    g.fillRect(x + 5*S, y + 3*S + dy, 2*S, 2*S);
    g.fillRect(x + 9*S, y + 3*S + dy, 2*S, 2*S);
    g.fillStyle(0x111111);
    g.fillRect(x + 6*S, y + 3*S + dy, 1*S, 2*S);
    g.fillRect(x + 10*S, y + 3*S + dy, 1*S, 2*S);
  },

  _body(g, x, y, dy = 0, wide = 10) {
    const ox = (10 - wide) / 2;
    g.fillStyle(PALETTE.player);
    g.fillRect(x + (3+ox)*S, y + 8*S + dy, wide*S, 6*S);
    g.fillStyle(PALETTE.playerLt);
    g.fillRect(x + (5+ox)*S, y + 9*S + dy, (wide-4)*S, 1*S);
  },

  _legs(g, x, y, lOff = 0, rOff = 0, dy = 0) {
    g.fillStyle(PALETTE.player);
    g.fillRect(x + 4*S, y + 14*S + dy + lOff, 3*S, 2*S);
    g.fillRect(x + 9*S, y + 14*S + dy + rOff, 3*S, 2*S);
    g.fillStyle(PALETTE.boot);
    g.fillRect(x + 4*S, y + 15*S + dy + lOff, 4*S, 1*S);
    g.fillRect(x + 9*S, y + 15*S + dy + rOff, 4*S, 1*S);
  },

  _gunArm(g, x, y, dy = 0, extend = 0, up = 0) {
    g.fillStyle(PALETTE.gun);
    g.fillRect(x + (12+extend)*S, y + (8-up)*S + dy, (4+extend)*S, 3*S);
    g.fillStyle(PALETTE.gunLt);
    g.fillRect(x + (14+extend)*S, y + (8-up)*S + dy, (5+extend*2)*S, 2*S);
    g.fillStyle(0x444444);
    g.fillRect(x + (17+extend*2)*S, y + (8-up)*S + dy, 2*S, 1*S);
  },

  _muzzleFlash(g, x, y, dx = 19, dy = 8) {
    g.fillStyle(0xffffaa);
    g.fillRect(x + dx*S, y + dy*S, 2*S, 2*S);
    g.fillStyle(0xffffff);
    g.fillRect(x + (dx+1)*S, y + dy*S, 1*S, 1*S);
  },

  // ─── IDLE (2-frame breathing) ─────────────────────
  idle(g, x, y, frame = 0) {
    const breathe = Math.sin(frame * 0.08) * 1;
    this._hair(g, x);
    this._head(g, x, y, breathe);
    this._body(g, x, y, breathe);
    this._gunArm(g, x, y, breathe);
    this._legs(g, x, y, Math.floor(breathe), Math.floor(breathe));
  },

  // ─── RUN (6-frame smooth cycle) ───────────────────
  run(g, x, y, frame = 0) {
    const t = (frame % 6) / 6 * Math.PI * 2; // 0 to 2π
    const legL = Math.floor(Math.sin(t) * 2);
    const legR = Math.floor(Math.sin(t + Math.PI) * 2);
    const bodyY = Math.floor(Math.abs(Math.sin(t)) * 1);
    const tilt = Math.floor(Math.sin(t) * 1);

    this._hair(g, x, y, tilt);
    this._head(g, x, y, tilt);
    this._body(g, x, y, tilt + bodyY);
    this._gunArm(g, x, y, tilt);
    this._legs(g, x, y, legL, legR, tilt);
  },

  // ─── RUN + SHOOT (additive muzzle flash) ──────────
  runShoot(g, x, y, frame = 0) {
    this.run(g, x, y, frame);
    if (frame % 4 < 2) this._muzzleFlash(g, x, y);
  },

  // ─── JUMP — Cartoon Spinning Somersault (11-frame) ──
  jump(g, x, y, frame = 0) {
    // Slow: each anim frame lasts 5 game ticks → full cycle = 55 ticks
    const f = Math.floor(frame / 5) % 11;
    let bodyY;

    if (f === 0) {
      // Squat — anticipation
      bodyY = 2;
      this._hair(g, x, y, bodyY);
      this._head(g, x, y, bodyY);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 3*S, y + 8*S + bodyY, 10*S, 4*S);
      g.fillStyle(PALETTE.playerLt);
      g.fillRect(x + 5*S, y + 9*S + bodyY, 6*S, 1*S);
      this._gunArm(g, x, y, bodyY);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 4*S, y + 12*S + bodyY, 3*S, 3*S);
      g.fillRect(x + 9*S, y + 12*S + bodyY, 3*S, 3*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 14*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 14*S + bodyY, 4*S, 1*S);

    } else if (f === 1) {
      // Launch — body straight, arms forward
      bodyY = -1;
      this._hair(g, x, y, bodyY);
      this._head(g, x, y, bodyY);
      this._body(g, x, y, bodyY);
      this._gunArm(g, x, y, bodyY, 1, 0);
      this._legs(g, x, y, 0, 0, bodyY);

    } else if (f === 2) {
      // Curl start — knees coming up, body widening
      bodyY = -3;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 2*S, y + 8*S + bodyY, 12*S, 5*S);
      g.fillStyle(PALETTE.playerLt);
      g.fillRect(x + 4*S, y + 9*S + bodyY, 8*S, 1*S);
      this._hair(g, x, y, bodyY);
      this._head(g, x, y, bodyY);
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 11*S, y + 8*S + bodyY, 4*S, 3*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + 12*S, y + 8*S + bodyY, 5*S, 2*S);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 4*S, y + 11*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 11*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 12*S + bodyY, 4*S, 2*S);
      g.fillRect(x + 9*S, y + 12*S + bodyY, 4*S, 2*S);

    } else if (f === 3) {
      // Ball 45° — rotating, face top-left, boots tucking
      bodyY = -4;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 1*S, y + 7*S + bodyY, 14*S, 5*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 3*S, y + 7*S + bodyY, 4*S, 2*S);  // face left
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 9*S, y + 8*S + bodyY, 4*S, 2*S);  // gun center-right
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 8*S, y + 10*S + bodyY, 3*S, 2*S);  // boot bottom
      g.fillRect(x + 3*S, y + 10*S + bodyY, 3*S, 2*S);  // boot bottom

    } else if (f === 4) {
      // Ball 90° — face up, boots tucked at bottom
      bodyY = -5;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 1*S, y + 7*S + bodyY, 14*S, 5*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 5*S, 2*S);  // face on top
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 9*S, y + 8*S + bodyY, 4*S, 2*S);  // gun
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 3*S, y + 10*S + bodyY, 3*S, 2*S);  // boots at bottom
      g.fillRect(x + 10*S, y + 10*S + bodyY, 3*S, 2*S);

    } else if (f === 5) {
      // Ball 135° — face down-right, boots top-left
      bodyY = -5;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 1*S, y + 7*S + bodyY, 14*S, 5*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 8*S, y + 10*S + bodyY, 4*S, 2*S);  // face at bottom-right
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 2*S, y + 8*S + bodyY, 4*S, 2*S);  // gun left
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 3*S, 2*S);  // boots at top
      g.fillRect(x + 10*S, y + 7*S + bodyY, 3*S, 2*S);

    } else if (f === 6) {
      // Ball 180° — upside down, boots up, face down
      bodyY = -5;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 1*S, y + 7*S + bodyY, 14*S, 5*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 3*S, 2*S);  // boots at top!
      g.fillRect(x + 10*S, y + 7*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 9*S, y + 8*S + bodyY, 4*S, 2*S);  // gun
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 5*S, y + 10*S + bodyY, 5*S, 2*S);  // face at bottom

    } else if (f === 7) {
      // Ball 225° — continuing past upside down
      bodyY = -4;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 1*S, y + 7*S + bodyY, 14*S, 5*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 3*S, y + 7*S + bodyY, 3*S, 2*S);  // boots top-left
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 2*S, y + 9*S + bodyY, 4*S, 2*S);  // gun bottom-left
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 8*S, y + 8*S + bodyY, 4*S, 2*S);  // face right

    } else if (f === 8) {
      // Uncurl — head up, legs down
      bodyY = -3;
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 2*S, y + 8*S + bodyY, 12*S, 5*S);
      g.fillStyle(PALETTE.playerLt);
      g.fillRect(x + 4*S, y + 9*S + bodyY, 8*S, 1*S);
      this._hair(g, x, y, bodyY);
      this._head(g, x, y, bodyY);
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 11*S, y + 10*S + bodyY, 4*S, 3*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + 12*S, y + 10*S + bodyY, 5*S, 2*S);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 4*S, y + 12*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 12*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 2*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 2*S);

    } else if (f === 9) {
      // Extend — nearly normal
      bodyY = -1;
      this._hair(g, x, y, bodyY);
      this._head(g, x, y, bodyY);
      this._body(g, x, y, bodyY);
      this._gunArm(g, x, y, bodyY);
      this._legs(g, x, y, 0, 0, bodyY);

    } else {
      // Land — squat
      bodyY = 0;
      this._hair(g, x, y, bodyY);
      this._head(g, x, y, bodyY);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 3*S, y + 8*S + bodyY, 10*S, 4*S);
      g.fillStyle(PALETTE.playerLt);
      g.fillRect(x + 5*S, y + 9*S + bodyY, 6*S, 1*S);
      this._gunArm(g, x, y, bodyY);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 4*S, y + 12*S + bodyY, 3*S, 3*S);
      g.fillRect(x + 9*S, y + 12*S + bodyY, 3*S, 3*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 14*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 14*S + bodyY, 4*S, 1*S);
    }
  },

  // ─── JUMP + SHOOT (muzzle only on outward frames) ──
  jumpShoot(g, x, y, frame = 0) {
    this.jump(g, x, y, frame);
    const f = Math.floor(frame / 5) % 11;
    // Shoot only when gun faces outward: frame 1 (launch) or frame 9 (extend)
    if (f === 1 || f === 9) {
      this._muzzleFlash(g, x, y);
    }
  },

  // ─── AIM UP (8-directional, 0-7) ──────────────────
  aimUp(g, x, y, dir = 0, frame = 0) {
    const d = dir % 8;
    const breathe = Math.sin(frame * 0.06) * 0.5;

    // ── dir=2: ↑ straight up — two-handed overhead ──
    if (d === 2) {
      // Gun barrel above head
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + 6*S, y - 3*S, 4*S, 3*S);
      g.fillRect(x + 6*S, y + 0*S, 4*S, 2*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + 6*S, y - 2*S, 5*S, 2*S);
      // Arms — two hands reaching up
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 3*S, y + 0*S, 3*S, 3*S);
      g.fillRect(x + 10*S, y + 0*S, 3*S, 3*S);
      // Head between arms, looking up
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 2*S, 8*S, 5*S);
      g.fillStyle(PALETTE.eye);
      g.fillRect(x + 5*S, y + 2*S, 2*S, 1*S);
      g.fillRect(x + 9*S, y + 2*S, 2*S, 1*S);
      // Body
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 3*S, y + 6*S, 10*S, 7*S);
      g.fillStyle(PALETTE.playerLt);
      g.fillRect(x + 5*S, y + 7*S, 6*S, 1*S);
      // Hair
      g.fillStyle(0x0a1a3a);
      g.fillRect(x + 5*S, y + 1*S, 6*S, 2*S);
      // Legs
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 4*S, y + 13*S, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 13*S, 3*S, 2*S);
      g.fillStyle(PALETTE.boot);
      g.fillRect(x + 4*S, y + 14*S, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 14*S, 4*S, 1*S);
      return;
    }

    // ── Other directions — one-handed ──
    const aims = [
      { tilt: 0, gunUp: 0,  headDy: 0 },  // →  0
      { tilt: -1, gunUp: 2,  headDy: -1 }, // ↗  1
      { tilt: 0, gunUp: 0,  headDy: 0 },   // ↑  2 (unused, handled above)
      { tilt: -1, gunUp: 2,  headDy: -1 }, // ↖  3
      { tilt: 0, gunUp: 0,  headDy: 0 },   // ←  4
      { tilt: 1, gunUp: -1, headDy: 1 },   // ↙  5
      { tilt: 2, gunUp: -2, headDy: 2 },   // ↓  6
      { tilt: 1, gunUp: -1, headDy: 1 },   // ↘  7
    ];
    const a = aims[d];

    this._hair(g, x, y, a.headDy + breathe);
    this._head(g, x, y, a.headDy + breathe);
    this._body(g, x, y, a.tilt + breathe);

    if (d <= 1 || d === 7) {
      // Facing right: gun on right side
      this._gunArm(g, x, y, a.tilt + breathe, d === 1 ? 1 : 0, -a.gunUp);
    } else {
      // Facing left: mirror — draw gun on left side
      g.fillStyle(PALETTE.gun);
      g.fillRect(x + (d === 6 ? 5 : 4)*S, y + (8 - a.gunUp)*S + breathe, 4*S, 3*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + (d === 6 ? 4 : 1)*S, y + (8 - a.gunUp)*S + breathe, 5*S, 2*S);
      if (d === 6) {
        g.fillStyle(0x444444);
        g.fillRect(x + 3*S, y + (8 - a.gunUp)*S + breathe, 2*S, 1*S);
      }
    }
    this._legs(g, x, y, 0, 0, a.tilt + breathe);
  },

  // ─── AIM + SHOOT ──────────────────────────────────
  aimShoot(g, x, y, dir = 0, frame = 0) {
    this.aimUp(g, x, y, dir, frame);
    const d = dir % 8;
    let mx, my;
    if (d === 2) {
      // ↑ overhead muzzle
      mx = 8; my = -4;
    } else {
      const m = [
        { mx: 19, my: 8 }, { mx: 16, my: 4 }, { mx: 8, my: -4 }, { mx: 12, my: 4 },
        { mx: 6, my: 8 },  { mx: 8, my: 12 },  { mx: 10, my: 14 },{ mx: 14, my: 12 },
      ];
      const a = m[d];
      mx = a.mx; my = a.my;
    }
    if (frame % 4 < 2) this._muzzleFlash(g, x, y, mx, my);
  },

  // ─── CROUCH IDLE ──────────────────────────────────
  crouch(g, x, y) {
    // Head lowered
    g.fillStyle(0x0a1a3a);
    g.fillRect(x + 4*S, y + 4*S, 8*S, 2*S);
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 6*S, 8*S, 3*S);
    g.fillStyle(PALETTE.eye);
    g.fillRect(x + 5*S, y + 6*S, 2*S, 1*S);
    g.fillRect(x + 9*S, y + 6*S, 2*S, 1*S);
    // Compressed body
    g.fillStyle(PALETTE.player);
    g.fillRect(x + 3*S, y + 9*S, 10*S, 4*S);
    // Gun forward
    g.fillStyle(PALETTE.gunLt);
    g.fillRect(x + 13*S, y + 10*S, 6*S, 2*S);
    // Legs tucked
    g.fillStyle(PALETTE.player);
    g.fillRect(x + 4*S, y + 13*S, 3*S, 2*S);
    g.fillRect(x + 9*S, y + 13*S, 3*S, 2*S);
    g.fillStyle(PALETTE.boot);
    g.fillRect(x + 4*S, y + 14*S, 4*S, 1*S);
    g.fillRect(x + 9*S, y + 14*S, 4*S, 1*S);
  },

  // ─── CROUCH WALK (4-frame) ────────────────────────
  crouchWalk(g, x, y, frame = 0) {
    const legOff = Math.sin(frame * 0.5) * 1;
    this.crouch(g, x, y);
    // Leg shift
    g.fillStyle(PALETTE.player);
    g.fillRect(x + 4*S, y + 13*S + Math.floor(legOff), 3*S, 2*S);
    g.fillRect(x + 9*S, y + 13*S - Math.floor(legOff), 3*S, 2*S);
    g.fillStyle(PALETTE.boot);
    g.fillRect(x + 4*S, y + 14*S + Math.floor(legOff), 4*S, 1*S);
    g.fillRect(x + 9*S, y + 14*S - Math.floor(legOff), 4*S, 1*S);
  },

  // ─── CROUCH + SHOOT ───────────────────────────────
  crouchShoot(g, x, y, frame = 0) {
    this.crouch(g, x, y);
    if (frame % 4 < 2) {
      g.fillStyle(0xffffaa);
      g.fillRect(x + 19*S, y + 10*S, 2*S, 2*S);
      g.fillStyle(0xffffff);
      g.fillRect(x + 20*S, y + 11*S, 1*S, 1*S);
    }
  },

  // ─── INVULNERABILITY (blink) ──────────────────────
  invuln(g, x, y, time = 0, frame = 0) {
    if (Math.floor(time / 80) % 2 === 0) return;
    this.idle(g, x, y, frame);
  },

  // ─── DAMAGED (red flash overlay) ──────────────────
  damaged(g, x, y, time = 0) {
    if (Math.floor(time / 50) % 2 === 0) return;
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 2*S, 8*S, 6*S);
    g.fillStyle(0xff4444);
    g.fillRect(x + 5*S, y + 3*S, 2*S, 2*S);
    g.fillRect(x + 9*S, y + 3*S, 2*S, 2*S);
    g.fillStyle(PALETTE.player);
    g.fillRect(x + 3*S, y + 8*S, 10*S, 6*S);
    g.fillStyle(PALETTE.gun);
    g.fillRect(x + 12*S, y + 8*S, 4*S, 3*S);
  },

  // ─── DEATH (3-frame) ──────────────────────────────
  death(g, x, y, frame = 0) {
    if (frame === 0) {
      // Hit stun — lean back
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 5*S, y + 0*S, 6*S, 4*S);
      g.fillStyle(0xcc2222);
      g.fillRect(x + 5*S, y + 0*S, 6*S, 1*S);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 3*S, y + 3*S, 8*S, 4*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + 10*S, y + 5*S, 4*S, 2*S);
      g.fillStyle(0xcc2222);
      g.fillRect(x + 5*S, y + 2*S, 2*S, 1*S);
      g.fillRect(x + 5*S, y + 2*S, 2*S, 1*S);
    } else if (frame === 1) {
      // Fly back
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 6*S, y + 2*S, 6*S, 4*S);
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 4*S, y + 5*S, 8*S, 4*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + 2*S, y + 7*S, 4*S, 2*S);
    } else {
      // Land on ground
      g.fillStyle(PALETTE.player);
      g.fillRect(x + 2*S, y + 8*S, 10*S, 4*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 6*S, 6*S, 3*S);
      g.fillStyle(PALETTE.gunLt);
      g.fillRect(x + 8*S, y + 10*S, 4*S, 2*S);
      g.fillStyle(0xcc2222);
      g.fillRect(x + 5*S, y + 6*S, 1*S, 1*S);
      g.fillRect(x + 9*S, y + 6*S, 1*S, 1*S);
    }
  },
};

console.log('[PlayerRenderer] v4 loaded — 11-frame spinning somersault + overhead aim ↑');
