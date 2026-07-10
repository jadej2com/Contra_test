// ─── Map Viewer — Full Map Scroll Demo ──
// Auto-scrolls through the entire 11200px map with all 11 layers (8 backgrounds + 3 foregrounds)

var MapViewerScene = class extends Phaser.Scene {
  constructor() {
    super({ key: 'MapViewerScene' });
    this.W = 1024;
    this.H = 700;
    this.mapW = 11200;
    this.frame = 0;
    this.scrollX = 0;
  }

  create() {
    this.layerBg = this.add.graphics();
    this.layerMap = this.add.graphics();

    MapRenderer.drawBackground(this.layerBg);

    this.add.text(10, 10, 'MAP VIEWER — ' + this.mapW + 'x' + this.H + ' (16:1)', {
      fontFamily: '"Courier New", monospace', fontSize: '11px', color: '#aaccee',
    });
    this.infoText = this.add.text(this.W - 10, 10, '', {
      fontFamily: '"Courier New", monospace', fontSize: '10px', color: '#667788',
    }).setOrigin(1, 0);

    console.log('[MapViewerScene] created, map=' + this.mapW + 'x' + this.H);
  }

  update() {
    this.frame++;
    this.scrollX += 1;
    if (this.scrollX > this.mapW - this.W) this.scrollX = 0;

    this.layerMap.clear();
    MapRenderer.draw(this.layerMap, this.scrollX, this.frame);

    if (this.frame % 60 === 0) {
      this.infoText.setText('x:' + this.scrollX + '/' + this.mapW + '  f:' + this.frame);
    }
  }
};
