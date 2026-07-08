(() => {
  const app = window.StarryNightApp;
  if (!app) return;

  const editor = {
    modes: ['select', 'move', 'rotate', 'scale', 'create', 'delete', 'paintColor', 'paintDensity', 'snap', 'resetTransform'],
    layers: ['sky', 'swirl', 'stars', 'moon', 'village', 'tree', 'text', 'regions'],
    regions: ['global', 'hope', 'desire', 'anxiety', 'loneliness', 'peace']
  };

  function setMode(mode) {
    if (!editor.modes.includes(mode)) return;
    app.setConfig({ editMode: { enabled: true, mode } });
  }

  function setLayer(layer) {
    if (!editor.layers.includes(layer)) return;
    app.setConfig({ editMode: { selectedLayer: layer } });
  }

  function setRegion(regionKey) {
    if (!editor.regions.includes(regionKey)) return;
    app.setConfig({ selection: { selected: regionKey } });
  }

  function rebuildLayer(layer) {
    // 第一阶段先统一触发粒子重建，后续可以按图层拆成更细的重建逻辑。
    if (layer === 'village') {
      app.config.village.rebuildSeed += 1;
    }
    if (layer === 'tree') {
      app.config.trees.rebuildSeed += 1;
    }
    app.rebuildParticles();
  }

  function applyTransformPatch(patch) {
    app.setConfig({ camera: patch });
  }

  function applyPseudo3dPatch(patch) {
    app.setConfig({ camera: patch });
  }

  function getEditorMeta() {
    return {
      modes: editor.modes.slice(),
      layers: editor.layers.slice(),
      regions: editor.regions.slice()
    };
  }

  // 给 panel.js 提供编辑器 API，控制台只负责 UI，不直接管理场景状态。
  window.ParticleSceneEditor = {
    setMode,
    setLayer,
    setRegion,
    rebuildLayer,
    applyTransformPatch,
    applyPseudo3dPatch,
    getEditorMeta
  };
})();
