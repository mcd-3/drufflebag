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
  };
}

const saveSettings = ({
  theme,
  autoplayEnabled,
  emulationScale,
  splashscreenEnabled
}) => {
  console.log({ theme, autoplayEnabled, emulationScale, splashscreenEnabled });
};

const getSettingsJSON = () => {
  const settings = getSettings();

  if (settings === null) {
    return getDefaultSettings();
  }

  return settings;
};

const getThemes = () => {
  return {
    system: 'System (default)',
    light: 'Light',
    dark: 'Dark',
    ruffled: 'Ruffled',
    flashy: 'Flashy'
  };
};

export { saveSettings, getSettingsJSON, getThemes, getDefaultSettings };