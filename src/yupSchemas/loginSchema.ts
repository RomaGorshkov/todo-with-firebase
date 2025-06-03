import * as Yup from "yup";

import type { LoginUserSchema } from "../types";

export const validationLoginSchema = Yup.object<LoginUserSchema>().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});
