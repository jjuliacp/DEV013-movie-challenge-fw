import { LuPlaySquare } from "react-icons/lu";
import styles from "./Logo.module.css";
function Logo() {
  return (
    <>
      <header>
        <LuPlaySquare className={styles.logoIcon} />
        <h1 className={styles.logoText}>Cinephile</h1>
      </header>
    </>
  );
}

export default Logo;
