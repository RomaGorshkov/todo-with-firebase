import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, Input, Typography } from "@mui/material";

import type { AuthInputs } from "../../../types";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { clearAuthError } from "../../../store/reducers/auth";
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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const from = location.state?.from?.pathname || "/";

  React.useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearAuthError());
      }
    };
  }, [dispatch, error, location]);

  React.useEffect(() => {
    if (isAuthenticated && user) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (error) {
        dispatch(clearAuthError());
      }
      try {
        const userPayload = {
          email: values.email,
          password: values.password,
        };
        await dispatch(loginUser(userPayload)).unwrap();
      } catch (rejectedValueOrSerializedError) {
        console.error("Login failed:", rejectedValueOrSerializedError);
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
              error={
                formik.touched[name as keyof typeof formik.values] &&
                Boolean(formik.errors[name as keyof typeof formik.values])
              }
              required
            />
          ))}
        </Grid>
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 1, textAlign: "center" }}
          >
            {typeof error === "string"
              ? error
              : "Login failed. Please check your credentials."}
          </Typography>
        )}
        <Grid className={styles.loginContainer__submitGroup}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
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
