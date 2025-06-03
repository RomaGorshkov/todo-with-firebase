import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { FaHome, FaBookOpen } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { RiTodoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { logoutUser } from "../../../store/slices/authSlice";

import styles from "./Header.module.scss";

const headerLinks = [
  { label: "Home", to: "/", icon: <FaHome /> },
  { label: "About", to: "/about", icon: <FaBookOpen /> },
  { label: "Contact", to: "/contact", icon: <IoIosContacts /> },
];

const Header: React.FC = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Grid className={styles.header}>
      <Grid className={styles.header__content}>
        <Grid className={styles.header__logo}>
          <RiTodoLine className={styles.header__logoIcon} />
          Todo App
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
              {icon}
              {label}
            </NavLink>
          ))}
        </Grid>
        <Grid className={styles.header__userInfo}>
          <CgProfile />
          {user?.displayName}
        </Grid>
        <Grid className={styles.header__logout}>
          <Button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Log out"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
