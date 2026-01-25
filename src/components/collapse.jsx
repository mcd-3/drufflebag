import { useCollapse } from 'react-collapsed';
import { getAsset } from './../utils/assets.js';
import styles from './../styles/components/collapse.module.css';
import { Locale } from "../../locales/index.js";

const {
  LABEL_COLLAPSE,
  LABEL_EXPAND,
} = Locale;

const Collapse = ({
  children,
  collapsedText = LABEL_EXPAND,
  expandedText = LABEL_COLLAPSE,
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div>
      <button className={styles['collapse-button']} {...getToggleProps()}>
        <div className={styles['collapse-header-container']}>
          <span className={styles['button-text']}>{isExpanded ? expandedText : collapsedText}</span>
          <img
            className={styles['collapse-icon']}
            src={isExpanded ? getAsset('ICN_ARROW_DOWN') : getAsset('ICN_ARROW_RIGHT')}
          />
        </div>
      </button>
      <section {...getCollapseProps()}>
        <div className={styles['collapse-content-container']}>
          {children}
        </div>
      </section>
    </div>
  )
};

export default Collapse;
