import { useCollapse } from 'react-collapsed';
import { getAsset } from './../utils/assets.js';
import styles from './../styles/components/collapse.module.css';

const Collapse = ({
  children,
  collapsedText = "Expand",
  expandedText = "Collapse",
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  return (
    <div>
      <button className={styles['collapse-button']} {...getToggleProps()}>
        <div className={styles['collapse-container']}>
          <span className={styles['button-text']}>{isExpanded ? expandedText : collapsedText}</span>
          <img className={styles['collapse-icon']} src={isExpanded ? getAsset('ICN_ARROW_DOWN') : getAsset('ICN_ARROW_RIGHT')}/>
        </div>
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  )
};

export default Collapse;
