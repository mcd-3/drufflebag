import styles from '../styles/components/swfTable.module.css';

const SwfTable = ({children}) => {
  return (
    <div className={styles['swfTable-root']}>
      <table>
        {children}
      </table>
    </div>
  );
};

export default SwfTable;
