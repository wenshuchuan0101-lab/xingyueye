(() => {
  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const hintEl = document.getElementById('hint');
  const messageEl = document.getElementById('message');
  const finalMessageEl = document.getElementById('finalMessage');
  const titleEl = document.getElementById('workTitle');
  const subtitleEl = document.getElementById('workSubtitle');

  // 所有可调参数集中放在这里，控制面板和 Canvas 绘制都读取同一个对象。
  const defaultConfig = {
    sceneState: {
      backgroundPrimary: '#020a24',
      backgroundSecondary: '#061645',
      starColor: '#ffdf75',
      moonColor: '#fff2c3',
      inkColor: '#101018',
      brightness: 0.72,
      fog: 0.34,
      explorationState: 'auto',
      beforeBoost: 0,
      afterBoost: 1,
      showRegionOverlay: false,
      transitionDuration: 1.8
    },
    colors: {
      backgroundPrimary: '#020a24',
      backgroundSecondary: '#061645',
      star: '#ffdf75',
      moon: '#fff2c3',
      ink: '#101018',
      tree: '#020203',
      village: '#0a0a0d'
    },
    visual: {
      brightness: 1,
      fog: 0.18,
      explorationState: 'auto',
      beforeBoost: 0,
      afterBoost: 1,
      showRegionOverlay: false
    },
    particles: {
      totalCount: 900,
      skySwirl: 900,
      size: 1.4,
      speed: 1,
      opacity: 0.72,
      spread: 260,
      trail: 0.08,
      shape: 'swirlStroke',
      density: 1,
      randomness: 0.7,
      rotationDirection: 'clockwise',
      rotationStrength: 1,
      rotationSpeed: 1,
      centerX: 0.48,
      centerY: 0.41,
      stars: 42,
      moonDust: 110,
      treeInk: 160,
      villageLights: 20
    },
    swirl: {
      strength: 1,
      speed: 1,
      radius: 320,
      lines: 32
    },
    village: {
      particleCount: 20,
      lightSize: 3.2,
      color: '#0a0a0d',
      lightColor: '#ffdf75',
      width: 0.36,
      height: 0.16,
      x: 0.70,
      y: 0.82,
      houseCount: 9,
      windowBrightness: 0.85,
      opacity: 0.86,
      randomness: 0.45,
      rebuildSeed: 1
    },
    trees: {
      particleCount: 160,
      inkColor: '#101018',
      width: 1,
      height: 1,
      x: 0.14,
      y: 0.78,
      bend: 0.28,
      inkSpread: 0.7,
      opacity: 0.9,
      growthSpeed: 1,
      rebuildSeed: 1
    },
    tree: {
      particleCount: 160,
      inkColor: '#101018',
      width: 1,
      height: 1,
      rebuildSeed: 1
    },
    textEffects: {
      mode: 'fade',
      style: 'fade',
      duration: 1800,
      finalMode: 'fade',
      fontSize: 24,
      letterSpacing: 0,
      color: '#fff5d7',
      glow: 0.65,
      appearSpeed: 0.65,
      disappearSpeed: 0.55,
      particleDensity: 3,
      particleSpread: 140,
      title: '星夜复明',
      subtitle: '情绪的收集与再生',
      loneliness: '孤独像树一样向上生长。',
      anxiety: '焦虑让旋涡加速，天空更近了。',
      desire: '渴望在星群间扩散。',
      hope: '希望被点亮，夜色开始回流。',
      peace: '安宁让村庄的窗户逐一点亮。',
      final: '当你触碰这些情绪，夜晚不再只是被观看，而是在你的手势与凝视中重新生成。'
    },
    camera: {
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0,
      viewRotX: 0,
      viewRotY: 0,
      pseudo3dEnabled: false,
      perspective: 0.55,
      tiltX: 0,
      tiltY: 0,
      autoRotate: false,
      autoRotateSpeed: 0.25
    },
    selection: {
      selected: 'global',
      editMode: 'view',
      localColor: '#ffdf75',
      localTintStrength: 0,
      selectedCount: 0,
      selectionColor: '#fff4d8',
      colorJitter: 0,
      selectionOpacity: 0.85,
      selectionSize: 2.4,
      brushRadius: 80,
      brushStrength: 1,
      densityMode: 'add',
      hope: { color: '#fff2c3', radius: 96 },
      desire: { color: '#ffdf75', radius: 110 },
      anxiety: { color: '#8fb0ff', radius: 180 },
      loneliness: { color: '#101018', radius: 120 },
      peace: { color: '#ffdf75', radius: 120 }
    },
    editMode: {
      enabled: false,
      mode: 'select',
      selectedLayer: 'sky',
      showGuides: true,
      createType: 'point',
      createCount: 40,
      createRadius: 80,
      createColor: '#ffdf75',
      createRandomness: 0.7,
      createInitialSpeed: 0.6,
      createRegion: 'sky'
    },
    regions: {
      selected: 'global',
      localColor: '#ffdf75',
      localTintStrength: 0,
      hope: { color: '#fff2c3', radius: 96 },
      desire: { color: '#ffdf75', radius: 110 },
      anxiety: { color: '#8fb0ff', radius: 180 },
      loneliness: { color: '#101018', radius: 120 },
      peace: { color: '#ffdf75', radius: 120 }
    },
    transform: {
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0
    },
    pseudo3d: {
      enabled: false,
      perspective: 0.16,
      tiltX: 0,
      tiltY: 0
    },
    editor: {
      enabled: false,
      mode: 'select',
      selectedLayer: 'sky',
      showGuides: true
    },
    text: {
      title: '星夜复明',
      subtitle: '情绪的收集与再生',
      loneliness: '孤独像树一样向上生长。',
      anxiety: '焦虑让旋涡加速，天空更近了。',
      desire: '渴望在星群间扩散。',
      hope: '希望被点亮，夜色开始回流。',
      peace: '安宁让村庄的窗户逐一点亮。',
      final: '当你触碰这些情绪，夜晚不再只是被观看，而是在你的手势与凝视中重新生成。'
    },
    collectRadius: 105,
    swirlSpeed: 0.18,
    textDuration: 1800,
    finalThresholdBoost: 1.75
  };
  const CONFIG = cloneConfig(defaultConfig);

  const state = {
    dpr: 1,
    width: 0,
    height: 0,
    time: 0,
    mouse: { x: 0, y: 0, active: false },
    hoverKey: null,
    final: false,
    finalStarted: 0,
    flash: { text: '', key: null, until: 0, started: 0 },
    visualTransition: {
      value: 0,
      from: 0,
      target: 0,
      started: 0
    },
    selectionTool: {
      active: false,
      dragging: false,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    },
    cameraTool: {
      active: false,
      mode: null,
      lastX: 0,
      lastY: 0,
      spaceDown: false
    },
    editTool: {
      active: false,
      mode: null,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      centerX: 0,
      centerY: 0,
      originals: []
    },
    collected: {
      hope: false,
      desire: false,
      anxiety: false,
      loneliness: false,
      peace: false
    }
  };

  // 五个情绪区域，采用“提取元素”而非直接复制原作的方式来组织画面。
  const regions = {
    hope: {
      key: 'hope',
      label: '希望',
      center: { x: 0.77, y: 0.18 },
      radius: 96
    },
    desire: {
      key: 'desire',
      label: '渴望',
      center: { x: 0.60, y: 0.23 },
      radius: 110
    },
    anxiety: {
      key: 'anxiety',
      label: '焦虑',
      center: { x: 0.48, y: 0.42 },
      radius: 180
    },
    loneliness: {
      key: 'loneliness',
      label: '孤独',
      center: { x: 0.14, y: 0.76 },
      radius: 120
    },
    peace: {
      key: 'peace',
      label: '安宁',
      center: { x: 0.72, y: 0.81 },
      radius: 120
    }
  };

  const swirlParticles = [];
  const stars = [];
  const moonDust = [];
  const treeInk = [];
  const villageLights = [];
  let particleSystem;
  let villageParticleGroup;
  let treeParticleGroup;
  let textParticleGroup;

  const moon = { glow: 0, pulse: 0 };
  const desire = { boost: 0 };
  const anxiety = { boost: 0 };
  const loneliness = { growth: 0 };
  const peace = { glow: 0 };

  class ParticleSystem {
    constructor(config, widthGetter, heightGetter) {
      this.config = config;
      this.widthGetter = widthGetter;
      this.heightGetter = heightGetter;
      this.particles = [];
    }

    rebuild() {
      // 根据总数量和密度重新生成粒子，粒子对象预留 z/vz 供后续 3D 视角使用。
      const count = Math.round(clamp(this.config.particles.totalCount * this.config.particles.density, 100, 8000));
      this.particles.length = 0;
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle(i));
      }
    }

    createParticle(index) {
      const width = Math.max(1, this.widthGetter());
      const height = Math.max(1, this.heightGetter());
      const ring = Math.pow(Math.random(), 0.72);
      const angle = Math.random() * Math.PI * 2;
      const baseRadius = ring * 0.46 + 0.02;
      const cx = width * this.config.particles.centerX;
      const cy = height * this.config.particles.centerY;
      const radius = baseRadius * Math.min(width, height) * 0.72;
      const color = Math.random() < 0.7 ? this.config.colors.star : this.config.colors.ink;
      const region = this.pickRegion(index);
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius * 0.82,
        z: rand(-1, 1),
        vx: rand(-0.35, 0.35),
        vy: rand(-0.35, 0.35),
        vz: rand(-0.02, 0.02),
        size: rand(0.7, 2.2),
        color,
        alpha: rand(0.45, 1),
        group: 'skySwirl',
        region,
        angle,
        radius: baseRadius,
        speed: rand(0.10, 0.42),
        wobble: rand(0.8, 2.4),
        phase: Math.random() * Math.PI * 2,
        life: Math.random(),
        tint: color === this.config.colors.star ? 'star' : 'ink',
        flowSign: Math.random() < 0.5 ? -1 : 1,
        selected: false,
        customColor: null,
        customAlpha: null,
        customSize: null
      };
    }

    pickRegion(index) {
      // 粒子区域按场景图层分组，后续可单独控制天空、月亮、村庄、树木和文字粒子。
      const keys = ['sky', 'moon', 'stars', 'swirl', 'village', 'tree', 'text', 'emotion'];
      return keys[index % keys.length];
    }

    clearSelection() {
      // 清空当前粒子选区。
      for (const particle of this.particles) particle.selected = false;
      this.updateSelectionCount();
    }

    selectInRect(rect, append = false) {
      // 使用矩形框选粒子，坐标直接使用 Canvas 屏幕坐标。
      if (!append) this.clearSelection();
      const left = Math.min(rect.x1, rect.x2);
      const right = Math.max(rect.x1, rect.x2);
      const top = Math.min(rect.y1, rect.y2);
      const bottom = Math.max(rect.y1, rect.y2);
      for (const particle of this.particles) {
        if (particle.x >= left && particle.x <= right && particle.y >= top && particle.y <= bottom) {
          particle.selected = true;
        }
      }
      this.updateSelectionCount();
    }

    selectWithBrush(x, y, radius, append = true) {
      // 使用圆形笔刷选择粒子。
      if (!append) this.clearSelection();
      const rr = radius * radius;
      for (const particle of this.particles) {
        const dx = particle.x - x;
        const dy = particle.y - y;
        if (dx * dx + dy * dy <= rr) particle.selected = true;
      }
      this.updateSelectionCount();
    }

    deselectWithBrush(x, y, radius) {
      // 使用圆形笔刷取消选择粒子。
      const rr = radius * radius;
      for (const particle of this.particles) {
        const dx = particle.x - x;
        const dy = particle.y - y;
        if (dx * dx + dy * dy <= rr) particle.selected = false;
      }
      this.updateSelectionCount();
    }

    applyColorToSelection() {
      // 只把局部颜色、透明度和大小应用到选中的粒子，不影响其它粒子。
      for (const particle of this.particles) {
        if (!particle.selected) continue;
        particle.customColor = this.jitterColor(this.config.selection.selectionColor, this.config.selection.colorJitter);
        particle.customAlpha = this.config.selection.selectionOpacity;
        particle.customSize = this.config.selection.selectionSize;
        particle.tint = 'custom';
      }
    }

    paintDensity(x, y, mode) {
      // 在鼠标附近增加或减少粒子，用于区域密度绘制。
      const radius = this.config.selection.brushRadius;
      const amount = Math.max(1, Math.round(this.config.selection.brushStrength * 8));
      if (mode === 'remove') {
        const rr = radius * radius;
        this.particles = this.particles.filter((particle) => {
          const dx = particle.x - x;
          const dy = particle.y - y;
          return dx * dx + dy * dy > rr || Math.random() > 0.55;
        });
      } else {
        for (let i = 0; i < amount; i++) {
          const particle = this.createParticle(this.particles.length + i);
          const a = Math.random() * Math.PI * 2;
          const d = Math.sqrt(Math.random()) * radius;
          particle.x = x + Math.cos(a) * d;
          particle.y = y + Math.sin(a) * d;
          particle.region = this.config.selection.selected === 'global' ? 'emotion' : this.config.selection.selected;
          this.particles.push(particle);
        }
      }
      this.updateSelectionCount();
    }

    jitterColor(hex, amount) {
      // 给选区颜色加入轻微随机扰动，模拟手工上色的不均匀感。
      const c = hexToRgb(hex);
      const jitter = () => Math.round(rand(-255 * amount, 255 * amount));
      const r = clamp(c.r + jitter(), 0, 255);
      const g = clamp(c.g + jitter(), 0, 255);
      const b = clamp(c.b + jitter(), 0, 255);
      return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
    }

    updateSelectionCount() {
      // 把选中粒子数量同步到 config，控制台可实时显示。
      this.config.selection.selectedCount = this.particles.filter((particle) => particle.selected).length;
    }
  }

  class VillageParticleGroup {
    constructor(config, widthGetter, heightGetter) {
      this.config = config;
      this.widthGetter = widthGetter;
      this.heightGetter = heightGetter;
      this.particles = [];
    }

    rebuild() {
      // 使用粒子重建远处村庄，包括房屋、屋顶、窗户和地平线。
      this.particles.length = 0;
      const count = Math.max(30, Math.round(this.config.village.particleCount));
      const houseCount = Math.max(1, Math.round(this.config.village.houseCount));
      const width = this.widthGetter();
      const height = this.heightGetter();
      const baseX = width * this.config.village.x;
      const baseY = height * this.config.village.y;
      const villageW = width * this.config.village.width;
      const villageH = height * this.config.village.height;
      for (let i = 0; i < count; i++) {
        const houseIndex = i % houseCount;
        const houseX = baseX - villageW * 0.5 + (houseIndex / Math.max(1, houseCount - 1)) * villageW;
        const localW = villageW / houseCount * rand(0.55, 1.15);
        const localH = villageH * rand(0.18, 0.52);
        const kindRoll = Math.random();
        let x = houseX + rand(-localW * 0.42, localW * 0.42);
        let y = baseY - rand(0, localH);
        let group = 'house';
        let color = this.config.village.color;
        let alpha = this.config.village.opacity * rand(0.35, 0.95);
        let size = rand(0.8, 2.4);

        if (kindRoll > 0.62 && kindRoll <= 0.82) {
          // 屋顶粒子沿斜线分布，替代硬边三角屋顶。
          const roofT = rand(-1, 1);
          x = houseX + roofT * localW * 0.52;
          y = baseY - localH - (1 - Math.abs(roofT)) * localH * 0.36 + rand(-2, 2);
          group = 'roof';
          alpha *= 0.95;
        } else if (kindRoll > 0.82 && kindRoll <= 0.93) {
          // 窗户粒子在探索后或安宁收集后变暖变亮。
          x = houseX + rand(-localW * 0.22, localW * 0.22);
          y = baseY - rand(localH * 0.15, localH * 0.75);
          group = 'window';
          color = this.config.village.lightColor;
          alpha = this.config.village.opacity * this.config.village.windowBrightness;
          size = this.config.village.lightSize * rand(0.65, 1.2);
        } else if (kindRoll > 0.93) {
          // 远处小路和地平线粒子让村庄底部不再是硬边。
          x = baseX + rand(-villageW * 0.6, villageW * 0.6);
          y = baseY + rand(-villageH * 0.05, villageH * 0.12);
          group = 'horizon';
          alpha *= 0.5;
        }

        const jitter = this.config.village.randomness * 10;
        this.particles.push(this.createParticle(x + rand(-jitter, jitter), y + rand(-jitter, jitter), size, color, alpha, group));
      }
    }

    createParticle(x, y, size, color, alpha, group) {
      // 村庄粒子保留与主粒子一致的字段，便于区域选择工具统一处理。
      return {
        x, y, z: rand(-0.2, 0.2),
        vx: rand(-0.05, 0.05),
        vy: rand(-0.04, 0.04),
        vz: rand(-0.01, 0.01),
        size, color, alpha, group,
        region: 'village',
        selected: false,
        customColor: null,
        customAlpha: null,
        customSize: null,
        phase: Math.random() * Math.PI * 2
      };
    }

    draw(ctx, time, collectedPeace, finalVisual) {
      // 探索前粒子更暗更稀疏，探索后和安宁收集后窗户升温。
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const visualProgress = getVisualProgress();
      const completeness = 0.38 + visualProgress * 0.62;
      const warmBoost = collectedPeace ? 1.45 : 1;
      for (let i = 0; i < this.particles.length * completeness; i++) {
        const p = this.particles[i];
        const flicker = p.group === 'window' ? 0.72 + 0.28 * Math.sin(time * 0.004 + p.phase) : 1;
        const color = p.customColor || p.color;
        const windowGate = p.group === 'window' ? (collectedPeace || visualProgress > 0.82 ? 1 : 0.08) : 1;
        const projected = projectParticle(p, p.x, p.y, p.customSize ?? p.size);
        const alpha = (p.customAlpha ?? p.alpha) * projected.alpha * flicker * (p.group === 'window' ? warmBoost : 1) * windowGate * (0.45 + visualProgress * 0.55);
        const displayColor = collectedPeace && p.group === 'window' && !p.customColor ? '#ffd27a' : color;
        ctx.fillStyle = rgba(displayColor, clamp(alpha, 0, 1));
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, projected.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.selected) drawSelectedParticleHighlight(projected.x, projected.y, projected.size);
      }
      ctx.restore();
    }
  }

  class TreeParticleGroup {
    constructor(config, widthGetter, heightGetter) {
      this.config = config;
      this.widthGetter = widthGetter;
      this.heightGetter = heightGetter;
      this.particles = [];
    }

    rebuild() {
      // 用树干、树冠、向上墨迹和边缘发散粒子组成柏树。
      this.particles.length = 0;
      const count = Math.max(40, Math.round(this.config.trees.particleCount));
      const width = this.widthGetter();
      const height = this.heightGetter();
      const baseX = width * this.config.trees.x;
      const baseY = height * this.config.trees.y;
      const treeW = width * 0.13 * this.config.trees.width;
      const treeH = height * 0.55 * this.config.trees.height;
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        const upward = Math.pow(Math.random(), 0.55);
        const centerY = baseY - upward * treeH;
        const bend = Math.sin(upward * Math.PI) * treeW * this.config.trees.bend;
        const radius = treeW * (0.08 + (1 - upward) * 0.55) * rand(0.35, 1);
        let x = baseX + bend + rand(-radius, radius);
        let y = centerY + rand(-treeH * 0.025, treeH * 0.025);
        let group = 'crown';
        let size = rand(1.2, 3.8);
        if (t < 0.18) {
          group = 'trunk';
          x = baseX + bend * 0.35 + rand(-treeW * 0.07, treeW * 0.07);
          y = baseY - rand(0, treeH * 0.72);
          size = rand(1.4, 3.2);
        } else if (t > 0.78 && t <= 0.9) {
          group = 'inkGrowth';
          x = baseX + bend + rand(-treeW * 0.16, treeW * 0.16);
          y = baseY - treeH * rand(0.55, 1.18);
          size = rand(0.9, 2.6);
        } else if (t > 0.9) {
          group = 'edge';
          x = baseX + bend + (Math.random() < 0.5 ? -1 : 1) * radius * rand(0.8, 1.8);
          y = centerY + rand(-treeH * 0.04, treeH * 0.04);
          size = rand(0.8, 2.2);
        }
        this.particles.push(this.createParticle(x, y, size, group));
      }
    }

    createParticle(x, y, size, group) {
      // 树木粒子同样带 region 字段，可被选择和局部改色。
      return {
        x, y, z: rand(-0.4, 0.4),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.22, -0.02),
        vz: rand(-0.01, 0.01),
        size,
        color: this.config.trees.inkColor,
        alpha: this.config.trees.opacity * rand(0.38, 0.95),
        group,
        region: 'tree',
        selected: false,
        customColor: null,
        customAlpha: null,
        customSize: null,
        phase: Math.random() * Math.PI * 2
      };
    }

    draw(ctx, time, collectedLoneliness, finalVisual) {
      // 孤独收集后，树木粒子向上生长；探索后整体更完整但仍保持柔软边缘。
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const visualProgress = getVisualProgress();
      const completeness = 0.42 + visualProgress * 0.58;
      const growth = collectedLoneliness ? this.config.trees.growthSpeed : visualProgress * 0.25;
      for (let i = 0; i < this.particles.length * completeness; i++) {
        const p = this.particles[i];
        const rise = (p.group === 'inkGrowth' || p.group === 'edge') ? growth * Math.sin(time * 0.0015 + p.phase) * this.config.trees.inkSpread * 10 : 0;
        const color = p.customColor || p.color;
        const px = p.x + p.vx * growth * 8;
        const py = p.y - Math.abs(rise);
        const projected = projectParticle(p, px, py, p.customSize ?? p.size);
        const alpha = (p.customAlpha ?? p.alpha) * projected.alpha * (p.group === 'edge' ? 0.72 : 1) * (0.6 + visualProgress * 0.4);
        ctx.fillStyle = rgba(color, clamp(alpha, 0, 1));
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, projected.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.selected) drawSelectedParticleHighlight(projected.x, projected.y, projected.size);
      }
      ctx.restore();
    }
  }

  class TextParticleGroup {
    constructor(config, widthGetter, heightGetter) {
      this.config = config;
      this.widthGetter = widthGetter;
      this.heightGetter = heightGetter;
      this.particles = [];
      this.text = '';
      this.kind = 'emotion';
      this.started = 0;
    }

    setText(text, kind, started) {
      // 更新当前回应文字，并通过离屏 Canvas 采样文字像素生成文字粒子。
      this.text = text || '';
      this.kind = kind;
      this.started = started || performance.now();
      this.rebuild();
    }

    rebuild() {
      this.particles.length = 0;
      if (!this.text) return;
      const fontSize = this.kind === 'final'
        ? Math.max(this.config.textEffects.fontSize, 22)
        : this.config.textEffects.fontSize;
      const lines = wrapTextLines(this.text, Math.min(this.widthGetter() * 0.78, 820), fontSize);
      const off = document.createElement('canvas');
      const octx = off.getContext('2d');
      off.width = Math.ceil(Math.min(this.widthGetter() * 0.86, 900));
      off.height = Math.ceil(lines.length * fontSize * 1.6 + 60);
      octx.clearRect(0, 0, off.width, off.height);
      octx.fillStyle = '#ffffff';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.font = `600 ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`;
      for (let i = 0; i < lines.length; i++) {
        octx.fillText(lines[i], off.width / 2, 38 + i * fontSize * 1.55);
      }
      const image = octx.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(2, Math.round(9 - this.config.textEffects.particleDensity));
      const originX = this.widthGetter() / 2 - off.width / 2;
      const originY = this.kind === 'final'
        ? this.heightGetter() * 0.64 - off.height / 2
        : this.heightGetter() * 0.48 - off.height / 2;
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const alpha = image[(y * off.width + x) * 4 + 3];
          if (alpha < 80) continue;
          const tx = originX + x;
          const ty = originY + y;
          const spread = this.config.textEffects.particleSpread;
          this.particles.push({
            x: tx + rand(-spread, spread),
            y: ty + rand(-spread, spread),
            z: rand(-0.5, 0.5),
            vx: rand(-0.35, 0.35),
            vy: rand(-0.35, 0.35),
            vz: rand(-0.01, 0.01),
            targetX: tx,
            targetY: ty,
            size: rand(0.8, 2.2),
            color: this.config.textEffects.color,
            alpha: alpha / 255,
            group: this.kind === 'final' ? 'finalText' : 'emotionText',
            region: 'text',
            selected: false,
            customColor: null,
            customAlpha: null,
            customSize: null,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }

    draw(ctx, time) {
      // 根据文字出现样式绘制艺术装置式文字回应。
      if (!this.text) return;
      const progress = clamp((time - this.started) / Math.max(1, this.config.textEffects.appearSpeed * 1200), 0, 1);
      if (['particleGather', 'inkReveal', 'starFlicker'].includes(this.config.textEffects.style)) {
        this.drawParticles(ctx, time, progress);
      }
    }

    drawParticles(ctx, time, progress) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const p of this.particles) {
        const eased = 1 - Math.pow(1 - progress, 3);
        const mist = this.config.textEffects.style === 'inkReveal';
        const flicker = this.config.textEffects.style === 'starFlicker'
          ? 0.45 + 0.55 * Math.sin(time * 0.01 + p.phase)
          : 1;
        p.x += (p.targetX - p.x) * 0.055 * this.config.textEffects.appearSpeed;
        p.y += (p.targetY - p.y) * 0.055 * this.config.textEffects.appearSpeed;
        const color = p.customColor || p.color;
        const projected = projectParticle(p, p.x, p.y, (p.customSize ?? p.size) * (mist ? 2.2 : 1));
        const alpha = (p.customAlpha ?? p.alpha) * projected.alpha * eased * flicker;
        ctx.fillStyle = rgba(color, clamp(alpha, 0, 1));
        ctx.shadowColor = color;
        ctx.shadowBlur = this.config.textEffects.glow * 18;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, projected.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.selected) drawSelectedParticleHighlight(projected.x, projected.y, projected.size);
      }
      ctx.restore();
    }
  }

  particleSystem = new ParticleSystem(CONFIG, () => state.width, () => state.height);
  villageParticleGroup = new VillageParticleGroup(CONFIG, () => state.width, () => state.height);
  treeParticleGroup = new TreeParticleGroup(CONFIG, () => state.width, () => state.height);
  textParticleGroup = new TextParticleGroup(CONFIG, () => state.width, () => state.height);

  for (const GroupClass of [VillageParticleGroup, TreeParticleGroup, TextParticleGroup]) {
    GroupClass.prototype.clearSelection = ParticleSystem.prototype.clearSelection;
    GroupClass.prototype.selectInRect = ParticleSystem.prototype.selectInRect;
    GroupClass.prototype.selectWithBrush = ParticleSystem.prototype.selectWithBrush;
    GroupClass.prototype.deselectWithBrush = ParticleSystem.prototype.deselectWithBrush;
    GroupClass.prototype.applyColorToSelection = ParticleSystem.prototype.applyColorToSelection;
    GroupClass.prototype.jitterColor = ParticleSystem.prototype.jitterColor;
    GroupClass.prototype.updateSelectionCount = ParticleSystem.prototype.updateSelectionCount;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function cloneConfig(source) {
    return JSON.parse(JSON.stringify(source));
  }

  function deepMerge(target, source) {
    for (const key of Object.keys(source || {})) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  function hexToRgb(hex) {
    const normalized = hex.replace('#', '');
    const num = parseInt(normalized, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function rgba(hex, alpha) {
    const c = hexToRgb(hex);
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
  }

  function wrapTextLines(text, maxWidth, fontSize) {
    // 用离屏 Canvas 测量文本宽度，把长文案拆成多行，保证课堂展示清晰可读。
    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    octx.font = `600 ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`;
    const lines = [];
    let line = '';
    for (const char of text) {
      const next = line + char;
      if (octx.measureText(next).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function applyTextConfig() {
    titleEl.textContent = CONFIG.text.title;
    subtitleEl.textContent = CONFIG.text.subtitle;
    finalMessageEl.textContent = CONFIG.text.final;
    document.documentElement.style.setProperty('--text-art-size', `${CONFIG.textEffects.fontSize}px`);
    document.documentElement.style.setProperty('--text-art-spacing', `${CONFIG.textEffects.letterSpacing}px`);
    document.documentElement.style.setProperty('--text-art-color', CONFIG.textEffects.color);
    document.documentElement.style.setProperty('--text-art-glow', `${CONFIG.textEffects.glow * 24}px`);
    const styleClass = `text-style-${CONFIG.textEffects.style}`;
    messageEl.className = `center-message ${styleClass}`;
    finalMessageEl.className = state.final
      ? `final-message show ${styleClass}`
      : `final-message ${styleClass}`;
  }

  function syncEditorConfig() {
    // 第一阶段采用新 config 结构作为控制台入口，再同步到现有绘制字段，避免破坏原玩法。
    if (!CONFIG.particles.totalCount) CONFIG.particles.totalCount = CONFIG.particles.skySwirl || 900;
    if (CONFIG.particles.shape === 'line') CONFIG.particles.shape = 'swirlStroke';
    if (CONFIG.particles.shape === 'dot') CONFIG.particles.shape = 'starDust';
    if (CONFIG.particles.shape === 'dash') CONFIG.particles.shape = 'shortStroke';
    if (CONFIG.particles.rotationDirection === 1) CONFIG.particles.rotationDirection = 'clockwise';
    if (CONFIG.particles.rotationDirection === -1) CONFIG.particles.rotationDirection = 'counterclockwise';
    if (CONFIG.particles.randomness === undefined) CONFIG.particles.randomness = 0.7;
    if (CONFIG.particles.rotationStrength === undefined) CONFIG.particles.rotationStrength = 1;
    if (CONFIG.particles.rotationSpeed === undefined) CONFIG.particles.rotationSpeed = 1;
    if (CONFIG.particles.centerX === undefined) CONFIG.particles.centerX = 0.48;
    if (CONFIG.particles.centerY === undefined) CONFIG.particles.centerY = 0.41;
    if (!CONFIG.selection.editMode) CONFIG.selection.editMode = 'view';
    if (CONFIG.selection.selectedCount === undefined) CONFIG.selection.selectedCount = 0;
    if (!CONFIG.selection.selectionColor) CONFIG.selection.selectionColor = '#fff4d8';
    if (CONFIG.selection.colorJitter === undefined) CONFIG.selection.colorJitter = 0;
    if (CONFIG.selection.selectionOpacity === undefined) CONFIG.selection.selectionOpacity = 0.85;
    if (CONFIG.selection.selectionSize === undefined) CONFIG.selection.selectionSize = 2.4;
    if (CONFIG.selection.brushRadius === undefined) CONFIG.selection.brushRadius = 80;
    if (CONFIG.selection.brushStrength === undefined) CONFIG.selection.brushStrength = 1;
    if (!CONFIG.selection.densityMode) CONFIG.selection.densityMode = 'add';
    if (CONFIG.village.width === undefined) CONFIG.village.width = 0.36;
    if (CONFIG.village.height === undefined) CONFIG.village.height = 0.16;
    if (CONFIG.village.x === undefined) CONFIG.village.x = 0.70;
    if (CONFIG.village.y === undefined) CONFIG.village.y = 0.82;
    if (CONFIG.village.houseCount === undefined) CONFIG.village.houseCount = 9;
    if (CONFIG.village.windowBrightness === undefined) CONFIG.village.windowBrightness = 0.85;
    if (CONFIG.village.opacity === undefined) CONFIG.village.opacity = 0.86;
    if (CONFIG.village.randomness === undefined) CONFIG.village.randomness = 0.45;
    if (CONFIG.trees.x === undefined) CONFIG.trees.x = 0.14;
    if (CONFIG.trees.y === undefined) CONFIG.trees.y = 0.78;
    if (CONFIG.trees.bend === undefined) CONFIG.trees.bend = 0.28;
    if (CONFIG.trees.inkSpread === undefined) CONFIG.trees.inkSpread = 0.7;
    if (CONFIG.trees.opacity === undefined) CONFIG.trees.opacity = 0.9;
    if (CONFIG.trees.growthSpeed === undefined) CONFIG.trees.growthSpeed = 1;
    if (CONFIG.sceneState.transitionDuration === undefined) CONFIG.sceneState.transitionDuration = 1.8;
    if (!CONFIG.textEffects.style) CONFIG.textEffects.style = CONFIG.textEffects.mode || 'fade';
    if (CONFIG.textEffects.fontSize === undefined) CONFIG.textEffects.fontSize = 24;
    if (CONFIG.textEffects.letterSpacing === undefined) CONFIG.textEffects.letterSpacing = 0;
    if (!CONFIG.textEffects.color) CONFIG.textEffects.color = '#fff5d7';
    if (CONFIG.textEffects.glow === undefined) CONFIG.textEffects.glow = 0.65;
    if (CONFIG.textEffects.appearSpeed === undefined) CONFIG.textEffects.appearSpeed = 0.65;
    if (CONFIG.textEffects.disappearSpeed === undefined) CONFIG.textEffects.disappearSpeed = 0.55;
    if (CONFIG.textEffects.particleDensity === undefined) CONFIG.textEffects.particleDensity = 3;
    if (CONFIG.textEffects.particleSpread === undefined) CONFIG.textEffects.particleSpread = 140;
    if (CONFIG.camera.viewRotX === undefined) CONFIG.camera.viewRotX = 0;
    if (CONFIG.camera.viewRotY === undefined) CONFIG.camera.viewRotY = 0;
    if (CONFIG.camera.perspective === undefined) CONFIG.camera.perspective = 0.55;
    if (CONFIG.camera.autoRotate === undefined) CONFIG.camera.autoRotate = false;
    if (CONFIG.camera.autoRotateSpeed === undefined) CONFIG.camera.autoRotateSpeed = 0.25;
    if (!CONFIG.editMode.createType) CONFIG.editMode.createType = 'point';
    if (CONFIG.editMode.createCount === undefined) CONFIG.editMode.createCount = 40;
    if (CONFIG.editMode.createRadius === undefined) CONFIG.editMode.createRadius = 80;
    if (!CONFIG.editMode.createColor) CONFIG.editMode.createColor = '#ffdf75';
    if (CONFIG.editMode.createRandomness === undefined) CONFIG.editMode.createRandomness = 0.7;
    if (CONFIG.editMode.createInitialSpeed === undefined) CONFIG.editMode.createInitialSpeed = 0.6;
    if (!CONFIG.editMode.createRegion) CONFIG.editMode.createRegion = 'sky';

    CONFIG.colors.backgroundPrimary = CONFIG.sceneState.backgroundPrimary;
    CONFIG.colors.backgroundSecondary = CONFIG.sceneState.backgroundSecondary;
    CONFIG.colors.star = CONFIG.sceneState.starColor;
    CONFIG.colors.moon = CONFIG.sceneState.moonColor;
    CONFIG.colors.ink = CONFIG.sceneState.inkColor;
    CONFIG.visual.brightness = CONFIG.sceneState.brightness;
    CONFIG.visual.fog = CONFIG.sceneState.fog;
    CONFIG.visual.explorationState = CONFIG.sceneState.explorationState;
    CONFIG.visual.beforeBoost = CONFIG.sceneState.beforeBoost;
    CONFIG.visual.afterBoost = CONFIG.sceneState.afterBoost;
    CONFIG.visual.showRegionOverlay = CONFIG.sceneState.showRegionOverlay;

    CONFIG.tree.particleCount = CONFIG.trees.particleCount;
    CONFIG.tree.inkColor = CONFIG.trees.inkColor;
    CONFIG.tree.width = CONFIG.trees.width;
    CONFIG.tree.height = CONFIG.trees.height;
    CONFIG.tree.rebuildSeed = CONFIG.trees.rebuildSeed;

    CONFIG.text.title = CONFIG.textEffects.title;
    CONFIG.text.subtitle = CONFIG.textEffects.subtitle;
    CONFIG.text.loneliness = CONFIG.textEffects.loneliness;
    CONFIG.text.anxiety = CONFIG.textEffects.anxiety;
    CONFIG.text.desire = CONFIG.textEffects.desire;
    CONFIG.text.hope = CONFIG.textEffects.hope;
    CONFIG.text.peace = CONFIG.textEffects.peace;
    CONFIG.text.final = CONFIG.textEffects.final;

    CONFIG.transform.zoom = CONFIG.camera.zoom;
    CONFIG.transform.panX = CONFIG.camera.panX;
    CONFIG.transform.panY = CONFIG.camera.panY;
    CONFIG.transform.rotation = CONFIG.camera.rotation;
    CONFIG.pseudo3d.enabled = CONFIG.camera.pseudo3dEnabled;
    CONFIG.pseudo3d.perspective = CONFIG.camera.perspective;
    CONFIG.pseudo3d.tiltX = CONFIG.camera.tiltX ?? CONFIG.camera.viewRotX / 60;
    CONFIG.pseudo3d.tiltY = CONFIG.camera.tiltY ?? CONFIG.camera.viewRotY / 60;

    CONFIG.regions.selected = CONFIG.selection.selected;
    CONFIG.regions.localColor = CONFIG.selection.localColor;
    CONFIG.regions.localTintStrength = CONFIG.selection.localTintStrength;
    for (const key of ['hope', 'desire', 'anxiety', 'loneliness', 'peace']) {
      CONFIG.regions[key].color = CONFIG.selection[key].color;
      CONFIG.regions[key].radius = CONFIG.selection[key].radius;
    }

    CONFIG.editor.enabled = CONFIG.editMode.enabled;
    CONFIG.editor.mode = CONFIG.editMode.mode;
    CONFIG.editor.selectedLayer = CONFIG.editMode.selectedLayer;
    CONFIG.editor.showGuides = CONFIG.editMode.showGuides;
  }

  function resize() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    rebuildParticles();
  }

  function rebuildParticles() {
    swirlParticles.length = 0;
    stars.length = 0;
    moonDust.length = 0;
    treeInk.length = 0;
    villageLights.length = 0;

    particleSystem.rebuild();
    villageParticleGroup.rebuild();
    treeParticleGroup.rebuild();
    swirlParticles.push(...particleSystem.particles);

    for (let i = 0; i < CONFIG.particles.stars; i++) {
      stars.push({
        x: rand(0.14, 0.9) * state.width,
        y: rand(0.07, 0.42) * state.height,
        base: rand(0.9, 2.6),
        twinkle: rand(0, Math.PI * 2),
        phase: rand(0, Math.PI * 2)
      });
    }

    for (let i = 0; i < CONFIG.particles.moonDust; i++) {
      moonDust.push({
        angle: Math.random() * Math.PI * 2,
        dist: rand(12, 90),
        speed: rand(0.005, 0.02),
        size: rand(0.8, 1.9),
        phase: Math.random() * Math.PI * 2
      });
    }

    for (let i = 0; i < CONFIG.particles.treeInk; i++) {
      treeInk.push({
        x: rand(0.04, 0.22),
        y: rand(0.67, 0.97),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.5, -0.05),
        size: rand(1.2, 3.4),
        alpha: rand(0.10, 0.45)
      });
    }

    for (let i = 0; i < CONFIG.particles.villageLights; i++) {
      villageLights.push({
        x: rand(0.60, 0.82) * state.width,
        y: rand(0.72, 0.88) * state.height,
        on: false,
        flicker: rand(0, Math.PI * 2)
      });
    }
  }

  function updateHover() {
    let nearest = null;
    let nearestDist = Infinity;
    const mx = state.mouse.x;
    const my = state.mouse.y;

    for (const region of Object.values(regions)) {
      if (state.collected[region.key]) continue;
      const x = region.center.x * state.width;
      const y = region.center.y * state.height;
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.hypot(dx, dy);
      if (dist < nearestDist) {
        nearest = region;
        nearestDist = dist;
      }
    }

    if (nearest && nearestDist < getRegionRadius(nearest.key, nearest.radius)) {
      state.hoverKey = nearest.key;
      hintEl.textContent = `当前靠近：${nearest.label}`;
      canvas.style.cursor = 'pointer';
    } else {
      state.hoverKey = null;
      hintEl.textContent = '当前靠近：无';
      canvas.style.cursor = 'default';
    }
  }

  function collectCurrentRegion() {
    if (state.hoverKey === null) return;
    const region = regions[state.hoverKey];
    if (!region || state.collected[region.key]) return;

    state.collected[region.key] = true;
    const regionMessage = CONFIG.text[region.key];
    state.flash.text = regionMessage;
    state.flash.key = region.key;
    state.flash.started = performance.now();
    state.flash.until = performance.now() + CONFIG.textDuration;
    messageEl.textContent = regionMessage;
    messageEl.style.opacity = '1';
    textParticleGroup.setText(regionMessage, 'emotion', state.flash.started);

    if (region.key === 'hope') {
      moon.glow = 1;
    } else if (region.key === 'desire') {
      desire.boost = 1;
    } else if (region.key === 'anxiety') {
      anxiety.boost = 1;
    } else if (region.key === 'loneliness') {
      loneliness.growth = 1;
    } else if (region.key === 'peace') {
      peace.glow = 1;
      for (const light of villageLights) light.on = true;
    }

    updateScore();
    maybeEnterFinalState();
  }

  function updateScore() {
    const done = Object.values(state.collected).filter(Boolean).length;
    scoreEl.textContent = `已收集情绪：${done}/5`;
  }

  function maybeEnterFinalState() {
    const done = Object.values(state.collected).every(Boolean);
    if (!done || state.final) return;
    state.final = true;
    document.body.classList.add('is-emotion-complete');
    state.finalStarted = performance.now();
    textParticleGroup.setText(CONFIG.text.final, 'final', state.finalStarted);
    finalMessageEl.classList.add('show');
    setExplorationState('auto');
  }

  function isFinalVisualState() {
    return getVisualProgress() > 0.5;
  }

  function getVisualProgress() {
    // 返回 0 到 1 的探索视觉过渡值，0 是探索前，1 是探索后。
    return state.visualTransition.value;
  }

  function getExplorationTarget() {
    // 自动模式根据情绪是否全部收集决定目标状态，手动按钮则直接覆盖目标。
    if (CONFIG.sceneState.explorationState === 'before') return 0;
    if (CONFIG.sceneState.explorationState === 'after') return 1;
    return state.final ? 1 : 0;
  }

  function updateVisualTransition(now) {
    // 每帧平滑更新探索前/探索后的视觉状态，避免瞬间跳变。
    const target = getExplorationTarget();
    if (target !== state.visualTransition.target) {
      state.visualTransition.from = state.visualTransition.value;
      state.visualTransition.target = target;
      state.visualTransition.started = now;
    }
    const duration = Math.max(0.3, CONFIG.sceneState.transitionDuration) * 1000;
    const t = clamp((now - state.visualTransition.started) / duration, 0, 1);
    const eased = t * t * (3 - 2 * t);
    state.visualTransition.value = state.visualTransition.from + (state.visualTransition.target - state.visualTransition.from) * eased;
  }

  function setExplorationState(nextState) {
    // 控制台按钮调用这里切换视觉目标，保留玩法进度。
    CONFIG.sceneState.explorationState = nextState;
    CONFIG.visual.explorationState = nextState;
    state.visualTransition.from = state.visualTransition.value;
    state.visualTransition.target = getExplorationTarget();
    state.visualTransition.started = performance.now();
    if (nextState === 'after') {
      finalMessageEl.classList.add('show');
      if (!textParticleGroup.text) {
        textParticleGroup.setText(CONFIG.text.final, 'final', performance.now());
      }
    } else if (nextState === 'before') {
      finalMessageEl.classList.remove('show');
      state.flash.text = '请靠近星光、树影与村庄，触碰夜色里的情绪。';
      state.flash.key = 'prompt';
      state.flash.started = performance.now();
      state.flash.until = state.flash.started + CONFIG.textDuration;
      messageEl.textContent = state.flash.text;
      textParticleGroup.setText(state.flash.text, 'emotion', state.flash.started);
    } else if (state.final) {
      finalMessageEl.classList.add('show');
    }
  }

  function resetExplorationState() {
    // 回到自动模式，由当前情绪收集进度决定探索前/后视觉。
    setExplorationState('auto');
  }

  function getRegionRadius(key, fallback) {
    return CONFIG.regions[key]?.radius || fallback;
  }

  function getRegionColor(key, fallback) {
    if (CONFIG.regions.selected === key && CONFIG.regions.localTintStrength > 0) {
      return CONFIG.regions.localColor;
    }
    return CONFIG.regions[key]?.color || fallback;
  }

  function applySceneTransform() {
    const t = CONFIG.transform;
    const p3d = CONFIG.pseudo3d;
    ctx.translate(state.width / 2 + t.panX, state.height / 2 + t.panY);
    ctx.rotate((t.rotation * Math.PI) / 180);
    ctx.scale(t.zoom, t.zoom);
    if (p3d.enabled) {
      // 伪 3D 观看效果先用二维倾斜模拟，后续可以继续扩展为更强的全景视角。
      ctx.transform(1, p3d.tiltX * p3d.perspective, p3d.tiltY * p3d.perspective, 1, 0, 0);
    }
    ctx.translate(-state.width / 2, -state.height / 2);
  }

  function projectParticle(particle, x = particle.x, y = particle.y, size = particle.size) {
    // 根据 z 坐标和相机参数做轻量透视投影，远处更小更暗，近处更亮更大。
    const camera = CONFIG.camera;
    const cx = state.width / 2;
    const cy = state.height / 2;
    const rx = (camera.viewRotX * Math.PI) / 180;
    const ry = (camera.viewRotY * Math.PI) / 180;
    let dx = x - cx;
    let dy = y - cy;
    let dz = (particle.z || 0) * 240;

    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = dx * cosY + dz * sinY;
    const z1 = -dx * sinY + dz * cosY;

    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y1 = dy * cosX - z1 * sinX;
    const z2 = dy * sinX + z1 * cosX;

    const perspective = 1 + camera.perspective * 0.75;
    const depth = clamp(1 + z2 / 700, 0.25, 2.4);
    const scale = clamp(perspective / (perspective + z2 / 600), 0.25, 2.2);
    return {
      x: cx + x1 * scale,
      y: cy + y1 * scale,
      size: size * scale,
      alpha: clamp(1 / depth, 0.28, 1.65)
    };
  }

  function resetCameraView() {
    // 重置为正面默认视角。
    setConfig({ camera: {
      zoom: 1,
      panX: 0,
      panY: 0,
      rotation: 0,
      viewRotX: 0,
      viewRotY: 0,
      perspective: 0.55,
      pseudo3dEnabled: false,
      autoRotate: false
    } });
  }

  function setFrontView() {
    // 正面视图保留轻微透视，适合课堂展示完整画面。
    setConfig({ camera: { viewRotX: 0, viewRotY: 0, rotation: 0, zoom: 1, panX: 0, panY: 0, pseudo3dEnabled: false } });
  }

  function setTopView() {
    // 俯视视图使用 X 轴倾斜模拟从上往下观察。
    setConfig({ camera: { viewRotX: 55, viewRotY: 0, rotation: 0, zoom: 1.05, pseudo3dEnabled: true, perspective: 0.9 } });
  }

  function startPanoramaRotation() {
    // 开启全景缓慢旋转。
    setConfig({ camera: { autoRotate: true, autoRotateSpeed: 0.35, pseudo3dEnabled: true, perspective: Math.max(CONFIG.camera.perspective, 0.7) } });
  }

  function stopPanoramaRotation() {
    // 停止自动旋转，保留当前观察角度。
    setConfig({ camera: { autoRotate: false } });
  }

  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, state.height);
    const progress = getVisualProgress();
    const introOnly = document.body.classList.contains('player-simple-mode') && !state.final;
    const backgroundPrimary = introOnly ? '#020a24' : CONFIG.colors.backgroundPrimary;
    const backgroundSecondary = introOnly ? '#061645' : CONFIG.colors.backgroundSecondary;
    const lift = (0.18 * CONFIG.visual.afterBoost * progress) - ((1 - progress) * 0.12);
    g.addColorStop(0, lighten(backgroundPrimary, introOnly ? 0 : lift * 0.9));
    g.addColorStop(0.56, lighten(backgroundSecondary, introOnly ? 0 : lift * 1.1));
    g.addColorStop(1, darken(backgroundPrimary, 0.34));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, state.width, state.height);

    // 背景噪点和笔触颗粒，制造水墨扩散感。
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 60; i++) {
      const x = (i * 173) % state.width;
      const y = ((i * 97) % state.height);
      ctx.fillStyle = rgba(CONFIG.colors.ink, 0.016 + (i % 5) * 0.003);
      ctx.beginPath();
      ctx.arc(x, y, 1 + (i % 3) * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 透明雾感叠在画面上层，数值越高越像水墨薄雾。
    if (CONFIG.visual.fog > 0) {
      const fog = ctx.createLinearGradient(0, 0, state.width, state.height);
      const fogAlpha = CONFIG.visual.fog * (1.35 - progress * 0.55);
      fog.addColorStop(0, rgba(CONFIG.colors.backgroundSecondary, fogAlpha * 0.20));
      fog.addColorStop(0.5, rgba(CONFIG.colors.ink, fogAlpha * 0.12));
      fog.addColorStop(1, rgba(CONFIG.colors.moon, fogAlpha * 0.08));
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, state.width, state.height);
    }
  }

  function lighten(hex, amount) {
    const c = hex.replace('#', '');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const nr = Math.round(clamp(r + 255 * amount, 0, 255));
    const ng = Math.round(clamp(g + 255 * amount, 0, 255));
    const nb = Math.round(clamp(b + 255 * amount, 0, 255));
    return `rgb(${nr}, ${ng}, ${nb})`;
  }

  function darken(hex, amount) {
    const c = hex.replace('#', '');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const nr = Math.round(clamp(r * (1 - amount), 0, 255));
    const ng = Math.round(clamp(g * (1 - amount), 0, 255));
    const nb = Math.round(clamp(b * (1 - amount), 0, 255));
    return `rgb(${nr}, ${ng}, ${nb})`;
  }

  function drawSwirl(dt) {
    const visualProgress = getVisualProgress();
    const cx = state.width * CONFIG.particles.centerX;
    const cy = state.height * CONFIG.particles.centerY;
    const speedBoost = isFinalVisualState() ? CONFIG.finalThresholdBoost : 1;
    const swirlSpeed = CONFIG.swirlSpeed * CONFIG.particles.rotationSpeed * CONFIG.swirl.speed * (0.25 + visualProgress * 0.95) * (1 + anxiety.boost * 1.5) * speedBoost;
    const lineAlpha = (0.025 + visualProgress * 0.075 + anxiety.boost * 0.15 + (state.final ? 0.12 : 0)) * CONFIG.particles.opacity;
    const densityFactor = 0.28 + visualProgress * 0.72;
    const maxParticles = Math.max(1, Math.floor(swirlParticles.length * densityFactor * clamp(CONFIG.swirl.lines / 80, 0.07, 1)));

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < swirlParticles.length; i++) {
      const p = swirlParticles[i];
      if (p.group === 'skySwirl' && i >= maxParticles) continue;
      if (p.group !== 'skySwirl') {
        // 手动创建的粒子保留在编辑位置，不再被天空旋涡公式重新吸走。
        p.x += p.vx * CONFIG.particles.speed * 0.08;
        p.y += p.vy * CONFIG.particles.speed * 0.08;
        p.z += p.vz * CONFIG.particles.speed * 0.08;
        const projected = projectParticle(p, p.x, p.y, (p.customSize ?? p.size) * CONFIG.particles.size);
        const tail = projectParticle(
          p,
          p.x - p.vx * CONFIG.particles.trail * 32,
          p.y - p.vy * CONFIG.particles.trail * 32,
          (p.customSize ?? p.size) * CONFIG.particles.size
        );
        const alpha = CONFIG.particles.opacity * (p.customAlpha ?? p.alpha) * projected.alpha;
        const particleColor = p.customColor || p.color || CONFIG.colors.star;
        ctx.strokeStyle = rgba(particleColor, alpha);
        ctx.fillStyle = rgba(particleColor, alpha);
        ctx.lineWidth = Math.max(0.8, projected.size * 1.2);
        drawParticleShape(getParticleShapeForGroup(p.group), projected.x, projected.y, tail.x, tail.y, projected.size, p.radius || 1, p.angle || 0, cx, cy);
        if (p.selected) drawSelectedParticleHighlight(projected.x, projected.y, projected.size);
        continue;
      }
      const direction = getParticleDirection(p, i);
      p.angle += dt * swirlSpeed * CONFIG.particles.speed * direction * p.speed * (1.2 + p.radius * 0.8) * CONFIG.particles.rotationStrength;
      p.x += p.vx * CONFIG.particles.randomness * 0.12;
      p.y += p.vy * CONFIG.particles.randomness * 0.12;
      p.z += p.vz * CONFIG.particles.randomness;
      const wobble = Math.sin(state.time * 0.0015 * p.wobble + p.phase) * 18 * (1 + CONFIG.particles.randomness * 0.35);
      const spreadScale = CONFIG.particles.spread / 260;
      const radius = p.radius * CONFIG.swirl.radius * spreadScale * (0.72 + wobble * 0.002) * (1 + CONFIG.swirl.strength * 0.12);
      const randomOffsetX = (p.x - cx) * CONFIG.particles.randomness * 0.04;
      const randomOffsetY = (p.y - cy) * CONFIG.particles.randomness * 0.04;
      const x = cx + Math.cos(p.angle) * radius * 1.18 + randomOffsetX;
      const y = cy + Math.sin(p.angle * 1.03) * radius * 0.82 + Math.cos(p.phase + state.time * 0.0008) * 11 + randomOffsetY;
      const trail = CONFIG.particles.trail * 0.56;
      const px = cx + Math.cos(p.angle - trail) * radius * 1.18;
      const py = cy + Math.sin((p.angle - trail) * 1.03) * radius * 0.82;

      p.x = x;
      p.y = y;
      const projected = projectParticle(p, x, y, (p.customSize ?? p.size) * CONFIG.particles.size);
      const ppx = projectParticle(p, px, py, (p.customSize ?? p.size) * CONFIG.particles.size);
      const alpha = lineAlpha * (p.customAlpha ?? p.alpha) * projected.alpha * (0.55 + 0.45 * Math.sin(p.phase + state.time * 0.002));
      const particleColor = p.customColor || (p.tint === 'star' ? CONFIG.colors.star : CONFIG.colors.ink);
      ctx.strokeStyle = rgba(particleColor, p.tint === 'star' || p.tint === 'custom' ? alpha : alpha * 0.8);
      ctx.fillStyle = rgba(particleColor, p.tint === 'star' || p.tint === 'custom' ? alpha : alpha * 0.8);
      ctx.lineWidth = (projected.size * (isFinalVisualState() ? 1.5 : 1)) + anxiety.boost * 0.8;
      drawParticleShape(getParticleShapeForGroup(p.group), projected.x, projected.y, ppx.x, ppx.y, projected.size, radius, p.angle, cx, cy);
      if (p.selected) drawSelectedParticleHighlight(projected.x, projected.y, projected.size);
    }
    ctx.restore();
  }

  function drawSelectedParticleHighlight(x, y, size) {
    // 被选中的粒子额外绘制白色边缘光，方便课堂演示时看清选区。
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.82)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(4, size * 2.2), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function getParticleDirection(p, index) {
    // 支持顺时针、逆时针、双向扰动和随机流动四种旋转方式。
    if (CONFIG.particles.rotationDirection === 'counterclockwise') return -1;
    if (CONFIG.particles.rotationDirection === 'bidirectional') {
      return index % 2 === 0 ? 1 : -1;
    }
    if (CONFIG.particles.rotationDirection === 'randomFlow') {
      return p.flowSign * (0.5 + Math.abs(Math.sin(state.time * 0.001 + p.phase)));
    }
    return 1;
  }

  function getParticleShapeForGroup(group) {
    // Maya 创建工具的不同粒子类型映射到已有粒子形态，保持绘制入口统一。
    const shapeMap = {
      point: 'starDust',
      lineStroke: 'shortStroke',
      inkCloud: 'inkMist',
      star: 'starBurst',
      village: 'shortStroke',
      tree: 'inkMist',
      text: 'glowDot'
    };
    return shapeMap[group] || CONFIG.particles.shape;
  }

  function drawParticleShape(shape, x, y, px, py, size, radius, angle, cx, cy) {
    // 粒子形态统一走这个函数，后续添加新形态时不用改主循环。
    ctx.beginPath();
    if (shape === 'starDust') {
      ctx.arc(x, y, Math.max(0.8, size), 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (shape === 'shortStroke') {
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
      return;
    }
    if (shape === 'inkMist') {
      const g = ctx.createRadialGradient(x, y, 0, x, y, size * 8);
      g.addColorStop(0, rgba(CONFIG.colors.ink, CONFIG.particles.opacity * 0.16));
      g.addColorStop(1, rgba(CONFIG.colors.ink, 0));
      ctx.fillStyle = g;
      ctx.arc(x, y, size * 8, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (shape === 'glowDot') {
      const g = ctx.createRadialGradient(x, y, 0, x, y, size * 9);
      g.addColorStop(0, rgba(CONFIG.colors.star, CONFIG.particles.opacity * 0.85));
      g.addColorStop(0.45, rgba(CONFIG.colors.star, CONFIG.particles.opacity * 0.22));
      g.addColorStop(1, rgba(CONFIG.colors.star, 0));
      ctx.fillStyle = g;
      ctx.arc(x, y, size * 9, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (shape === 'starBurst') {
      for (let i = 0; i < 4; i++) {
        const a = angle + (Math.PI / 4) * i;
        ctx.moveTo(x - Math.cos(a) * size * 2.6, y - Math.sin(a) * size * 2.6);
        ctx.lineTo(x + Math.cos(a) * size * 2.6, y + Math.sin(a) * size * 2.6);
      }
      ctx.stroke();
      return;
    }
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(cx + Math.cos(angle - 0.3) * radius * 0.9, cy + Math.sin(angle * 0.98) * radius * 0.55, x, y);
    ctx.stroke();
  }

  function drawMoon() {
    const x = state.width * 0.77;
    const y = state.height * 0.18;
    const r = Math.min(state.width, state.height) * 0.055;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const halo = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 3.8);
    const moonColor = getRegionColor('hope', CONFIG.colors.moon);
    halo.addColorStop(0, rgba(moonColor, 0.75 + moon.glow * 0.1));
    halo.addColorStop(0.45, rgba(CONFIG.colors.star, 0.22 + moon.glow * 0.12));
    halo.addColorStop(1, 'rgba(255, 214, 90, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, r * 3.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = rgba(moonColor, 0.9 + moon.glow * 0.08);
    ctx.beginPath();
    ctx.arc(x, y, r * (1.02 + moon.glow * 0.1), 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = rgba(moonColor, 0.35 + moon.glow * 0.2);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.84, 0, Math.PI * 2);
    ctx.stroke();

    for (const d of moonDust) {
      d.angle += d.speed * CONFIG.particles.speed * (0.6 + moon.glow * 0.8 + (state.final ? 0.8 : 0));
      const dist = d.dist * (0.9 + moon.glow * 0.25 + (state.final ? 0.35 : 0));
      const px = x + Math.cos(d.angle) * dist;
      const py = y + Math.sin(d.angle) * dist * 0.7;
      ctx.fillStyle = rgba(getRegionColor('hope', CONFIG.colors.star), (0.08 + moon.glow * 0.08) * CONFIG.particles.opacity);
      ctx.beginPath();
      ctx.arc(px, py, d.size * CONFIG.particles.size * (1 + moon.glow * 0.35), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawStars() {
    const extra = state.collected.desire ? 1 : 0;
    const starPulse = state.collected.desire ? 1.5 : 1;
    const starColor = getRegionColor('desire', CONFIG.colors.star);
    const visualProgress = getVisualProgress();

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const visibleStars = Math.max(6, Math.floor(stars.length * (0.35 + visualProgress * 0.65)));
    for (let i = 0; i < visibleStars; i++) {
      const s = stars[i];
      const tw = 0.5 + 0.5 * Math.sin(state.time * 0.0018 * starPulse + s.twinkle + s.phase);
      const size = s.base * (0.8 + tw * 0.8 + extra * 0.25);
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size * 7);
      glow.addColorStop(0, rgba(starColor, 0.85 * tw * CONFIG.particles.opacity * (0.35 + visualProgress * 0.65)));
      glow.addColorStop(0.32, rgba(starColor, (0.18 + tw * 0.25) * CONFIG.particles.opacity * (0.35 + visualProgress * 0.65)));
      glow.addColorStop(1, 'rgba(255, 224, 110, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(s.x, s.y, size * 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = rgba(starColor, (0.4 + tw * 0.5) * CONFIG.particles.opacity * (0.35 + visualProgress * 0.65));
      ctx.beginPath();
      ctx.arc(s.x, s.y, size * CONFIG.particles.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 渴望收集后补充更多星点。
    if (state.collected.desire) {
      const extraCount = 32;
      for (let i = 0; i < extraCount; i++) {
        const x = state.width * rand(0.18, 0.88);
        const y = state.height * rand(0.06, 0.36);
        const size = rand(0.7, 1.9);
        const tw = 0.5 + 0.5 * Math.sin(state.time * 0.0024 + i);
        ctx.fillStyle = rgba(starColor, (0.2 + tw * 0.4) * CONFIG.particles.opacity);
        ctx.beginPath();
        ctx.arc(x, y, size * CONFIG.particles.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawVillage() {
    // 村庄由 VillageParticleGroup 生成，不再绘制硬边剪影。
    villageParticleGroup.draw(ctx, state.time, state.collected.peace, isFinalVisualState());
  }

  function drawCypress() {
    // 柏树由 TreeParticleGroup 生成，不再绘制硬边剪影。
    treeParticleGroup.draw(ctx, state.time, state.collected.loneliness, isFinalVisualState());
  }

  function drawRegionOverlay() {
    if (!CONFIG.visual.showRegionOverlay && !(CONFIG.editor.enabled && CONFIG.editor.showGuides)) return;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const visualProgress = getVisualProgress();
    ctx.shadowBlur = (1 - visualProgress) * 18;
    for (const region of Object.values(regions)) {
      const x = region.center.x * state.width;
      const y = region.center.y * state.height;
      const selected = CONFIG.regions.selected === region.key;
      ctx.strokeStyle = selected ? rgba(CONFIG.regions.localColor, 0.35 + visualProgress * 0.4) : rgba(CONFIG.regions[region.key].color, 0.10 + visualProgress * 0.18);
      ctx.shadowColor = selected ? CONFIG.regions.localColor : CONFIG.regions[region.key].color;
      ctx.lineWidth = selected ? 2 : 1;
      ctx.beginPath();
      ctx.arc(x, y, getRegionRadius(region.key, region.radius), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSelectionToolOverlay() {
    // 绘制框选矩形或圆形笔刷范围，不参与实际画面内容。
    const tool = state.selectionTool;
    const mode = CONFIG.selection.editMode;
    if (!tool.active && !tool.dragging) return;
    ctx.save();
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = 'rgba(255, 245, 210, 0.82)';
    ctx.fillStyle = 'rgba(120, 170, 255, 0.08)';
    ctx.lineWidth = 1.5;
    if (isSelectionBoxMode() && tool.dragging) {
      const x = Math.min(tool.startX, tool.x);
      const y = Math.min(tool.startY, tool.y);
      const w = Math.abs(tool.x - tool.startX);
      const h = Math.abs(tool.y - tool.startY);
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    } else if (isBrushVisibleMode()) {
      ctx.beginPath();
      ctx.arc(tool.x, tool.y, CONFIG.selection.brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function isSelectionBoxMode() {
    // 区域框选和 Maya Select 都使用同一套矩形框选反馈。
    return CONFIG.selection.editMode === 'boxSelect' || (CONFIG.editMode.enabled && CONFIG.editMode.mode === 'select');
  }

  function isBrushVisibleMode() {
    // 笔刷类工具统一显示圆形范围。
    return ['brushSelect', 'deselect', 'densityPaint', 'colorPaint'].includes(CONFIG.selection.editMode)
      || (CONFIG.editMode.enabled && ['paintColor', 'paintDensity', 'create'].includes(CONFIG.editMode.mode));
  }

  function drawFlashText() {
    const now = performance.now();
    if (now > state.flash.until) {
      messageEl.style.opacity = '0';
      return;
    }

    const elapsed = now - state.flash.started;
    const left = state.flash.until - now;
    const appear = clamp(elapsed / Math.max(1, CONFIG.textEffects.appearSpeed * 900), 0, 1);
    const disappear = clamp(left / Math.max(1, CONFIG.textEffects.disappearSpeed * 900), 0, 1);
    const alpha = Math.min(appear, disappear);
    if (CONFIG.textEffects.style === 'typewriter') {
      const count = Math.max(1, Math.floor(state.flash.text.length * appear));
      messageEl.textContent = state.flash.text.slice(0, count);
    } else {
      messageEl.textContent = state.flash.text;
    }
    messageEl.style.opacity = `${alpha}`;
  }

  function drawFinalOverlay() {
    if (!isFinalVisualState()) return;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const wash = ctx.createLinearGradient(0, 0, state.width, state.height);
    wash.addColorStop(0, rgba(CONFIG.colors.backgroundSecondary, 0.06));
    wash.addColorStop(0.5, rgba(CONFIG.colors.star, 0.08));
    wash.addColorStop(1, rgba(CONFIG.colors.ink, 0.06));
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, state.width, state.height);

    for (let i = 0; i < 6; i++) {
      const x = state.width * (0.22 + i * 0.11);
      const y = state.height * (0.18 + Math.sin(state.time * 0.0004 + i) * 0.05);
      const g = ctx.createRadialGradient(x, y, 0, x, y, state.height * 0.22);
      g.addColorStop(0, rgba(CONFIG.colors.star, 0.10));
      g.addColorStop(1, 'rgba(255, 230, 150, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, state.height * 0.22, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function animate(now) {
    state.time = now;
    updateVisualTransition(now);
    updateCameraAutomation();

    const dt = 0.016;
    ctx.save();
    applySceneTransform();
    drawBackground();
    drawSwirl(dt);
    drawStars();
    drawMoon();
    drawCypress();
    drawVillage();
    textParticleGroup.draw(ctx, state.time);
    drawFinalOverlay();
    drawRegionOverlay();
    applyBrightness();
    ctx.restore();
    drawSelectionToolOverlay();
    if (CONFIG.editMode.enabled) drawEditModeOverlay();
    drawFlashText();

    requestAnimationFrame(animate);
  }

  function updateCameraAutomation() {
    // 自动缓慢旋转用于全景课堂展示。
    if (!CONFIG.camera.autoRotate) return;
    CONFIG.camera.viewRotY += CONFIG.camera.autoRotateSpeed * 0.45;
    if (CONFIG.camera.viewRotY > 60) CONFIG.camera.viewRotY = -60;
    if (CONFIG.camera.viewRotY < -60) CONFIG.camera.viewRotY = 60;
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    state.mouse.x = e.clientX - rect.left;
    state.mouse.y = e.clientY - rect.top;
    state.mouse.active = true;
    handleCameraPointerMove(e);
    state.selectionTool.x = state.mouse.x;
    state.selectionTool.y = state.mouse.y;
    handleEditPointerMove();
    handleSelectionPointerMove();
    updateHover();
  });

  canvas.addEventListener('mouseleave', () => {
    state.mouse.active = false;
    state.selectionTool.active = false;
    state.selectionTool.dragging = false;
    state.hoverKey = null;
    hintEl.textContent = '当前靠近：无';
    canvas.style.cursor = 'default';
  });

  canvas.addEventListener('mousedown', (e) => {
    if (beginCameraDrag(e)) return;
    if (beginEditPointer(e)) return;
    const rect = canvas.getBoundingClientRect();
    state.selectionTool.active = true;
    state.selectionTool.dragging = true;
    state.selectionTool.startX = e.clientX - rect.left;
    state.selectionTool.startY = e.clientY - rect.top;
    state.selectionTool.x = state.selectionTool.startX;
    state.selectionTool.y = state.selectionTool.startY;
    handleSelectionPointerDown();
  });

  window.addEventListener('mouseup', () => {
    endCameraDrag();
    endEditTransform();
    handleSelectionPointerUp();
  });

  canvas.addEventListener('wheel', (e) => {
    // 鼠标滚轮控制缩放，围绕当前画面中心稳定缩放。
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    CONFIG.camera.zoom = clamp(CONFIG.camera.zoom * factor, 0.3, 5);
    setConfig({ camera: { zoom: CONFIG.camera.zoom } });
  }, { passive: false });

  canvas.addEventListener('dblclick', () => {
    resetCameraView();
  });

  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  canvas.addEventListener('click', () => {
    if (CONFIG.selection.editMode !== 'view' || CONFIG.editMode.enabled) return;
    if (state.hoverKey === null) return;
    collectCurrentRegion();
  });

  window.addEventListener('resize', resize);

  window.addEventListener('keydown', (e) => {
    // 方便调试：按 Enter 也可以收集当前区域，适合触屏之外的测试。
    if (e.key === 'Enter') collectCurrentRegion();
    if (e.code === 'Space') state.cameraTool.spaceDown = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') state.cameraTool.spaceDown = false;
  });

  function beginCameraDrag(e) {
    // 右键或空格拖拽平移，Alt + 左键旋转视角，参考 Maya 视图操作。
    const rect = canvas.getBoundingClientRect();
    const wantsPan = e.button === 2 || state.cameraTool.spaceDown;
    const wantsOrbit = e.altKey && e.button === 0;
    if (!wantsPan && !wantsOrbit) return false;
    e.preventDefault();
    state.cameraTool.active = true;
    state.cameraTool.mode = wantsOrbit ? 'orbit' : 'pan';
    state.cameraTool.lastX = e.clientX - rect.left;
    state.cameraTool.lastY = e.clientY - rect.top;
    state.selectionTool.active = false;
    state.selectionTool.dragging = false;
    return true;
  }

  function handleCameraPointerMove(e) {
    // 鼠标拖动时更新相机平移或视角旋转。
    if (!state.cameraTool.active) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - state.cameraTool.lastX;
    const dy = y - state.cameraTool.lastY;
    state.cameraTool.lastX = x;
    state.cameraTool.lastY = y;
    if (state.cameraTool.mode === 'pan') {
      setConfig({ camera: {
        panX: clamp(CONFIG.camera.panX + dx, -1000, 1000),
        panY: clamp(CONFIG.camera.panY + dy, -1000, 1000)
      } });
    } else if (state.cameraTool.mode === 'orbit') {
      setConfig({ camera: {
        viewRotY: clamp(CONFIG.camera.viewRotY + dx * 0.25, -60, 60),
        viewRotX: clamp(CONFIG.camera.viewRotX + dy * 0.25, -60, 60),
        pseudo3dEnabled: true
      } });
    }
  }

  function endCameraDrag() {
    // 结束相机拖拽操作。
    state.cameraTool.active = false;
    state.cameraTool.mode = null;
  }

  function handleSelectionPointerDown() {
    // 根据当前编辑模式决定鼠标按下时的选择行为。
    const mode = CONFIG.selection.editMode;
    if (mode === 'brushSelect') {
      selectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y);
    } else if (mode === 'deselect') {
      deselectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y);
    } else if (mode === 'colorPaint') {
      selectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y);
      applySelectionColorToAllGroups();
    } else if (mode === 'densityPaint') {
      particleSystem.paintDensity(state.selectionTool.x, state.selectionTool.y, CONFIG.selection.densityMode);
      syncParticleArray();
    }
  }

  function beginEditPointer(e) {
    // Maya 式操作模式优先于普通区域选择；查看模式下不拦截情绪收集。
    if (!CONFIG.editMode.enabled) return false;
    const mode = CONFIG.editMode.mode;
    if (!['select', 'move', 'rotate', 'scale', 'create', 'delete', 'paintColor', 'paintDensity', 'snap', 'resetTransform'].includes(mode)) return false;
    const rect = canvas.getBoundingClientRect();
    state.mouse.x = e.clientX - rect.left;
    state.mouse.y = e.clientY - rect.top;
    state.selectionTool.x = state.mouse.x;
    state.selectionTool.y = state.mouse.y;

    if (mode === 'select') {
      state.selectionTool.active = true;
      state.selectionTool.dragging = true;
      state.selectionTool.startX = state.mouse.x;
      state.selectionTool.startY = state.mouse.y;
      return true;
    }
    if (mode === 'move' || mode === 'rotate' || mode === 'scale') {
      beginEditTransform(mode);
      return true;
    }
    if (mode === 'create') {
      createParticlesAt(state.mouse.x, state.mouse.y);
      return true;
    }
    if (mode === 'delete') {
      if (!CONFIG.selection.selectedCount) selectAllGroupsWithBrush(state.mouse.x, state.mouse.y);
      deleteSelectedParticles();
      return true;
    }
    if (mode === 'paintColor') {
      selectAllGroupsWithBrush(state.mouse.x, state.mouse.y);
      applySelectionColorToAllGroups();
      state.selectionTool.active = true;
      state.selectionTool.dragging = true;
      return true;
    }
    if (mode === 'paintDensity') {
      particleSystem.paintDensity(state.mouse.x, state.mouse.y, CONFIG.selection.densityMode);
      syncParticleArray();
      state.selectionTool.active = true;
      state.selectionTool.dragging = true;
      return true;
    }
    if (mode === 'snap') {
      snapSelectedToRegion();
      return true;
    }
    if (mode === 'resetTransform') {
      resetSelectedParticleTransform();
      return true;
    }
    return false;
  }

  function handleEditPointerMove() {
    // 编辑工具拖动中的持续操作。
    if (!CONFIG.editMode.enabled) return;
    if (state.editTool.active) {
      updateEditTransform();
      return;
    }
    if (!state.selectionTool.dragging) return;
    if (CONFIG.editMode.mode === 'paintColor') {
      selectAllGroupsWithBrush(state.mouse.x, state.mouse.y);
      applySelectionColorToAllGroups();
    } else if (CONFIG.editMode.mode === 'paintDensity') {
      particleSystem.paintDensity(state.mouse.x, state.mouse.y, CONFIG.selection.densityMode);
      syncParticleArray();
    }
  }

  function handleSelectionPointerMove() {
    // 鼠标拖动时持续执行笔刷类工具，框选工具等鼠标松开后统一计算。
    const mode = CONFIG.selection.editMode;
    if (!state.selectionTool.dragging) return;
    if (mode === 'brushSelect') {
      selectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y);
    } else if (mode === 'deselect') {
      deselectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y);
    } else if (mode === 'colorPaint') {
      selectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y);
      applySelectionColorToAllGroups();
    } else if (mode === 'densityPaint') {
      particleSystem.paintDensity(state.selectionTool.x, state.selectionTool.y, CONFIG.selection.densityMode);
      syncParticleArray();
    }
  }

  function handleSelectionPointerUp() {
    // 框选在鼠标松开时一次性完成，避免拖动过程中反复计算。
    if (!state.selectionTool.dragging) return;
    if (isSelectionBoxMode()) {
      const dragDistance = Math.hypot(state.selectionTool.x - state.selectionTool.startX, state.selectionTool.y - state.selectionTool.startY);
      if (CONFIG.editMode.enabled && CONFIG.editMode.mode === 'select' && dragDistance < 4) {
        // Maya Select 工具支持单击选择，使用一个小笔刷命中附近粒子。
        selectAllGroupsWithBrush(state.selectionTool.x, state.selectionTool.y, Math.max(18, CONFIG.selection.brushRadius));
      } else {
        selectAllGroupsInRect({
          x1: state.selectionTool.startX,
          y1: state.selectionTool.startY,
          x2: state.selectionTool.x,
          y2: state.selectionTool.y
        });
      }
    }
    state.selectionTool.active = false;
    state.selectionTool.dragging = false;
  }

  function syncParticleArray() {
    // 密度绘制会改变粒子数组引用，这里同步给原绘制循环使用。
    swirlParticles.length = 0;
    swirlParticles.push(...particleSystem.particles);
  }

  function getSelectableGroups() {
    // 区域选择工具统一处理天空、村庄和树木粒子。
    return [particleSystem, villageParticleGroup, treeParticleGroup, textParticleGroup];
  }

  function updateTotalSelectionCount() {
    // 统计所有粒子组的选中数量，同步到控制台。
    CONFIG.selection.selectedCount = getSelectableGroups()
      .flatMap((group) => group.particles)
      .filter((particle) => particle.selected).length;
  }

  function getSelectedParticles() {
    // 收集所有已选中粒子，供移动、旋转、缩放和删除工具使用。
    return getSelectableGroups().flatMap((group) => group.particles.filter((particle) => particle.selected).map((particle) => ({ particle, group })));
  }

  function getSelectionCenter() {
    // 计算选区中心，旋转和缩放都围绕这个点操作。
    const selected = getSelectedParticles();
    if (!selected.length) return { x: state.mouse.x, y: state.mouse.y };
    const sum = selected.reduce((acc, item) => {
      acc.x += item.particle.x;
      acc.y += item.particle.y;
      return acc;
    }, { x: 0, y: 0 });
    return { x: sum.x / selected.length, y: sum.y / selected.length };
  }

  function selectAllGroupsInRect(rect) {
    for (const group of getSelectableGroups()) group.selectInRect(rect, true);
    updateTotalSelectionCount();
  }

  function selectAllGroupsWithBrush(x, y, radius = CONFIG.selection.brushRadius) {
    for (const group of getSelectableGroups()) group.selectWithBrush(x, y, radius, true);
    updateTotalSelectionCount();
  }

  function deselectAllGroupsWithBrush(x, y) {
    for (const group of getSelectableGroups()) group.deselectWithBrush(x, y, CONFIG.selection.brushRadius);
    updateTotalSelectionCount();
  }

  function applySelectionColorToAllGroups() {
    for (const group of getSelectableGroups()) group.applyColorToSelection();
    updateTotalSelectionCount();
  }

  function clearAllParticleSelections() {
    for (const group of getSelectableGroups()) group.clearSelection();
    updateTotalSelectionCount();
  }

  function createParticlesAt(x, y) {
    // 在鼠标附近创建一组粒子，基础版本统一加入天空粒子系统，保留 region 和 group 便于后续扩展。
    const count = Math.max(1, Math.round(CONFIG.editMode.createCount));
    const radius = CONFIG.editMode.createRadius;
    for (let i = 0; i < count; i++) {
      const particle = particleSystem.createParticle(particleSystem.particles.length + i);
      const a = Math.random() * Math.PI * 2;
      const d = Math.sqrt(Math.random()) * radius;
      particle.x = x + Math.cos(a) * d * CONFIG.editMode.createRandomness;
      particle.y = y + Math.sin(a) * d * CONFIG.editMode.createRandomness;
      particle.z = rand(-1, 1);
      particle.vx = Math.cos(a) * CONFIG.editMode.createInitialSpeed * rand(0.1, 1);
      particle.vy = Math.sin(a) * CONFIG.editMode.createInitialSpeed * rand(0.1, 1);
      particle.color = CONFIG.editMode.createColor;
      particle.customColor = CONFIG.editMode.createColor;
      particle.region = CONFIG.editMode.createRegion;
      particle.group = CONFIG.editMode.createType;
      particle.selected = true;
      particle.size = getCreateParticleSize(CONFIG.editMode.createType);
      particle.tint = 'custom';
      particleSystem.particles.push(particle);
    }
    syncParticleArray();
    updateTotalSelectionCount();
  }

  function getCreateParticleSize(type) {
    // 根据创建类型给粒子一个初始尺寸。
    if (type === 'inkCloud') return rand(2.8, 6.5);
    if (type === 'star') return rand(1.2, 3.4);
    if (type === 'village') return rand(1.0, 2.8);
    if (type === 'tree') return rand(1.4, 4.2);
    if (type === 'text') return rand(0.9, 2.2);
    return rand(0.8, 2.6);
  }

  function deleteSelectedParticles() {
    // 删除所有粒子组中的选中粒子。
    for (const group of getSelectableGroups()) {
      group.particles = group.particles.filter((particle) => !particle.selected);
    }
    syncParticleArray();
    updateTotalSelectionCount();
  }

  function resetSelectedParticleTransform() {
    // 重置选中粒子的自定义颜色、透明度和大小，并清理位移速度。
    for (const { particle } of getSelectedParticles()) {
      particle.customColor = null;
      particle.customAlpha = null;
      particle.customSize = null;
      particle.vx = 0;
      particle.vy = 0;
      particle.vz = 0;
    }
  }

  function snapSelectedToRegion() {
    // 将选中粒子吸附到当前目标 region 的大致区域中心。
    const target = CONFIG.editMode.createRegion;
    const centers = {
      sky: { x: state.width * 0.48, y: state.height * 0.28 },
      moon: { x: state.width * 0.77, y: state.height * 0.18 },
      stars: { x: state.width * 0.55, y: state.height * 0.20 },
      swirl: { x: state.width * CONFIG.particles.centerX, y: state.height * CONFIG.particles.centerY },
      village: { x: state.width * CONFIG.village.x, y: state.height * CONFIG.village.y },
      tree: { x: state.width * CONFIG.trees.x, y: state.height * CONFIG.trees.y },
      text: { x: state.width * 0.5, y: state.height * 0.5 },
      emotion: { x: state.width * 0.5, y: state.height * 0.42 }
    };
    const center = centers[target] || centers.sky;
    for (const { particle } of getSelectedParticles()) {
      particle.x += (center.x - particle.x) * 0.35;
      particle.y += (center.y - particle.y) * 0.35;
      particle.region = target;
    }
  }

  function beginEditTransform(mode) {
    // 开始移动、旋转或缩放时记录原始位置，拖动过程中从原始值计算，避免累计误差。
    const center = getSelectionCenter();
    state.editTool.active = true;
    state.editTool.mode = mode;
    state.editTool.startX = state.mouse.x;
    state.editTool.startY = state.mouse.y;
    state.editTool.lastX = state.mouse.x;
    state.editTool.lastY = state.mouse.y;
    state.editTool.centerX = center.x;
    state.editTool.centerY = center.y;
    state.editTool.originals = getSelectedParticles().map(({ particle }) => ({
      particle,
      x: particle.x,
      y: particle.y,
      z: particle.z || 0
    }));
  }

  function updateEditTransform() {
    // 根据当前 Maya 式工具更新选中粒子的坐标。
    if (!state.editTool.active) return;
    const dx = state.mouse.x - state.editTool.startX;
    const dy = state.mouse.y - state.editTool.startY;
    if (state.editTool.mode === 'move') {
      for (const item of state.editTool.originals) {
        item.particle.x = item.x + dx;
        item.particle.y = item.y + dy;
      }
    } else if (state.editTool.mode === 'rotate') {
      const angle = dx * 0.012;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      for (const item of state.editTool.originals) {
        const ox = item.x - state.editTool.centerX;
        const oy = item.y - state.editTool.centerY;
        item.particle.x = state.editTool.centerX + ox * cos - oy * sin;
        item.particle.y = state.editTool.centerY + ox * sin + oy * cos;
      }
    } else if (state.editTool.mode === 'scale') {
      const scale = clamp(1 + dx * 0.006, 0.1, 6);
      for (const item of state.editTool.originals) {
        item.particle.x = state.editTool.centerX + (item.x - state.editTool.centerX) * scale;
        item.particle.y = state.editTool.centerY + (item.y - state.editTool.centerY) * scale;
        item.particle.customSize = (item.particle.customSize ?? item.particle.size) * (scale > 1 ? 1.002 : 0.998);
      }
    }
  }

  function endEditTransform() {
    // 结束 Maya 式变换操作。
    state.editTool.active = false;
    state.editTool.mode = null;
    state.editTool.originals = [];
  }

  function drawEditModeOverlay() {
    // 左上角显示当前工具模式和选中数量，提供编辑反馈。
    const labels = {
      select: 'Select 选择',
      move: 'Move 移动',
      rotate: 'Rotate 旋转',
      scale: 'Scale 缩放',
      create: 'Create Particles 创建粒子',
      delete: 'Delete 删除粒子',
      paintColor: 'Paint Color 颜色笔刷',
      paintDensity: 'Paint Density 密度笔刷',
      snap: 'Snap to Region 吸附到区域',
      resetTransform: 'Reset Transform 重置变换'
    };
    ctx.save();
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.fillStyle = 'rgba(6, 12, 30, 0.58)';
    ctx.strokeStyle = 'rgba(255, 220, 120, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(14, 62, 230, 62);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 246, 220, 0.94)';
    ctx.font = '13px "Microsoft YaHei", sans-serif';
    ctx.fillText(`工具：${labels[CONFIG.editMode.mode] || CONFIG.editMode.mode}`, 26, 82);
    ctx.fillStyle = 'rgba(166, 201, 255, 0.92)';
    ctx.fillText(`选中粒子：${CONFIG.selection.selectedCount}`, 26, 100);
    ctx.fillStyle = 'rgba(255, 220, 120, 0.88)';
    ctx.fillText(`图层：${CONFIG.editMode.selectedLayer}`, 26, 118);
    ctx.restore();
  }

  function applyBrightness() {
    const brightness = CONFIG.visual.brightness;
    if (brightness === 1) return;
    ctx.save();
    ctx.globalCompositeOperation = brightness > 1 ? 'screen' : 'source-over';
    ctx.fillStyle = brightness > 1
      ? `rgba(255, 246, 210, ${clamp((brightness - 1) * 0.34, 0, 0.34)})`
      : `rgba(0, 0, 0, ${clamp(1 - brightness, 0, 0.7)})`;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.restore();
  }

  function setConfig(nextConfig, options = {}) {
    const previousCount = CONFIG.particles.totalCount;
    const previousDensity = CONFIG.particles.density;
    const previousTreeCount = CONFIG.particles.treeInk;
    const previousVillageCount = CONFIG.particles.villageLights;
    const previousVillageSignature = getVillageSignature();
    const previousTreeSignature = getTreeSignature();
    const previousTextSignature = getTextSignature();
    const previousExplorationState = CONFIG.sceneState.explorationState;
    deepMerge(CONFIG, nextConfig);
    syncEditorConfig();
    CONFIG.particles.totalCount = Math.round(CONFIG.particles.totalCount);
    CONFIG.particles.skySwirl = CONFIG.particles.totalCount;
    CONFIG.particles.treeInk = Math.round(CONFIG.tree.particleCount);
    CONFIG.particles.villageLights = Math.round(CONFIG.village.particleCount);
    CONFIG.swirl.lines = Math.round(CONFIG.swirl.lines);
    CONFIG.textDuration = CONFIG.textEffects.duration;
    canvas.style.cursor = CONFIG.selection.editMode === 'view' ? 'default' : 'crosshair';
    if (previousExplorationState !== CONFIG.sceneState.explorationState) {
      state.visualTransition.from = state.visualTransition.value;
      state.visualTransition.target = getExplorationTarget();
      state.visualTransition.started = performance.now();
    }
    applyTextConfig();
    if (previousTextSignature !== getTextSignature()) syncActiveTextAfterConfigChange();
    if (
      options.rebuildParticles ||
      previousCount !== CONFIG.particles.totalCount ||
      previousDensity !== CONFIG.particles.density ||
      previousTreeCount !== CONFIG.particles.treeInk ||
      previousVillageCount !== CONFIG.particles.villageLights ||
      previousVillageSignature !== getVillageSignature() ||
      previousTreeSignature !== getTreeSignature()
    ) {
      rebuildParticles();
      updateTotalSelectionCount();
    }
  }

  function replaceConfig(nextConfig = {}, options = {}) {
    // 导入配置和重置默认都走这里：先恢复完整默认结构，再合并外部参数，最后统一刷新画面。
    const previousVisualValue = state.visualTransition.value;
    for (const key of Object.keys(CONFIG)) delete CONFIG[key];
    deepMerge(CONFIG, cloneConfig(defaultConfig));
    setConfig(nextConfig, { ...options, rebuildParticles: true });
    state.visualTransition.from = previousVisualValue;
    state.visualTransition.target = getExplorationTarget();
    state.visualTransition.started = performance.now();
    if (getExplorationTarget() > 0.5) {
      finalMessageEl.classList.add('show');
      textParticleGroup.setText(CONFIG.text.final, 'final', performance.now());
      if (state.final) document.body.classList.add('is-emotion-complete');
    } else if (!state.final) {
      finalMessageEl.classList.remove('show');
    }
    applyTextConfig();
    updateScore();
  }

  function syncActiveTextAfterConfigChange() {
    // 文字控制台修改文案或样式后，同步当前正在显示的回应文字和文字粒子。
    if (state.final) {
      textParticleGroup.setText(CONFIG.text.final, 'final', state.finalStarted || performance.now());
      return;
    }
    if (state.flash.key && CONFIG.text[state.flash.key]) {
      state.flash.text = CONFIG.text[state.flash.key];
    }
    if (state.flash.text) {
      messageEl.textContent = state.flash.text;
      textParticleGroup.setText(state.flash.text, 'emotion', state.flash.started || performance.now());
    }
  }

  function getVillageSignature() {
    // 影响村庄粒子空间分布的参数变化时，需要重建村庄粒子。
    return [
      CONFIG.village.particleCount,
      CONFIG.village.width,
      CONFIG.village.height,
      CONFIG.village.x,
      CONFIG.village.y,
      CONFIG.village.houseCount,
      CONFIG.village.randomness
    ].join('|');
  }

  function getTreeSignature() {
    // 影响树木粒子空间分布的参数变化时，需要重建树木粒子。
    return [
      CONFIG.trees.particleCount,
      CONFIG.trees.width,
      CONFIG.trees.height,
      CONFIG.trees.x,
      CONFIG.trees.y,
      CONFIG.trees.bend
    ].join('|');
  }

  function getTextSignature() {
    // 影响文字粒子采样和动画外观的参数变化时，需要重建当前文字粒子。
    return [
      CONFIG.textEffects.style,
      CONFIG.textEffects.fontSize,
      CONFIG.textEffects.letterSpacing,
      CONFIG.textEffects.color,
      CONFIG.textEffects.particleDensity,
      CONFIG.textEffects.particleSpread,
      CONFIG.text.title,
      CONFIG.text.subtitle,
      CONFIG.text.loneliness,
      CONFIG.text.anxiety,
      CONFIG.text.desire,
      CONFIG.text.hope,
      CONFIG.text.peace,
      CONFIG.text.final,
      state.flash.text
    ].join('|');
  }

  // 暴露给 panel.js 使用，面板只改配置，不直接改绘制逻辑。
  window.StarryNightApp = {
    config: CONFIG,
    defaultConfig,
    state,
    regions,
    setConfig,
    replaceConfig,
    rebuildParticles,
    applySelectionColor() {
      applySelectionColorToAllGroups();
    },
    clearParticleSelection() {
      clearAllParticleSelections();
    },
    setExplorationState,
    resetExplorationState,
    resetCameraView,
    setFrontView,
    setTopView,
    startPanoramaRotation,
    stopPanoramaRotation,
    particleSystem,
    getSelectedRegion() {
      return CONFIG.regions.selected;
    },
    resetConfig() {
      replaceConfig({}, { rebuildParticles: true });
    }
  };

  syncEditorConfig();
  resize();
  applyTextConfig();
  // 初始页面进入玩家简洁模式，只保留引导句，完整版控制台由玩家后续主动打开。
  document.body.classList.add('player-simple-mode');
  state.flash.text = '请靠近星光、树影与村庄，触碰夜色里的情绪。';
  state.flash.key = 'prompt';
  state.flash.started = performance.now();
  state.flash.until = Number.POSITIVE_INFINITY;
  messageEl.textContent = state.flash.text;
  messageEl.style.opacity = '1';
  updateScore();
  requestAnimationFrame(animate);
})();
