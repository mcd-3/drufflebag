import { getAsset } from './../utils/assets.js';
import styles from '../styles/components/noItemsBox.module.css';

const NoItemsBox = ({
  topText = "",
  bottomText = "",
  icon = getAsset('ICN_FILE_NOT_FOUND'),
}) => {
  return (
    <div className={styles['noItemsBox-container']}>
      <div className={styles['centered']}>
        <div>
          <h2 className={`${styles.row} ${styles['noItemsBox-header']}`}>{topText}</h2>
          <img className={`${styles.row} ${styles['noItemsBox-icon']}`} width={100} height={100} src={icon} />
          <p className={`${styles.row} ${styles['noItemsBox-subtext']}`}>{bottomText}</p>
        </div>
      </div>
    </div>
  );
};

export default NoItemsBox;
