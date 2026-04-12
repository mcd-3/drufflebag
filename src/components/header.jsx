import { header } from './../styles';

const Header = ({children}) => {
  return (
    <div>
      <h3 className={header.container}>{children}</h3>
    </div>
  );
};

export default Header;
