import styles from '../styles/components/noItemsBox.module.css';

const NoItemsBox = () => {
  return (
    <div className={styles['noItemsBox-container']}>
      <h2 className={`${styles.row} ${styles['noItemsBox-header']}`}>No SWF Files Detected</h2>
      <img className={`${styles.row} ${styles['noItemsBox-icon']}`} width={100} height={100} src="/src/assets/file-not-found.svg" />
      <p className={`${styles.row} ${styles['noItemsBox-subtext']}`}>Click on "Open" to find some.</p>
    </div>
  );
};

export default NoItemsBox;