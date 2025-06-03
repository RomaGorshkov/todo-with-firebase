import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { FaHome, FaBookOpen } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { RiTodoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import styles from "./Header.module.scss";
import { useAppSelector } from "../../../store/storeHooks";

const headerLinks = [
  { label: "Home", to: "/", icon: <FaHome /> },
  { label: "About", to: "/about", icon: <FaBookOpen /> },
  { label: "Contact", to: "/contact", icon: <IoIosContacts /> },
];

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Grid className={styles.header}>
      <Grid className={styles.header__content}>
        <Grid className={styles.header__logo}>
          <RiTodoLine className={styles.header__logoIcon} />
          <span className={styles.header__logoText}>Todo App</span>
        </Grid>
        <Grid className={styles.header__links}>
          {headerLinks.map(({ label, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__link} ${styles["header__link--active"]}`
                  : styles.header__link
              }
            >
              <span className={styles.header__linkIcon}>{icon}</span>
              <span className={styles.header__linkText}>{label}</span>
            </NavLink>
          ))}
        </Grid>
        <Grid className={styles.header__userInfo}>
          <CgProfile />
          {user?.displayName}
        </Grid>
        <Grid className={styles.header__logout}>
          <Button>Log out</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
