import React from "react";
import { Grid } from "@mui/material";

import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <Grid>
      <Grid className={styles.authLayout}>
        <Grid className={styles.authLayout__container}>
          <h1 className={styles.authLayout__title}>{title}</h1>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
