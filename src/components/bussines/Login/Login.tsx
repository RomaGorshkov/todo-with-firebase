import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Button, Grid, Input } from "@mui/material";

import type { AuthInputs } from "../../../types";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { loginUser } from "../../../store/slices/authSlice";

import styles from "./Login.module.scss";

const loginInputs: AuthInputs[] = [
  {
    type: "email",
    id: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    type: "password",
    id: "password",
    placeholder: "Password",
    name: "password",
  },
];

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const userPayload = {
          email: values.email,
          password: values.password,
        };
        await dispatch(loginUser(userPayload)).unwrap();
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={formik.handleSubmit}
        className={styles.loginContainer__form}
      >
        <Grid className={styles.loginContainer__formGroup}>
          {loginInputs.map(({ type, id, placeholder, name }) => (
            <Input
              key={id}
              type={type}
              id={id}
              placeholder={placeholder}
              name={name}
              value={formik.values[name as keyof typeof formik.values]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          ))}
        </Grid>
        <Grid className={styles.loginContainer__submitGroup}>
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </Grid>
        <p className={styles.loginContainer__registerLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
