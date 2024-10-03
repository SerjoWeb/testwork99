import Nav from "./Nav";
import styles from "./sharedStyles.module.scss"

const Header = (): React.ReactElement => {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  );
};

export default Header;
