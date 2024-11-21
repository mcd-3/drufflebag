import styles from './../styles/components/header.module.css';

const Header = ({children}) => {
  return (
    <div>
      <h1 className={styles.header}>{children}</h1>
    </div>
  );
};

export default Header;
