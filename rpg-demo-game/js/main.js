//=============================================================================
// main.js
//=============================================================================

//-----------------------------------------------------------------------------
/**
 * The static class that handles the window frame and browser environment.
 *
 * @namespace
 */
function Utils() {
    throw new Error("This is a static class");
}

// Initialize the game on page load
window.onload = function() {
    PluginManager.setup($plugins);
    window.effekseer = effekseer;
    effekseer.initRuntime(
        "js/libs/effekseer.wasm",
        () => SceneManager.run(Scene_Boot)
    );
};
