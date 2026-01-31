import { setSettings, getSettings } from './storage.js';

const themes = {
  system: 'System (default)',
  light: 'Light',
  dark: 'Dark',
  ruffled: 'Ruffled',
  flashy: 'Flashy'
};

const getDefaultSettings = () => {
  return {
    theme: 'system',
    autoplayEnabled: true,
    emulationScale: 1,
    splashscreenEnabled: true,
    onlineModeEnabled: false,
    openUrls: false,
  };
}

const saveSettings = ({
  theme,
  autoplayEnabled,
  emulationScale,
  splashscreenEnabled,
  onlineModeEnabled,
  openUrls,
}) => {
  setSettings({
    theme,
    autoplayEnabled,
    emulationScale,
    splashscreenEnabled,
    onlineModeEnabled,
    openUrls,
  });
};

const getSettingsJSON = () => {
  const settings = getSettings();

  if (settings === null) {
    return getDefaultSettings();
  }

  if (!themes[settings.theme]) {
    settings.theme = 'system';
  }

  return settings;
};

/**
 * @deprecated
 */
const getThemes = () => {
  return {
    system: 'System (default)',
    light: 'Light',
    dark: 'Dark',
    ruffled: 'Ruffled',
    flashy: 'Flashy'
  };
};

const compareSettings = (settings1, settings2) => {
  // TODO: Make this more flexible instead of hardcoding everything
  return (
    settings1.theme === settings2.theme
      && settings1.autoplayEnabled === settings2.autoplayEnabled
      && settings1.emulationScale === settings2.emulationScale
      && settings1.splashscreenEnabled === settings2.splashscreenEnabled
      && settings1.onlineModeEnabled === settings2.onlineModeEnabled
      && settings1.openUrls === settings2.openUrls
  );
};

export {
  saveSettings,
  getSettingsJSON,
  getThemes,
  getDefaultSettings,
  compareSettings
};
