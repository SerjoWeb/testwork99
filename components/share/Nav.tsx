import Link from "next/link";
import styles from "./sharedStyles.module.scss";

const Nav = (): React.ReactElement => {
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/favorites">Favorites</Link>
    </nav>
  );
};

export default Nav;
