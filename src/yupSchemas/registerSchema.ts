import * as Yup from "yup";

import type { RegisterUserSchema } from "../types";

export const validationRegisterSchema: Yup.ObjectSchema<RegisterUserSchema> =
  Yup.object({
    displayName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character."
      ),
  });
