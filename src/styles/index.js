import collapseStyles from './components/collapse.module.css';
import contextMenuStyles from './components/contextMenu.module.css';
import headerStyles from './components/header.module.css';
import iconButtonStyles from './components/iconButton.module.css';
import noItemsBoxStyles from './components/noItemsBox.module.css';
import swfTableStyles from './components/swfTable.module.css';
import topBarStyles from './components/topBar.module.css';

export const collapse = {
  button: collapseStyles["collapse-button"],
  buttonText: collapseStyles["collapse-button-text"],
  contentContainer: collapseStyles["collapse-content-container"],
  headerContainer: collapseStyles["collapse-header-container"],
  icon: collapseStyles['collapse-icon'],
};

export const contextMenu = {
  menuItem: contextMenuStyles["menu-item"],
  divider: contextMenuStyles.divider,
  container: contextMenuStyles["context-menu"],
};

export const header = { container: headerStyles.header };

export const iconButton = {
  button: iconButtonStyles["iconButton-button"],
  container: iconButtonStyles["iconButton-root"],
  icon: iconButtonStyles.icon,
  text: iconButtonStyles.text,
};

export const noItemsBox = {
  centered: noItemsBoxStyles.centered,
  container: noItemsBoxStyles["noItemsBox-container"],
  extra: noItemsBoxStyles["noItemsBox-extra"],
  header: noItemsBoxStyles["noItemsBox-header"],
  icon: noItemsBoxStyles["noItemsBox-icon"],
  row: noItemsBoxStyles.row,
  subtext: noItemsBoxStyles["noItemsBox-subtext"]
};

export const swfTable = {
  active: swfTableStyles.active,
  noMargin: swfTableStyles["no-margin"],
  root: swfTableStyles["swfTable-root"],
  selectInput: swfTableStyles["swfTable-select-input"],
  tdRow: swfTableStyles["td-row"],
  textInput: swfTableStyles["swfTable-text-input"],
  textOverflowEllipsis: swfTableStyles["text-overflow-ellipsis"],
};

export const topBar = {
  divider: topBarStyles["topBar-vertical-divider"],
  root: topBarStyles["topBar-root"],

  // Columns
  controlColumn: topBarStyles["topBar-control-column"],
  fileColumn: topBarStyles["topBar-file-column"],
  moreColumn: topBarStyles["topBar-more-column"],

  // Buttons and Dividers
  openButton: topBarStyles["topBar-open-button"],
  refreshButton: topBarStyles["topBar-refresh-button"],
  settingsButton: topBarStyles["topBar-settings-button"],
  aboutButton: topBarStyles["topBar-about-button"],
  pauseButton: topBarStyles["topBar-pause-button"],
  stopButton: topBarStyles["topBar-stop-button"],

  // Spoof
  spoofColumn: topBarStyles["topBar-spoof-column"],
  spoofCheckbox: topBarStyles["topBar-spoof-checkbox"],
  spoofIcon: topBarStyles["topBar-spoof-icon"],
  spoorUrlTextbox: topBarStyles["topBar-spoof-url-textbox"],
};
