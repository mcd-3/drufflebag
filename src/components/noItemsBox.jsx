import styles from '../styles/components/noItemsBox.module.css';

const NoItemsBox = ({ isLoading }) => {
  return (
    <div className={styles['noItemsBox-container']}>
      <div className={styles['centered']}>
        { isLoading
          ?
            <div>
              <h2 className={`${styles.row} ${styles['noItemsBox-header']}`}>Loading SWF Files...</h2>
              <img className={`${styles.row} ${styles['noItemsBox-icon']}`} width={100} height={100} src="/src/assets/loading.svg" />
              <p className={`${styles.row} ${styles['noItemsBox-subtext']}`}>Please Wait</p>
            </div>
          :
            <div>
              <h2 className={`${styles.row} ${styles['noItemsBox-header']}`}>No SWF Files Detected</h2>
              <img className={`${styles.row} ${styles['noItemsBox-icon']}`} width={100} height={100} src="/src/assets/file-not-found.svg" />
              <p className={`${styles.row} ${styles['noItemsBox-subtext']}`}>Click on "Open" to find some.</p>
            </div>
        }
      </div>
    </div>
  );
};

export default NoItemsBox;
