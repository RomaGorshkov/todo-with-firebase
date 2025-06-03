import React from "react";
import { Grid } from "@mui/material";

import styles from "./PrivateLayout.module.scss";
import Header from "../../components/shared/Header/Header";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <Grid className={styles.privateLayout}>
      <Header />
      <Grid className={styles.privateLayout__content}>{children}</Grid>
    </Grid>
  );
};

export default PrivateLayout;
