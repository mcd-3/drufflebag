import collapseStyles from './components/collapse.module.css';
import contextMenuStyles from './components/contextMenu.module.css';
import headerStyles from './components/header.module.css';
import iconButtonStyles from './components/iconButton.module.css';

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
