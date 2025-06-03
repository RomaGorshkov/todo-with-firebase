import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import type { LoginUserSchema, RegisterUserSchema, User } from "../../types";

export const registerUser = createAsyncThunk<
  User,
  RegisterUserSchema,
  { rejectValue: string }
>("auth/registerUser", async ({ displayName, email, password }, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!auth.currentUser) {
      return thunkAPI.rejectWithValue("No current user");
    }

    await updateProfile(auth.currentUser, { displayName });

    return {
      id: userCredential.user.uid,
      email: userCredential.user.email ?? "",
      displayName: auth.currentUser.displayName ?? "",
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginUserSchema,
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return {
      id: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
    };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
