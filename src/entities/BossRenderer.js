// ─── Boss Renderers — Redesigned Visuals ────────────
// Mini-Boss: 16x16 @ S=3 | Boss: 32x32 @ BS=2

var BossRenderer = {

  // ═══════════════════════════════════════════════════════
  // Mini-Boss: Static Turret — REDESIGNED
  // ═══════════════════════════════════════════════════════

  _turretBase(g, x, y, dy = 0) {
    g.fillStyle(0x3a3a44);
    g.fillRect(x + 1*S, y + 9*S + dy, 14*S, 7*S);
    g.fillStyle(0x555566);
    g.fillRect(x + 1*S, y + 10*S + dy, 14*S, 5*S);
    g.fillStyle(0x6a6a7a);
    g.fillRect(x + 2*S, y + 9*S + dy, 12*S, 1*S);
    g.fillRect(x + 1*S, y + 9*S + dy, 2*S, 1*S);
    g.fillRect(x + 13*S, y + 9*S + dy, 2*S, 1*S);
  },

  _turretJoint(g, x, y, dy = 0) {
    g.fillStyle(0x555566);
    g.fillRect(x + 5*S, y + 7*S + dy, 6*S, 3*S);
    g.fillStyle(0x777788);
    g.fillRect(x + 5*S, y + 7*S + dy, 6*S, 1*S);
    // Joint highlight
    g.fillStyle(0x888899);
    g.fillRect(x + 7*S, y + 8*S + dy, 2*S, 1*S);
    // Joint pivot
    g.fillStyle(0x444455);
    g.fillCircle(x + 8*S, y + 8*S + dy, 1*S);
  },

  _turretGunBody(g, x, y, dy = 0) {
    // Main gun housing
    g.fillStyle(0x666677);
    g.fillRect(x + 2*S, y + 2*S + dy, 12*S, 6*S);
    g.fillStyle(0x888899);
    g.fillRect(x + 2*S, y + 2*S + dy, 1*S, 6*S);
    g.fillRect(x + 2*S, y + 2*S + dy, 12*S, 1*S);
    g.fillStyle(0x555566);
    g.fillRect(x + 13*S, y + 2*S + dy, 1*S, 6*S);
    g.fillRect(x + 2*S, y + 7*S + dy, 12*S, 1*S);
    // Panel line
    g.fillStyle(0x444455);
    g.fillRect(x + 7*S, y + 2*S + dy, 1*S, 6*S);
    // Vents
    g.fillStyle(0x3a3a44);
    g.fillRect(x + 3*S, y + 4*S + dy, 2*S, 1*S);
    g.fillRect(x + 11*S, y + 4*S + dy, 2*S, 1*S);
  },

  _turretBarrels(g, x, y, dy = 0, recoil = 0) {
    const r = recoil * S;
    // Barrel block — three barrels
    g.fillStyle(0x777788);
    g.fillRect(x + 13*S - r, y + 2*S + dy, 3*S, 6*S);
    // Barrel highlights
    g.fillStyle(0x9999aa);
    g.fillRect(x + 13*S - r, y + 2*S + dy, 1*S, 6*S);
    // Barrel tips (the holes)
    g.fillStyle(0x222222);
    g.fillRect(x + 15*S - r, y + 3*S + dy, 1*S, 1*S);
    g.fillRect(x + 15*S - r, y + 5*S + dy, 1*S, 1*S);
    g.fillRect(x + 15*S - r, y + 7*S + dy, 1*S, 1*S);
    // Barrel rims
    g.fillStyle(0x444455);
    g.fillRect(x + 14*S - r, y + 3*S + dy, 1*S, 1*S);
    g.fillRect(x + 14*S - r, y + 5*S + dy, 1*S, 1*S);
    g.fillRect(x + 14*S - r, y + 7*S + dy, 1*S, 1*S);
  },

  staticTurret(g, x, y, frame = 0) {
    const ledCycle = frame % 50;
    let ledOn = false, ledGlow = false;
    let firing = false, burstFrame = 0;
    let recoil = 0;

    if (ledCycle < 16) {
      ledOn = true; ledGlow = true;
    } else if (ledCycle < 26) {
      ledOn = false;
    } else if (ledCycle < 31) {
      ledOn = (ledCycle % 2 === 0); ledGlow = ledOn;
    } else if (ledCycle < 36) {
      ledOn = (ledCycle % 2 === 0); ledGlow = ledOn;
    } else if (ledCycle < 41) {
      ledOn = (ledCycle % 2 === 0); ledGlow = ledOn;
    } else if (ledCycle < 44) {
      ledOn = true; ledGlow = true;
      firing = true; burstFrame = ledCycle - 41; recoil = 1;
    } else {
      ledOn = (ledCycle % 4 === 0);
    }

    this._turretBase(g, x, y);
    this._turretJoint(g, x, y);

    // Muzzle flash behind barrels when firing
    if (firing) {
      g.fillStyle(0xffff88);
      g.fillRect(x + 16*S, y + 3*S, 2*S, 2*S);
      g.fillRect(x + 16*S, y + 5*S, 2*S, 2*S);
      g.fillRect(x + 16*S, y + 7*S, 2*S, 2*S);
      if (burstFrame === 1) {
        g.fillStyle(0xffffff);
        g.fillRect(x + 17*S, y + 4*S, 2*S, 1*S);
        g.fillRect(x + 17*S, y + 6*S, 2*S, 1*S);
      }
      // Flash glow
      g.fillStyle(0xffcc44, 0.3);
      g.fillCircle(x + 17*S, y + 5*S, 4*S);
    }

    this._turretBarrels(g, x, y, 0, recoil);
    this._turretGunBody(g, x, y);

    // LED — prominent on top
    const ledY = y + 1*S;
    if (ledGlow) {
      g.fillStyle(0xffcc44, 0.25);
      g.fillCircle(x + 8*S, ledY + S, 4*S);
    }
    g.fillStyle(ledOn ? 0xff2222 : 0x440000);
    g.fillRect(x + 6*S, ledY, 4*S, 2*S);
    g.fillStyle(ledOn ? 0xff6666 : 0x220000);
    g.fillRect(x + 7*S, ledY, 2*S, 1*S);
    if (ledOn) {
      g.fillStyle(0xffff88);
      g.fillRect(x + 7*S, ledY, 1*S, 1*S);
    }
  },

  // ── Turret aim tracking ──
  staticTurretAim(g, x, y, frame = 0, playerX = 400, playerY = 300) {
    const dx = playerX - (x + 8*S);
    const dy = playerY - (y + 8*S);
    const angle = Math.atan2(dy, dx);
    const aimY = Math.floor(Math.sin(angle) * 2);

    this._turretBase(g, x, y);
    this._turretJoint(g, x, y);

    // Gun body tilted
    g.fillStyle(0x666677);
    g.fillRect(x + 2*S, y + 2*S + aimY, 12*S, 6*S);
    g.fillStyle(0x888899);
    g.fillRect(x + 2*S, y + 2*S + aimY, 1*S, 6*S);
    g.fillRect(x + 2*S, y + 2*S + aimY, 12*S, 1*S);

    // Barrels following aim
    const recoil = 0;
    this._turretBarrels(g, x, y, aimY, recoil);

    // LED blink during aim
    const ledOn = Math.floor(frame / 15) % 2 === 0;
    g.fillStyle(ledOn ? 0xff2222 : 0x440000);
    g.fillRect(x + 6*S, y + 1*S + aimY, 4*S, 2*S);
    g.fillStyle(ledOn ? 0xffff88 : 0x220000);
    g.fillRect(x + 7*S, y + 1*S + aimY, 1*S, 1*S);

    // Targeting laser
    if (ledOn) {
      g.fillStyle(0xff0000, 0.2);
      g.fillRect(x + 16*S, y + 5*S + aimY, 12*S, 1*S);
    }
  },

  staticTurretDestroyed(g, x, y) {
    // Base broken
    g.fillStyle(0x3a3a44);
    g.fillRect(x + 2*S, y + 10*S, 12*S, 5*S);
    g.fillStyle(0x222233);
    g.fillRect(x + 3*S, y + 10*S, 10*S, 1*S);
    // Crack
    g.fillStyle(0x222222);
    g.fillRect(x + 7*S, y + 10*S, 1*S, 5*S);

    // Gun body fallen
    g.fillStyle(0x555566);
    g.fillRect(x + 5*S, y + 5*S, 8*S, 4*S);
    g.fillStyle(0x666677);
    g.fillRect(x + 5*S, y + 5*S, 1*S, 4*S);
    // Barrels detached
    g.fillStyle(0x777788);
    g.fillRect(x + 2*S, y + 6*S, 3*S, 2*S);
    g.fillRect(x + 10*S, y + 7*S, 5*S, 2*S);

    // Sparks
    g.fillStyle(0xffaa00);
    g.fillRect(x + 4*S, y + 6*S, 1*S, 2*S);
    g.fillRect(x + 12*S, y + 4*S, 2*S, 1*S);
    g.fillStyle(0xffff44);
    g.fillRect(x + 6*S, y + 5*S, 1*S, 1*S);
    g.fillRect(x + 13*S, y + 8*S, 1*S, 1*S);
    // Smoke
    g.fillStyle(0x444444, 0.4);
    g.fillCircle(x + 7*S, y + 3*S, 3*S);
    g.fillCircle(x + 9*S, y + 2*S, 2*S);
  },

  // ═══════════════════════════════════════════════════════
  // Boss: Armored Walker — REDESIGNED
  // ═══════════════════════════════════════════════════════

  _wLeg(g, x, y, side, lOff = 0, color = 0x666666) {
    // side: -1 (left) or 1 (right)
    const dir = side;
    const cx = (side < 0) ? 5 : 27;
    const kneeX = (side < 0) ? 2 : 30;
    g.fillStyle(color);
    // Thigh
    g.fillRect(x + (cx-2)*BS, y + 20*BS + lOff, 4*BS, 6*BS);
    // Shin
    g.fillStyle(side < 0 ? color : 0x555555);
    g.fillRect(x + (cx-2)*BS, y + 26*BS + lOff, 4*BS, 6*BS);
    g.fillStyle(0x444444);
    g.fillRect(x + (cx-3)*BS, y + 30*BS + lOff, 6*BS, 2*BS);
    // Joint highlight
    g.fillStyle(0x888899);
    g.fillCircle(x + cx*BS, y + 25*BS + lOff, 2*BS);
    g.fillCircle(x + cx*BS, y + 25*BS + lOff, 1*BS);
    // Hydraulic detail
    g.fillStyle(0x555566);
    g.fillRect(x + (side < 0 ? kneeX - 1 : kneeX)*BS, y + 21*BS + lOff, 1*BS, 5*BS);
  },

  _wBody(g, x, y, dy = 0, color = 0x8B4513) {
    // Main torso
    g.fillStyle(color);
    g.fillRect(x + 4*BS, y + 10*BS + dy, 24*BS, 14*BS);
    g.fillStyle(PALETTE.bossDark);
    g.fillRect(x + 4*BS, y + 10*BS + dy, 24*BS, 1*BS);
    g.fillRect(x + 4*BS, y + 10*BS + dy, 1*BS, 14*BS);
    g.fillRect(x + 27*BS, y + 10*BS + dy, 1*BS, 14*BS);
    // Chest plate
    g.fillStyle(0x7a3a1a);
    g.fillRect(x + 7*BS, y + 12*BS + dy, 18*BS, 5*BS);
    g.fillStyle(0x9a5a3a);
    g.fillRect(x + 7*BS, y + 12*BS + dy, 1*BS, 5*BS);
    g.fillRect(x + 7*BS, y + 12*BS + dy, 18*BS, 1*BS);
    // Belt/waist
    g.fillStyle(0x333333);
    g.fillRect(x + 5*BS, y + 22*BS + dy, 22*BS, 2*BS);
    // Rivets on chest
    g.fillStyle(0x444444);
    g.fillRect(x + 8*BS, y + 14*BS + dy, 1*BS, 1*BS);
    g.fillRect(x + 23*BS, y + 14*BS + dy, 1*BS, 1*BS);
    g.fillRect(x + 15*BS, y + 14*BS + dy, 2*BS, 1*BS);
  },

  _wHead(g, x, y, dy = 0, cracked = false) {
    g.fillStyle(PALETTE.bossDark);
    g.fillRect(x + 9*BS, y + 3*BS + dy, 14*BS, 8*BS);
    g.fillStyle(0x555555);
    g.fillRect(x + 9*BS, y + 3*BS + dy, 14*BS, 1*BS);
    // Cockpit window
    g.fillStyle(PALETTE.bossCock);
    g.fillRect(x + 11*BS, y + 5*BS + dy, 10*BS, 5*BS);
    g.fillStyle(0xffaa55, 0.5);
    g.fillRect(x + 11*BS, y + 5*BS + dy, 10*BS, 1*BS);
    // Window glow
    g.fillStyle(0xffdd88, 0.3);
    g.fillRect(x + 12*BS, y + 6*BS + dy, 3*BS, 2*BS);
    // Antenna
    g.fillStyle(0x666666);
    g.fillRect(x + 15*BS, y + 1*BS + dy, 2*BS, 3*BS);
    g.fillStyle(0xff4444);
    g.fillRect(x + 15*BS, y + 0*BS + dy, 2*BS, 1*BS);
    // Side armor
    g.fillStyle(PALETTE.bossDark);
    g.fillRect(x + 6*BS, y + 4*BS + dy, 4*BS, 5*BS);
    g.fillRect(x + 22*BS, y + 4*BS + dy, 4*BS, 5*BS);
    g.fillStyle(0x555555);
    g.fillRect(x + 6*BS, y + 4*BS + dy, 4*BS, 1*BS);
    g.fillRect(x + 22*BS, y + 4*BS + dy, 4*BS, 1*BS);
    if (cracked) {
      g.fillStyle(0x111111);
      g.fillRect(x + 14*BS, y + 5*BS + dy, 1*BS, 5*BS);
      g.fillRect(x + 12*BS, y + 6*BS + dy, 4*BS, 1*BS);
      g.fillRect(x + 13*BS, y + 8*BS + dy, 2*BS, 1*BS);
    }
  },

  _wExhaust(g, x, y, dy = 0, puff = 0, color = 0x888888) {
    g.fillStyle(0x333333);
    g.fillRect(x + 4*BS, y + 19*BS + dy, 3*BS, 3*BS);
    g.fillRect(x + 25*BS, y + 19*BS + dy, 3*BS, 3*BS);
    g.fillStyle(0x555555);
    g.fillRect(x + 4*BS, y + 19*BS + dy, 3*BS, 1*BS);
    g.fillRect(x + 25*BS, y + 19*BS + dy, 3*BS, 1*BS);
    // Smoke puff
    const off = puff % 40;
    if (off < 20) {
      g.fillStyle(color, 0.25 - off * 0.01);
      g.fillCircle(x + 5*BS, y + 16*BS + dy - Math.floor(off / 4), Math.floor(2 + off / 10));
      g.fillCircle(x + 26*BS, y + 16*BS + dy - Math.floor(off / 4), Math.floor(2 + off / 10));
    }
  },

  _wCannon(g, x, y, dy = 0, color = 0x555555, firing = false) {
    g.fillStyle(color);
    g.fillRect(x + 5*BS, y + 15*BS + dy, 8*BS, 4*BS);
    g.fillStyle(0x777777);
    g.fillRect(x + 5*BS, y + 15*BS + dy, 8*BS, 1*BS);
    g.fillRect(x + 5*BS, y + 15*BS + dy, 1*BS, 4*BS);
    // Barrel
    g.fillStyle(0x444444);
    g.fillRect(x + 2*BS, y + 16*BS + dy, 4*BS, 2*BS);
    g.fillStyle(0x666666);
    g.fillRect(x + 2*BS, y + 16*BS + dy, 1*BS, 2*BS);
    if (firing) {
      g.fillStyle(0xff8844);
      g.fillRect(x + 0*BS, y + 16*BS + dy, 2*BS, 2*BS);
      g.fillStyle(0xffcc44, 0.4);
      g.fillCircle(x + 0*BS, y + 17*BS + dy, 3*BS);
    }
  },

  _wCore(g, x, y, dy = 0, pulseVal = 0) {
    const p = pulseVal;
    g.fillStyle(PALETTE.bossCore);
    g.fillRect(x + 12*BS, y + 11*BS + dy, 8*BS, 6*BS);
    // Inner glow
    g.fillStyle(0xff4444, 0.5 + p * 0.3);
    g.fillRect(x + 13*BS, y + 12*BS + dy, 6*BS, 4*BS);
    // Bright center
    g.fillStyle(0xff8888, 0.6 + p * 0.4);
    g.fillRect(x + 14*BS, y + 13*BS + dy, 4*BS, 2*BS);
    g.fillStyle(0xffffff, 0.5 + p * 0.5);
    g.fillRect(x + 15*BS, y + 13*BS + dy, 2*BS, 2*BS);
    // Energy lines
    g.fillStyle(0xff6666, 0.3 + p * 0.2);
    g.fillRect(x + 11*BS, y + 12*BS + dy, 1*BS, 4*BS);
    g.fillRect(x + 20*BS, y + 12*BS + dy, 1*BS, 4*BS);
    g.fillRect(x + 12*BS, y + 10*BS + dy, 8*BS, 1*BS);
    g.fillRect(x + 12*BS, y + 17*BS + dy, 8*BS, 1*BS);
    // Glow aura
    g.fillStyle(0xff2222, 0.08 + p * 0.05);
    g.fillCircle(x + 16*BS, y + 14*BS + dy, 8*BS);
  },

  // ── Phase 1 ──
  armoredWalkerPhase1(g, x, y, frame = 0) {
    const walkPhase = frame % 12;
    let lOff = 0, rOff = 0, bodyDy = 0;

    if (walkPhase < 3) {
      lOff = 0; rOff = -walkPhase; bodyDy = -1;
    } else if (walkPhase < 6) {
      lOff = 0; rOff = 0; bodyDy = 0;
    } else if (walkPhase < 9) {
      lOff = -(walkPhase - 6); rOff = 0; bodyDy = -1;
    } else {
      lOff = 0; rOff = 0; bodyDy = 0;
    }

    this._wLeg(g, x, y, -1, Math.floor(lOff));
    this._wLeg(g, x, y, 1, Math.floor(rOff));
    this._wBody(g, x, y, bodyDy);
    this._wHead(g, x, y, bodyDy);

    // Stripes (warning decals)
    for (let i = 0; i < 3; i++) {
      const sy = y + 13*BS + bodyDy + i * 4*BS;
      g.fillStyle(PALETTE.bossWarn);
      g.fillRect(x + 4*BS, sy, 3*BS, 2*BS);
      g.fillStyle(0x222222);
      g.fillRect(x + 7*BS, sy, 2*BS, 2*BS);
      g.fillStyle(PALETTE.bossWarn);
      g.fillRect(x + 9*BS, sy, 3*BS, 2*BS);
      g.fillStyle(0x222222);
      g.fillRect(x + 12*BS, sy, 2*BS, 2*BS);
      g.fillStyle(PALETTE.bossWarn);
      g.fillRect(x + 14*BS, sy, 3*BS, 2*BS);
      g.fillStyle(0x222222);
      g.fillRect(x + 17*BS, sy, 2*BS, 2*BS);
      g.fillStyle(PALETTE.bossWarn);
      g.fillRect(x + 19*BS, sy, 3*BS, 2*BS);
      g.fillStyle(0x222222);
      g.fillRect(x + 22*BS, sy, 2*BS, 2*BS);
      g.fillStyle(PALETTE.bossWarn);
      g.fillRect(x + 24*BS, sy, 3*BS, 2*BS);
    }

    // Cannon + pulse
    const canFire = frame % 40 < 5;
    this._wCannon(g, x, y, bodyDy, 0x555555, canFire);

    // Exhaust
    const puff = frame + (walkPhase < 6 ? 2 : 8);
    this._wExhaust(g, x, y, bodyDy, puff);
  },

  // ── Phase 2 (enraged) ──
  armoredWalkerPhase2(g, x, y, frame = 0) {
    const walkPhase = frame % 18;
    let lOff = 0, rOff = 0, bodyDy = 0;

    if (walkPhase < 4) {
      lOff = 0; rOff = -Math.floor(walkPhase / 2); bodyDy = -1;
    } else if (walkPhase < 9) {
      lOff = 0; rOff = 0; bodyDy = 0;
    } else if (walkPhase < 13) {
      lOff = -Math.floor((walkPhase - 9) / 2); rOff = 0; bodyDy = -1;
    } else {
      lOff = 0; rOff = 0; bodyDy = 0;
    }

    // Damaged legs
    this._wLeg(g, x, y, -1, Math.floor(lOff), 0x555555);
    this._wLeg(g, x, y, 1, Math.floor(rOff), 0x444444);

    // Leg sparks
    if (frame % 20 < 5) {
      g.fillStyle(0xffaa00);
      g.fillRect(x + 5*BS, y + 26*BS + rOff, 2*BS, 1*BS);
      g.fillRect(x + 27*BS, y + 27*BS + lOff, 1*BS, 2*BS);
    }

    // Damaged body
    this._wBody(g, x, y, bodyDy, PALETTE.bossBody);
    // Armor break = core exposed
    g.fillStyle(0x111111);
    g.fillRect(x + 10*BS, y + 10*BS + bodyDy, 12*BS, 8*BS);
    g.fillStyle(0x222222);
    g.fillRect(x + 10*BS, y + 10*BS + bodyDy, 12*BS, 1*BS);

    // Core pulsing
    const pulse = Math.sin(frame * 0.06) * 0.5 + 0.5;
    this._wCore(g, x, y, bodyDy, pulse);

    // Head cracked
    this._wHead(g, x, y, bodyDy, true);
    if (frame % 15 < 4) {
      g.fillStyle(0xffff44);
      g.fillRect(x + 18*BS, y + 2*BS + bodyDy, 1*BS, 2*BS);
      g.fillRect(x + 12*BS, y + 2*BS + bodyDy, 2*BS, 1*BS);
    }

    // Spread cannon
    g.fillStyle(0x555555);
    g.fillRect(x + 5*BS, y + 16*BS + bodyDy, 8*BS, 3*BS);
    g.fillStyle(0x444444);
    g.fillRect(x + 2*BS, y + 16*BS + bodyDy, 3*BS, 1*BS);
    g.fillRect(x + 2*BS, y + 18*BS + bodyDy, 3*BS, 1*BS);
    g.fillStyle(PALETTE.ledRed);
    g.fillRect(x + 2*BS, y + 17*BS + bodyDy, 2*BS, 1*BS);

    // Heavy exhaust
    this._wExhaust(g, x, y, bodyDy, frame * 2, 0x666666);
  },

  // ── Jump Attack (Phase 2) ──
  walkerJumpAttack(g, x, y, frame = 0) {
    const f = frame % 8;
    let bodyY = 0, legOff = 0;

    if (f < 2) {
      bodyY = 2; legOff = 4;
    } else if (f < 4) {
      const p = (f - 2) / 2;
      bodyY = -Math.floor(p * 5);
      legOff = Math.floor(4 - p * 4);
    } else if (f < 6) {
      bodyY = -5 + Math.floor((f - 4) * 0.5);
      legOff = 0;
    } else {
      const p = (f - 6) / 2;
      bodyY = Math.floor(p * 5);
      legOff = 0;
    }

    // Body during jump
    this._wBody(g, x, y, bodyY, PALETTE.bossBody);
    g.fillStyle(0x111111);
    g.fillRect(x + 10*BS, y + 10*BS + bodyY, 12*BS, 8*BS);
    this._wHead(g, x, y, bodyY, true);

    // Core blazing
    g.fillStyle(0xff3333);
    g.fillRect(x + 11*BS, y + 11*BS + bodyY, 10*BS, 6*BS);
    g.fillStyle(0xffffff, 0.6);
    g.fillRect(x + 12*BS, y + 12*BS + bodyY, 8*BS, 4*BS);

    // Shadow on ground
    const s = f < 2 ? 12 : (f < 4 ? 10 - Math.floor((f-2)*2) : 6 + Math.floor((f-4)*2));
    g.fillStyle(0x000000, 0.35);
    g.fillCircle(x + 16*BS, y + 32*BS, s);

    // Legs during jump
    g.fillStyle(0x555555);
    g.fillRect(x + 4*BS, y + 24*BS + bodyY, 4*BS, 8*BS);
    g.fillRect(x + 24*BS, y + 24*BS + bodyY, 4*BS, 8*BS);
    g.fillStyle(0x444444);
    g.fillRect(x + 3*BS, y + 30*BS + bodyY, 6*BS, 2*BS);
    g.fillRect(x + 23*BS, y + 30*BS + bodyY, 6*BS, 2*BS);

    // Landing shockwave
    if (f === 7) {
      g.fillStyle(0xffffff, 0.25);
      g.fillCircle(x + 16*BS, y + 32*BS, 18*BS);
      g.fillStyle(0xff8800, 0.15);
      g.fillCircle(x + 16*BS, y + 32*BS, 14*BS);
      g.fillStyle(0x666666, 0.4);
      g.fillCircle(x + 16*BS, y + 32*BS, 10*BS);
    }
  },

  // ── Ground Pound ──
  walkerGroundPound(g, x, y, frame = 0) {
    const f = frame % 6;
    let lift = 0, slam = 0;

    if (f < 3) {
      lift = f * 3;
    } else {
      slam = (f - 3) * 3;
    }

    this._wBody(g, x, y, 0, PALETTE.bossBody);
    g.fillStyle(0x111111);
    g.fillRect(x + 10*BS, y + 10*BS, 12*BS, 8*BS);
    this._wHead(g, x, y, 0, true);

    const pulse = 0.8;
    this._wCore(g, x, y, 0, pulse);

    // Legs — one lifts, one plants
    g.fillStyle(0x555555);
    g.fillRect(x + 4*BS, y + 22*BS - lift, 4*BS, 10*BS + lift);
    g.fillRect(x + 24*BS, y + 22*BS, 4*BS, 10*BS);
    g.fillStyle(0x444444);
    g.fillRect(x + 3*BS, y + 30*BS - lift, 6*BS, 2*BS);
    g.fillRect(x + 23*BS, y + 30*BS, 6*BS, 2*BS);

    if (f < 3) {
      g.fillStyle(0xff4400, 0.5);
      g.fillCircle(x + 6*BS, y + 32*BS - lift, 4*BS);
    } else {
      g.fillStyle(0xffffff, 0.2 + slam * 0.04);
      g.fillCircle(x + 6*BS, y + 32*BS, 8*BS + slam * 4);
      g.fillStyle(0xff6600, 0.15);
      g.fillCircle(x + 6*BS, y + 32*BS, 6*BS + slam * 3);
    }
  },
  // ═══════════════════════════════════════════════════════
  // TURRET — HIT REACTION
  // ═══════════════════════════════════════════════════════

  staticTurretHit(g, x, y, frame) {
    const hf = frame % 12;
    const shakeX = [0, 1, -1, 2, -2, 1, 0, -1, 1, -2, 2, -1][hf];
    const shakeY = [0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, -1][hf];

    this._turretBase(g, x + shakeX, y + shakeY);
    this._turretJoint(g, x + shakeX, y + shakeY);
    this._turretBarrels(g, x, y, 0, 3);
    this._turretGunBody(g, x, y);

    // Flash overlay
    const flashAlpha = hf < 4 ? 0.35 - hf * 0.08 : (hf < 8 ? 0.15 - (hf - 4) * 0.03 : 0);
    if (flashAlpha > 0) {
      g.fillStyle(hf < 4 ? 0xffffff : 0xff4444, flashAlpha);
      g.fillRect(x + 1*S, y + 2*S, 14*S, 6*S);
    }

    // Sparks
    if (hf < 8) {
      g.fillStyle(0xffaa00);
      g.fillRect(x + 11*S + shakeX, y + 4*S + shakeY, 2*S, 1*S);
      g.fillRect(x + 3*S - shakeX, y + 5*S + shakeY, 1*S, 2*S);
      g.fillStyle(0xffff44);
      g.fillRect(x + 7*S + shakeX, y + 6*S + shakeY, 1*S, 1*S);
    }
  },

  // ═══════════════════════════════════════════════════════
  // TURRET — DEATH SEQUENCE (30 frames)
  // ═══════════════════════════════════════════════════════

  staticTurretDeath(g, x, y, deathFrame) {
    if (deathFrame < 6) {
      // ── Phase 0: Violent shake + sparks ──
      const s = deathFrame % 3;
      const shX = [0, 2, -2][s];
      const shY = [0, -1, 1][s];
      this._turretBase(g, x + shX, y + shY);
      this._turretJoint(g, x + shX, y + shY);
      this._turretBarrels(g, x, y, 0, 4);
      this._turretGunBody(g, x, y);
      // Sparks
      g.fillStyle(0xffaa00);
      g.fillRect(x + 3*S, y + 5*S, 2*S, 1*S);
      g.fillRect(x + 12*S, y + 3*S, 1*S, 2*S);
      g.fillRect(x + 7*S, y + 9*S, 2*S, 1*S);
      g.fillStyle(0xffff44);
      g.fillRect(x + 5*S, y + 4*S, 1*S, 1*S);
      g.fillRect(x + 10*S, y + 7*S, 1*S, 1*S);
      // Damage cracks
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 2*S, 1*S, 3*S);
      g.fillRect(x + 13*S, y + 5*S, 1*S, 2*S);

    } else if (deathFrame < 12) {
      // ── Phase 1: Explosion ──
      const bf = deathFrame - 6;
      g.fillStyle(0xffff88, 0.5 - bf * 0.07);
      g.fillCircle(x + 8*S, y + 6*S, (5 + bf) * S);
      g.fillStyle(0xff8800, 0.4 - bf * 0.05);
      g.fillCircle(x + 8*S, y + 6*S, (3 + bf * 2) * S);
      g.fillStyle(0xffffff, 0.3 - bf * 0.04);
      g.fillCircle(x + 8*S, y + 6*S, (1 + bf) * S);
      // Base visible
      this._turretBase(g, x, y);
      // Debris
      g.fillStyle(0x666666);
      g.fillRect(x + 2*S + bf, y + 3*S, 2*S, 2*S);
      g.fillRect(x + 13*S - bf, y + 8*S, 2*S, 1*S);

    } else if (deathFrame < 22) {
      // ── Phase 2: Collapse + smoke ──
      const cf = (deathFrame - 12) / 10;
      const tilt = Math.floor(cf * 3);
      // Base broken
      g.fillStyle(0x3a3a44);
      g.fillRect(x + 1*S, y + 10*S, 14*S, 6*S);
      g.fillStyle(0x222233);
      g.fillRect(x + 2*S, y + 10*S, 12*S, 1*S);
      // Gun tilted
      g.fillStyle(0x555566);
      g.fillRect(x + 5*S, y + 5*S + tilt, 8*S, 4*S);
      // Smoke
      g.fillStyle(0x444444, 0.4);
      g.fillCircle(x + 7*S, y + 3*S - tilt, 3*S);
      g.fillCircle(x + 10*S, y + 2*S - tilt, 2*S);
      if (deathFrame % 3 === 0) {
        g.fillStyle(0xffaa00);
        g.fillRect(x + 4*S, y + 8*S, 1*S, 2*S);
        g.fillRect(x + 11*S, y + 2*S, 2*S, 1*S);
      }

    } else {
      // ── Phase 3: Destroyed ──
      this.staticTurretDestroyed(g, x, y);
    }
  },

  // ═══════════════════════════════════════════════════════
  // WALKER — DESTROYED STATE
  // ═══════════════════════════════════════════════════════

  _walkerWreck(g, x, y) {
    // Fallen body
    g.fillStyle(0x444444);
    g.fillRect(x + 6*BS, y + 20*BS, 20*BS, 8*BS);
    g.fillStyle(0x333333);
    g.fillRect(x + 6*BS, y + 20*BS, 20*BS, 1*BS);
    // Cracked torso
    g.fillStyle(0x222222);
    g.fillRect(x + 12*BS, y + 21*BS, 8*BS, 6*BS);
    // Legs broken
    g.fillStyle(0x555555);
    g.fillRect(x + 4*BS, y + 28*BS, 4*BS, 4*BS);
    g.fillRect(x + 24*BS, y + 28*BS, 4*BS, 4*BS);
    g.fillStyle(0x444444);
    g.fillRect(x + 3*BS, y + 31*BS, 6*BS, 1*BS);
    g.fillRect(x + 23*BS, y + 31*BS, 6*BS, 1*BS);
    // Head fallen
    g.fillStyle(0x5a2a0a);
    g.fillRect(x + 8*BS, y + 16*BS, 16*BS, 6*BS);
    g.fillStyle(0x333333);
    g.fillRect(x + 10*BS, y + 17*BS, 12*BS, 4*BS);
    // Smoke
    g.fillStyle(0x444444, 0.3);
    g.fillCircle(x + 8*BS, y + 15*BS, 3*BS);
    g.fillCircle(x + 24*BS, y + 14*BS, 2*BS);
    g.fillCircle(x + 16*BS, y + 12*BS, 4*BS);
  },

  armoredWalkerDestroyed(g, x, y) {
    this._walkerWreck(g, x, y);
  },

  // ═══════════════════════════════════════════════════════
  // WALKER P1 — HIT REACTION
  // ═══════════════════════════════════════════════════════

  _walkerHitFlash(g, x, y, hf, w = 24*BS, h = 14*BS, ox = 4*BS, oy = 10*BS) {
    const fa = hf < 4 ? 0.3 - hf * 0.07 : (hf < 9 ? 0.12 - (hf - 4) * 0.02 : 0);
    if (fa > 0) {
      g.fillStyle(hf < 4 ? 0xffffff : 0xff4444, fa);
      g.fillRect(x + ox, y + oy, w, h);
    }
  },

  armoredWalkerPhase1Hit(g, x, y, frame) {
    const hf = frame % 14;
    const stagger = [-1, -2, -1, 0, 0, 0, 1, 1, 0, 0, 0, -1, -1, 0][hf];

    this._wLeg(g, x, y, -1, 0);
    this._wLeg(g, x, y, 1, stagger);
    this._wBody(g, x, y, stagger);
    this._wHead(g, x, y, stagger);

    // Sparks at hit point
    if (hf < 8) {
      g.fillStyle(0xffaa00);
      g.fillRect(x + 14*BS + hf, y + 14*BS + stagger, 2*BS, 1*BS);
      g.fillRect(x + 10*BS - hf, y + 12*BS + stagger, 1*BS, 2*BS);
      g.fillStyle(0xffff44);
      g.fillRect(x + 12*BS, y + 13*BS + stagger, 1*BS, 1*BS);
    }

    this._walkerHitFlash(g, x, y, hf);

    // Brief stagger in cannon fire
    this._wCannon(g, x, y, stagger, 0x555555, false);

    const puff = frame + (hf < 7 ? hf * 2 : 4);
    this._wExhaust(g, x, y, stagger, puff);
  },

  // ═══════════════════════════════════════════════════════
  // WALKER P1 — DEATH SEQUENCE (45 frames)
  // ═══════════════════════════════════════════════════════

  armoredWalkerPhase1Death(g, x, y, deathFrame) {
    if (deathFrame < 10) {
      // ── Phase 0: Stagger + sparks ──
      const st = [-1, -2, -3, -2, -1, 0, 1, 2, 1, 0][deathFrame];
      this._wLeg(g, x, y, -1, 0);
      this._wLeg(g, x, y, 1, st);
      this._wBody(g, x, y, st);
      this._wHead(g, x, y, st);
      this._wCannon(g, x, y, st, 0x555555, false);
      // Core flicker
      if (deathFrame > 4) {
        g.fillStyle(0xff4444, 0.4);
        g.fillRect(x + 12*BS, y + 12*BS + st, 8*BS, 4*BS);
      }
      // Sparks
      g.fillStyle(0xffaa00);
      g.fillRect(x + 14*BS, y + 14*BS + st, 2*BS, 1*BS);
      g.fillRect(x + 6*BS, y + 12*BS + st, 1*BS, 2*BS);
      g.fillStyle(0xffff44);
      g.fillRect(x + 18*BS, y + 11*BS + st, 1*BS, 1*BS);
      this._wExhaust(g, x, y, st, deathFrame * 3);

    } else if (deathFrame < 20) {
      // ── Phase 1: Explosion ──
      const bf = (deathFrame - 10);
      g.fillStyle(0xffcc44, 0.5 - bf * 0.05);
      g.fillCircle(x + 16*BS, y + 18*BS, (6 + bf) * BS);
      g.fillStyle(0xff8800, 0.35 - bf * 0.03);
      g.fillCircle(x + 16*BS, y + 18*BS, (4 + bf * 2) * BS);
      g.fillStyle(0xffffff, 0.25 - bf * 0.02);
      g.fillCircle(x + 12*BS + bf, y + 16*BS, (2 + bf) * BS);
      g.fillCircle(x + 20*BS - bf, y + 19*BS, (2 + bf) * BS);
      // Legs visible in explosion
      g.fillStyle(0x666666);
      g.fillRect(x + 4*BS, y + 22*BS, 4*BS, 10*BS);
      g.fillRect(x + 24*BS, y + 22*BS, 4*BS, 10*BS);
      g.fillStyle(0x444444);
      g.fillRect(x + 3*BS, y + 30*BS, 6*BS, 2*BS);
      g.fillRect(x + 23*BS, y + 30*BS, 6*BS, 2*BS);
      // Debris
      g.fillStyle(0x8B4513);
      g.fillRect(x + 8*BS - bf, y + 14*BS - bf, 3*BS, 2*BS);
      g.fillRect(x + 21*BS + bf, y + 16*BS - bf, 2*BS, 2*BS);

    } else if (deathFrame < 32) {
      // ── Phase 2: Collapse ──
      const cf = (deathFrame - 20) / 12;
      const fallY = Math.floor(cf * 6);
      g.fillStyle(0x444444);
      g.fillRect(x + 6*BS, y + 20*BS + fallY, 20*BS, 8*BS - fallY);
      // Legs giving way
      g.fillStyle(0x555555);
      g.fillRect(x + 4*BS, y + 22*BS + fallY, 4*BS, 10*BS);
      g.fillRect(x + 24*BS, y + 22*BS + fallY, 4*BS, 10*BS);
      g.fillStyle(0x444444);
      g.fillRect(x + 3*BS, y + 30*BS + fallY, 6*BS, 2*BS);
      g.fillRect(x + 23*BS, y + 30*BS + fallY, 6*BS, 2*BS);
      // Head fallen
      g.fillStyle(0x5a2a0a);
      g.fillRect(x + 10*BS, y + 14*BS + fallY, 12*BS, 6*BS);
      g.fillStyle(0x333333);
      g.fillRect(x + 12*BS, y + 15*BS + fallY, 8*BS, 4*BS);
      // Smoke
      g.fillStyle(0x444444, 0.3);
      g.fillCircle(x + 8*BS, y + 14*BS + fallY, 3*BS);
      g.fillCircle(x + 24*BS, y + 13*BS + fallY, 2*BS);
      if (deathFrame % 4 === 0) {
        g.fillStyle(0xff6600);
        g.fillRect(x + 14*BS, y + 17*BS + fallY, 1*BS, 2*BS);
      }

    } else {
      // ── Phase 3: Wreck ──
      this._walkerWreck(g, x, y);
    }
  },

  // ═══════════════════════════════════════════════════════
  // WALKER P2 — HIT REACTION
  // ═══════════════════════════════════════════════════════

  armoredWalkerPhase2Hit(g, x, y, frame) {
    const hf = frame % 14;
    const stagger = [-1, -2, -2, -1, 0, 0, 1, 1, 0, 0, -1, -1, 0, 0][hf];

    // Damaged legs
    this._wLeg(g, x, y, -1, 0, 0x555555);
    this._wLeg(g, x, y, 1, stagger, 0x444444);

    // Body
    this._wBody(g, x, y, stagger, PALETTE.bossBody);
    g.fillStyle(0x111111);
    g.fillRect(x + 10*BS, y + 10*BS + stagger, 12*BS, 8*BS);

    // Core flickers on hit
    const coreFlicker = hf < 6 ? 1.0 : (hf < 10 ? 0.6 : 0.2);
    g.fillStyle(0xff3333, coreFlicker);
    g.fillRect(x + 11*BS, y + 11*BS + stagger, 10*BS, 6*BS);
    g.fillStyle(0xffffff, coreFlicker * 0.6);
    g.fillRect(x + 12*BS, y + 12*BS + stagger, 8*BS, 4*BS);

    this._wHead(g, x, y, stagger, true);

    // Sparks from core area
    if (hf < 8) {
      g.fillStyle(0xffff44);
      g.fillRect(x + 14*BS + hf, y + 13*BS + stagger, 2*BS, 1*BS);
      g.fillRect(x + 18*BS - hf, y + 12*BS + stagger, 1*BS, 2*BS);
      g.fillStyle(0xffaa00);
      g.fillRect(x + 16*BS, y + 14*BS + stagger, 2*BS, 2*BS);
    }

    this._walkerHitFlash(g, x, y, hf);

    // Spread cannon
    g.fillStyle(0x555555);
    g.fillRect(x + 5*BS, y + 16*BS + stagger, 8*BS, 3*BS);
    g.fillStyle(PALETTE.ledRed);
    g.fillRect(x + 2*BS, y + 17*BS + stagger, 2*BS, 1*BS);

    this._wExhaust(g, x, y, stagger, frame * 2, 0x666666);
  },

  // ═══════════════════════════════════════════════════════
  // WALKER P2 — DEATH SEQUENCE (50 frames)
  // ═══════════════════════════════════════════════════════

  armoredWalkerPhase2Death(g, x, y, deathFrame) {
    if (deathFrame < 10) {
      // ── Phase 0: Core overload ──
      const pulse = deathFrame / 10;
      // Body
      this._wBody(g, x, y, 0, PALETTE.bossBody);
      g.fillStyle(0x111111);
      g.fillRect(x + 10*BS, y + 10*BS, 12*BS, 8*BS);
      // Core flashing intensely
      g.fillStyle(0xff4444, 0.6 + pulse * 0.4);
      g.fillRect(x + 11*BS, y + 11*BS, 10*BS, 6*BS);
      g.fillStyle(0xffffff, 0.4 + pulse * 0.6);
      g.fillRect(x + 13*BS, y + 13*BS, 6*BS, 2*BS);
      // Glow growing
      g.fillStyle(0xff2222, 0.05 + pulse * 0.1);
      g.fillCircle(x + 16*BS, y + 14*BS, (8 + deathFrame) * BS);
      // Legs
      this._wLeg(g, x, y, -1, 0, 0x555555);
      this._wLeg(g, x, y, 1, 0, 0x444444);
      this._wHead(g, x, y, 0, true);
      // Sparks flying
      g.fillStyle(0xffff44);
      g.fillRect(x + 10*BS, y + 10*BS, 1*BS, 2*BS);
      g.fillRect(x + 21*BS, y + 12*BS, 2*BS, 1*BS);
      g.fillRect(x + 15*BS, y + 8*BS, 2*BS, 2*BS);
      // Spread cannon
      g.fillStyle(0x555555);
      g.fillRect(x + 5*BS, y + 16*BS, 8*BS, 3*BS);
      g.fillStyle(PALETTE.ledRed);
      g.fillRect(x + 2*BS, y + 17*BS, 2*BS, 1*BS);

    } else if (deathFrame < 20) {
      // ── Phase 1: Chain explosion ──
      const bf = deathFrame - 10;
      // First explosion at core
      g.fillStyle(0xffcc44, 0.5 - bf * 0.04);
      g.fillCircle(x + 16*BS, y + 14*BS, (6 + bf * 2) * BS);
      g.fillStyle(0xff6600, 0.35 - bf * 0.03);
      g.fillCircle(x + 16*BS, y + 14*BS, (4 + bf * 3) * BS);
      g.fillStyle(0xffffff, 0.25 - bf * 0.02);
      g.fillCircle(x + 16*BS, y + 14*BS, (2 + bf) * BS);
      // Legs through explosion
      g.fillStyle(0x555555);
      g.fillRect(x + 4*BS, y + 22*BS, 4*BS, 10*BS);
      g.fillRect(x + 24*BS, y + 22*BS, 4*BS, 10*BS);
      // Debris
      g.fillStyle(PALETTE.bossDark);
      g.fillRect(x + 6*BS - bf, y + 10*BS - bf, 4*BS, 3*BS);
      g.fillRect(x + 23*BS + bf, y + 14*BS - bf, 3*BS, 3*BS);
      g.fillStyle(0x666666);
      g.fillRect(x + 2*BS + bf, y + 22*BS + bf, 3*BS, 3*BS);
      g.fillRect(x + 27*BS - bf, y + 24*BS + bf, 2*BS, 2*BS);

    } else if (deathFrame < 34) {
      // ── Phase 2: Fall apart ──
      const cf = (deathFrame - 20) / 14;
      const fallY = Math.floor(cf * 8);
      const tiltX = Math.floor(cf * 3);
      // Body fragment
      g.fillStyle(PALETTE.bossBody);
      g.fillRect(x + 8*BS + tiltX, y + 16*BS + fallY, 18*BS - tiltX, 6*BS);
      g.fillStyle(0x111111);
      g.fillRect(x + 11*BS + tiltX, y + 17*BS + fallY, 12*BS - tiltX, 4*BS);
      // Leg fragments
      g.fillStyle(0x555555);
      g.fillRect(x + 4*BS - tiltX, y + 22*BS + fallY, 4*BS, 8*BS);
      g.fillRect(x + 24*BS + tiltX, y + 24*BS + fallY, 4*BS, 6*BS);
      // Head
      g.fillStyle(0x5a2a0a);
      g.fillRect(x + 12*BS - tiltX, y + 10*BS + fallY, 10*BS, 6*BS);
      // Smoke
      g.fillStyle(0x444444, 0.4);
      g.fillCircle(x + 8*BS, y + 12*BS + fallY, 4*BS);
      g.fillCircle(x + 24*BS, y + 10*BS + fallY, 3*BS);
      if (deathFrame % 3 === 0) {
        g.fillStyle(0xffaa00);
        g.fillRect(x + 14*BS + tiltX, y + 20*BS + fallY, 1*BS, 2*BS);
        g.fillRect(x + 20*BS + tiltX, y + 18*BS + fallY, 2*BS, 1*BS);
      }

    } else {
      // ── Phase 3: Wreck ──
      this._walkerWreck(g, x, y);
    }
  },
};

console.log('[BossRenderer] v3 — added hit + death animations');