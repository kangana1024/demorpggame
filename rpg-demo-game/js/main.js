//=============================================================================
// main.js v1.10.0
//=============================================================================

// Initialize the game on page load
window.onload = function () {
  PluginManager.setup($plugins);
  window.effekseer = effekseer;
  effekseer.initRuntime("js/libs/effekseer.wasm", () =>
    SceneManager.run(Scene_Boot),
  );
};
