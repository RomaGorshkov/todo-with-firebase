import React from "react";
import { Button, Grid, Input } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import type { AuthInputs } from "../../../types";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import { validationRegisterSchema } from "../../../yupSchemas/registerSchema";
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { FirebaseError } from "firebase/app";
import { registerUser } from "../../../store/slices/authSlice";

import styles from "./Register.module.scss";

const registerInputs: AuthInputs[] = [
  {
    type: "text",
    id: "displayName",
    placeholder: "Display Name",
    name: "displayName",
  },
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

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: validationRegisterSchema,
    onSubmit: async (values) => {
      try {
        const userPayload = {
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        };
        await dispatch(registerUser(userPayload)).unwrap();
        navigate("/");
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          console.error("Firebase error:", error.message);
        } else {
          console.error("Registration error:", error);
        }
      }
    },
  });

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={formik.handleSubmit}
        className={styles.registerContainer__form}
      >
        <Grid className={styles.registerContainer__formGroup}>
          {registerInputs.map(({ type, id, placeholder, name }) => (
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
        <Grid className={styles.registerContainer__submitGroup}>
          <Button type="submit" disabled={isLoading}>
            Register
          </Button>
        </Grid>
        <Grid className={styles.registerContainer__loginLink}>
          Already have an account? <Link to="/login">Login</Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default Register;
