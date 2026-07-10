// ─── Character Design Showcase — Smooth Animation Demo ──
// Cycles through all states: idle → run → jump → aim → crouch → death

var CharacterShowcase = class extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterShowcase' });
    this.W = 1024;
    this.H = 700;
    this.frame = 0;
  }

  create() {
    console.log('[DEBUG] create() called');
    this.layerBg = this.add.graphics();
    this.layerChars = this.add.graphics();

    // DEBUG: bright test rect to verify canvas renders
    var d = this.add.graphics();
    d.fillStyle(0x00ff00);
    d.fillRect(0, 0, 200, 50);
    d.fillStyle(0xffffff);
    d.fillRect(0, 50, 1024, 20);
    var dt = this.add.text(10, 10, 'DEBUG: Canvas active', { fontFamily: 'monospace', fontSize: '14px', color: '#ffffff' });
    console.log('[DEBUG] test graphics drawn');

    try {
      this._drawBackground();
    } catch(e) {
      console.log('[DEBUG] _drawBackground ERROR:', e.message);
    }
    this._createLabels();
    this.frameText = this.add.text(this.W - 75, this.H - 15, 'Frame: 0', {
      fontFamily: '"Courier New", monospace', fontSize: '9px', color: '#556677',
    }).setOrigin(0.5);
    this.stateText = this.add.text(12, this.H - 15, '', {
      fontFamily: '"Courier New", monospace', fontSize: '9px', color: '#88aacc',
    }).setOrigin(0);
  }

  update() {
    this.frame++;
    this.frameText.setText(`Frame: ${this.frame}`);
    if (this.frame % 60 === 0) console.log('[DEBUG] update frame', this.frame);
    this.layerChars.clear();
    const sx = (this.frame * 0.8) % 11200;
    try {
      MapRenderer.draw(this.layerChars, sx, this.frame);
    } catch(e) {
      console.log('[DEBUG] MapRenderer.draw ERROR:', e.message);
    }
    try {
      this._drawAllCharacters();
    } catch(e) {
      console.log('[DEBUG] _drawAllCharacters ERROR:', e.message);
    }
  }

  _drawBackground() {
    MapRenderer.drawBackground(this.layerBg);
  }

  _drawStageFrame() {
    const f = this.frame;
    const sx = (f * 0.8) % 11200;
    MapRenderer.drawFrame(this.layerChars, sx, f);
  }

  _createLabels() {
    const t = (x, y, str, size = 11, color = '#ffffff') =>
      this.add.text(x, y, str, {
        fontFamily: '"Courier New", monospace', fontSize: `${size}px`, color,
      }).setOrigin(0.5);

    t(this.W / 2, 18, 'PROJECT CONTRA — SMOOTH ANIMATION DEMO', 16);
    t(this.W / 2, 38, '6-frame run | 8-frame jump | 8-dir aim | 3-level guard | LED pattern | Heavy walk', 10, '#6688aa');

    // Section headers
    t(this.W / 2, 64, '───  P L A Y E R  ——  C Y C L I N G  A L L  S T A T E S  ───', 12, '#4a8ab5');
    t(190, 248, '───  E N E M I E S  ───', 12, '#b55a4a');
    t(790, 64, '───  B O S S E S  ───', 12, '#b5a54a');
    t(this.W / 2, 436, '───  P I C K U P S  &  B U L L E T  D E M O  ───', 12, '#66aa66');

    // ── Player state labels (will be updated dynamically) ──
    this.playerStateLabel = t(88 + 24, 90 + 54, 'State: idle', 10, '#88ccff');
    this.playerDescLabel = t(88 + 24, 90 + 66, '2-frame breathing', 9, '#667788');

    // ── Individual state showcases (smaller, right of main) ──
    const px = 500, py = 90, gap = 56;
    const states = [
      { n: 'Run', c: '#88aacc', i: 0 },
      { n: 'Jump', c: '#88aacc', i: 1 },
      { n: 'Aim ↑', c: '#88aacc', i: 2 },
      { n: 'Crouch', c: '#88aacc', i: 3 },
      { n: 'Death', c: '#cc6666', i: 4 },
    ];
    states.forEach((s, idx) => {
      t(px + idx * gap, py + 54, s.n, 9, s.c);
    });

    // ── Enemy labels ──
    this._rusherStateLabel = t(88 + 24, 272 + 54, 'A: "Rusher"', 10, '#ff9988');
    this._marksmanStateLabel = t(210 + 24, 272 + 54, 'B: "Marksman"', 10, '#ff9988');
    t(345 + 24, 272 + 54, 'C: "Dropper"', 10, '#ff9988');
    t(345 + 24, 272 + 66, 'rotor+bomb sway', 9, '#667788');
    t(470 + 24, 272 + 54, 'D: "Shield"', 10, '#ff9988');
    t(470 + 24, 272 + 66, '3-level guard | break', 9, '#667788');
    t(590 + 24, 286 + 34, 'E: Spike', 10, '#ff9988');

    // ── Boss labels ──
    this._turretLabel = t(710 + 24, 90 + 54, 'Static Turret', 10, '#ffdd88');
    this._turretDescLabel = t(710 + 24, 90 + 66, '50-frame LED | 3-burst fire', 9, '#667788');
    t(710 + 24, 170 + 54, 'Turret (Destroyed)', 10, '#ffdd88');
    this._walkerP1Label = t(710 + 32, 310 + 66, 'Armored Walker — Phase 1', 10, '#ffdd88');
    this._walkerP1Desc = t(710 + 32, 310 + 78, '6-frame heavy walk | cannon pulse', 9, '#667788');
    this._walkerP2Label = t(710 + 32, 400 + 66, 'Armored Walker — Phase 2', 10, '#ffdd88');
    this._walkerP2Desc = t(710 + 32, 400 + 78, 'core exposed | sparks | spread', 9, '#667788');

    // ── Bullet demo labels ──
    t(80 + 0 * 120 + 24, 454 + 54, '[S] Spread', 10, '#ffdd44');
    t(80 + 1 * 120 + 24, 454 + 54, '[M] Machine Gun', 10, '#ffffff');
    t(80 + 2 * 120 + 24, 454 + 54, '[L] Laser', 10, '#ff5555');
    t(80 + 3 * 120 + 24, 454 + 54, '[+] 1UP', 10, '#55dd55');
    t(80 + 4 * 120 + 24, 454 + 54, '[B] Bomb', 10, '#ff8844');
    t(80 + 5 * 120 + 24, 454 + 54, '[Sh] Shield', 10, '#66aadd');
    t(80 + 6 * 120 + 24, 454 + 54, '[❤] Heart', 10, '#ff4466');

    // ── Design Notes ──
    const ny = 540;
    this.add.graphics()
      .fillStyle(0x111122, 0.85).fillRect(20, ny, this.W - 40, 150)
      .lineStyle(1, 0x334466, 0.6).strokeRect(20, ny, this.W - 40, 150);

    t(this.W / 2, ny + 8, 'PROJECTILE NOTES', 11, '#aaccee');
    const notes = [
      '• Spread (S): 3 yellow bullets × 4px, fan 30°, glowing core + trailing particles',
      '• Machine Gun (M): 1 white streak × 2×4px, fast + speed trail',
      '• Laser (L): red beam 2px thick, pulsing brightness, white core + origin flash',
      '• Bomb (B): throw in parabolic arc → explosion (expanding fire circles + debris)',
      '• Shield (Sh): temporary barrier — blue pulsing bubble, shimmer lines',
      '• Heart (❤): restore 1 life — red heart icon with highlight, bob animation',
      '• All pickups render at S=3 via Phaser Graphics API (fillRect / fillCircle)',
    ];
    notes.forEach((n, i) => {
      t(36, ny + 26 + i * 16, n, 9, '#8899aa').setOrigin(0);
    });
  }

  _drawAllCharacters() {
    const g = this.layerChars;
    const f = this.frame;

    // ════════════════════════ PLAYER (cycle through states) ════════

    const cycleLength = 240; // frames per full cycle
    const cyclePos = f % cycleLength;
    const px = 88, py = 90;

    if (cyclePos < 60) {
      // IDLE (frames 0-60)
      PlayerRenderer.idle(g, px, py, f);
      this._updatePlayerLabel('Idle', '2-frame breathing cycle', 0);
    } else if (cyclePos < 105) {
      // RUN (frames 60-105)
      PlayerRenderer.run(g, px, py, f);
      this._updatePlayerLabel('Run', '6-frame smooth sine cycle | 70ms/frame', 0);
    } else if (cyclePos < 160) {
      // JUMP (frames 105-160) — 55 frames to show slow somersault
      PlayerRenderer.jump(g, px, py, f);
      this._updatePlayerLabel('Jump', '11-frame spin | 45°→90°→135°→180°→225°', 1);
    } else if (cyclePos < 185) {
      // AIM UP (frames 160-185)
      const dir = Math.floor((cyclePos - 160) / 3) % 8;
      PlayerRenderer.aimUp(g, px, py, dir, f);
      const dirNames = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘'];
      this._updatePlayerLabel(`Aim ${dirNames[dir]}`, `8-dir | body tilt ${['0°','-5°','-10°','-5°','0°','+5°','+10°','+5°'][dir]}`, 2);
    } else if (cyclePos < 210) {
      // CROUCH (frames 185-210)
      PlayerRenderer.crouch(g, px, py);
      this._updatePlayerLabel('Crouch', 'hitbox 8x8 | walk speed 40px/s', 3);
    } else {
      // DEATH (frames 210-240)
      const deathFrame = Math.floor((cyclePos - 210) / 10) % 3;
      PlayerRenderer.death(g, px, py, deathFrame);
      this._updatePlayerLabel(`Death (${['hit','fly','land'][deathFrame]})`, '3-frame ragdoll | no return', 4);
    }

    // Shield effect on player (toggle every 60f)
    if (Math.floor(f / 60) % 2 === 0) {
      BulletRenderer.shieldBubble(g, px + 8*S, py + 8*S, f, 9*S);
    }

    // ── Small state displays ──
    const sx = 500, gap = 56;
    PlayerRenderer.run(g, sx, py, f);
    PlayerRenderer.jump(g, sx + gap, py, f);
    const aimD = Math.floor(f / 20) % 8;
    PlayerRenderer.aimUp(g, sx + gap * 2, py, aimD, f);
    PlayerRenderer.crouch(g, sx + gap * 3, py);
    const dF = Math.floor((f / 15) % 3);
    PlayerRenderer.death(g, sx + gap * 4, py + dF, dF);

    // ════════════════════════ ENEMIES ═══════════════

    // Type A: Rusher — run → attack → jump cycle
    const rusherPhase = f % 100;
    if (rusherPhase < 40) {
      EnemyRenderer.rusher(g, 88, 272, f);
      this._updateEnemyLabel('A', 'Run', 0);
    } else if (rusherPhase < 60) {
      EnemyRenderer.rusherAttack(g, 88, 272, f);
      this._updateEnemyLabel('A', 'Attack (lunge)', 0);
    } else {
      EnemyRenderer.rusherJump(g, 88, 272, f);
      this._updateEnemyLabel('A', 'Jump (simple arc)', 0);
    }

    // Type B: Marksman — aim → shoot → jump cycle
    const bPhase = f % 120;
    const aimLevels = ['UP', 'HOR', 'DOWN'];
    const bAim = aimLevels[Math.floor(f / 90) % 3];
    if (bPhase < 50) {
      EnemyRenderer.marksman(g, 210, 272, bAim);
      this._updateEnemyLabel('B', `Aim ${bAim}`, 1);
    } else if (bPhase < 80) {
      EnemyRenderer.marksmanShoot(g, 210, 272, bAim);
      this._updateEnemyLabel('B', `Shoot ${bAim}`, 1);
      // Marksman bullet
      const mbDist = (bPhase - 50) * 4;
      let mbY = 292;
      if (bAim === 'UP') mbY = 283;
      else if (bAim === 'DOWN') mbY = 300;
      BulletRenderer.marksmanBullet(g, 240 + mbDist, mbY, f);
    } else {
      EnemyRenderer.marksmanJump(g, 210, 272, f);
      this._updateEnemyLabel('B', 'Jump', 1);
    }

    // Type C: Dropper — hover with rotor + bomb
    const dropActive = Math.floor(f / 80) % 3 === 0;
    if (dropActive) {
      const dropF = Math.min(Math.floor((f % 80) / 15), 5);
      EnemyRenderer.dropperDrop(g, 345, 272, dropF, f);
    } else {
      EnemyRenderer.dropper(g, 345, 272, f);
    }

    // Type D: Shield — cycle guard levels
    const guardLevels = ['FRONT', 'UP', 'DOWN'];
    const dGuard = guardLevels[Math.floor(f / 100) % 3];
    if (Math.floor(f / 60) % 2 === 0) {
      EnemyRenderer.shieldWalk(g, 470, 272, f, dGuard);
    } else {
      EnemyRenderer.shieldBroken(g, 470, 272, dGuard);
    }

    // Type E: Spike trap
    EnemyRenderer.spike(g, 590, 286);

    // ════════════════════════ BOSSES ════════════════

    // ── Mini-Boss: Turret (500-frame cycle) ──
    const turretCycle = f % 500;
    if (turretCycle < 150) {
      BossRenderer.staticTurret(g, 710, 90, f);
      this._updateTurretLabel('Static', '50-frame LED | 3-burst fire');
      // Turret bullet during firing frames
      const tFire = f % 50;
      if (tFire >= 41 && tFire < 44) {
        BulletRenderer.turretBullet(g, 760 + (tFire - 41) * 15, 106, f);
      }
    } else if (turretCycle < 170) {
      BossRenderer.staticTurretHit(g, 710, 90, f);
      this._updateTurretLabel('Hit!', 'recoil + sparks');
    } else if (turretCycle < 320) {
      BossRenderer.staticTurret(g, 710, 90, f);
      this._updateTurretLabel('Static', '50-frame LED | 3-burst fire');
      const tFire = f % 50;
      if (tFire >= 41 && tFire < 44) {
        BulletRenderer.turretBullet(g, 760 + (tFire - 41) * 15, 106, f);
      }
    } else if (turretCycle < 340) {
      BossRenderer.staticTurretHit(g, 710, 90, f);
      this._updateTurretLabel('Hit!', 'recoil + sparks');
    } else if (turretCycle < 400) {
      BossRenderer.staticTurretDeath(g, 710, 90, turretCycle - 340);
      this._updateTurretLabel('Death', 'explosion → collapse');
    } else {
      BossRenderer.staticTurretDestroyed(g, 710, 90);
      this._updateTurretLabel('Destroyed', 'smoking wreck');
    }

    // ── Walker Phase 1 (550-frame cycle) ──
    const w1Cycle = f % 550;
    const w1Firing = f % 40 < 5;
    if (w1Cycle < 160) {
      BossRenderer.armoredWalkerPhase1(g, 710, 310, f);
      this._updateWalkerLabel(1, 'Walk', '6-frame heavy stride | cannon pulse');
      if (w1Firing) BulletRenderer.walkerCannonBall(g, 714 - (f % 40) * 4, 342, f);
    } else if (w1Cycle < 180) {
      BossRenderer.armoredWalkerPhase1Hit(g, 710, 310, f);
      this._updateWalkerLabel(1, 'Hit!', 'stagger + sparks');
    } else if (w1Cycle < 340) {
      BossRenderer.armoredWalkerPhase1(g, 710, 310, f);
      this._updateWalkerLabel(1, 'Walk', '6-frame heavy stride | cannon pulse');
      if (w1Firing) BulletRenderer.walkerCannonBall(g, 714 - (f % 40) * 4, 342, f);
    } else if (w1Cycle < 360) {
      BossRenderer.armoredWalkerPhase1Hit(g, 710, 310, f);
      this._updateWalkerLabel(1, 'Hit!', 'stagger + sparks');
    } else if (w1Cycle < 400) {
      BossRenderer.armoredWalkerPhase1Death(g, 710, 310, w1Cycle - 360);
      this._updateWalkerLabel(1, 'Death', 'explosion → collapse');
    } else {
      BossRenderer.armoredWalkerDestroyed(g, 710, 310);
      this._updateWalkerLabel(1, 'Destroyed', 'smoking wreck');
    }

    // ── Walker Phase 2 (550-frame cycle) ──
    const w2Cycle = f % 550;
    if (w2Cycle < 140) {
      BossRenderer.armoredWalkerPhase2(g, 710, 400, f);
      this._updateWalkerLabel(2, 'Enraged', 'core pulse | sparks');
    } else if (w2Cycle < 160) {
      BossRenderer.armoredWalkerPhase2Hit(g, 710, 400, f);
      this._updateWalkerLabel(2, 'Hit!', 'core flicker + sparks');
    } else if (w2Cycle < 300) {
      BossRenderer.armoredWalkerPhase2(g, 710, 400, f);
      this._updateWalkerLabel(2, 'Enraged', 'core pulse | sparks');
    } else if (w2Cycle < 320) {
      BossRenderer.armoredWalkerPhase2Hit(g, 710, 400, f);
      this._updateWalkerLabel(2, 'Hit!', 'core flicker + sparks');
    } else if (w2Cycle < 370) {
      BossRenderer.armoredWalkerPhase2Death(g, 710, 400, w2Cycle - 320);
      this._updateWalkerLabel(2, 'Death', 'core overload → explosion');
    } else {
      BossRenderer.armoredWalkerDestroyed(g, 710, 400);
      this._updateWalkerLabel(2, 'Destroyed', 'smoking wreck');
    }

    // ════════════════════════ BULLET DEMOS ═══════════

    const bx = [80, 200, 320, 440, 560, 680, 800];
    const by = 454;
    const bcy = by + 8*S;

    // ── 1. Spread Gun ──
    EnemyRenderer.spreadPickup(g, bx[0], by);
    const spFrame = f % 50;
    if (spFrame < 42) {
      const spProg = spFrame / 42;
      const spDist = spProg * 200;
      for (let i = 0; i < 3; i++) {
        const fan = (i - 1) * (S * 2 + Math.floor(spProg * 12));
        BulletRenderer.spreadBullet(g, bx[0] + 48 + spDist, bcy + fan, f, i);
      }
    }

    // ── 2. Machine Gun ──
    EnemyRenderer.machineGunPickup(g, bx[1], by);
    const mgFrame = f % 16;
    if (mgFrame < 13) {
      const mgProg = mgFrame / 13;
      BulletRenderer.machineGunBullet(g, bx[1] + 48 + mgProg * 200, bcy, f);
    }

    // ── 3. Laser ──
    EnemyRenderer.laserPickup(g, bx[2], by);
    BulletRenderer.laserBeam(g, bx[2] + 48, bcy - S, 200, f);

    // ── 4. 1UP ──
    const bob = Math.sin(f * 0.05) * 3;
    EnemyRenderer.oneUpPickup(g, bx[3], by + bob);

    // ── 5. Bomb ──
    EnemyRenderer.bombPickup(g, bx[4], by);
    const bombCycle = f % 65;
    if (bombCycle < 40) {
      const t = bombCycle / 40;
      const bDist = t * 180;
      const bArc = -Math.sin(t * Math.PI) * 50;
      BulletRenderer.bombThrow(g, bx[4] + 48 + bDist, bcy + bArc, f);
      // Shadow on ground
      const shadowS = 3 + Math.floor((1 - Math.abs(Math.sin(t * Math.PI))) * 4);
      g.fillStyle(0x000000, 0.25);
      g.fillCircle(bx[4] + 48 + bDist, bcy + 12, shadowS);
    } else if (bombCycle < 55) {
      const expFrame = bombCycle - 40;
      BulletRenderer.bombExplosion(g, bx[4] + 48 + 175, bcy + 4, expFrame);
    } else {
      g.fillStyle(0x444444, 0.2);
      g.fillCircle(bx[4] + 48 + 175, bcy + 4, 4*S);
      g.fillCircle(bx[4] + 48 + 172, bcy + 8, 2*S);
    }

    // ── 6. Shield ──
    EnemyRenderer.shieldPickup(g, bx[5], by);
    BulletRenderer.shieldBubble(g, bx[5] + 8*S, bcy, f, 6*S);

    // ── 7. Heart ──
    const heartBob = Math.sin(f * 0.06) * 4;
    EnemyRenderer.heartPickup(g, bx[6], by + heartBob);

    // State indicator
    this.stateText.setText(`Cycle: ${cyclePos}/${cycleLength} | Frame: ${f}`);
  }

  _updatePlayerLabel(state, desc, idx) {
    if (this._lastStateIdx !== idx || this.frame % 5 === 0) {
      this.playerStateLabel.setText(`State: ${state}`);
      this.playerDescLabel.setText(desc);
      this._lastStateIdx = idx;
    }
  }

  _updateEnemyLabel(type, action, idx) {
    if (this._lastEnemyIdx !== idx || this.frame % 5 === 0) {
      if (type === 'A') {
        this._rusherStateLabel.setText(`A: "Rusher" - ${action}`);
      } else if (type === 'B') {
        this._marksmanStateLabel.setText(`B: "Marksman" - ${action}`);
      }
      this._lastEnemyIdx = idx;
    }
  }

  _updateTurretLabel(state, desc) {
    if (this.frame % 5 === 0) {
      this._turretLabel.setText(`Static Turret — ${state}`);
      this._turretDescLabel.setText(desc);
    }
  }

  _updateWalkerLabel(phase, state, desc) {
    if (this.frame % 5 === 0) {
      if (phase === 1) {
        this._walkerP1Label.setText(`Armored Walker P1 — ${state}`);
        this._walkerP1Desc.setText(desc);
      } else {
        this._walkerP2Label.setText(`Armored Walker P2 — ${state}`);
        this._walkerP2Desc.setText(desc);
      }
    }
  }
};
