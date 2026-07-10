// ─── Enemy Type Renderers — Smooth Animation System ──────
// All 16x16 base @ S=3

var EnemyRenderer = {

  // ═══════════════════════════════════════════════════════
  // Type A: "The Rusher" — 6-frame smooth run + attack + jump
  // ═══════════════════════════════════════════════════════

  // Simple jump (4-frame arc — no somersault)
  rusherJump(g, x, y, frame = 0) {
    const f = Math.floor(frame / 10) % 4;
    let bodyY, legH;

    if (f === 0) {
      // Squat — anticipation
      bodyY = 2; legH = 0;
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
      this._helmet(g, x, y, bodyY);
      this._angryEyes(g, x, y, bodyY);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 3*S, y + 6*S + bodyY, 10*S, 4*S);
      g.fillStyle(0x772222);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x888888);
      g.fillRect(x + 12*S, y + 7*S + bodyY, 4*S, 2*S);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 4*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillRect(x + 9*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 1*S);

    } else if (f === 1) {
      // Ascent — going up, arms/legs spread
      bodyY = -2;
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
      this._helmet(g, x, y, bodyY);
      this._angryEyes(g, x, y, bodyY);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 3*S, y + 6*S + bodyY, 10*S, 6*S);
      g.fillStyle(0x772222);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x888888);
      g.fillRect(x + 11*S, y + 5*S + bodyY, 5*S, 2*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 11*S, y + 4*S + bodyY, 2*S, 2*S);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 4*S, y + 12*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 12*S + bodyY, 3*S, 2*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 1*S);

    } else if (f === 2) {
      // Apex — highest point
      bodyY = -4;
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 4*S);
      this._helmet(g, x, y, bodyY);
      this._angryEyes(g, x, y, bodyY);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 3*S, y + 5*S + bodyY, 10*S, 5*S);
      g.fillStyle(0x772222);
      g.fillRect(x + 4*S, y + 6*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x888888);
      g.fillRect(x + 12*S, y + 4*S + bodyY, 5*S, 2*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 13*S, y + 3*S + bodyY, 2*S, 2*S);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 4*S, y + 10*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 10*S + bodyY, 3*S, 2*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 11*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 11*S + bodyY, 4*S, 1*S);

    } else {
      // Land — squat
      bodyY = 0;
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
      this._helmet(g, x, y, bodyY);
      this._angryEyes(g, x, y, bodyY);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 3*S, y + 6*S + bodyY, 10*S, 4*S);
      g.fillStyle(0x772222);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x888888);
      g.fillRect(x + 12*S, y + 7*S + bodyY, 4*S, 2*S);
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 4*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillRect(x + 9*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 1*S);
    }
  },

  _helmet(g, x, y, dy = 0) {
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 4*S, y + 0*S + dy, 8*S, 2*S);
  },

  _angryEyes(g, x, y, dy = 0) {
    g.fillStyle(0xff4444);
    g.fillRect(x + 5*S, y + 2*S + dy, 2*S, 1*S);
    g.fillRect(x + 9*S, y + 2*S + dy, 2*S, 1*S);
  },

  _enemyBody(g, x, y, color, dy = 0, wide = 10) {
    const ox = (10 - wide) / 2;
    g.fillStyle(color);
    g.fillRect(x + (3+ox)*S, y + 6*S + dy, wide*S, 6*S);
  },

  _enemyLegs(g, x, y, color, lOff = 0, rOff = 0, dy = 0) {
    g.fillStyle(color);
    g.fillRect(x + 4*S, y + 12*S + dy + lOff, 3*S, 3*S);
    g.fillRect(x + 9*S, y + 12*S + dy + rOff, 3*S, 3*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 4*S, y + 14*S + dy + lOff, 4*S, 1*S);
    g.fillRect(x + 9*S, y + 14*S + dy + rOff, 4*S, 1*S);
  },

  // ── Rusher ──
  rusher(g, x, y, frame = 0) {
    // Spawn warning (if frame < 10, show "!" above)
    if (frame < 10 && frame >= 0) {
      g.fillStyle(0xffff44);
      g.fillRect(x + 6*S, y - 2*S, 4*S, 2*S);
      g.fillRect(x + 7*S, y - 3*S, 2*S, 1*S);
    }

    // 6-frame smooth run
    const t = (frame % 6) / 6 * Math.PI * 2;
    const legL = Math.floor(Math.sin(t) * 2);
    const legR = Math.floor(Math.sin(t + Math.PI) * 2);
    const bodyY = Math.floor(Math.abs(Math.sin(t)) * 1);

    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
    this._helmet(g, x, y, bodyY);
    this._angryEyes(g, x, y, bodyY);

    // Body
    this._enemyBody(g, x, y, PALETTE.enemyDrk, bodyY);
    g.fillStyle(0x772222);
    g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);

    // Melee weapon swing (synchronized with run)
    const swingAngle = Math.sin(t);
    g.fillStyle(0x888888);
    g.fillRect(x + (12 + Math.floor(swingAngle * 2))*S, y + (7 + Math.floor(swingAngle))*S + bodyY, (5 + Math.floor(Math.abs(swingAngle) * 2))*S, 2*S);

    // Legs
    this._enemyLegs(g, x, y, PALETTE.enemyDrk, legL, legR, bodyY);
  },

  // Attack lunge overlay (call after rusher)
  rusherAttack(g, x, y, frame = 0) {
    this.rusher(g, x, y, frame);
    // Lunge: body leans forward, weapon extends
    if (frame % 10 === 0) {
      g.fillStyle(0xcccccc);
      g.fillRect(x + 16*S, y + 6*S, 4*S, 2*S); // weapon thrust
    }
  },

  // Death (1-frame ragdoll)
  rusherDeath(g, x, y) {
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 6*S, y + 3*S, 6*S, 3*S);
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 4*S, y + 6*S, 8*S, 4*S);
    g.fillStyle(0x888888);
    g.fillRect(x + 10*S, y + 7*S, 4*S, 1*S);
    g.fillStyle(0xcc2222);
    g.fillRect(x + 7*S, y + 4*S, 1*S, 1*S);
    g.fillRect(x + 11*S, y + 4*S, 1*S, 1*S);
  },

  // ═══════════════════════════════════════════════════════
  // Type B: "The Marksman" — 3-level aim + walk + crouch
  // ═══════════════════════════════════════════════════════

  marksman(g, x, y, aimLevel = 'HOR') {
    const headDy = (aimLevel === 'UP') ? -1 : (aimLevel === 'DOWN' ? 1 : 0);
    const bodyTilt = (aimLevel === 'UP') ? -1 : (aimLevel === 'DOWN' ? 1 : 0);

    // Beret
    g.fillStyle(PALETTE.enemyBeret);
    g.fillRect(x + 5*S, y + 0*S + headDy, 6*S, 2*S);
    // Head
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 1*S + headDy, 8*S, 5*S);
    // Sunglasses
    g.fillStyle(0x111111);
    g.fillRect(x + 4*S, y + 2*S + headDy, 3*S, 2*S);
    g.fillRect(x + 9*S, y + 2*S + headDy, 3*S, 2*S);
    // Body
    this._enemyBody(g, x, y, PALETTE.enemyGrn, bodyTilt);
    g.fillStyle(0x3a5a2a);
    g.fillRect(x + 4*S, y + 7*S + bodyTilt, 8*S, 3*S);

    // Rifle (angle depends on aim)
    if (aimLevel === 'UP') {
      g.fillStyle(0x444444);
      g.fillRect(x + 9*S, y + 4*S + bodyTilt, 2*S, 7*S); // rifle up
      g.fillStyle(0x666666);
      g.fillRect(x + 9*S, y + 4*S + bodyTilt, 1*S, 7*S);
    } else if (aimLevel === 'DOWN') {
      g.fillStyle(0x444444);
      g.fillRect(x + 11*S, y + 9*S + bodyTilt, 8*S, 2*S); // rifle down
      g.fillStyle(0x666666);
      g.fillRect(x + 13*S, y + 9*S + bodyTilt, 1*S, 4*S);
    } else {
      g.fillStyle(0x444444);
      g.fillRect(x + 11*S, y + 7*S + bodyTilt, 8*S, 2*S); // rifle horizontal
      g.fillStyle(0x666666);
      g.fillRect(x + 13*S, y + 6*S + bodyTilt, 1*S, 4*S);
    }
    // Legs
    this._enemyLegs(g, x, y, PALETTE.enemyGrn, 0, 0);
  },

  // Marksman shoot (muzzle flash at angle)
  marksmanShoot(g, x, y, aimLevel = 'HOR') {
    this.marksman(g, x, y, aimLevel);
    if (aimLevel === 'UP') {
      g.fillStyle(0xffcc44);
      g.fillRect(x + 9*S, y + 4*S, 2*S, 3*S);
      g.fillStyle(0xffffff);
      g.fillRect(x + 9*S, y + 4*S, 1*S, 1*S);
    } else if (aimLevel === 'DOWN') {
      g.fillStyle(0xffcc44);
      g.fillRect(x + 18*S, y + 9*S, 3*S, 2*S);
      g.fillStyle(0xffffff);
      g.fillRect(x + 19*S, y + 9*S, 1*S, 1*S);
    } else {
      g.fillStyle(0xffcc44);
      g.fillRect(x + 18*S, y + 7*S, 3*S, 2*S);
      g.fillStyle(0xffffff);
      g.fillRect(x + 19*S, y + 7*S, 1*S, 1*S);
    }
  },

  // Marksman crouch (emergency dodge)
  marksmanCrouch(g, x, y) {
    g.fillStyle(PALETTE.enemyBeret);
    g.fillRect(x + 5*S, y + 3*S, 6*S, 2*S);
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 5*S, 8*S, 3*S);
    g.fillStyle(0x111111);
    g.fillRect(x + 4*S, y + 5*S, 3*S, 1*S);
    g.fillRect(x + 9*S, y + 5*S, 3*S, 1*S);
    g.fillStyle(PALETTE.enemyGrn);
    g.fillRect(x + 3*S, y + 8*S, 10*S, 4*S);
    g.fillStyle(0x3a5a2a);
    g.fillRect(x + 4*S, y + 8*S, 8*S, 2*S);
    // Rifle low
    g.fillStyle(0x444444);
    g.fillRect(x + 11*S, y + 9*S, 6*S, 2*S);
    // Legs tucked
    g.fillStyle(PALETTE.enemyGrn);
    g.fillRect(x + 4*S, y + 12*S, 3*S, 3*S);
    g.fillRect(x + 9*S, y + 12*S, 3*S, 3*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 4*S, y + 14*S, 4*S, 1*S);
    g.fillRect(x + 9*S, y + 14*S, 4*S, 1*S);
  },

  // Marksman walk (4-frame)
  marksmanWalk(g, x, y, frame = 0) {
    const legW = Math.sin((frame % 4) / 4 * Math.PI * 2) * 1;
    this.marksman(g, x, y);
    this._enemyLegs(g, x, y, PALETTE.enemyGrn, Math.floor(legW), -Math.floor(legW));
  },

  // Marksman death (2-frame)
  marksmanDeath(g, x, y, frame = 0) {
    if (frame === 0) {
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 5*S, y + 2*S, 6*S, 3*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 3*S, y + 5*S, 8*S, 4*S);
      g.fillStyle(0x444444);
      g.fillRect(x + 2*S, y + 7*S, 4*S, 2*S); // rifle dropped
    } else {
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 2*S, y + 7*S, 10*S, 4*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 5*S, 6*S, 3*S);
      g.fillStyle(0x444444);
      g.fillRect(x + 1*S, y + 9*S, 4*S, 2*S);
      g.fillStyle(0xcc2222);
      g.fillRect(x + 5*S, y + 5*S, 1*S, 1*S);
      g.fillRect(x + 9*S, y + 5*S, 1*S, 1*S);
    }
  },

  // Marksman jump (4-frame simple arc)
  marksmanJump(g, x, y, frame = 0) {
    const f = Math.floor(frame / 10) % 4;
    let bodyY;

    if (f === 0) {
      // Squat
      bodyY = 2;
      g.fillStyle(PALETTE.enemyBeret);
      g.fillRect(x + 5*S, y + 0*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
      g.fillStyle(0x111111);
      g.fillRect(x + 4*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 3*S, y + 6*S + bodyY, 10*S, 4*S);
      g.fillStyle(0x3a5a2a);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x444444);
      g.fillRect(x + 11*S, y + 7*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 4*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillRect(x + 9*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 1*S);

    } else if (f === 1) {
      // Ascent
      bodyY = -2;
      g.fillStyle(PALETTE.enemyBeret);
      g.fillRect(x + 5*S, y + 0*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
      g.fillStyle(0x111111);
      g.fillRect(x + 4*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 3*S, y + 6*S + bodyY, 10*S, 6*S);
      g.fillStyle(0x3a5a2a);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x444444);
      g.fillRect(x + 11*S, y + 5*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 4*S, y + 12*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 12*S + bodyY, 3*S, 2*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 1*S);

    } else if (f === 2) {
      // Apex
      bodyY = -4;
      g.fillStyle(PALETTE.enemyBeret);
      g.fillRect(x + 5*S, y + 0*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 4*S);
      g.fillStyle(0x111111);
      g.fillRect(x + 4*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 3*S, y + 5*S + bodyY, 10*S, 5*S);
      g.fillStyle(0x3a5a2a);
      g.fillRect(x + 4*S, y + 6*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x444444);
      g.fillRect(x + 12*S, y + 4*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 4*S, y + 10*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 10*S + bodyY, 3*S, 2*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 11*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 11*S + bodyY, 4*S, 1*S);

    } else {
      // Land
      bodyY = 0;
      g.fillStyle(PALETTE.enemyBeret);
      g.fillRect(x + 5*S, y + 0*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 4*S, y + 1*S + bodyY, 8*S, 5*S);
      g.fillStyle(0x111111);
      g.fillRect(x + 4*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillRect(x + 9*S, y + 2*S + bodyY, 3*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 3*S, y + 6*S + bodyY, 10*S, 4*S);
      g.fillStyle(0x3a5a2a);
      g.fillRect(x + 4*S, y + 7*S + bodyY, 8*S, 2*S);
      g.fillStyle(0x444444);
      g.fillRect(x + 11*S, y + 7*S + bodyY, 6*S, 2*S);
      g.fillStyle(PALETTE.enemyGrn);
      g.fillRect(x + 4*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillRect(x + 9*S, y + 10*S + bodyY, 3*S, 4*S);
      g.fillStyle(0x222222);
      g.fillRect(x + 4*S, y + 13*S + bodyY, 4*S, 1*S);
      g.fillRect(x + 9*S, y + 13*S + bodyY, 4*S, 1*S);
    }
  },

  // ═══════════════════════════════════════════════════════
  // Type C: "The Dropper" — rotor + bomb sway + drop
  // ═══════════════════════════════════════════════════════

  dropper(g, x, y, frame = 0) {
    const bob = Math.sin(frame * 0.08) * 1;
    const rotorBlink = (Math.floor(frame / 2) % 4 < 2);

    // Rotor (blinking line)
    g.fillStyle(rotorBlink ? 0x888888 : 0xaaaaaa);
    g.fillRect(x + 3*S, y + 0*S + bob, 10*S, 1*S);
    g.fillStyle(rotorBlink ? 0xaaaaaa : 0xcccccc);
    g.fillRect(x + 3*S, y + 1*S + bob, 10*S, 1*S);

    // Body
    g.fillStyle(PALETTE.drone);
    g.fillRect(x + 4*S, y + 2*S + bob, 8*S, 5*S);
    // Cockpit
    g.fillStyle(0x441111);
    g.fillRect(x + 5*S, y + 3*S + bob, 6*S, 3*S);
    // Red eye (pulsing)
    const eyePulse = Math.sin(frame * 0.1) * 0.3 + 0.7;
    g.fillStyle(PALETTE.ledRed);
    g.fillRect(x + 6*S, y + 4*S + bob, 4*S, Math.floor(1 * S));

    // Skids
    g.fillStyle(0x555555);
    g.fillRect(x + 4*S, y + 7*S + bob, 2*S, 2*S);
    g.fillRect(x + 10*S, y + 7*S + bob, 2*S, 2*S);

    // Bomb sway
    const sway = Math.sin(frame * 0.05) * 2;
    g.fillStyle(0x444444);
    g.fillRect(x + 6*S + Math.floor(sway), y + 9*S + bob, 4*S, 3*S);
    g.fillStyle(PALETTE.ledRed);
    g.fillRect(x + 7*S + Math.floor(sway), y + 9*S + bob, 2*S, 1*S);
  },

  // Bomb drop sequence (5-frame)
  dropperDrop(g, x, y, dropFrame = 0, frame = 0) {
    const bob = Math.sin(frame * 0.08) * 1;
    const dF = dropFrame;
    // Drone (simplified — no bomb)
    g.fillStyle(0x888888);
    g.fillRect(x + 3*S, y + 0*S + bob, 10*S, 1*S);
    g.fillStyle(PALETTE.drone);
    g.fillRect(x + 4*S, y + 2*S + bob, 8*S, 5*S);
    g.fillStyle(0x441111);
    g.fillRect(x + 5*S, y + 3*S + bob, 6*S, 3*S);
    g.fillStyle(0x555555);
    g.fillRect(x + 4*S, y + 7*S + bob, 2*S, 2*S);
    g.fillRect(x + 10*S, y + 7*S + bob, 2*S, 2*S);

    // Bomb falling
    if (dF > 0) {
      const bombY = dF * 4;
      g.fillStyle(0x444444);
      g.fillRect(x + 6*S, y + 9*S + bombY, 4*S, 3*S);
      if (dF > 2) {
        g.fillStyle(0xff6600);
        g.fillRect(x + 7*S, y + 12*S + bombY, 2*S, 1*S); // fuse lit
      }
      // Shadow on ground
      const shadowSize = 4 + dF;
      g.fillStyle(0x000000, 0.2);
      g.fillCircle(x + 8*S, y + 16*S, shadowSize);
    }
  },

  // Dropper death (fall + explode)
  dropperDeath(g, x, y, frame = 0) {
    if (frame < 3) {
      // Falling
      const fallY = frame * 3;
      g.fillStyle(PALETTE.drone);
      g.fillRect(x + 4*S, y + 2*S + fallY, 8*S, 5*S);
      g.fillStyle(0xff6600);
      g.fillRect(x + 5*S, y + 3*S + fallY, 1*S, 1*S);
    } else if (frame === 3) {
      // Explosion
      g.fillStyle(0xff8800);
      g.fillCircle(x + 8*S, y + 12*S, 4*S);
      g.fillStyle(0xffcc00);
      g.fillCircle(x + 8*S, y + 12*S, 2*S);
    } else {
      // Smoke
      g.fillStyle(0x444444, 0.5);
      g.fillCircle(x + 7*S, y + 10*S, 3*S);
      g.fillCircle(x + 9*S, y + 12*S, 2*S);
    }
  },

  // ═══════════════════════════════════════════════════════
  // Type D: "The Shield" — 3-level guard angle + break
  // ═══════════════════════════════════════════════════════

  shield(g, x, y, guardLevel = 'FRONT') {
    // Head (peeking above shield)
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 8*S, y + 1*S, 5*S, 4*S);
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 8*S, y + 0*S, 5*S, 2*S);
    // Body behind shield
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 8*S, y + 5*S, 6*S, 7*S);

    // Shield position based on guard level
    if (guardLevel === 'UP') {
      // Shield angled up — protects head, body exposed
      g.fillStyle(PALETTE.enemyShld);
      g.fillRect(x + 1*S, y + 0*S, 8*S, 8*S);
      g.fillStyle(PALETTE.enemyShldL);
      g.fillRect(x + 2*S, y + 1*S, 6*S, 1*S);
      g.fillRect(x + 2*S, y + 1*S, 1*S, 6*S);
      g.fillStyle(0x4444aa);
      g.fillRect(x + 4*S, y + 3*S, 2*S, 2*S);
    } else if (guardLevel === 'DOWN') {
      // Shield angled down — protects legs, head exposed
      g.fillStyle(PALETTE.enemyShld);
      g.fillRect(x + 1*S, y + 6*S, 8*S, 7*S);
      g.fillStyle(PALETTE.enemyShldL);
      g.fillRect(x + 2*S, y + 6*S, 6*S, 1*S);
      g.fillRect(x + 2*S, y + 6*S, 1*S, 6*S);
      g.fillStyle(0x4444aa);
      g.fillRect(x + 4*S, y + 9*S, 2*S, 2*S);
      // Exposed body
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 8*S, y + 3*S, 6*S, 3*S);
    } else {
      // FRONT — default shield position
      g.fillStyle(PALETTE.enemyShld);
      g.fillRect(x + 1*S, y + 1*S, 8*S, 11*S);
      g.fillStyle(PALETTE.enemyShldL);
      g.fillRect(x + 2*S, y + 2*S, 6*S, 1*S);
      g.fillRect(x + 2*S, y + 2*S, 1*S, 8*S);
      g.fillStyle(0x4444aa);
      g.fillRect(x + 4*S, y + 4*S, 2*S, 2*S);
    }

    // Legs
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 9*S, y + 12*S, 3*S, 3*S);
    g.fillRect(x + 12*S, y + 12*S, 3*S, 3*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 9*S, y + 14*S, 4*S, 1*S);
    g.fillRect(x + 12*S, y + 14*S, 4*S, 1*S);
  },

  // Shield walk (4-frame slow)
  shieldWalk(g, x, y, frame = 0, guardLevel = 'FRONT') {
    const legW = Math.sin((frame % 4) / 4 * Math.PI * 2) * 1;
    this.shield(g, x, y, guardLevel);
    // Override legs with walk
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 9*S, y + 12*S + Math.floor(legW), 3*S, 3*S);
    g.fillRect(x + 12*S, y + 12*S - Math.floor(legW), 3*S, 3*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 9*S, y + 14*S + Math.floor(legW), 4*S, 1*S);
    g.fillRect(x + 12*S, y + 14*S - Math.floor(legW), 4*S, 1*S);
  },

  // Shield broken (after 1 hit)
  shieldBroken(g, x, y, guardLevel = 'FRONT') {
    // Draw shield with cracks
    this.shield(g, x, y, guardLevel);
    // Crack overlay
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 1*S, y + 1*S, 8*S, 11*S);
    g.fillStyle(PALETTE.enemyShldL);
    g.fillRect(x + 2*S, y + 2*S, 6*S, 1*S);
    g.fillRect(x + 2*S, y + 2*S, 1*S, 8*S);
    // Crack lines
    g.fillStyle(0xcccccc);
    g.fillRect(x + 2*S, y + 3*S, 1*S, 4*S);
    g.fillRect(x + 5*S, y + 2*S, 1*S, 6*S);
    g.fillRect(x + 7*S, y + 4*S, 1*S, 3*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 3*S, y + 5*S, 2*S, 1*S);
    g.fillRect(x + 4*S, y + 8*S, 3*S, 1*S);
  },

  // Shield unshielded (no shield — exposed)
  shieldUnshielded(g, x, y) {
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 8*S, y + 1*S, 5*S, 4*S);
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 8*S, y + 0*S, 5*S, 2*S);
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 5*S, y + 5*S, 6*S, 7*S);
    // Arms up (defensive)
    g.fillStyle(PALETTE.skin);
    g.fillRect(x + 4*S, y + 5*S, 2*S, 4*S);
    g.fillRect(x + 12*S, y + 5*S, 2*S, 4*S);
    // Legs
    g.fillStyle(PALETTE.enemyDrk);
    g.fillRect(x + 9*S, y + 12*S, 3*S, 3*S);
    g.fillRect(x + 12*S, y + 12*S, 3*S, 3*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 9*S, y + 14*S, 4*S, 1*S);
    g.fillRect(x + 12*S, y + 14*S, 4*S, 1*S);
  },

  // Shield death (2-frame)
  shieldDeath(g, x, y, frame = 0) {
    if (frame === 0) {
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 6*S, y + 4*S, 8*S, 5*S);
      g.fillStyle(PALETTE.enemyShld);
      g.fillRect(x + 1*S, y + 6*S, 6*S, 6*S); // shield flying off
    } else {
      g.fillStyle(PALETTE.enemyDrk);
      g.fillRect(x + 4*S, y + 7*S, 8*S, 4*S);
      g.fillStyle(PALETTE.skin);
      g.fillRect(x + 6*S, y + 5*S, 4*S, 3*S);
      g.fillStyle(PALETTE.enemyShld);
      g.fillRect(x + 0*S, y + 8*S, 4*S, 4*S); // shield on ground
    }
  },

  // ═══════════════════════════════════════════════════════
  // Type E: Spike Trap (environmental)
  // ═══════════════════════════════════════════════════════

  spike(g, x, y) {
    g.fillStyle(0x444444);
    g.fillRect(x + 1*S, y + 13*S, 14*S, 2*S);
    g.fillStyle(PALETTE.spike);
    g.fillTriangle(x + 1*S, y + 13*S, x + 2*S, y + 9*S, x + 3*S, y + 13*S);
    g.fillTriangle(x + 4*S, y + 13*S, x + 5*S, y + 8*S, x + 6*S, y + 13*S);
    g.fillTriangle(x + 7*S, y + 13*S, x + 8*S, y + 9*S, x + 9*S, y + 13*S);
    g.fillTriangle(x + 10*S, y + 13*S, x + 11*S, y + 7*S, x + 12*S, y + 13*S);
    g.fillTriangle(x + 13*S, y + 13*S, x + 14*S, y + 9*S, x + 15*S, y + 13*S);
    g.fillStyle(PALETTE.spikeTip);
    g.fillRect(x + 4*S, y + 8*S, 1*S, 1*S);
    g.fillRect(x + 10*S, y + 7*S, 1*S, 1*S);
  },

  // ═══════════════════════════════════════════════════════
  // Power-ups
  // ═══════════════════════════════════════════════════════

  _box(g, x, y) {
    g.fillStyle(PALETTE.powerBox);
    g.fillRect(x + 2*S, y + 2*S, 12*S, 12*S);
    g.fillStyle(0xbbbbbb);
    g.fillRect(x + 2*S, y + 2*S, 12*S, 1*S);
    g.fillRect(x + 2*S, y + 2*S, 1*S, 12*S);
    g.fillStyle(0xcc3333);
    g.fillRect(x + 6*S, y + 4*S, 4*S, 8*S);
    g.fillRect(x + 4*S, y + 6*S, 8*S, 4*S);
  },

  spreadPickup(g, x, y) {
    this._box(g, x, y);
    g.fillStyle(PALETTE.sGun);
    g.fillRect(x + 4*S, y + 4*S, 8*S, 8*S);
    g.fillStyle(PALETTE.powerBox);
    g.fillRect(x + 6*S, y + 7*S, 4*S, 2*S);
    g.fillRect(x + 7*S, y + 6*S, 2*S, 4*S);
  },

  machineGunPickup(g, x, y) {
    this._box(g, x, y);
    g.fillStyle(PALETTE.mGun);
    g.fillRect(x + 3*S, y + 5*S, 10*S, 3*S);
    g.fillStyle(0xcccccc);
    g.fillRect(x + 3*S, y + 6*S, 10*S, 1*S);
  },

  laserPickup(g, x, y) {
    this._box(g, x, y);
    g.fillStyle(PALETTE.lGun);
    g.fillRect(x + 6*S, y + 3*S, 4*S, 10*S);
    g.fillStyle(0xff8888);
    g.fillRect(x + 7*S, y + 4*S, 2*S, 8*S);
  },

  oneUpPickup(g, x, y) {
    g.fillStyle(PALETTE.oneUp);
    g.fillRect(x + 2*S, y + 2*S, 12*S, 12*S);
    g.fillStyle(0x33aa33);
    g.fillRect(x + 2*S, y + 2*S, 12*S, 1*S);
    g.fillRect(x + 2*S, y + 2*S, 1*S, 12*S);
    g.fillStyle(0xcc2222);
    g.fillRect(x + 5*S, y + 5*S, 6*S, 5*S);
    g.fillRect(x + 4*S, y + 6*S, 8*S, 3*S);
    g.fillRect(x + 6*S, y + 4*S, 4*S, 3*S);
  },

  bombPickup(g, x, y) {
    g.fillStyle(0x333333);
    g.fillRect(x + 3*S, y + 3*S, 10*S, 10*S);
    g.fillStyle(0x555555);
    g.fillRect(x + 3*S, y + 3*S, 10*S, 1*S);
    g.fillRect(x + 3*S, y + 3*S, 1*S, 10*S);
    g.fillStyle(0x222222);
    g.fillRect(x + 4*S, y + 4*S, 8*S, 8*S);
    // Fuse
    g.fillStyle(0x886644);
    g.fillRect(x + 7*S, y + 0*S, 2*S, 4*S);
    // Spark
    g.fillStyle(0xffaa00);
    g.fillRect(x + 7*S, y + 0*S, 2*S, 1*S);
    g.fillStyle(0xffff44);
    g.fillRect(x + 8*S, y + 0*S, 1*S, 1*S);
  },

  shieldPickup(g, x, y) {
    g.fillStyle(0x4488cc);
    g.fillRect(x + 2*S, y + 2*S, 12*S, 12*S);
    g.fillStyle(0x66aadd);
    g.fillRect(x + 2*S, y + 2*S, 12*S, 1*S);
    g.fillRect(x + 2*S, y + 2*S, 1*S, 12*S);
    g.fillStyle(0x3377bb);
    g.fillRect(x + 4*S, y + 4*S, 8*S, 8*S);
    // Shine
    g.fillStyle(0x88ccff, 0.4);
    g.fillRect(x + 4*S, y + 4*S, 3*S, 3*S);
    g.fillStyle(0xaaddff, 0.2);
    g.fillRect(x + 7*S, y + 7*S, 3*S, 3*S);
  },

  heartPickup(g, x, y) {
    g.fillStyle(0xff2244);
    g.fillRect(x + 3*S, y + 2*S, 4*S, 4*S);
    g.fillRect(x + 9*S, y + 2*S, 4*S, 4*S);
    g.fillRect(x + 2*S, y + 4*S, 12*S, 4*S);
    g.fillRect(x + 4*S, y + 6*S, 8*S, 4*S);
    g.fillRect(x + 6*S, y + 8*S, 4*S, 3*S);
    // Highlight
    g.fillStyle(0xff6688);
    g.fillRect(x + 4*S, y + 3*S, 2*S, 1*S);
    g.fillRect(x + 10*S, y + 3*S, 2*S, 1*S);
  },
};

console.log('[EnemyRenderer] v3 — bomb, shield, heart pickups');
