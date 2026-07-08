(() => {
  const STORAGE_KEY = 'starryNightCreativeConsoleConfig';
  const app = window.StarryNightApp;
  const sceneEditor = window.ParticleSceneEditor;
  if (!app) return;

  const controls = [
    { group: '场景状态', label: '视觉状态', path: 'sceneState.explorationState', type: 'select', options: [['auto', '自动'], ['before', '探索前'], ['after', '探索后']] },
    { group: '场景状态', label: '探索前视觉', type: 'button', action: 'visual-before' },
    { group: '场景状态', label: '探索后视觉', type: 'button', action: 'visual-after' },
    { group: '场景状态', label: '自动根据情绪收集进度切换', type: 'button', action: 'visual-auto' },
    { group: '场景状态', label: '重置探索状态', type: 'button', action: 'visual-reset' },
    { group: '场景状态', label: '过渡时长', path: 'sceneState.transitionDuration', type: 'range', min: 0.3, max: 5, step: 0.1 },
    { group: '场景状态', label: '背景主色', path: 'sceneState.backgroundPrimary', type: 'color' },
    { group: '场景状态', label: '背景辅色', path: 'sceneState.backgroundSecondary', type: 'color' },
    { group: '场景状态', label: '星光颜色', path: 'sceneState.starColor', type: 'color' },
    { group: '场景状态', label: '月亮颜色', path: 'sceneState.moonColor', type: 'color' },
    { group: '场景状态', label: '水墨颜色', path: 'sceneState.inkColor', type: 'color' },
    { group: '场景状态', label: '画面亮度', path: 'sceneState.brightness', type: 'range', min: 0.3, max: 2, step: 0.01 },
    { group: '场景状态', label: '透明雾感', path: 'sceneState.fog', type: 'range', min: 0, max: 1, step: 0.01 },
    { group: '粒子群', label: '粒子总数量', path: 'particles.totalCount', type: 'range', min: 100, max: 8000, step: 1, rebuild: true },
    { group: '粒子群', label: '粒子密度', path: 'particles.density', type: 'range', min: 0.1, max: 5, step: 0.05, rebuild: true },
    { group: '粒子群', label: '粒子形态', path: 'particles.shape', type: 'select', options: [['starDust', '点状星尘'], ['shortStroke', '短线笔触'], ['inkMist', '水墨雾点'], ['glowDot', '发光圆点'], ['swirlStroke', '旋涡笔触'], ['starBurst', '星芒粒子']] },
    { group: '粒子群', label: '粒子大小', path: 'particles.size', type: 'range', min: 0.2, max: 10, step: 0.1 },
    { group: '粒子群', label: '粒子透明度', path: 'particles.opacity', type: 'range', min: 0.05, max: 1, step: 0.01 },
    { group: '粒子群', label: '粒子速度', path: 'particles.speed', type: 'range', min: 0, max: 5, step: 0.1 },
    { group: '粒子群', label: '粒子随机度', path: 'particles.randomness', type: 'range', min: 0, max: 2, step: 0.01 },
    { group: '粒子群', label: '粒子拖尾长度', path: 'particles.trail', type: 'range', min: 0.01, max: 0.4, step: 0.01 },
    { group: '粒子群', label: '旋转方向', path: 'particles.rotationDirection', type: 'select', options: [['clockwise', '顺时针'], ['counterclockwise', '逆时针'], ['bidirectional', '双向扰动'], ['randomFlow', '随机流动']] },
    { group: '粒子群', label: '旋转强度', path: 'particles.rotationStrength', type: 'range', min: 0, max: 5, step: 0.1 },
    { group: '粒子群', label: '旋转速度', path: 'particles.rotationSpeed', type: 'range', min: -5, max: 5, step: 0.1 },
    { group: '粒子群', label: '旋转中心 X', path: 'particles.centerX', type: 'range', min: 0, max: 1, step: 0.01 },
    { group: '粒子群', label: '旋转中心 Y', path: 'particles.centerY', type: 'range', min: 0, max: 1, step: 0.01 },
    { group: '粒子群', label: '粒子扩散范围', path: 'particles.spread', type: 'range', min: 20, max: 500, step: 1 },
    { group: '区域选择', label: '编辑模式', path: 'selection.editMode', type: 'select', options: [['view', '查看模式'], ['boxSelect', '框选粒子'], ['brushSelect', '圆形笔刷选择'], ['deselect', '取消选择'], ['colorPaint', '区域染色'], ['densityPaint', '区域密度绘制']] },
    { group: '区域选择', label: '当前区域', path: 'selection.selected', type: 'select', options: regionOptions() },
    { group: '区域选择', label: '选中粒子数量', path: 'selection.selectedCount', type: 'readonly' },
    { group: '区域选择', label: '选区颜色', path: 'selection.selectionColor', type: 'color' },
    { group: '区域选择', label: '应用颜色', type: 'button', action: 'apply-selection-color' },
    { group: '区域选择', label: '随机色彩扰动', path: 'selection.colorJitter', type: 'range', min: 0, max: 1, step: 0.01 },
    { group: '区域选择', label: '选区透明度', path: 'selection.selectionOpacity', type: 'range', min: 0.05, max: 1, step: 0.01 },
    { group: '区域选择', label: '选区粒子大小', path: 'selection.selectionSize', type: 'range', min: 0.2, max: 10, step: 0.1 },
    { group: '区域选择', label: '笔刷半径', path: 'selection.brushRadius', type: 'range', min: 10, max: 300, step: 1 },
    { group: '区域选择', label: '笔刷强度', path: 'selection.brushStrength', type: 'range', min: 0.1, max: 5, step: 0.1 },
    { group: '区域选择', label: '密度绘制方式', path: 'selection.densityMode', type: 'select', options: [['add', '增加粒子'], ['remove', '减少粒子']] },
    { group: '区域选择', label: '清空选区', type: 'button', action: 'clear-selection' },
    { group: '区域选择', label: '局部颜色', path: 'selection.localColor', type: 'color' },
    { group: '区域选择', label: '局部改色强度', path: 'selection.localTintStrength', type: 'range', min: 0, max: 1, step: 0.01 },
    { group: '区域选择', label: '显示区域轮廓', path: 'sceneState.showRegionOverlay', type: 'checkbox' },
    { group: '村庄粒子', label: '村庄粒子数量', path: 'village.particleCount', type: 'range', min: 30, max: 2000, step: 1, rebuild: true },
    { group: '村庄粒子', label: '村庄宽度', path: 'village.width', type: 'range', min: 0.1, max: 0.8, step: 0.01, rebuild: true },
    { group: '村庄粒子', label: '村庄高度', path: 'village.height', type: 'range', min: 0.04, max: 0.4, step: 0.01, rebuild: true },
    { group: '村庄粒子', label: '村庄位置 X', path: 'village.x', type: 'range', min: 0, max: 1, step: 0.01, rebuild: true },
    { group: '村庄粒子', label: '村庄位置 Y', path: 'village.y', type: 'range', min: 0, max: 1, step: 0.01, rebuild: true },
    { group: '村庄粒子', label: '房屋数量', path: 'village.houseCount', type: 'range', min: 1, max: 30, step: 1, rebuild: true },
    { group: '村庄粒子', label: '窗户亮度', path: 'village.windowBrightness', type: 'range', min: 0, max: 2, step: 0.01 },
    { group: '村庄粒子', label: '窗户颜色', path: 'village.lightColor', type: 'color' },
    { group: '村庄粒子', label: '村庄整体透明度', path: 'village.opacity', type: 'range', min: 0.05, max: 1, step: 0.01 },
    { group: '村庄粒子', label: '村庄随机偏移', path: 'village.randomness', type: 'range', min: 0, max: 2, step: 0.01, rebuild: true },
    { group: '村庄粒子', label: '村庄颜色', path: 'village.color', type: 'color' },
    { group: '村庄粒子', label: '窗户粒子大小', path: 'village.lightSize', type: 'range', min: 1, max: 12, step: 0.1, rebuild: true },
    { group: '村庄粒子', label: '重建村庄粒子', type: 'button', action: 'rebuild-village' },
    { group: '树木粒子', label: '树木粒子数量', path: 'trees.particleCount', type: 'range', min: 40, max: 3000, step: 1, rebuild: true },
    { group: '树木粒子', label: '树木高度', path: 'trees.height', type: 'range', min: 0.3, max: 2.5, step: 0.01, rebuild: true },
    { group: '树木粒子', label: '树木宽度', path: 'trees.width', type: 'range', min: 0.3, max: 2.5, step: 0.01, rebuild: true },
    { group: '树木粒子', label: '树木位置 X', path: 'trees.x', type: 'range', min: 0, max: 1, step: 0.01, rebuild: true },
    { group: '树木粒子', label: '树木位置 Y', path: 'trees.y', type: 'range', min: 0, max: 1, step: 0.01, rebuild: true },
    { group: '树木粒子', label: '树木弯曲程度', path: 'trees.bend', type: 'range', min: -1, max: 1, step: 0.01, rebuild: true },
    { group: '树木粒子', label: '树木水墨扩散程度', path: 'trees.inkSpread', type: 'range', min: 0, max: 2, step: 0.01 },
    { group: '树木粒子', label: '树木颜色', path: 'trees.inkColor', type: 'color' },
    { group: '树木粒子', label: '树木透明度', path: 'trees.opacity', type: 'range', min: 0.05, max: 1, step: 0.01 },
    { group: '树木粒子', label: '树木生长动画速度', path: 'trees.growthSpeed', type: 'range', min: 0, max: 5, step: 0.1 },
    { group: '树木粒子', label: '重建树木粒子', type: 'button', action: 'rebuild-tree' },
    { group: '文字动画', label: '作品标题', path: 'textEffects.title', type: 'text' },
    { group: '文字动画', label: '作品副标题', path: 'textEffects.subtitle', type: 'text' },
    { group: '文字动画', label: '孤独情绪文案', path: 'textEffects.loneliness', type: 'textarea' },
    { group: '文字动画', label: '焦虑情绪文案', path: 'textEffects.anxiety', type: 'textarea' },
    { group: '文字动画', label: '渴望情绪文案', path: 'textEffects.desire', type: 'textarea' },
    { group: '文字动画', label: '希望情绪文案', path: 'textEffects.hope', type: 'textarea' },
    { group: '文字动画', label: '安宁情绪文案', path: 'textEffects.peace', type: 'textarea' },
    { group: '文字动画', label: '最终完成文案', path: 'textEffects.final', type: 'textarea' },
    { group: '文字动画', label: '文字出现样式', path: 'textEffects.style', type: 'select', options: [['fade', '淡入'], ['typewriter', '打字机'], ['particleGather', '粒子聚合成字'], ['inkReveal', '水墨扩散显字'], ['starFlicker', '星尘闪烁显字'], ['zoomIn', '从远处靠近显字']] },
    { group: '文字动画', label: '文字大小', path: 'textEffects.fontSize', type: 'range', min: 14, max: 64, step: 1 },
    { group: '文字动画', label: '字间距', path: 'textEffects.letterSpacing', type: 'range', min: 0, max: 12, step: 0.5 },
    { group: '文字动画', label: '文字颜色', path: 'textEffects.color', type: 'color' },
    { group: '文字动画', label: '发光强度', path: 'textEffects.glow', type: 'range', min: 0, max: 2, step: 0.01 },
    { group: '文字动画', label: '出现速度', path: 'textEffects.appearSpeed', type: 'range', min: 0.1, max: 3, step: 0.05 },
    { group: '文字动画', label: '消失速度', path: 'textEffects.disappearSpeed', type: 'range', min: 0.1, max: 3, step: 0.05 },
    { group: '文字动画', label: '粒子文字密度', path: 'textEffects.particleDensity', type: 'range', min: 1, max: 8, step: 0.5 },
    { group: '文字动画', label: '粒子文字扩散范围', path: 'textEffects.particleSpread', type: 'range', min: 0, max: 400, step: 5 },
    { group: '文字动画', label: '文字停留时间', path: 'textEffects.duration', type: 'range', min: 600, max: 8000, step: 100 },
    { group: '相机/视角', label: '缩放 Zoom', path: 'camera.zoom', type: 'range', min: 0.3, max: 5, step: 0.01 },
    { group: '相机/视角', label: '平移 X', path: 'camera.panX', type: 'range', min: -1000, max: 1000, step: 1 },
    { group: '相机/视角', label: '平移 Y', path: 'camera.panY', type: 'range', min: -1000, max: 1000, step: 1 },
    { group: '相机/视角', label: '整体旋转 Z', path: 'camera.rotation', type: 'range', min: -180, max: 180, step: 1 },
    { group: '相机/视角', label: '视角旋转 X', path: 'camera.viewRotX', type: 'range', min: -60, max: 60, step: 1 },
    { group: '相机/视角', label: '视角旋转 Y', path: 'camera.viewRotY', type: 'range', min: -60, max: 60, step: 1 },
    { group: '相机/视角', label: '透视强度', path: 'camera.perspective', type: 'range', min: 0, max: 2, step: 0.01 },
    { group: '相机/视角', label: '自动缓慢旋转', path: 'camera.autoRotate', type: 'checkbox' },
    { group: '相机/视角', label: '自动旋转速度', path: 'camera.autoRotateSpeed', type: 'range', min: -2, max: 2, step: 0.01 },
    { group: '相机/视角', label: '启用伪 3D', path: 'camera.pseudo3dEnabled', type: 'checkbox' },
    { group: '相机/视角', label: '重置视角', type: 'button', action: 'camera-reset' },
    { group: '相机/视角', label: '正面视图', type: 'button', action: 'camera-front' },
    { group: '相机/视角', label: '俯视视图', type: 'button', action: 'camera-top' },
    { group: '相机/视角', label: '全景缓慢旋转', type: 'button', action: 'camera-panorama' },
    { group: '相机/视角', label: '停止自动旋转', type: 'button', action: 'camera-stop' },
    { group: 'Maya 式操作模式', label: '编辑器开关', path: 'editMode.enabled', type: 'checkbox' },
    { group: 'Maya 式操作模式', label: '当前图层', path: 'editMode.selectedLayer', type: 'select', options: layerOptions() },
    { group: 'Maya 式操作模式', label: '显示参考线', path: 'editMode.showGuides', type: 'checkbox' },
    { group: 'Maya 式操作模式', label: '工具栏', path: 'editMode.mode', type: 'mode-buttons', options: [['select', 'Select'], ['move', 'Move'], ['rotate', 'Rotate'], ['scale', 'Scale'], ['create', 'Create Particles'], ['delete', 'Delete'], ['paintColor', 'Paint Color'], ['paintDensity', 'Paint Density'], ['snap', 'Snap to Region'], ['resetTransform', 'Reset Transform']] },
    { group: 'Maya 式操作模式', label: '创建粒子类型', path: 'editMode.createType', type: 'select', options: [['point', '创建点状粒子'], ['lineStroke', '创建线状笔触粒子'], ['inkCloud', '创建水墨云团粒子'], ['star', '创建星光粒子'], ['village', '创建村庄结构粒子'], ['tree', '创建树木结构粒子'], ['text', '创建文字粒子']] },
    { group: 'Maya 式操作模式', label: '创建数量', path: 'editMode.createCount', type: 'range', min: 1, max: 600, step: 1 },
    { group: 'Maya 式操作模式', label: '创建半径', path: 'editMode.createRadius', type: 'range', min: 1, max: 400, step: 1 },
    { group: 'Maya 式操作模式', label: '创建颜色', path: 'editMode.createColor', type: 'color' },
    { group: 'Maya 式操作模式', label: '创建随机度', path: 'editMode.createRandomness', type: 'range', min: 0, max: 2, step: 0.01 },
    { group: 'Maya 式操作模式', label: '创建初始速度', path: 'editMode.createInitialSpeed', type: 'range', min: 0, max: 5, step: 0.1 },
    { group: 'Maya 式操作模式', label: '创建目标区域 region', path: 'editMode.createRegion', type: 'select', options: [['sky', 'sky'], ['moon', 'moon'], ['stars', 'stars'], ['swirl', 'swirl'], ['village', 'village'], ['tree', 'tree'], ['text', 'text'], ['emotion', 'emotion']] }
  ];

  const simpleControls = [
    // 简易控制台只保留 10 个数值控制，避免玩家第一次进入时被完整版参数淹没。
    { label: '画面亮度', path: 'sceneState.brightness', type: 'range', min: 0.3, max: 2, step: 0.01 },
    { label: '透明雾感', path: 'sceneState.fog', type: 'range', min: 0, max: 1, step: 0.01 },
    { label: '粒子数量', path: 'particles.totalCount', type: 'range', min: 100, max: 8000, step: 1, rebuild: true },
    { label: '粒子大小', path: 'particles.size', type: 'range', min: 0.2, max: 10, step: 0.1 },
    { label: '粒子速度', path: 'particles.speed', type: 'range', min: 0, max: 5, step: 0.1 },
    { label: '粒子透明度', path: 'particles.opacity', type: 'range', min: 0.05, max: 1, step: 0.01 },
    { label: '旋涡强度', path: 'swirl.strength', type: 'range', min: 0, max: 5, step: 0.1 },
    { label: '旋涡速度', path: 'swirl.speed', type: 'range', min: 0, max: 5, step: 0.1 },
    { label: '窗户亮度', path: 'village.windowBrightness', type: 'range', min: 0, max: 2, step: 0.01 },
    { label: '树木生长速度', path: 'trees.growthSpeed', type: 'range', min: 0, max: 5, step: 0.1 },
    { label: '作品标题', path: 'textEffects.title', type: 'textarea' },
    { label: '作品副标题', path: 'textEffects.subtitle', type: 'textarea' },
    { label: '最终完成文案', path: 'textEffects.final', type: 'textarea' }
  ];

  function layerOptions() {
    return [['sky', '天空'], ['swirl', '旋涡'], ['stars', '星空'], ['moon', '月亮'], ['village', '村庄'], ['tree', '树木'], ['text', '文字'], ['regions', '情绪区域']];
  }

  function regionOptions() {
    return [['global', '全局'], ['hope', '希望'], ['desire', '渴望'], ['anxiety', '焦虑'], ['loneliness', '孤独'], ['peace', '安宁']];
  }

  function getValue(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], app.config);
  }

  function createConfigPatch(path, value) {
    // 控件变化先生成局部补丁，再交给 main.js 统一合并，避免绕过实时刷新逻辑。
    const keys = path.split('.');
    const last = keys.pop();
    const patch = {};
    const target = keys.reduce((obj, key) => {
      obj[key] = {};
      return obj[key];
    }, patch);
    target[last] = value;
    return patch;
  }

  function buildPanel() {
    const fullPanel = document.createElement('aside');
    fullPanel.className = 'creative-console full-creative-console is-collapsed';
    fullPanel.innerHTML = `
      <div class="creative-console__top">
        <h2>完整创作控制台</h2>
        <button type="button" class="console-icon-button" data-action="collapse" aria-label="收起面板">收起</button>
      </div>
      <div class="creative-console__body"></div>
      <div class="creative-console__actions">
        <button type="button" data-action="save">保存设置</button>
        <button type="button" data-action="reset">重置默认</button>
        <button type="button" data-action="export">导出配置</button>
        <button type="button" data-action="import">导入配置</button>
        <input type="file" accept="application/json" class="config-file-input" hidden>
      </div>
    `;

    const simplePanel = document.createElement('aside');
    simplePanel.className = 'creative-console simple-creative-console is-collapsed';
    simplePanel.innerHTML = `
      <div class="creative-console__top">
        <h2>简易创造</h2>
        <button type="button" class="console-icon-button" data-action="collapse" aria-label="收起面板">收起</button>
      </div>
      <div class="creative-console__body simple-console__body"></div>
      <div class="creative-console__actions simple-console__actions">
        <button type="button" data-action="save">保存设置</button>
        <button type="button" data-action="reset">重置默认</button>
        <button type="button" data-action="export">导出配置</button>
        <button type="button" data-action="import">导入配置</button>
        <button type="button" class="simple-console__full-button" data-action="open-full-console">进入完整版控制台</button>
        <input type="file" accept="application/json" class="config-file-input" hidden>
      </div>
    `;

    const createButton = document.createElement('button');
    createButton.type = 'button';
    createButton.className = 'create-console-entry';
    createButton.textContent = '创造';
    createButton.hidden = true;

    const fullToggle = document.createElement('button');
    fullToggle.type = 'button';
    fullToggle.className = 'creative-console-toggle full-console-toggle';
    fullToggle.textContent = '隐藏面板';
    fullToggle.hidden = true;

    document.body.append(fullPanel, simplePanel, createButton, fullToggle);
    renderControls(fullPanel.querySelector('.creative-console__body'));
    renderSimpleControls(simplePanel.querySelector('.simple-console__body'));
    bindPanel(fullPanel, fullToggle);
    bindPanel(simplePanel, null);
    startReadonlyRefresh(fullPanel);
    startReadonlyRefresh(simplePanel);

    createButton.addEventListener('click', () => {
      setPanelCollapsed(simplePanel, null, false);
      setPanelCollapsed(fullPanel, fullToggle, true);
      syncCreateEntry(createButton, simplePanel, fullPanel);
    });

    window.setInterval(() => syncCreateEntry(createButton, simplePanel, fullPanel), 250);
    syncCreateEntry(createButton, simplePanel, fullPanel);
  }

  function renderSimpleControls(body) {
    for (const control of simpleControls) {
      body.append(createField(control));
    }
  }

  function renderControls(body) {
    const groups = new Map();
    for (const control of controls) {
      if (!groups.has(control.group)) {
        const section = document.createElement('section');
        section.className = 'console-section';
        section.innerHTML = `
          <button type="button" class="console-section__toggle" data-action="toggle-section" aria-expanded="true">
            <span>${control.group}</span>
            <span class="console-section__chevron">⌄</span>
          </button>
          <div class="console-section__content"></div>
        `;
        groups.set(control.group, section);
        body.append(section);
      }
      groups.get(control.group).querySelector('.console-section__content').append(createField(control));
    }
  }

  function createField(control) {
    const field = document.createElement('label');
    field.className = `console-field console-field--${control.type}`;
    const value = control.path ? getValue(control.path) : '';
    const id = control.path ? `console-${control.path.replaceAll('.', '-')}` : `console-${control.action}`;
    const valueText = control.type === 'range' ? `<span class="console-value">${escapeHtml(value)}</span>` : '';
    const input = createControlInput(control, id, value);

    field.innerHTML = control.type === 'button'
      ? input
      : `<span>${escapeHtml(control.label)}</span>${valueText}${input}`;
    return field;
  }

  function createControlInput(control, id, value) {
    if (control.type === 'button') {
      return `<button type="button" class="console-wide-button" data-action="${escapeHtml(control.action)}">${escapeHtml(control.label)}</button>`;
    }
    if (control.type === 'readonly') {
      return `<output id="${id}" data-path="${escapeHtml(control.path)}" class="console-readonly">${escapeHtml(value)}</output>`;
    }
    if (control.type === 'mode-buttons') {
      return `<div class="console-mode-buttons" data-path="${escapeHtml(control.path)}">${control.options.map(([optionValue, label]) => `<button type="button" data-mode-value="${escapeHtml(optionValue)}" class="${String(value) === String(optionValue) ? 'is-active' : ''}">${escapeHtml(label)}</button>`).join('')}</div>`;
    }
    if (control.type === 'textarea') {
      return `<textarea id="${escapeHtml(id)}" data-path="${escapeHtml(control.path)}">${escapeHtml(value)}</textarea>`;
    }
    if (control.type === 'select') {
      return `<select id="${escapeHtml(id)}" data-path="${escapeHtml(control.path)}" data-rebuild="${control.rebuild ? 'true' : 'false'}">${control.options.map(([optionValue, label]) => `<option value="${escapeHtml(optionValue)}" ${String(value) === String(optionValue) ? 'selected' : ''}>${escapeHtml(label)}</option>`).join('')}</select>`;
    }
    if (control.type === 'checkbox') {
      return `<input id="${escapeHtml(id)}" data-path="${escapeHtml(control.path)}" data-rebuild="${control.rebuild ? 'true' : 'false'}" type="checkbox" ${value ? 'checked' : ''}>`;
    }
    return `<input id="${escapeHtml(id)}" data-path="${escapeHtml(control.path)}" data-rebuild="${control.rebuild ? 'true' : 'false'}" type="${escapeHtml(control.type)}" value="${escapeHtml(value)}" ${rangeAttrs(control)}>`;
  }

  function rangeAttrs(control) {
    if (control.type !== 'range') return '';
    return `min="${control.min}" max="${control.max}" step="${control.step}"`;
  }

  function bindPanel(panel, toggle) {
    panel.addEventListener('input', (event) => {
      const input = event.target;
      if (!input.dataset.path) return;
      const value = normalizeInputValue(input);
      const valueEl = input.parentElement.querySelector('.console-value');
      if (valueEl) valueEl.textContent = input.value;
      app.setConfig(createConfigPatch(input.dataset.path, value), { rebuildParticles: input.dataset.rebuild === 'true' });
      syncEditorBridge(input.dataset.path, value);
    });

    panel.addEventListener('click', (event) => {
      if (event.target.dataset.modeValue) {
        const wrap = event.target.closest('.console-mode-buttons');
        app.setConfig(createConfigPatch(wrap.dataset.path, event.target.dataset.modeValue));
        syncEditorBridge(wrap.dataset.path, event.target.dataset.modeValue);
        refreshControls(panel);
        return;
      }
      const actionTarget = event.target.closest('[data-action]');
      const action = actionTarget?.dataset.action;
      if (!action) return;
      if (action === 'toggle-section') {
        toggleSection(actionTarget.closest('.console-section'));
        return;
      }
      if (action === 'collapse') setPanelCollapsed(panel, toggle, true);
      if (action === 'open-full-console') {
        const fullPanel = document.querySelector('.full-creative-console');
        const fullToggle = document.querySelector('.full-console-toggle');
        setPanelCollapsed(panel, null, true);
        setPanelCollapsed(fullPanel, fullToggle, false);
      }
      if (action === 'save') saveConfig();
      if (action === 'reset') resetConfig(panel);
      if (action === 'export') exportConfig();
      if (action === 'import') panel.querySelector('.config-file-input').click();
      if (action === 'rebuild-village' && sceneEditor) sceneEditor.rebuildLayer('village');
      if (action === 'rebuild-tree' && sceneEditor) sceneEditor.rebuildLayer('tree');
      if (action === 'apply-selection-color') app.applySelectionColor();
      if (action === 'clear-selection') app.clearParticleSelection();
      if (action === 'visual-before') app.setExplorationState('before');
      if (action === 'visual-after') app.setExplorationState('after');
      if (action === 'visual-auto') app.setExplorationState('auto');
      if (action === 'visual-reset') app.resetExplorationState();
      if (action === 'camera-reset') app.resetCameraView();
      if (action === 'camera-front') app.setFrontView();
      if (action === 'camera-top') app.setTopView();
      if (action === 'camera-panorama') app.startPanoramaRotation();
      if (action === 'camera-stop') app.stopPanoramaRotation();
      refreshControls(panel);
    });

    panel.querySelector('.config-file-input').addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) importConfig(file, panel);
      event.target.value = '';
    });

    toggle.addEventListener('click', () => {
      setPanelCollapsed(panel, toggle, !panel.classList.contains('is-collapsed'));
    });
  }

  function toggleSection(section) {
    const collapsed = !section.classList.contains('is-section-collapsed');
    section.classList.toggle('is-section-collapsed', collapsed);
    section.querySelector('.console-section__toggle').setAttribute('aria-expanded', String(!collapsed));
  }

  function normalizeInputValue(input) {
    if (input.type === 'checkbox') return input.checked;
    if (input.type === 'range') return Number(input.value);
    if (input.tagName === 'SELECT' && (input.value === '1' || input.value === '-1')) return Number(input.value);
    return input.value;
  }

  function syncEditorBridge(path, value) {
    if (!sceneEditor) return;
    if (path === 'editMode.mode') sceneEditor.setMode(value);
    if (path === 'editMode.selectedLayer') sceneEditor.setLayer(value);
    if (path === 'selection.selected') sceneEditor.setRegion(value);
  }

  function setPanelCollapsed(panel, toggle, collapsed) {
    if (!panel) return;
    panel.classList.toggle('is-collapsed', collapsed);
    if (toggle) toggle.textContent = collapsed ? '显示面板' : '隐藏面板';
  }

  function syncCreateEntry(createButton, simplePanel, fullPanel) {
    // 五种情绪全部点亮后才允许进入创造；打开任意控制台时隐藏入口按钮。
    const complete = Boolean(app.state.final || document.body.classList.contains('is-emotion-complete'));
    const simpleOpen = simplePanel && !simplePanel.classList.contains('is-collapsed');
    const fullOpen = fullPanel && !fullPanel.classList.contains('is-collapsed');
    createButton.hidden = !complete || simpleOpen || fullOpen;
  }

  function saveConfig() {
    // 保存完整配置包，刷新页面时会从 localStorage 自动恢复。
    localStorage.setItem(STORAGE_KEY, JSON.stringify(createExportPayload()));
  }

  function resetConfig(panel) {
    localStorage.removeItem(STORAGE_KEY);
    app.resetConfig();
    refreshControls(panel);
  }

  function exportConfig() {
    // 导出包含所有控制台参数和必要说明的 JSON 文件，便于课堂前后复用。
    const blob = new Blob([JSON.stringify(createExportPayload(), null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'starry-night-config.json';
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  function importConfig(file, panel) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const nextConfig = extractImportedConfig(JSON.parse(reader.result));
        applyImportedConfig(nextConfig);
        refreshControls(panel);
        saveConfig();
      } catch (error) {
        alert('导入失败：JSON 文件格式不正确。');
      }
    };
    reader.readAsText(file);
  }

  function refreshControls(panel) {
    for (const input of panel.querySelectorAll('[data-path]')) {
      const value = getValue(input.dataset.path);
      if (input.tagName === 'OUTPUT') {
        input.textContent = value;
        continue;
      }
      if (input.type === 'checkbox') {
        input.checked = Boolean(value);
      } else {
        input.value = value;
      }
      const valueEl = input.parentElement.querySelector('.console-value');
      if (valueEl) valueEl.textContent = value;
    }
    for (const group of panel.querySelectorAll('.console-mode-buttons')) {
      const value = getValue(group.dataset.path);
      for (const button of group.querySelectorAll('button')) {
        button.classList.toggle('is-active', button.dataset.modeValue === String(value));
      }
    }
  }

  function startReadonlyRefresh(panel) {
    // 选中粒子数量由画布交互实时改变，这里轻量刷新只读显示。
    window.setInterval(() => {
      for (const output of panel.querySelectorAll('output[data-path]')) {
        output.textContent = getValue(output.dataset.path);
      }
    }, 200);
  }

  function loadSavedConfig() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      applyImportedConfig(extractImportedConfig(JSON.parse(saved)));
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function applyImportedConfig(nextConfig) {
    // 导入配置时先恢复默认结构，再合并外部参数，避免旧文件缺字段导致控件失效。
    if (app.replaceConfig) {
      app.replaceConfig(nextConfig, { rebuildParticles: true });
    } else {
      app.setConfig(nextConfig, { rebuildParticles: true });
    }
  }

  function createExportPayload() {
    // JSON 顶层保留 config，同时显式列出课堂需要检查的配置模块。
    const config = cloneConfig(app.config);
    return {
      schema: 'starry-night-creative-console',
      version: 2,
      exportedAt: new Date().toISOString(),
      config,
      includes: {
        particles: config.particles,
        swirl: config.swirl,
        village: config.village,
        trees: config.trees,
        textEffects: config.textEffects,
        camera: config.camera,
        sceneState: config.sceneState,
        regionColors: {
          selection: config.selection,
          regions: config.regions
        },
        emotionTexts: {
          title: config.textEffects.title,
          subtitle: config.textEffects.subtitle,
          loneliness: config.textEffects.loneliness,
          anxiety: config.textEffects.anxiety,
          desire: config.textEffects.desire,
          hope: config.textEffects.hope,
          peace: config.textEffects.peace,
          final: config.textEffects.final
        }
      }
    };
  }

  function extractImportedConfig(payload) {
    // 兼容新版导出包和旧版直接导出的 config 对象。
    if (!payload || typeof payload !== 'object') throw new Error('invalid config');
    if (payload.config && typeof payload.config === 'object') return payload.config;
    return payload;
  }

  function cloneConfig(value) {
    // 控制台配置只包含可序列化数据，JSON 克隆足够稳定。
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    // 文案控件允许输入任意文本，写回 HTML 时需要转义。
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  // 页面加载时自动恢复上一次保存的设置。
  loadSavedConfig();
  buildPanel();
})();
