import Link from "next/link";
import styles from "@/styles/Reel.module.css";

const Reel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.label}>Demo Reel<br></br>1/2</div>
        <div className={styles.reel}></div>
      </div>

      <div className={styles.field}>
        <div className={styles.label}></div>
        <div className={styles.buttons}>
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Reel;
