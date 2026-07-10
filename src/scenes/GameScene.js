// ─── GameScene — Playable Contra prototype with physics, enemies, combat ──

var GameScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function GameScene() {
    Phaser.Scene.call(this, { key: 'GameScene' });
  },

  create: function() {
    // ── Input ──
    this.keys = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      shoot: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };

    // ── Player ──
    this.player = {
      x: 1000, y: 200, w: 16*S, h: 24*S,
      vx: 0, vy: 0,
      grounded: false,
      facing: 1,
      alive: true,
      fireTimer: 0,
      animFrame: 0,
      state: 'idle',
      invTimer: 0,
    };

    // ── Collision surfaces ──
    this.grounds = [];
    this._buildGrounds();

    // ── Enemies ──
    this.enemies = [];
    this._spawnEnemies();

    // ── Bullets ──
    this.bullets = [];

    // ── Camera / scroll ──
    this.scrollX = this.player.x - this.W / 2 + this.player.w;
    this.frame = 0;
    this.W = 1024;
    this.H = 700;

    // ── Graphics ──
    this.bgGfx = this.add.graphics();
    this.fgGfx = this.add.graphics();

    // ── Info ──
    this.info = this.add.text(8, 8, '', {
      font: '11px Courier New', fill: '#aabbcc',
    });

    console.log('[GameScene] create OK, grounds=' + this.grounds.length + ' enemies=' + this.enemies.length);
  },

  update: function() {
    try {
      this.frame++;
      this._handleInput();
      this._updatePlayer();
      this._updateEnemies();
      this._updateBullets();
      this._updateCamera();
      this._render();
    } catch (e) {
      // Show error on screen for debugging
      this.fgGfx.clear();
      this.fgGfx.fillStyle(0xff0000);
      this.fgGfx.fillRect(0, 0, 1024, 700);
      this.info.setText('ERROR: ' + e.message);
    }
  },

  // ── Build collision ground list ──
  _buildGrounds: function() {
    var gs = [];
    // Terrain segments (split to avoid overlap with fortress)
    LGROUND.forEach(function(s) {
      var ty = s.y + GY;
      // Split each unit terrain to leave room for fortress (first 1000px of unit 0)
      // Unit 0: x=0-1000 is fortress area, x=1000+ is plain terrain
      // All other units: continuous terrain
      for (var u = 0; u < 4; u++) {
        var ux = u * 3200;
        if (s.x >= ux && s.x < ux + 3200) {
          var segStart = Math.max(s.x, ux);
          var segEnd = Math.min(s.x + s.w, ux + 3200);
          if (u === 0) {
            // Fortress area: only terrain AFTER x=900
            if (segEnd > 900) {
              gs.push({ x: Math.max(segStart, 900), y: ty, w: segEnd - Math.max(segStart, 900), h: 700 - ty });
            }
            // Terrain BEFORE x=50 (left of fortress)
            if (segStart < 50) {
              gs.push({ x: segStart, y: ty, w: Math.min(segEnd, 50) - segStart, h: 700 - ty });
            }
          } else {
            gs.push({ x: segStart, y: ty, w: segEnd - segStart, h: 700 - ty });
          }
        }
      }
    });
    // Fortress platforms (first unit only)
    var fortSurfaces = this._getFortressPlatforms();
    fortSurfaces.forEach(function(f) {
      gs.push({ x: f.x, y: f.y + GY, w: f.w, h: 8*S });
    });
    this.grounds = gs;
  },

  // ── Fortress platform data (used for collision + spawning) ──
  _getFortressPlatforms: function() {
    return [
      { x:270, y:540, w:720, label:'upper' },
      { x:470, y:610, w:400, label:'midR' },
      { x:120, y:590, w:280, label:'midL' },
      { x:50,  y:650, w:800, label:'bottom' },
    ];
  },

  // ── Spawn enemies ──
  _spawnEnemies: function() {
    var e = this.enemies;
    // Ground patrols (unit 0, beyond fortress area)
    e.push({ x:1100, y:0, w:14*S, h:22*S, vx:-0.8, alive:true, type:'rusher', anim:0 });
    e.push({ x:1400, y:0, w:14*S, h:22*S, vx:0.8, alive:true, type:'rusher', anim:0 });
    e.push({ x:1800, y:0, w:14*S, h:22*S, vx:-0.8, alive:true, type:'marksman', anim:0 });
    e.push({ x:2200, y:0, w:14*S, h:22*S, vx:0.8, alive:true, type:'rusher', anim:0 });
    e.push({ x:2700, y:0, w:14*S, h:22*S, vx:-0.8, alive:true, type:'marksman', anim:0 });
    // Fortress platform enemies
    var forts = this._getFortressPlatforms();
    e.push({ x:forts[0].x + 100, y:0, w:14*S, h:22*S, vx:-0.5, alive:true, type:'marksman', anim:0, onFort:true, minX:forts[0].x+10, maxX:forts[0].x+forts[0].w-10 });
    e.push({ x:forts[2].x + 60,  y:0, w:14*S, h:22*S, vx:0.5, alive:true, type:'rusher', anim:0, onFort:true, minX:forts[2].x+10, maxX:forts[2].x+forts[2].w-10 });
    e.push({ x:forts[1].x + 60,  y:0, w:14*S, h:22*S, vx:-0.5, alive:true, type:'rusher', anim:0, onFort:true, minX:forts[1].x+10, maxX:forts[1].x+forts[1].w-10 });
    // Set y to sit on ground/platform
    var self = this;
    e.forEach(function(en) {
      en.y = self._getGroundY(en.x) - en.h;
    });
  },

  // ── Get ground Y at world x ──
  _getGroundY: function(x) {
    var best = 700;
    this.grounds.forEach(function(g) {
      if (x >= g.x && x <= g.x + g.w && g.y < best) {
        best = g.y;
      }
    });
    return best;
  },

  // ── Input ──
  _handleInput: function() {
    var p = this.player;
    if (!p.alive) return;
    var k = this.keys;
    // Horizontal movement
    if (k.left.isDown) { p.vx = -4; p.facing = -1; }
    else if (k.right.isDown) { p.vx = 4; p.facing = 1; }
    else { p.vx *= 0.7; if (Math.abs(p.vx) < 0.3) p.vx = 0; }
    // Jump
    if ((k.jump.isDown || k.up.isDown || k.space.isDown) && p.grounded) {
      p.vy = -9;
      p.grounded = false;
    }
    // Shoot
    p.fireTimer = Math.max(0, p.fireTimer - 1);
    if (k.shoot.isDown && p.fireTimer === 0) {
      this._fireBullet(p.x + p.facing * 20, p.y + 8, p.facing * 8, 0);
      p.fireTimer = 10;
    }
  },

  // ── Fire bullet ──
  _fireBullet: function(x, y, vx, vy) {
    this.bullets.push({
      x: x, y: y, vx: vx, vy: vy, w: 4, h: 4,
      life: 120,
    });
  },

  // ── Update player ──
  _updatePlayer: function() {
    var p = this.player;
    if (!p.alive) return;
    // Gravity
    p.vy += 0.45;
    if (p.vy > 12) p.vy = 12;
    // Horizontal
    p.x += p.vx;
    // Collide horizontal with ground edges
    if (p.x < 0) p.x = 0;
    if (p.x > 11000) p.x = 11000;
    // Vertical
    p.y += p.vy;
    p.grounded = false;
    // Check ground collision
    var gy = this._getGroundY(p.x + p.w / 2);
    if (p.y + p.h > gy) {
      // Only snap if falling or resting on ground
      if (p.vy >= 0) {
        p.y = gy - p.h;
        p.vy = 0;
        p.grounded = true;
      }
    }
    // Fall off screen
    if (p.y > this.H + 50) {
      p.x = 1000;
      p.y = 200;
      p.vy = 0;
    }
    // Animation state
    if (!p.grounded) p.state = 'jump';
    else if (Math.abs(p.vx) > 0.5) p.state = 'run';
    else p.state = 'idle';
    p.animFrame = this.frame;
    // Invulnerability
    p.invTimer = Math.max(0, p.invTimer - 1);
  },

  // ── Update enemies ──
  _updateEnemies: function() {
    var self = this;
    this.enemies.forEach(function(e) {
      if (!e.alive) return;
      // Horizontal patrol
      e.x += e.vx;
      // Reverse at bounds
      if (e.minX && e.x < e.minX) { e.x = e.minX; e.vx = Math.abs(e.vx); }
      if (e.maxX && e.x > e.maxX) { e.x = e.maxX; e.vx = -Math.abs(e.vx); }
      // Free patrol for ground enemies
      if (!e.minX) {
        if (!e.origX) e.origX = e.x;
        if (e.x < e.origX - 100) { e.vx = Math.abs(e.vx); }
        if (e.x > e.origX + 100) { e.vx = -Math.abs(e.vx); }
      }
      // Gravity (unless on fortress)
      if (!e.onFort) {
        e.vy = (e.vy || 0) + 0.45;
        if (e.vy > 12) e.vy = 12;
        e.y += e.vy;
        var gy = self._getGroundY(e.x + e.w / 2);
        if (e.y + e.h > gy) {
          e.y = gy - e.h;
          e.vy = 0;
        }
      }
      e.anim = (e.anim || 0) + 1;
      // Check bullet hits
      var hit = false;
      self.bullets.forEach(function(b) {
        if (b.x < e.x + e.w && b.x + b.w > e.x &&
            b.y < e.y + e.h && b.y + b.h > e.y) {
          b.life = 0;
          hit = true;
        }
      });
      if (hit) e.alive = false;
    });
  },

  // ── Update bullets ──
  _updateBullets: function() {
    var self = this;
    this.bullets = this.bullets.filter(function(b) {
      b.x += b.vx;
      b.y += b.vy;
      b.life--;
      // Remove if out of bounds or expired
      if (b.life <= 0 || b.x < self.scrollX - 50 || b.x > self.scrollX + self.W + 50) return false;
      // Check ground hit
      var gy = self._getGroundY(b.x);
      if (b.y > gy) return false;
      return true;
    });
  },

  // ── Update camera ──
  _updateCamera: function() {
    var p = this.player;
    var targetX = p.x - this.W / 2 + p.w;
    this.scrollX += (targetX - this.scrollX) * 0.1;
    if (this.scrollX < 0) this.scrollX = 0;
    if (this.scrollX > 11200 - this.W) this.scrollX = 11200 - this.W;
  },

  // ── Render everything ──
  _render: function() {
    var g = this.bgGfx;
    g.clear();
    // Debug: draw background rectangle
    g.fillStyle(C(20, 30, 50));
    g.fillRect(0, 0, 1024, 700);
    // Map background
    MapRenderer.draw(g, Math.floor(this.scrollX), this.frame);

    var fg = this.fgGfx;
    fg.clear();
    // Player
    if (this.player.alive) {
      this._drawPlayer(fg);
    }
    // Enemies
    var self = this;
    this.enemies.forEach(function(e) {
      if (e.alive) self._drawEnemy(fg, e);
    });
    // Bullets
    this.bullets.forEach(function(b) {
      fg.fillStyle(C(255, 255, 100));
      fg.fillRect(b.x - self.scrollX, b.y, b.w, b.h);
      fg.fillStyle(C(255, 200, 50), 0.5);
      fg.fillRect(b.x - self.scrollX - 1, b.y - 1, b.w + 2, b.h + 2);
    });

    // Info
    this.info.setText(
      'x:' + Math.floor(this.scrollX) + '  y:' + Math.floor(this.player.y) +
      '  vx:' + this.player.vx.toFixed(1) + '  vy:' + this.player.vy.toFixed(1) +
      '  enemies:' + this.enemies.filter(function(e) { return e.alive; }).length
    );
  },

  // ── Draw player ──
  _drawPlayer: function(g) {
    var p = this.player;
    var sx = p.x - this.scrollX;
    var sy = p.y;
    var f = this.frame;
    // Blink when invulnerable
    if (p.invTimer > 0 && Math.floor(f / 3) % 2 === 0) return;
    // Body
    g.fillStyle(C(40, 70, 120));
    g.fillRect(sx, sy, p.w, p.h);
    // Head
    g.fillStyle(C(200, 180, 140));
    g.fillRect(sx + 2, sy, 12*S, 6*S);
    // Bandana
    g.fillStyle(C(150, 30, 30));
    g.fillRect(sx + 2, sy, 12*S, 2*S);
    // Eyes
    g.fillStyle(C(255, 255, 255));
    g.fillRect(sx + (p.facing > 0 ? 8*S : 4*S), sy + 2*S, 3*S, 2*S);
    // Gun
    g.fillStyle(C(80, 80, 80));
    if (p.state === 'idle' || p.state === 'run') {
      g.fillRect(sx + (p.facing > 0 ? p.w - 2 : -6*S), sy + 8*S, 8*S, 3*S);
    } else if (p.state === 'jump') {
      g.fillRect(sx + (p.facing > 0 ? p.w - 2 : -6*S), sy + 4*S, 8*S, 3*S);
    }
    // Legs
    g.fillStyle(C(30, 30, 50));
    if (p.grounded && Math.abs(p.vx) > 0.5) {
      var legOff = Math.sin(f * 0.3) * 3*S;
      g.fillRect(sx + 2*S, sy + p.h - 4*S, 4*S, 4*S);
      g.fillRect(sx + 8*S + legOff, sy + p.h - 4*S, 4*S, 4*S);
    } else if (p.grounded) {
      g.fillRect(sx + 2*S, sy + p.h - 4*S, 4*S, 4*S);
      g.fillRect(sx + 8*S, sy + p.h - 4*S, 4*S, 4*S);
    } else {
      g.fillRect(sx + 2*S, sy + p.h - 3*S, 4*S, 3*S);
      g.fillRect(sx + 8*S, sy + p.h - 3*S - 4*S, 4*S, 3*S);
    }
  },

  // ── Draw enemy ──
  _drawEnemy: function(g, e) {
    var sx = e.x - this.scrollX;
    var sy = e.y;
    // Body
    g.fillStyle(C(150, 30, 30));
    g.fillRect(sx, sy, e.w, e.h);
    // Head
    g.fillStyle(C(220, 180, 120));
    g.fillRect(sx + 2*S, sy, 10*S, 5*S);
    // Beret
    g.fillStyle(C(180, 20, 20));
    g.fillRect(sx + 2*S, sy, 10*S, 2*S);
    // Eyes
    g.fillStyle(C(255, 255, 255));
    g.fillRect(sx + (e.vx > 0 ? 7*S : 4*S), sy + 2*S, 2*S, 2*S);
    // Gun for marksman
    if (e.type === 'marksman') {
      g.fillStyle(C(60, 60, 60));
      g.fillRect(sx + (e.vx > 0 ? e.w - 2 : -5*S), sy + 7*S, 7*S, 2*S);
    }
    // Legs
    g.fillStyle(C(40, 30, 30));
    var legOff = Math.sin(e.anim * 0.2) * 2*S;
    g.fillRect(sx + 2*S + legOff, sy + e.h - 4*S, 4*S, 4*S);
    g.fillRect(sx + 8*S - legOff, sy + e.h - 4*S, 4*S, 4*S);
  },
});
