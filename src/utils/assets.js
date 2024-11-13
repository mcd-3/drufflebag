
/**
 * Gets the full filepath of an asset
 *
 * @param {string} assetFileName - Asset filename to try and fetch
 * @returns {string} Full path of asset
 */
const getAssetPath = assetFileName => {
  return `src/assets/${assetFileName}`;
};

export { getAssetPath };
