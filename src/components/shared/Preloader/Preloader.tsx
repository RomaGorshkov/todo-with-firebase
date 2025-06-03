import React from "react";

import styles from "./Preloader.module.scss";

const Preloader: React.FC = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloader__spinner}></div>
      <p className={styles.preloader__text}>Loading...</p>
    </div>
  );
};

export default Preloader;
