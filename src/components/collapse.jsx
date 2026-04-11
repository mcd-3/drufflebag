import { useCollapse } from 'react-collapsed';
import { getAsset } from './../utils/assets.js';
import { collapse } from './../styles';
import { Locale } from "./../locales/index.js";

const {
  LABEL_COLLAPSE,
  LABEL_EXPAND,
} = Locale;

const Collapse = ({
  children,
  collapsedText = LABEL_EXPAND,
  expandedText = LABEL_COLLAPSE,
}) => {
  const {
    getCollapseProps,
    getToggleProps,
    isExpanded,
  } = useCollapse()

  return (
    <div>
      <button
        className={collapse.button}
        {...getToggleProps()}
      >
        <div className={collapse.headerContainer}>
          <span>{isExpanded ? expandedText : collapsedText}</span>
          <img
            className={collapse.icon}
            src={isExpanded
              ? getAsset('ICN_ARROW_DOWN')
              : getAsset('ICN_ARROW_RIGHT')
            }
          />
        </div>
      </button>
      <section {...getCollapseProps()}>
        <div className={collapse.icon}>
          {children}
        </div>
      </section>
    </div>
  )
};

export default Collapse;
