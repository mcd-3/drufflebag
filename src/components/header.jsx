import styles from './../styles/components/header.module.css';

const Header = ({children}) => {
  return (
    <div>
      <h3 className={styles.header}>{children}</h3>
    </div>
  );
};

export default Header;
