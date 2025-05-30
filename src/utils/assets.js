import aboutSVG from './../assets/info-circle.svg';
import arrowDownSVG from './../assets/arrow-down-circle.svg';
import arrowRightSVG from './../assets/arrow-right-circle.svg';
import avm1SVG from './../../public/avm1.svg';
import avm2SVG from './../../public/avm2.svg';
import avmUnknownSVG from './../../public/avm_unknown.svg';
import drufflebagSVG from './../../public/drufflebag.svg';
import fileNotFoundSVG from './../assets/file-not-found.svg';
import folderSVG from './../assets/folder.svg';
import globeSVG from './../assets/globe.svg';
import loadingSVG from './../assets/loading.svg';
import pauseSVG from './../assets/pause.svg';
import playSVG from './../assets/play.svg';
import refreshDoubleSVG from './../assets/refresh-double.svg';
import settingsSVG from './../assets/settings.svg';
import stopSVG from './../assets/square.svg';
import warningSVG from './../assets/warning-triangle.svg';

const assets = {
  "AVM_1": avm1SVG,
  "AVM_2": avm2SVG,
  "AVM_UNKNOWN": avmUnknownSVG,
  "GIF_LOADING": loadingSVG,
  "ICN_ABOUT": aboutSVG,
  "ICN_ARROW_DOWN": arrowDownSVG,
  "ICN_ARROW_RIGHT": arrowRightSVG,
  "ICN_FILE_NOT_FOUND": fileNotFoundSVG,
  "ICN_FOLDER": folderSVG,
  "ICN_FNF": fileNotFoundSVG,
  "ICN_GLOBE": globeSVG,
  "ICN_PAUSE": pauseSVG,
  "ICN_PLAY": playSVG,
  "ICN_REFRESH": refreshDoubleSVG,
  "ICN_SETTINGS": settingsSVG,
  "ICN_STOP": stopSVG,
  "ICN_WARNING_TRIANGLE": warningSVG,
  "LOGO_DRUFFLEBAG": drufflebagSVG,
}

/**
 * Gets the full filepath of an asset
 *
 * @deprecated
 * 
 * @param {string} assetFileName - Asset filename to try and fetch
 * @returns {string} Full path of asset
 */
const getAssetPath = assetFileName => {
  return `src/assets/${assetFileName}`;
};

/**
 * Gets an asset object by a key
 *
 * @param {string} key Asset key to import 
 * @returns {} Asset
 */
const getAsset = key => {
  if (!assets[key]) {
    return null;
  }

  return assets[key];
};

export { getAssetPath, getAsset };
